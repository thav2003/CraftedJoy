// @ts-nocheck
import api from '~/api'
import useFetch from '~/hooks/useFetch'
import { App, Button, Flex, Modal, Space, Table, Typography } from 'antd'

import { useAppStore } from '~/stores/app.store'
import { useAuthStore } from '~/stores/auth.store'
import axios from 'axios'
import { useState } from 'react'
import { Link } from 'react-router-dom'
const { Text, Title } = Typography
const AccountPage: React.FC = () => {
  const accessToken = useAuthStore((state) => state.accessToken)
  const { notification } = App.useApp()
  const [open, setOpen] = useState(false)
  const refetchApp = useAppStore((state) => state.refetchApp)
  const [response] = useFetch({
    fetchFunction: () =>
      api.apiUsersPageSizeGet(0, 1000000, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
  })
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
      dataIndex: 'userEmail',
      key: 'userEmail'
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
          <Button onClick={() => console.log(record)}>Xem</Button>
          <Button onClick={() => handleDelete(record)}>Xóa</Button>
        </Space>
      )
    }
  ]
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
          title='Modal 1000px width'
          open={open}
          onOk={() => setOpen(false)}
          onCancel={() => setOpen(false)}
          style={{ top: 20 }}
        >
          <p>some contents...</p>
          <p>some contents...</p>
          <p>some contents...</p>
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
