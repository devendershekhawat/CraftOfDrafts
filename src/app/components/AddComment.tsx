'use client';

import CurrentUserContext from '@/contexts/currentUser.context';
import { ArticleSelction } from '@/hooks/useSelectionPopup';
import useSupabase from '@/supabase/database.functions';
import { Input, Modal } from 'antd';
import { Dispatch, SetStateAction, useContext, useState } from 'react';
// @ts-ignore
import { fromRange } from 'xpath-range';

function AddComment({
    open, selection, setOpen, readerRef, draftId, afterAddComment
}: {
    open: boolean;
    selection: ArticleSelction | null;
    setOpen: Dispatch<SetStateAction<boolean>>
    readerRef:  HTMLDivElement | null,
    draftId: number,
    afterAddComment: () => void
}) {
    const [comment, setComment] = useState('');
    const { loading: addingComment, addComment } = useSupabase();
    const { currentUser } = useContext(CurrentUserContext);

    const handleComment = async () => {
        if (readerRef && readerRef && currentUser && addComment && selection) {
            const xpath = fromRange(selection.range, readerRef);
            await addComment({
                comment,
                draftid: draftId,
                userid: currentUser.id,
                endXpath: xpath.end,
                endOffset: xpath.endOffset,
                startXpath: xpath.start,
                startOffset: xpath.startOffset,
                selectedText: selection.text,
                usericon: currentUser.Icon,
                username: currentUser.Name
            });
            setComment('');
            setOpen(false);
            afterAddComment();
        }
    }

    return (
        <Modal
            title='Add a Comment'
            open={open}
            onCancel={() => setOpen(false)}
            okText='Add Comment'
            onOk={handleComment}
            okButtonProps={{
                loading: addingComment,
                disabled: comment.length === 0 || !selection
            }}
        >
            {selection ? selection.text : ''}
            <Input.TextArea value={comment} placeholder='Write your thoughts' onChange={(e) => setComment(e.target.value)}/>
        </Modal>
    );
}   

export default AddComment;