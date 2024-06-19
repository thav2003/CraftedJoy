import React from 'react'
import { Typography, Button, Form, Input, Space, Flex, Divider } from 'antd'
import { Link } from 'react-router-dom'
import type { FormProps } from 'antd'
const { Title, Text } = Typography

type FieldType = {
  email?: string
}

const ForgetPasswordForm: React.FC = () => {
  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values)
  }

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div className='text-center'>
      <Space direction='vertical' className='w-full'>
        <Title level={3} className='drop-shadow-lg text-[##44525A]'>
          Nhập thông tin để lấy lại acc
        </Title>
        <Text className='text-[#6E7C85]'>
          Bạn nhập lại email đã đăng ký, hệ thống của chúng tôi sẽ tự động tạo mật khẩu và gửi qua email cho bạn.
        </Text>

        <Form
          name='register_form'
          className='mt-5'
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete='off'
        >
          <Form.Item<FieldType> name='email' rules={[{ required: true, message: 'Please input your email!' }]}>
            <Input size='large' placeholder='Email address' />
          </Form.Item>

          <Form.Item>
            <Button className='w-full' size='large' htmlType='submit'>
              Gửi đi
            </Button>
          </Form.Item>
          <Link to='/login'>{'<- '}Quay lại trang đăng nhập</Link>
        </Form>
      </Space>
    </div>
  )
}

export default ForgetPasswordForm
