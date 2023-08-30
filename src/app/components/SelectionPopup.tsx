'use client';

import { CommentOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { LegacyRef } from 'react';

function SelectionPopup({ toolbarRef, onClickAddComment }:
    { toolbarRef: LegacyRef<HTMLDivElement>, onClickAddComment: () => void }
) {
    return (
        <div
                className="
                    bg-orange-500 p-[10px] absolute hidden after:content-[''] after:absolute after:top-[100%] after:left-[50%]
                    after:ml-[5px] after:border after:border-[5px] after:border-t-orange-500 after:border-r-[transparent]
                    after:border-l-[transparent] after:border-b-[transparent] rounded-[10px] z-[1000]
                "
                ref={toolbarRef}
                id='reader-tooltip'
            >
                <Button
                    icon={<CommentOutlined />}
                    type='link'
                    className='text-white'
                    onClick={() => onClickAddComment()}
                >
                    Add Comment
                </Button>
        </div>
    );
}

export default SelectionPopup;