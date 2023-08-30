"use client";

import AddComment from "@/app/components/AddComment";
import ArticleComments from "@/app/components/ArticleComments";
import CommentsDrawer from "@/app/components/CommentsDrawer";
import SelectionPopup from "@/app/components/SelectionPopup";
import ProtectedRoute from "@/app/protected.route";
import CurrentUserContext from "@/contexts/currentUser.context";
import useTextSelection from "@/hooks/useSelectionPopup";
import useSupabase from "@/supabase/database.functions";
import { Tables } from "@/supabase/database.types";
import { SupabaseClientContext } from "@/supabase/supabase.client";
import { Button, Card, Typography } from "antd";
import { Emoji } from "emoji-picker-react";
import Link from "next/link";
import { LegacyRef, useContext, useEffect, useRef, useState, useLayoutEffect } from "react";
import reactHTMLParser from 'react-html-parser';

// @ts-ignore
import { toRange } from 'xpath-range';

export type CommentsWithRange = Array<{ comment: Tables<'Comments'>; range: Range }>;

type GroupedComments = {
    para: Node,
    comments: CommentsWithRange
}

function ArticleView({ params: { articleId: draftId }} : { params: { articleId: number }}) {
    const { loading, data: draft, getDraftById } = useSupabase();
    const { loading: loadingUser, data: user, getUserById } = useSupabase();
    const { loading: loadingComments, data: comments, getCommentsByDraftId } = useSupabase();
    const supabase = useContext(SupabaseClientContext);
    const { currentUser } = useContext(CurrentUserContext);
    const [openCommentModal, setOpenCommentModal] = useState(false);
    const [commentsDrawerOpen, setCommentsDrawerOpen] = useState(false);
    const [commentsToShow, setCommentsToShow] = useState<CommentsWithRange>([]);

    const [commentsGroupedByParagraph, setCommentsGroupedByParagraph] = useState<GroupedComments[]>([]);


    const [readerRef, setReaderRef] = useState<HTMLDivElement | null>(null);
    const [popupRef, setPopupRef] = useState<HTMLDivElement | null>(null);

    const { selection, resetSelection } = useTextSelection(readerRef, popupRef);

    useEffect(() => {
    }, [selection]);
    
    useEffect(() => {
        if (supabase && draftId > 0 && getDraftById && getCommentsByDraftId) {
            getDraftById(draftId);
            getCommentsByDraftId(draftId);
        }
    }, [draftId, supabase]);

    useEffect(() => {
        if (draft && getUserById) {
            //@ts-ignore
            getUserById(draft.user);
        }
    }, [draft]);

    useEffect(() => {
        if (Array.isArray(comments) && comments.length && readerRef) {
            const commentsRangeMap = comments.map((comment) => {
                // @ts-ignore
                const { endXpath, startXpath, endOffset, startOffset } = comment;
                const range: Range = toRange(startXpath, startOffset, endXpath, endOffset, readerRef);
                return {
                    comment,
                    range
                }
            });

            const distinctParagraphs = new Set(commentsRangeMap.map(crm => crm.range.startContainer));

            const groupedComments = Array.from(distinctParagraphs).map(para => ({
                para,
                comments: commentsRangeMap.filter(({ range }) => para === range.startContainer)
            }));

            setCommentsGroupedByParagraph(groupedComments as GroupedComments[]);
        }
    }, [comments, readerRef]);

    if (!draft || !user || loadingComments) return <h1>Loading...</h1>;

    const renderCardExtras = () => {
        const extras = [
            <Link href="/">
                <Button>Go Back</Button>
            </Link>
        ];
        if (user.id === currentUser?.id) {
            extras.push(
                <Link href={`/draft/${draftId}`}>
                    <Button className="ml-[8px]" type="primary">Edit</Button>
                </Link>
            )
        }
        return extras;
    }

    return (
        <ProtectedRoute>
            <SelectionPopup onClickAddComment={() => setOpenCommentModal(true)} toolbarRef={(ref) => setPopupRef(ref)}/>
            <div className="flex max-w-[900px] my-[20px] mx-[auto]">
                <Card
                    className="w-[100%]"
                    loading={loading}
                    extra={renderCardExtras()}
                    title={<Card.Meta className='h-[30px]' title={`Article By ${user?.Name}`} avatar={<Emoji size={24} unified={user?.Icon || ''} />} />}
                >
                    <Typography.Title level={2}>
                        {draft.title}
                    </Typography.Title>
                    <div ref={(ref) => setReaderRef(ref) } id="reader" className="pl-[30px]">
                        {reactHTMLParser(draft.content as string)}
                    </div>
                    {
                        (commentsGroupedByParagraph || []).map(({ para, comments }) => (
                            <ArticleComments
                                para={para}
                                comments={comments}
                                openCommentsDrawer={(comments) => {
                                    setCommentsToShow(comments);
                                    setCommentsDrawerOpen(true);
                                }}
                            />
                        ))
                    }
                </Card>
            </div>
            <AddComment
                selection={selection}
                readerRef={readerRef}
                open={openCommentModal}
                setOpen={setOpenCommentModal}
                draftId={draftId}
                afterAddComment={async () => {
                    if (getCommentsByDraftId) {
                        await getCommentsByDraftId(draftId);
                    }
                }}
            />
            <CommentsDrawer
                open={commentsDrawerOpen}
                setOpen={setCommentsDrawerOpen}
                commentsWithRange={commentsToShow}
            />
        </ProtectedRoute>
    )
}

export default ArticleView;