'use client';

import { Tables } from '@/supabase/database.types';
import { MessageFilled } from '@ant-design/icons';
import { Button } from 'antd';
import { MutableRefObject, useEffect, useState } from 'react';
// @ts-ignore
import { toRange } from 'xpath-range';
import { CommentsWithRange } from '../article/[articleId]/page';

function ArticleComments({ comments, para, openCommentsDrawer }:
    { comments: CommentsWithRange , para: Node, openCommentsDrawer: (comments: CommentsWithRange) => void }
) {

    if (!para) {
        return <span />
    }
    const topOffset = (para.nodeType === Node.TEXT_NODE) ? para.parentElement?.offsetTop : (para as HTMLElement).offsetTop;
    
    const handleOpenComments = () => {
        openCommentsDrawer(comments);
    }

    return (
        <>
            <div className='absolute' style={{ top: `${topOffset}px`, left: '0px' }}>
                <Button onClick={handleOpenComments} icon={<MessageFilled />} />
            </div>

        </>
    );
}

export default ArticleComments;