import { Button, Col, Form, Input, message, Modal, Row, Typography } from "antd"
import { useState } from "react"
import { ClassService } from "../../../services/ClassService"

interface EnrollClassProps {
    isOpen: boolean
    onFinish: (hasChange: boolean) => void
}

export const EnrollClass = (props: EnrollClassProps) => {
    const [form] = Form.useForm()
    const [isLoading, setIsLoading] = useState(false)

    const handleFinish = (hasChange?: boolean) => {
        form.resetFields()
        props.onFinish(!!hasChange)
    }

    const handleSubmit = ({ code }) => {
        setIsLoading(true)

        ClassService.enroll(code)
            .then(result => {
                message.success(`Inscrito na turma ${result.name} com sucesso!`)
                handleFinish(true)
            })
            .catch(error => {
                if (error.response) {
                    form.setFields([{
                        name: 'code',
                        errors: [error.response.data?.message]
                    }])
                }
            })
            .finally(() => {
                setIsLoading(false)
            })

    }

    return (
        <Modal
            centered={true}
            visible={props.isOpen}
            footer={null}
            onCancel={() => handleFinish()}
        >
            <Typography.Title level={4}>
                Participar de nova turma
            </Typography.Title>
            <Typography.Text type="secondary" style={{ marginBottom: 8 }}>
                Para participar de uma nova turma, insira o código da turma e aperte em "Participar"
            </Typography.Text>

            <Form
                name="basic"
                layout="vertical"
                form={form}
                onFinish={handleSubmit}
                onFinishFailed={null}
            >

                <Form.Item
                    label="Código da turma"
                    name="code"
                    rules={[{ required: true, message: 'Você deve preencher este campo!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item style={{ marginBottom: 0 }}>
                    <Row gutter={8} justify="end">
                        <Col>
                            <Button onClick={() => handleFinish()}>
                                Cancelar
                            </Button>
                        </Col>
                        <Col>
                            <Button
                                loading={isLoading}
                                htmlType="submit"
                                type="primary"
                            >
                                Participar
                            </Button>
                        </Col>
                    </Row>
                </Form.Item>
            </Form>
        </Modal>

    )
}