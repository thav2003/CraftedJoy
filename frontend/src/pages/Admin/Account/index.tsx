// @ts-nocheck
import api from '~/api'
import useFetch from '~/hooks/useFetch'
import { App, Button, Flex, Modal, Space, Table, Typography, Form, Checkbox, Col, DatePicker, Input, Row } from 'antd'
import dayjs from 'dayjs'
import { useAppStore } from '~/stores/app.store'
import { useAuthStore } from '~/stores/auth.store'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import customParseFormat from 'dayjs/plugin/customParseFormat'
const { Text, Title } = Typography
const dateFormat = 'YYYY-MM-DD'

dayjs.extend(customParseFormat)
const AccountPage: React.FC = () => {
  const accessToken = useAuthStore((state) => state.accessToken)
  const { notification } = App.useApp()
  const [open, setOpen] = useState(false)
  const [openUpdate, setOpenUpdate] = useState(false)
  const [updateRecord, setUpdateRecord] = useState()
  const refetchApp = useAppStore((state) => state.refetchApp)
  const registerUser = useAuthStore((state) => state.registerUser)
  const [form] = Form.useForm()
  const [formUpdate] = Form.useForm()
  const [response] = useFetch({
    fetchFunction: () =>
      api.apiUsersPageSizeGet(0, 1000000, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
  })
  const onFinishUpdate = async (values) => {
    console.log('Success:', values)
    const { password, confirmPassword, email, phone, firstName, lastName, address, birthday } = values

    const form = new FormData()

    // Thêm dữ liệu vào FormData
    form.append('username', updateRecord.email)
    form.append('firstName', firstName)
    form.append('lastName', lastName)
    form.append('birthday', birthday.format('YYYY-MM-DD'))
    form.append('address', address)
    form.append('phonenumber', phone)
    try {
      await axios.put(`https://catcake.onthewifi.com:201/api/Users`, form, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      // navigate('/login')
      refetchApp()
      notification.success({ message: 'Cập nhật thành công' })
    } catch (error) {
      console.log(error)
      if (error.response.data.status) {
        notification.success({
          message: 'Cập nhật thành công'
        })
      } else {
        notification.error({
          message: error.response.data ? error.response.data : 'Sorry! Something went wrong. App server error'
        })
      }
    }
  }

  const onFinish = async (values) => {
    console.log('Success:', values)
    const { password, confirmPassword, email, phone, firstName, lastName, address, birthday } = values

    try {
      await registerUser(
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

      // navigate('/login')
      refetchApp()
      notification.success({ message: 'Tạo thành công' })
    } catch (error) {
      console.log(error)
      if (error.response.data.status) {
        notification.success({
          message: 'Tạo thành công'
        })
      } else {
        notification.error({
          message: error.response.data ? error.response.data : 'Sorry! Something went wrong. App server error'
        })
      }
    }
  }

  const onFinishFailedUpdate = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }
  const handleDelete = async (item) => {
    try {
      await axios.delete(`https://catcake.onthewifi.com:201/api/Users/${item.id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      refetchApp
    } catch (err) {
      console.log(err)
      notification.error({ message: 'Server lỗi' })
    }
  }
  const columns = [
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber'
    },
    {
      title: 'First Name',
      dataIndex: 'firstname',
      key: 'firstname'
    },
    {
      title: 'Last Name',
      dataIndex: 'lastname',
      key: 'lastname'
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address'
    },
    {
      title: 'Ngày sinh',
      dataIndex: 'birthday',
      key: 'birthday'
    },
    {
      title: '',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button
            onClick={() => {
              setUpdateRecord(record)
              setOpenUpdate(true)
            }}
          >
            Xem
          </Button>
          <Button onClick={() => handleDelete(record)}>Xóa</Button>
        </Space>
      )
    }
  ]
  useEffect(() => {
    if (updateRecord) {
      console.log(updateRecord)
      formUpdate.setFieldsValue({
        email: updateRecord.email,
        firstName: updateRecord.firstname,
        phone: updateRecord.phoneNumber,
        lastName: updateRecord.lastname,
        address: updateRecord.address,
        birthday: dayjs(updateRecord.birthday, dateFormat)
      })
    }
  }, [updateRecord])
  return (
    <div>
      <div className='py-3 px-12 lg:px-36 bg-[#FFFFFF]'>
        <Flex gap={20}>
          <Link to='/admin/dashboard' className='cursor-pointer'>
            <Space>
              <Text strong>Dashboard</Text>
            </Space>
          </Link>
          <Link to='/admin/account' className='cursor-pointer'>
            <Space>
              <Text strong>Tài khoản</Text>
            </Space>
          </Link>
          {/* <Link to='/admin/order' className='cursor-pointer'>
            <Space>
              <Text strong>Hóa đơn</Text>
            </Space>
          </Link> */}
          <Link to='/admin/product' className='cursor-pointer'>
            <Space>
              <Text strong>Sản phẩm</Text>
            </Space>
          </Link>

          {/* <Dropdown menu={{ items }} placement='bottomRight' trigger={['click']}>
            <Text className='cursor-pointer' onClick={(e) => e.preventDefault()}>
              <Space>
                <Text strong>Bạn tặng Ai ?</Text>

                <DownOutlined />
              </Space>
            </Text>
          </Dropdown>
          <Dropdown menu={{ items }} placement='bottomRight' trigger={['click']}>
            <Text className='cursor-pointer' onClick={(e) => e.preventDefault()}>
              <Space>
                <Text strong>Tặng quà gì</Text>

                <DownOutlined />
              </Space>
            </Text>
          </Dropdown>
          <Dropdown menu={{ items }} placement='bottomRight' trigger={['click']}>
            <Text className='cursor-pointer' onClick={(e) => e.preventDefault()}>
              <Space>
                <Text strong>Nhân DỊP Gì ?</Text>

                <DownOutlined />
              </Space>
            </Text>
          </Dropdown> */}
        </Flex>
      </div>
      {/* <div className='py-5 px-10 md:py-10 md:px-20'> */}
      <div className='p-10 space-y-10'>
        <Button onClick={() => setOpen(true)}>Thêm tài khoản</Button>
        <Modal
          title='Tạo tài khoản'
          open={open}
          onOk={() => setOpen(false)}
          onCancel={() => setOpen(false)}
          style={{ top: 20 }}
          footer={null}
        >
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
                <Form.Item name='firstName' rules={[{ required: true, message: 'Please input your full name!' }]}>
                  <Input size='large' placeholder='Họ' />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name='lastName' rules={[{ required: true, message: 'Please input your username!' }]}>
                  <Input size='large' placeholder='Tên' />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name='email' rules={[{ required: true, message: 'Please input your email!' }]}>
                  <Input size='large' placeholder='Địa chỉ email' />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name='phone' rules={[{ required: true, message: 'Please input your phone!' }]}>
                  <Input size='large' placeholder='Điện thoại' />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name='password' rules={[{ required: true, message: 'Please input your password!' }]}>
                  <Input.Password size='large' placeholder='Mật khẩu' />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
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

            <Form.Item name='address' rules={[{ required: true, message: 'Please input your address!' }]}>
              <Input size='large' placeholder='Địa chỉ' />
            </Form.Item>

            <Form.Item>
              <Button size='large' htmlType='submit'>
                Đăng kí
              </Button>
            </Form.Item>
          </Form>
        </Modal>
        <Modal
          title='Cập nhật tài khoản'
          open={openUpdate}
          onOk={() => setOpenUpdate(false)}
          onCancel={() => setOpenUpdate(false)}
          style={{ top: 20 }}
          footer={null}
        >
          <Form
            form={formUpdate}
            name='register_form'
            className='mt-5'
            onFinish={onFinishUpdate}
            onFinishFailed={onFinishFailedUpdate}
            autoComplete='off'
            initialValues={{ remember: true }}
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name='firstName' rules={[{ required: true, message: 'Please input your full name!' }]}>
                  <Input size='large' placeholder='Họ' />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name='lastName' rules={[{ required: true, message: 'Please input your username!' }]}>
                  <Input size='large' placeholder='Tên' />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name='email' rules={[{ required: true, message: 'Please input your email!' }]}>
                  <Input size='large' disabled placeholder='Địa chỉ email' />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name='phone' rules={[{ required: true, message: 'Please input your phone!' }]}>
                  <Input size='large' placeholder='Điện thoại' />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item name='birthday' rules={[{ required: true, message: 'Vui lóng nhập ngày sinh' }]}>
              <DatePicker placeholder='Ngày sinh' size='large' className='w-full' />
            </Form.Item>

            <Form.Item name='address' rules={[{ required: true, message: 'Please input your address!' }]}>
              <Input size='large' placeholder='Địa chỉ' />
            </Form.Item>

            <Form.Item>
              <Button size='large' htmlType='submit'>
                Cập nhật
              </Button>
            </Form.Item>
          </Form>
        </Modal>
        <Table
          pagination={{
            position: ['bottomLeft'],
            pageSize: 10
          }}
          columns={columns}
          dataSource={response ? response : []}
        />
      </div>

      {/* </div> */}
    </div>
  )
}

export default AccountPage
