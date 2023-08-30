"use client";

import ProtectedRoute from "@/app/protected.route";
import useSupabase from "@/supabase/database.functions";
import { Tables } from "@/supabase/database.types";
import { SupabaseClientContext } from "@/supabase/supabase.client";
import { Button, Card, Input, Tag } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";
import Quill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const DEBOUNCE_TIME = 1500;

function DraftEditor({ params: { draftId } }: {params : { draftId: number }}) {
    const { loading, data: draft, getDraftById } = useSupabase();
    const { loading: updating, updateDraft } = useSupabase();
    const { loading: deleting, deleteDraft } = useSupabase();
    const supabase = useContext(SupabaseClientContext);
    const router = useRouter();

    const [title, setTitle] = useState<string>('');
    const [value, setValue] = useState<string>('');
    const [textContent, setTextContent] = useState<string>('');
    const editorRef = useRef<Quill.UnprivilegedEditor>();

    useEffect(() => {
        if (supabase && draftId > 0 && getDraftById) {
            getDraftById(draftId);
        }
    }, [draftId, supabase]);

    useEffect(() => {
        if (draft) {
            // @ts-ignore
            setTitle(draft.title);
            // @ts-ignore
            setValue(draft.content);
            //@ts-ignore
            setTextContent(draft.textContent);
        }
    }, [draft]);

    useEffect(() => {
        const debounce = setTimeout(async () => {
            if (updateDraft) {
                await updateDraft({
                    title,
                    content: value,
                    textContent
                }, draftId);
            }
        }, DEBOUNCE_TIME);

        return () => {
            clearInterval(debounce);
        }
    }, [title, value, textContent]);

    const handleDelete = async () => {
        if (deleteDraft) {
            await deleteDraft(draftId);
            router.push('/');
        }
    }
    
    return (
        <ProtectedRoute>
            <div className="max-w-[900px] mx-[auto] my-[20px] w-[100%] h-[100vh]">
                <Card
                    className="w-[100%]"
                    title="Edit Draft"
                    loading={loading}
                    extra={[
                        <Tag color={updating ? 'gold' : 'green' }>{updating ? 'Saving' : 'Saved'}</Tag>,
                        <Link href="/">
                            <Button className="mr-[8px]" type="primary">Go back</Button>
                        </Link>,
                        <Button loading={deleting} className="mr-[8px]" type="primary" danger>Delete Draft</Button>
                    ]}
                >
                    <Input
                        bordered={false}
                        className="text-2xl mb-[10px]"
                        value={title}
                        placeholder="Enter Title"
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <div id="reader">
                        <Quill
                            value={value}
                            onChange={(value, delta, source, editor) => {
                                setValue(editor.getHTML())
                                setTextContent(editor.getText());
                            }}
                            className="min-h-[400px]"
                            theme="snow"
                        />
                    </div>
                </Card>
            </div>
        </ProtectedRoute>
    )
}

export default DraftEditor;