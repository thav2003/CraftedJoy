import { Col, Row, Typography } from 'antd'
import React from 'react'
import LoginForm from '~/components/form/LoginForm'
import RegisterForm from '~/components/form/RegisterForm'
const { Title } = Typography
const LoginPage: React.FC = () => {
  return (
    <div className='p-8 px-40'>
      <Title style={{ textAlign: 'center' }}>Đăng nhập</Title>

      <Row gutter={16}>
        <Col span={8}>
          <LoginForm />
        </Col>
        <Col span={16}>
          <RegisterForm />
        </Col>
      </Row>
    </div>
  )
}

export default LoginPage
