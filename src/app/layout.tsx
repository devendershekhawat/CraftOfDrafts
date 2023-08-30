'use client';
import { SupabaseClient } from '@supabase/supabase-js'
import './globals.css'
import 'antd/dist/reset.css';
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { useEffect, useState } from 'react'
import { Database, Tables } from '@/supabase/database.types'
import { SupabaseClientContext, createSupabaseClient } from '@/supabase/supabase.client'
import CurrentUserContext from '@/contexts/currentUser.context'
import { ConfigProvider, theme } from 'antd';
import 'bootstrap-icons/font/bootstrap-icons.css';

const inter = Inter({ subsets: ['latin'
] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // create a state to store supabase client
  const [supabase, setSupabase] = useState<SupabaseClient<Database> | undefined>();
  const [currentUser, setCurrentUser] = useState<Tables<'Users'> | undefined>();

  useEffect(() => {
    // initialise supabase client if it doesn't exist
    if (!supabase) {
      setSupabase(createSupabaseClient());
    }
  }, [supabase]);
  
  return (
    <ConfigProvider theme={{
      algorithm: theme.defaultAlgorithm
    }}>
      <SupabaseClientContext.Provider value={supabase}>
        <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
            <html lang='en'>
              <body className={inter.className}>{children}</body>
            </html>
        </CurrentUserContext.Provider>
      </SupabaseClientContext.Provider>
    </ConfigProvider>
  )
}
