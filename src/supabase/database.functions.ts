import { Dispatch, SetStateAction, useContext, useState } from 'react';
import { SupabaseClientContext } from './supabase.client';
import { SupabaseClient } from '@supabase/supabase-js';
import { Database, Tables } from './database.types';
import { message } from 'antd'

function getAllUsers(
    supabase: SupabaseClient<Database>,
    setLoading: Dispatch<SetStateAction<boolean>>,
    setErrorMessage: (error: unknown) => void,
    setData: Dispatch<SetStateAction<Tables<'Users'>[]>>
) {
    return async () => {
        setLoading(true)
        try {
            const { data, error } = await supabase.from('Users').select();
            if (error) throw error;
            setData(data);
            setLoading(false)
            return data;
        } catch (error) {
            setErrorMessage(error);
        } finally {
            setLoading(false)
        }
    };
}

function addUser(
    supabase: SupabaseClient<Database>,
    setLoading: Dispatch<SetStateAction<boolean>>,
    setErrorMessage: (error: unknown) => void,
    setData: Dispatch<SetStateAction<Tables<'Users'>[]>>
) {
    return async (payload: Database['public']['Tables']['Users']['Insert']) => {
        setLoading(true)
        try {
            const { data, error } = await supabase.from('Users').insert(payload).select();
            if (error) throw error;
            setData(data);
            setLoading(false)
            return data;
        } catch (error) {
            setErrorMessage(error);
        } finally {
            setLoading(false)
        }
    };
}

function deleteUser(
    supabase: SupabaseClient<Database>,
    setLoading: Dispatch<SetStateAction<boolean>>,
    setErrorMessage: (error: unknown) => void,
) {
    return async (userId: number) => {
        setLoading(true)
        try {
            const { error } = await supabase.from('Users').delete().eq('id', userId);
            if (error) throw error;
            setLoading(false)
        } catch (error) {
            setErrorMessage(error);
        } finally {
            setLoading(false)
        }
    };
}

function getUserDrafts(
    supabase: SupabaseClient<Database>,
    setLoading: Dispatch<SetStateAction<boolean>>,
    setErrorMessage: (error: unknown) => void,
    setData: Dispatch<SetStateAction<Tables<'Drafts'>[]>>
) {
    return async (userId: number) => {
        setLoading(true)
        try {
            const { data, error } = await supabase.from('Drafts').select().eq('user', userId);
            if (error) throw error;
            setData(data);
            setLoading(false)
            return data;
        } catch (error) {
            setErrorMessage(error);
        } finally {
            setLoading(false)
        }
    };
}

function getOtherUserDrafts(
    supabase: SupabaseClient<Database>,
    setLoading: Dispatch<SetStateAction<boolean>>,
    setErrorMessage: (error: unknown) => void,
    setData: Dispatch<SetStateAction<Tables<'Drafts'>[]>>
) {
    return async (userId: number) => {
        setLoading(true)
        try {
            const { data, error } = await supabase.from('Drafts').select().neq('user', userId);
            if (error) throw error;
            setData(data);
            setLoading(false)
            return data;
        } catch (error) {
            setErrorMessage(error);
        } finally {
            setLoading(false)
        }
    };
}

function getUserById(
    supabase: SupabaseClient<Database>,
    setLoading: Dispatch<SetStateAction<boolean>>,
    setErrorMessage: (error: unknown) => void,
    setData: Dispatch<SetStateAction<Tables<'Users'>>>
) {
    return async (userId: number) => {
        setLoading(true)
        try {
            const { data, error } = await supabase.from('Users').select().eq('id', userId);
            if (error) throw error;
            setData(data[0] as Tables<'Users'>);
            setLoading(false)
            return data[0];
        } catch (error) {
            setErrorMessage(error);
        } finally {
            setLoading(false)
        }
    };
}

function getUsersById(
    supabase: SupabaseClient<Database>,
    setLoading: Dispatch<SetStateAction<boolean>>,
    setErrorMessage: (error: unknown) => void,
    setData: Dispatch<SetStateAction<Tables<'Users'>[]>>
) {
    return async (userIds: number[]) => {
        setLoading(true)
        try {
            const { data, error } = await supabase.from('Users').select().in('id', userIds);
            if (error) throw error;
            setData(data as Tables<'Users'>[]);
            setLoading(false)
            return data;
        } catch (error) {
            setErrorMessage(error);
        } finally {
            setLoading(false)
        }
    };
}

function getDraftById(
    supabase: SupabaseClient<Database>,
    setLoading: Dispatch<SetStateAction<boolean>>,
    setErrorMessage: (error: unknown) => void,
    setData: Dispatch<SetStateAction<Tables<'Drafts'>>>
) {
    return async (draftId: number) => {
        setLoading(true)
        try {
            const { data, error } = await supabase.from('Drafts').select().eq('id', draftId);
            if (error) throw error;
            setData(data[0] as Tables<'Drafts'>);
            setLoading(false)
            return data[0];
        } catch (error) {
            setErrorMessage(error);
        } finally {
            setLoading(false)
        }
    };
}

function createNewDraft(
    supabase: SupabaseClient<Database>,
    setLoading: Dispatch<SetStateAction<boolean>>,
    setErrorMessage: (error: unknown) => void,
    setData: Dispatch<SetStateAction<Tables<'Drafts'>>>
) {
    return async (payload: Database['public']['Tables']['Drafts']['Insert']) => {
        setLoading(true)
        try {
            const { data, error } = await supabase.from('Drafts').insert(payload).select();
            if (error) throw error;
            setData(data[0]);
            setLoading(false)
            return data[0];
        } catch (error) {
            setErrorMessage(error);
        } finally {
            setLoading(false)
        }
    };
}

function updateDraft(
    supabase: SupabaseClient<Database>,
    setLoading: Dispatch<SetStateAction<boolean>>,
    setErrorMessage: (error: unknown) => void,
    setData: Dispatch<SetStateAction<Tables<'Drafts'>>>
) {
    return async (payload: Database['public']['Tables']['Drafts']['Update'], draftId: number) => {
        setLoading(true)
        try {
            const { data, error } = await supabase.from('Drafts').update(payload).eq('id', draftId).select();
            if (error) throw error;
            setData(data[0]);
            setLoading(false)
            return data[0];
        } catch (error) {
            setErrorMessage(error);
        } finally {
            setLoading(false)
        }
    };
}

function deleteDraft(
    supabase: SupabaseClient<Database>,
    setLoading: Dispatch<SetStateAction<boolean>>,
    setErrorMessage: (error: unknown) => void,
) {
    return async (draftId: number) => {
        setLoading(true)
        try {
            const { error } = await supabase.from('Drafts').delete().eq('id', draftId);
            if (error) throw error;
            setLoading(false)
        } catch (error) {
            setErrorMessage(error);
        } finally {
            setLoading(false)
        }
    };
}

function addComment(
    supabase: SupabaseClient<Database>,
    setLoading: Dispatch<SetStateAction<boolean>>,
    setErrorMessage: (error: unknown) => void,
    setData: Dispatch<SetStateAction<Tables<'Comments'>>>
) {
    return async (payload: Database['public']['Tables']['Comments']['Insert']) => {
        setLoading(true)
        try {
            const { data, error } = await supabase.from('Comments').insert(payload).select();
            if (error) throw error;
            setData(data[0]);
            setLoading(false)
            return data[0];
        } catch (error) {
            setErrorMessage(error);
        } finally {
            setLoading(false)
        }
    };
}

function getCommentsByDraftId(
    supabase: SupabaseClient<Database>,
    setLoading: Dispatch<SetStateAction<boolean>>,
    setErrorMessage: (error: unknown) => void,
    setData: Dispatch<SetStateAction<Tables<'Comments'>[]>>
) {
    return async (draftId: number) => {
        setLoading(true)
        try {
            const { data, error } = await supabase.from('Comments').select().eq('draftid', draftId);
            if (error) throw error;
            setData(data);
            setLoading(false)
            return data;
        } catch (error) {
            setErrorMessage(error);
        } finally {
            setLoading(false)
        }
    };
}

function useSupabase() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<undefined | Tables<'Users'>[] | Tables<'Users'> | Tables<'Drafts'>[] | Tables<'Drafts'> | Tables<'Comments'> | Tables<'Comments'>[]>(undefined);
    const supabase = useContext(SupabaseClientContext);

    const setErrorMessage = (error: unknown) => {
        message.error('Error fetching data');
        throw error;
    }

    return {
        loading,
        data,
        getAllUsers: supabase ? getAllUsers(supabase, setLoading, setErrorMessage, setData as Dispatch<SetStateAction<Tables<'Users'>[]>>) : undefined,
        addUser: supabase ? addUser(supabase, setLoading, setErrorMessage, setData as Dispatch<SetStateAction<Tables<'Users'>[]>>) : undefined,
        // @ts-ignore
        addComment: supabase ? addComment(supabase, setLoading, setErrorMessage, setData as Dispatch<SetStateAction<Tables<'Comments'>>>) : undefined,
        deleteUser: supabase ? deleteUser(supabase, setLoading, setErrorMessage) : undefined,
        deleteDraft: supabase ? deleteDraft(supabase, setLoading, setErrorMessage) : undefined,
        getUserDrafts: supabase ? getUserDrafts(supabase, setLoading, setErrorMessage, setData as Dispatch<SetStateAction<Tables<'Drafts'>[]>>) : undefined,
        getOtherUserDrafts: supabase ? getOtherUserDrafts(supabase, setLoading, setErrorMessage, setData as Dispatch<SetStateAction<Tables<'Drafts'>[]>>) : undefined,
        getDraftById: supabase ? getDraftById(supabase, setLoading, setErrorMessage, setData as Dispatch<SetStateAction<Tables<'Drafts'>>>) : undefined,
        getCommentsByDraftId: supabase ? getCommentsByDraftId(supabase, setLoading, setErrorMessage, setData as Dispatch<SetStateAction<Tables<'Comments'>[]>>) : undefined,
        getUserById: supabase ? getUserById(supabase, setLoading, setErrorMessage, setData as Dispatch<SetStateAction<Tables<'Users'>>>) : undefined,
        getUsersById: supabase ? getUsersById(supabase, setLoading, setErrorMessage, setData as Dispatch<SetStateAction<Tables<'Users'>[]>>) : undefined,
        createNewDraft: supabase ? createNewDraft(supabase, setLoading, setErrorMessage, setData as Dispatch<SetStateAction<Tables<'Drafts'>>>) : undefined,
        updateDraft: supabase ? updateDraft(supabase, setLoading, setErrorMessage, setData as Dispatch<SetStateAction<Tables<'Drafts'>>>) : undefined
    }
}

export default useSupabase;