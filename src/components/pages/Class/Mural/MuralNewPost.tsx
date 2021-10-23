import { Button, Card, Form, Input, Modal, Typography } from "antd"
import Avatar from "antd/lib/avatar/avatar"
import { useRef, useState } from "react"
import { toast } from "react-toastify"
import { useApp } from "../../../../context/AppContext"
import { PostService } from "../../../../services/PostService"
import QuillEditor from "../../../UI/QuillEditor"

interface IMuralNewPost {
    classId: string
    addNewPost: (data) => void
}

const MuralNewPost = (props: IMuralNewPost) => {
    const [modalIsOpen, setOpen] = useState(false)
    const [form] = Form.useForm()
    const { user } = useApp()

    const showModal = () => {
        setOpen(true);
    };

    const handleOnFinish = async (data) => {

        PostService.create({ ...data, classId: props.classId })
            .then(result => {
                form?.resetFields()

                props.addNewPost({
                    ...result,
                    _id: result._id,
                    author: { ...user }
                })

                setOpen(false)

                // setPosts([{ ...result, author: { ...user } }, ...posts])

                toast('Post criado com sucesso')
            })
            .catch(err => {
                console.error(err)

            })
    }

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };


    return <>
        <Card hoverable onClick={() => setOpen(true)}>
            <Card.Meta
                style={{ display: 'flex', alignItems: 'center' }}
                avatar={<Avatar size={'large'} src={`/assets/images/blank-profile.png`} />}
                title={
                    <Typography.Text
                        style={{ fontWeight: 400, fontSize: 14 }}
                        type={'secondary'}
                    >
                        Escreva um aviso para turma
                    </Typography.Text>
                }
            />

        </Card>

        <Modal
            centered
            // width={300}
            title="Adicionar novo aviso"
            visible={modalIsOpen}
            onOk={() => form?.submit()}
            // confirmLoading={confirmLoading}
            onCancel={handleCancel}
        >
            <Form
                name="basic"
                layout="vertical"
                // labelCol={{ span: 8 }}
                // wrapperCol={{ span: 16 }}
                // initialValues={{  }}
                form={form}
                onFinish={handleOnFinish}
                onFinishFailed={null}
            >
                <Form.Item
                    // label="Tema"
                    name="text"
                    rules={[{ required: true, message: 'Você deve preencher este campo!' }]}
                >
                    <QuillEditor
                        modules={{
                            toolbar: [
                                //   [{ header: [1, 2, false] }],
                                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                                [
                                    { list: 'ordered' },
                                    { list: 'bullet' },
                                ],
                                ['link', 'code'],
                                ['clean'],
                            ],
                        }}
                    />
                </Form.Item>
            </Form>
        </Modal>

    </>
}

export default MuralNewPost