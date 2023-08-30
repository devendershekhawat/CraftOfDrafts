"use client";
import CurrentUserContext from '@/contexts/currentUser.context';
import { Database, Tables } from '@/supabase/database.types';
import { SupabaseClientContext, createSupabaseClient } from '@/supabase/supabase.client';
import { SupabaseClient } from '@supabase/supabase-js';
import Image from 'next/image'
import { useContext, useEffect, useState } from 'react';
import ProtectedRoute from './protected.route';
import { Avatar, Button, Card, message } from 'antd';
import { Emoji } from 'emoji-picker-react';
import { EditFilled } from '@ant-design/icons';
import DraftList from './components/DraftList';
import useSupabase from '@/supabase/database.functions';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const { loading: creatingNewDraft, createNewDraft } = useSupabase();
  const router = useRouter();


  const handleCreateNewDraft = async () => {
      if (createNewDraft && currentUser) {
        const newDraft = await createNewDraft({
          user: currentUser.id
        });
        if (newDraft) {
          router.push(`/draft/${newDraft?.id}`)
        } else {
          message.error('Create draft failed');
        }
      }
  }

  return (
   <ProtectedRoute>
      {currentUser ? (<div className='max-w-[800px] mx-[auto] my-[20px] w-[100%] h-[100vh]'>
        <Card
          className='w-[100%]'
          title={<Card.Meta className='h-[30px]' title={`Welcome ${currentUser?.Name}`} avatar={<Emoji size={24} unified={currentUser?.Icon || ''} />} />}
          extra={[
            <Button className='mr-[8px]' onClick={() => setCurrentUser(undefined)} danger type="primary">Logout</Button>,
            <Button icon={<EditFilled />} type="primary" onClick={handleCreateNewDraft} loading={creatingNewDraft}>Create Draft</Button>
          ]}
        >
          <DraftList userId={currentUser?.id} />
          <DraftList type='Other' userId={currentUser?.id} />
        </Card>
      </div>) : (<span>Loading..</span>)}
   </ProtectedRoute>
  )
}
