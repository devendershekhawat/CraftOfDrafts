'use client';

import useSupabase from '@/supabase/database.functions';
import { Tables } from '@/supabase/database.types';
import { SupabaseClientContext } from '@/supabase/supabase.client';
import { List, Typography } from 'antd';
import Link from 'next/link';
import { useContext, useEffect } from 'react';

function DraftList({ userId, type = 'Own' }: {userId: number, type?: 'Own' | 'Other'}) {
    const { loading, data: drafts, getUserDrafts } = useSupabase();
    const { data: otherdrafts, getOtherUserDrafts } = useSupabase();
    const supabase = useContext(SupabaseClientContext);

    useEffect(() => {
        if (supabase && getUserDrafts && getOtherUserDrafts) {
            if (type === 'Own') {
                getUserDrafts(userId);
            } else {
                getOtherUserDrafts(userId);
            }
        }
    }, [supabase]);

    return (
        <List
            loading={loading}
            header={<Typography.Title level={4}>{type === 'Own' ? 'Your Articles:' : 'Other users Articles'}</Typography.Title>}
            dataSource={type === 'Own' ? drafts as Tables<'Drafts'>[] : otherdrafts as Tables<'Drafts'>[] || []}
            renderItem={draft => (
                <List.Item>
                    <Link href={`/article/${draft.id}`}>
                        <Typography.Title level={3}>{draft.title || 'Untitled Draft'}</Typography.Title>
                        <Typography.Text>{draft.textContent?.slice(0, 200)}...</Typography.Text>
                    </Link>
                </List.Item>
            )}
        />
    );
}

export default DraftList;