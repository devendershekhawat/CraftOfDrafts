'use client';
import CurrentUserContext from '@/contexts/currentUser.context';
import { SupabaseClientContext } from '@/supabase/supabase.client';
import { useRouter } from 'next/navigation';
import { ReactNode, useContext, useEffect } from 'react';


function ProtectedRoute({
    children
}: {
    children: ReactNode
}) {
    const { currentUser } = useContext(CurrentUserContext);
    const router = useRouter();

    useEffect(() => {
        if (!currentUser) {
            router.push('/login');
        }
    }, [currentUser]);

    return (
        <div>
            {children}
        </div>
    )
}

export default ProtectedRoute;