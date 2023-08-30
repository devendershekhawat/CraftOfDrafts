"use client";
import CurrentUserContext from "@/contexts/currentUser.context";
import useSupabase from "@/supabase/database.functions";
import { Tables } from "@/supabase/database.types";
import { DeleteFilled, LoginOutlined, UserAddOutlined } from "@ant-design/icons";
import { Card, List, Button, Modal, Input, Form, Popover, Typography, Popconfirm } from "antd";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import EmojiPickerReact, { Emoji } from "emoji-picker-react";
import { SupabaseClientContext } from "@/supabase/supabase.client";

function Login() {
    const { loading, getAllUsers, data: users } = useSupabase();
    const { loading: addingUser, addUser } = useSupabase();
    const { loading: deleting, deleteUser } = useSupabase();
    const { setCurrentUser, currentUser } = useContext(CurrentUserContext);
    const [modalOpen, setModalOpen] = useState(false);
    const [newUserName, setNewUserName] = useState('');
    const [newUserIcon, setNewUserIcon] = useState('');
    const router = useRouter();
    const supabase = useContext(SupabaseClientContext);

    useEffect(() => {
        if (getAllUsers) {
            getAllUsers();
        }
    }, [supabase]);

    useEffect(() => {
        if (currentUser) {
            router.push('/');
        }
    }, [currentUser]);

    const handleLogin = (user: Tables<'Users'>) => {
        setCurrentUser(user);
    }

    const handleAddUser = async () => {
        if (addUser && getAllUsers) {
            await addUser({
                Name: newUserName,
                Icon: newUserIcon
            });
            await getAllUsers();
            setModalOpen(false);
        }
    }

    const handleDeleteUser = async (userId: number) => {
        if (deleteUser && getAllUsers) {
            await deleteUser(userId);
            await getAllUsers();
        }
    }

    return (
        <div className="flex justify-center items-center w-[100%] h-[100vh]">
            <Card title="Select a user" className="max-w-xl w-[100%]"
                extra={<Button type="primary" icon={<UserAddOutlined />} onClick={() => setModalOpen(true)}>Add new user</Button>}
            >
                <List
                    loading={loading}
                    dataSource={users as Tables<'Users'>[] || []}
                    renderItem={user => (
                        <List.Item>
                            <List.Item.Meta avatar={<Emoji unified={user.Icon as string} />} title={user.Name} />
                            <Button onClick={() => handleLogin(user)} icon={<LoginOutlined />}>Login</Button>
                            <Popconfirm title="Delete User?" onConfirm={() => handleDeleteUser(user.id)} okButtonProps={{ loading: deleting}}>
                                <Button danger type="primary" className="ml-[8px]" icon={<DeleteFilled />} />
                            </Popconfirm>
                        </List.Item>
                    )}
                />
            </Card>
            <Modal
                title="Add New User"
                open={modalOpen}
                onCancel={() => setModalOpen(false)}
                okText="Add User"
                okButtonProps={{ loading: addingUser, disabled: !(newUserIcon || newUserName) }}
                onOk={handleAddUser}
            >
                <Form>
                    <Form.Item label="Name">
                         <Input placeholder="Enter you name" value={newUserName} onChange={(e) => setNewUserName(e.target.value)} />
                    </Form.Item>
                    <Form.Item label="Icon">
                    <Typography.Text className="mb-[10px] block">{<Emoji unified={newUserIcon} />}</Typography.Text>
                    <Popover
                        content={<EmojiPickerReact onEmojiClick={(emoji) => setNewUserIcon(emoji.unified)} />}
                        title="Title"
                    >
                        <Button>Select an Icon</Button>
                    </Popover>
                    </Form.Item>
                </Form>
            </Modal>    
        </div>
    );
}

export default Login;