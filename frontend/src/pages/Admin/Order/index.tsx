// @ts-nocheck
import api from '~/api'
import useFetch from '~/hooks/useFetch'
import { Button, Flex, Space, Table, Tag, Typography } from 'antd'
import type { TableProps } from 'antd'
import { formatCurrencyVND } from '~/utils'
import { Link, useSearchParams } from 'react-router-dom'
import { useAppStore } from '~/stores/app.store'
import { useAuthStore } from '~/stores/auth.store'
const { Text, Title } = Typography
const OrderPage: React.FC = () => {
  const accessToken = useAuthStore((state) => state.accessToken)
  const [response] = useFetch({
    fetchFunction: () =>
      api.apiOrderGet({
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
  })
  const columns: TableProps<PaymentResponse>['columns'] = [
    {
      title: 'Mã đơn hàng',
      dataIndex: 'orderId',
      key: 'orderId'
    },
    {
      title: 'Mã vận chuyển',
      dataIndex: 'trackingNumber',
      key: 'trackingNumber'
    },
    {
      title: 'Tiền vận chuyển',
      dataIndex: 'shipPrice',
      key: 'shipPrice',
      render: (text) => formatCurrencyVND(text)
    },
    {
      title: 'Trạng thái thanh toán',
      dataIndex: 'paymentStatus',
      key: 'paymentStatus'
    },
    {
      title: 'Trạng thái đơn hàng',
      dataIndex: 'orderStatus',
      key: 'orderStatus'
    }

    // {
    //   title: 'Chi tiết',
    //   key: 'action',
    //   render: (_, record) => <Button>Xem</Button>
    // }
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
          <Link to='/admin/order' className='cursor-pointer'>
            <Space>
              <Text strong>Hóa đơn</Text>
            </Space>
          </Link>
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
      <div className='p-10'>
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

export default OrderPage
