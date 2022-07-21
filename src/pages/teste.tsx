import { Button, Card, Layout, Modal, Space, Typography, Form, Input, Divider } from "antd"
import { Content } from "antd/lib/layout/layout"
import { useState } from "react"
import { AppLeftNavigation } from "../layouts/AppLeftNavigation"
// import { CustomTable } from '../components/UI/CustomTable'


export default () => {
    let [modalIsOpen, setModalOpen] = useState(false)
    const handleModalOpen = () => {
        setModalOpen(true)
    }
    const handleModalClose = () => {
        setModalOpen(false)
    }

    return <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#F5F5F5'
    }}>
        <Card
            style={{
                padding: '16px',
                minWidth: 400,
                boxShadow: "#cfcfcf 1px 1px 5px 0px"
            }}
        >
            <div style={{ textAlign: "center", marginBottom: '24px' }}>
                <img src={'/logo.png'} style={{ maxHeight: 60 }} />
            </div>

            <Form layout="vertical">
                <Form.Item label="Email">
                    <Input />
                </Form.Item>
                <Form.Item label="Senha">
                    <Input type="password" />
                </Form.Item>

                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between'
                }}>
                    <Button type="link" style={{ paddingLeft: 0 }}>Perdeu sua senha?</Button>
                    <Button type="primary">Entrar</Button>
                </div>

            </Form>

            {/* <Divider /> */}
        </Card>
    </div>
}