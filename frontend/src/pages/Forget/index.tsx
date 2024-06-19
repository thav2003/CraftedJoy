import { Typography } from 'antd'
import React from 'react'
import ForgetPasswordForm from '~/components/form/ForgetPasswordForm'
const { Title } = Typography
const ForgetPasswordPage: React.FC = () => {
  return (
    <div className='p-8 px-40'>
      <Title style={{ textAlign: 'center' }}>Tìm lại mật khẩu</Title>

      <ForgetPasswordForm />
    </div>
  )
}

export default ForgetPasswordPage
