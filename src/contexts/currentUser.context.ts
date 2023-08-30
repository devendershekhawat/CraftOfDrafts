import { Tables } from "@/supabase/database.types";
import { createContext, Dispatch, SetStateAction } from "react";

const CurrentUserContext = createContext<{
    currentUser: Tables<'Users'> | undefined;
    setCurrentUser: Dispatch<SetStateAction<Tables<'Users'> | undefined>>;
}>({
    currentUser: undefined,
    setCurrentUser: () => {}
});

export default CurrentUserContext;
