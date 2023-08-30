import useSupabase from '@/supabase/database.functions';
import { Tables } from '@/supabase/database.types';
import { Drawer, List, Space, Tag, Typography } from 'antd';
import { Emoji } from 'emoji-picker-react';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

function CommentsDrawer(
    { open, setOpen,  commentsWithRange }:
    { open: boolean; setOpen: Dispatch<SetStateAction<boolean>>; commentsWithRange: Array<{ comment: Tables<'Comments'>, range: Range }>}
) {
    return (
        <Drawer title='Comments' open={open} onClose={() => setOpen(false)}>
            <List
                dataSource={commentsWithRange}
                renderItem={item => (
                    <List.Item>
                        <Space direction='vertical'>
                            <Typography.Text>'{ item.comment.selectedText }'</Typography.Text>
                            <Typography.Title level={5}>{item.comment.comment}</Typography.Title>
                            <Tag color='geekblue'>{(new Date(item.comment.created_at)).toDateString()}</Tag>
                            <List.Item.Meta title={`By ${item.comment.username}`} avatar={<Emoji unified={item.comment.usericon || ''} />} />
                        </Space>
                    </List.Item>
                )}
            />    
        </Drawer>
    );
}

export default CommentsDrawer;
