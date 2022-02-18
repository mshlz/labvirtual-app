import { Card, Col, Row, Typography } from "antd"
import { RegisterForm } from "../../components/Auth/Register/RegisterForm"

const RegisterPage = () => {
  return <Row justify="center" style={{ marginTop: 150 }}>
    <Col>
      <Card
        title={<Typography.Title level={3}>Criar uma nova conta</Typography.Title>}
        style={{
          width: 400,
          boxShadow: 'rgb(0 0 0 / 10%) 0px 0px 10px'
        }}
      >
        <RegisterForm />
      </Card>
    </Col>
  </Row>
}

export default RegisterPage