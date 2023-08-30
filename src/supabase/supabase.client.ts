import { SupabaseClient, createClient } from "@supabase/supabase-js";
import { Database } from "./database.types";
import { createContext } from "react";

export const SupabaseClientContext = createContext<SupabaseClient<Database> | undefined>(undefined);

export function createSupabaseClient(): SupabaseClient<Database> {
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_KEY) {
        try {
            const supabaseClient = createClient<Database>(
                process.env.NEXT_PUBLIC_SUPABASE_URL,
                process.env.NEXT_PUBLIC_SUPABASE_KEY
            );
            return supabaseClient;
        } catch(err) {
            throw err;
        }
    } else {
        throw new Error('Supabase url and key not found in env variables.');
    }
}