import { Button, Card, Col, Result, Row, Typography } from 'antd'
import { useState } from 'react'
import { ChangePasswordForm } from '../../components/Auth/ResetPassword/ChangePasswordForm'
import { CheckTokenCodeForm } from '../../components/Auth/ResetPassword/CheckTokenCodeForm'
import { ForgotPasswordForm } from '../../components/Auth/ResetPassword/ForgotPasswordForm'
import Link from 'next/link'

const ResetPasswordPage = () => {
  const [step, setStep] = useState(0)
  const [tokenId, setToken] = useState(null)
  const [tokenCode, setTokenCode] = useState(null)

  const stepMap: { [index: number]: { subtitle: string, form: JSX.Element } } = {
    0: {
      subtitle: 'Insira o email de sua conta que enviaremos instruções para recuperá-la.',
      form: <ForgotPasswordForm onSuccess={token => (setToken(token), nextStep())} />
    },
    1: {
      subtitle: 'Insira o código recebido no seu email',
      form: <CheckTokenCodeForm tokenId={tokenId} onSuccess={code => (setTokenCode(code), nextStep())} />
    },
    2: {
      subtitle: 'Insira sua nova senha',
      form: <ChangePasswordForm tokenId={tokenId} tokenCode={tokenCode} onFinish={() => nextStep()} />
    },
    3: {
      subtitle: '',
      form: <><Result status="success" title="Conta recuperada com sucesso!" /><Link href="/auth/login"><Button type="primary" block>Voltar para o inicio</Button></Link></>
    }
  }

  const nextStep = () => {
    setStep(step + 1)
  }

  const renderStepHeader = () => <>
    <Typography.Title level={3}>Recuperar conta</Typography.Title>
    <Typography.Text type="secondary" style={{ fontWeight: 400 }}>
      {stepMap[step].subtitle}
    </Typography.Text>
  </>

  const renderStepForm = () => stepMap[step].form

  return <Row justify="center" style={{ marginTop: 150 }}>
    <Col>
      <Card
        title={renderStepHeader()}
        style={{
          // width: 600,
          boxShadow: 'rgb(0 0 0 / 10%) 0px 0px 10px'
        }}
      >
        {renderStepForm()}
      </Card>
    </Col>
  </Row>
}

export default ResetPasswordPage