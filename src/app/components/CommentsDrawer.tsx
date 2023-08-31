import { Tables } from '@/supabase/database.types';
import { Drawer, List, Space, Tag, Typography } from 'antd';
import { Emoji } from 'emoji-picker-react';
import { Dispatch, SetStateAction } from 'react';

function CommentsDrawer(
    { open, setOpen,  commentsWithRange }:
    { open: boolean; setOpen: Dispatch<SetStateAction<boolean>>; commentsWithRange: Array<{ comment: Tables<'Comments'>, range: Range }>}
) {
    return (
        <Drawer title='Comments' open={open} onClose={() => setOpen(false)}>
            <List
                dataSource={commentsWithRange}
                renderItem={item => <CommentItem comment={item.comment} range={item.range} />}
            />    
        </Drawer>
    );
}


function CommentItem({ comment, range } : { comment: Tables<'Comments'>, range: Range}) {
  const markElement = () => {
    window.getSelection()?.addRange(range);
  };

  const unmarkElement = () => {
    window.getSelection()?.removeAllRanges();
  };

  return (
    <List.Item onMouseLeave={unmarkElement} onMouseEnter={markElement}>
        <Space direction='vertical'>
            <Typography.Text>'{ comment.selectedText }'</Typography.Text>
            <Typography.Title level={5}>{comment.comment}</Typography.Title>
            <Tag color='geekblue'>{(new Date(comment.created_at)).toDateString()}</Tag>
            <List.Item.Meta title={`By ${comment.username}`} avatar={<Emoji unified={comment.usericon || ''} />} />
        </Space>
    </List.Item>
)
}


export default CommentsDrawer;
