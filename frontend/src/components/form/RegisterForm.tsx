/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Typography, Button, Form, Input, Space, Row, Col, Checkbox, App, DatePicker } from 'antd'
import { useNavigate } from 'react-router-dom'
import type { FormProps } from 'antd'
import { useAuthStore } from '~/stores/auth.store'
const { Title, Text } = Typography

type FieldType = {
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
  password?: string
  confirmPassword?: string
  address?: string
  remember?: string
  birthday?: any
}

// interface WardSelect {
//   Id?: string
//   Name?: string
//   Level?: string
// }
// interface DistrictSelect {
//   Id?: string
//   Name?: string
//   Wards?: WardSelect[]
// }

// interface CitySelect {
//   Id?: string
//   Name?: string
//   Districts?: DistrictSelect[]
// }

const RegisterForm: React.FC = () => {
  const navigate = useNavigate()
  const { notification } = App.useApp()
  // const [cities, setCities] = useState<CitySelect[]>([])
  // const [districts, setDistricts] = useState<DistrictSelect[]>([])
  // const [wards, setWards] = useState<WardSelect[]>([])
  const registerUser = useAuthStore((state) => state.registerUser)
  const [form] = Form.useForm()

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    console.log('Success:', values)
    const { password, confirmPassword, email, phone, firstName, lastName, address, birthday } = values

    try {
      registerUser(
        email,
        password,
        confirmPassword,
        email,
        phone,
        firstName,
        lastName,
        address,
        birthday.format('YYYY-MM-DD')
      )

      notification.success({ message: 'Đăng kí thành công' })
      navigate('/login')
    } catch (error) {
      console.log(error)
      notification.error({ message: 'Sorry! Something went wrong. App server error' })
    }
  }

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }
  // const handleCityChange = (cityId) => {
  //   const selectedCity = cities.find((city) => city.Id === cityId)
  //   if (selectedCity) {
  //     setDistricts(selectedCity.Districts)
  //     form.setFieldsValue({ 'address.district': undefined, 'address.ward': undefined })
  //     setWards([])
  //   }
  // }

  // const handleDistrictChange = (districtId) => {
  //   const selectedDistrict = districts.find((district) => district.Id === districtId)
  //   if (selectedDistrict) {
  //     setWards(selectedDistrict.Wards)
  //     form.setFieldsValue({ 'address.ward': undefined })
  //   }
  // }
  // useEffect(() => {
  //   fetch('https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json')
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setCities(data)
  //     })
  //     .catch((error) => {
  //       console.error('There was an error fetching the city data!', error)
  //     })
  // }, [])

  return (
    <div className='py-8 px-4 bg-[#FFFFFF]'>
      <Space direction='vertical' className='w-full'>
        <Title level={3} className='drop-shadow-lg text-[##44525A]'>
          Bạn chưa có tài khoản? Đăng ký ngay
        </Title>
        <Text className='text-[#6E7C85]'>
          Hãy tạo cho mình một tài khoản, bạn sẽ nhận được các ưu đãi bất ngờ mà chỉ thành viên mới có.
        </Text>

        <Form
          form={form}
          name='register_form'
          className='mt-5'
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete='off'
          initialValues={{ remember: true }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item<FieldType>
                name='firstName'
                rules={[{ required: true, message: 'Please input your full name!' }]}
              >
                <Input size='large' placeholder='Họ' />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item<FieldType>
                name='lastName'
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Input size='large' placeholder='Tên' />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item<FieldType> name='email' rules={[{ required: true, message: 'Please input your email!' }]}>
                <Input size='large' placeholder='Địa chỉ email' />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item<FieldType> name='phone' rules={[{ required: true, message: 'Please input your phone!' }]}>
                <Input size='large' placeholder='Điện thoại' />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item<FieldType>
                name='password'
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password size='large' placeholder='Mật khẩu' />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item<FieldType>
                name='confirmPassword'
                dependencies={['password']}
                hasFeedback
                rules={[
                  { required: true, message: 'Please confirm your password!' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve()
                      }
                      return Promise.reject(new Error('The two passwords do not match!'))
                    }
                  })
                ]}
              >
                <Input.Password size='large' placeholder='Nhập lại mật khẩu' />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item name='birthday' rules={[{ required: true, message: 'Vui lóng nhập ngày sinh' }]}>
            <DatePicker placeholder='Ngày sinh' size='large' className='w-full' />
          </Form.Item>
          <Form.Item>
            <Form.Item<FieldType> name='remember' valuePropName='checked' noStyle>
              <Checkbox>Tôi muốn nhận đề nghị qua email</Checkbox>
            </Form.Item>
            {/* <Link className='text-primary' to=''>
              Terms of Services
            </Link> */}
          </Form.Item>
          <Form.Item<FieldType> name='address' rules={[{ required: true, message: 'Please input your address!' }]}>
            <Input size='large' placeholder='Địa chỉ' />
          </Form.Item>

          <Form.Item>
            <Button size='large' htmlType='submit'>
              Đăng kí
            </Button>
          </Form.Item>
        </Form>
      </Space>
    </div>
  )
}

export default RegisterForm
