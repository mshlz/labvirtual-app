import { Card, Col, Row, Typography } from 'antd'
import { LoginForm } from '../../components/Auth/Login/LoginForm'

const LoginPage = () => {

    return <div>
        {/* <Row justify="center">
                <Col>
                    <img src="/assets/images/labvis.png" style={{ height: 200 }} />
                </Col>
            </Row> */}

        <Row justify="center" style={{ marginTop: 150 }}>
            <Col>
                <Card
                    title={<Typography.Title level={3}>Entrar</Typography.Title>}
                    style={{
                        width: 400,
                        boxShadow: 'rgb(0 0 0 / 10%) 0px 0px 10px'
                    }}
                >
                    <LoginForm />
                </Card>
            </Col>
        </Row>


    </div>
}

export default LoginPage