import React from 'react'
import { Typography, Button, Checkbox, Form, Input, Space, Divider, Flex, App } from 'antd'
import type { FormProps } from 'antd'
import { Link, useNavigate } from 'react-router-dom'

import { useAuthStore } from '~/stores/auth.store'

const { Title, Text } = Typography

type FieldType = {
  username: string
  password: string
  remember?: string
}

const LoginForm: React.FC = () => {
  const { notification } = App.useApp()
  const navigate = useNavigate()
  const loginUser = useAuthStore((state) => state.loginUser)
  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    console.log('Success:', values)
    const { username, password } = values

    try {
      await loginUser(username, password)
      navigate('/')
    } catch (error) {
      console.log(error)
      notification.error({ message: 'Sorry! Something went wrong. App server error' })
    }
  }

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }
  return (
    <div className='py-8 px-4 bg-[#FFFFFF]'>
      <Space direction='vertical' className='w-full'>
        <Title level={3} className='drop-shadow-lg text-[##44525A]'>
          Đăng nhập tài khoản của bạn
        </Title>
        <Text className='text-[#6E7C85]'>
          Đăng nhập tài khoản của bạn để khám phá tất cả các tính năng tuyệt vời trong cửa hàng của chúng tôi.
        </Text>

        <Form
          name='login_form'
          className='mt-5'
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete='off'
        >
          <Form.Item<FieldType> name='username' rules={[{ required: true, message: 'Please input your email!' }]}>
            <Input size='large' placeholder='Địa chỉ email' />
          </Form.Item>

          <Form.Item<FieldType> name='password' rules={[{ required: true, message: 'Please input your password!' }]}>
            <Input.Password size='large' placeholder='Mật khẩu' />
          </Form.Item>
          <Form.Item>
            <Form.Item<FieldType> name='remember' valuePropName='checked' noStyle>
              <Checkbox>Ghi nhớ đăng nhập</Checkbox>
            </Form.Item>

            <Link className='float-right text-primary' to='/forgetpassword'>
              Bạn muốn tìm lại mật khẩu?
            </Link>
          </Form.Item>

          <Form.Item>
            <Button className='w-full' size='large' htmlType='submit'>
              <Space>Đăng nhập</Space>
            </Button>
          </Form.Item>

          <Divider plain className='!text-[#878F9A]'>
            Or
          </Divider>

          <Form.Item>
            <Flex gap='middle'>
              <Button size='large' className='w-full'>
                <Flex gap='middle' align='center' justify='center'>
                  <img className='w-5' src='/image3.png' />
                  Facebook
                </Flex>
              </Button>
              <Button size='large' className='w-full'>
                <Flex gap='middle' align='center' justify='center'>
                  <svg className='w-4 inline' viewBox='0 0 533.5 544.3'>
                    <path
                      d='M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z'
                      fill='#4285f4'
                    />
                    <path
                      d='M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z'
                      fill='#34a853'
                    />
                    <path
                      d='M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z'
                      fill='#fbbc04'
                    />
                    <path
                      d='M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z'
                      fill='#ea4335'
                    />
                  </svg>
                  Google
                </Flex>
              </Button>
            </Flex>
          </Form.Item>
        </Form>
      </Space>
    </div>
  )
}

export default LoginForm
