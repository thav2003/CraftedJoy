// @ts-nocheck
import { Breadcrumb, Button, Flex, Input, Form, Table, Typography, Row, Col, Radio, message, App, Space } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '~/api'
import useFetch from '~/hooks/useFetch'
import { useAppStore } from '~/stores/app.store'
import { useAuthStore } from '~/stores/auth.store'
import { formatCurrencyVND } from '~/utils'

const { Text } = Typography

const CartPage: React.FC = () => {
  const { notification } = App.useApp()
  const [form] = Form.useForm()
  const refetchApp = useAppStore((state) => state.refetchApp)
  const navigate = useNavigate()
  const accessToken = useAuthStore((state) => state.accessToken)
  const [services, setServices] = useState([
    {
      mA_DV_CHINH: 'PHS',
      teN_DICHVU: 'Nội tỉnh tiết kiệm',
      giA_CUOC: 16500,
      thoI_GIAN: '48 giờ'
    },
    {
      mA_DV_CHINH: 'PTN',
      teN_DICHVU: 'Nội tỉnh nhanh',
      giA_CUOC: 22000,
      thoI_GIAN: '12 giờ'
    },
    {
      mA_DV_CHINH: 'VCN',
      teN_DICHVU: 'Chuyển phát nhanh',
      giA_CUOC: 11000,
      thoI_GIAN: '36 giờ'
    },
    {
      mA_DV_CHINH: 'VHT',
      teN_DICHVU: 'Hỏa tốc, hẹn giờ',
      giA_CUOC: 38000,
      thoI_GIAN: '12 giờ'
    }
  ])
  const [responseCart] = useFetch({
    fetchFunction: () =>
      api.apiCartGet({
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
  })
  const address = Form.useWatch('address', form)
  const orderService = Form.useWatch('orderService', form)

  const handleUpdateItem = async (item, quantity) => {
    try {
      await api.apiCartUpdatePut(
        [
          {
            type: 1,
            id: item.id,
            quantity: quantity
          }
        ],
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      )
      refetchApp()
      // notification.success({ message: 'Xóa thành công' })
    } catch (error) {
      // notification.error({ message: 'Vui lòng đăng nhập' })
      console.log(error)
    }
  }
  const handleRemoveItem = async (item) => {
    try {
      await api.apiCartListItemDelete(
        {
          listProductVariantId: [item.id]
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      )
      refetchApp()
      // notification.success({ message: 'Xóa thành công' })
    } catch (error) {
      // notification.error({ message: 'Vui lòng đăng nhập' })
      console.log(error)
    }
  }
  const handlePayment = async (values) => {
    try {
      const res = await axios.get('https://api.ipify.org?format=json')
      const resPay = await axios.post(
        'https://catcake.onthewifi.com:201/api/Order',
        {
          receiverAddress: values.address,
          listCartItem: responseCart?.value?.map((cart) => ({
            type: 1,
            id: cart.id,
            quantity: cart.quantity
          })),
          orderService: values.orderService,
          orderNote: values.orderNote,
          receiverName: values.receiverName,
          receiverPhone: values.receiverPhone,
          userIP: res.data.ip,
          paymentType: values.paymentType
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      )
      if (resPay.data.paymentURL) {
        notification.success({ message: 'Vui lòng thanh toán' })
        window.open(resPay.data.paymentURL, '_blank')
      } else {
        notification.success({ message: 'Cảm ơn quý khách' })
      }

      navigate('/')
    } catch (err) {
      message.error('Có lỗi xảy ra')
    }
  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)

    message.error(errorInfo.errorFields[0].errors[0])
  }
  const columns = [
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (_, item) => (
        <Space>
          <div>
            <Button onClick={() => handleUpdateItem(item, item.quantity - 1)}>-</Button>
          </div>
          <div>{item.quantity}</div>
          <div>
            <Button onClick={() => handleUpdateItem(item, item.quantity + 1)}>+</Button>
          </div>
        </Space>
      )
    },
    {
      title: 'Giá tiền',
      dataIndex: 'price',
      key: 'price',
      render: (price) => formatCurrencyVND(price)
    },
    {
      title: '',
      key: 'action',
      render: (_, item) => <Button onClick={() => handleRemoveItem(item)}>Xóa</Button>
    }
  ]
  useEffect(() => {
    const fetchService = async () => {
      if (!address) return
      try {
        const res = await axios.post(
          'https://catcake.onthewifi.com:201/api/Order/GetPriceShip',
          {
            receiverAddress: address,
            listCartItem: responseCart?.value?.map((cart) => ({
              type: 1,
              id: cart.id,
              quantity: cart.quantity
            }))
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }
        )
        setServices(res.data.shipService)
      } catch (err) {
        console.log(err)
      }
    }
    fetchService()
  }, [address])
  if (!responseCart || (responseCart && responseCart.value && responseCart.value.length === 0)) {
    return (
      <div>
        <div className='py-3 px-12 lg:px-36 bg-[#FFFFFF]'>
          <Breadcrumb
            items={[
              {
                title: <Link to='/'>Trang chủ</Link>
              },

              {
                title: 'Giỏ hàng'
              }
            ]}
          />
        </div>
        <Flex justify='center' align='center' vertical className='bg-[#FFFFFF] !h-[70vh]'>
          <Typography.Title level={4}>Giỏ quà chưa có sản phẩm</Typography.Title>
          <Button onClick={() => navigate('/')}>Quay lại mua hàng</Button>
        </Flex>
      </div>
    )
  }

  return (
    <div>
      <Form layout='vertical' form={form} onFinish={handlePayment} onFinishFailed={onFinishFailed}>
        <div className='py-3 px-12 lg:px-36 bg-[#FFFFFF]'>
          <Breadcrumb
            items={[
              {
                title: <Link to='/'>Trang chủ</Link>
              },

              {
                title: 'Giỏ hàng'
              }
            ]}
          />
        </div>
        <div className='py-10 px-12 lg:px-36 bg-[#FFFFFF]'>
          <Table
            columns={columns}
            dataSource={responseCart ? responseCart.value.slice().sort((a, b) => a.name.localeCompare(b.name)) : []}
            pagination={false}
            summary={(pageData) => {
              let total = 0
              let shipPrice = 0
              pageData.forEach(({ price, quantity }) => {
                total += price * quantity
              })
              if (orderService) shipPrice = services.find((e) => e.mA_DV_CHINH === orderService).giA_CUOC
              total += shipPrice
              return (
                <>
                  <Table.Summary.Row>
                    <Table.Summary.Cell index={0} colSpan={2}>
                      Tiền ship
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={2}>
                      <Text>{formatCurrencyVND(shipPrice)}</Text>
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                  <Table.Summary.Row>
                    <Table.Summary.Cell index={0} colSpan={2}>
                      Tổng
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={2}>
                      <Text type='danger'>{formatCurrencyVND(total)}</Text>
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                </>
              )
            }}
          />
          <Row gutter={[16, 16]}>
            <Col span={5}>
              <Form.Item label='Note' className='mt-5' name={'orderNote'}>
                <TextArea rows={4} />
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item
                label='Loại dịch vụ'
                className='mt-5'
                name={'orderService'}
                rules={[{ required: true, message: 'Chọn dịch vụ' }]}
              >
                <Radio.Group disabled={address ? false : true}>
                  <Flex vertical gap={10}>
                    {services && services.map((e) => <Radio value={e.mA_DV_CHINH}>{e.teN_DICHVU}</Radio>)}
                  </Flex>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item
                label='Phương thức thanh toán'
                className='mt-5'
                name={'paymentType'}
                rules={[{ required: true, message: 'Chọn phương hức thanh toán' }]}
              >
                <Radio.Group>
                  <Flex vertical gap={10}>
                    <Radio value={1}>VNPAY</Radio>
                    <Radio value={2}> COD </Radio>
                  </Flex>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={4}>
              <Form.Item
                label='Người nhận'
                className='mt-5'
                name={'receiverName'}
                rules={[{ required: true, message: 'Điền người nhận' }]}
              >
                <Input size='large' />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item
                label='Số điện thoại người nhận'
                className='mt-5'
                name={'receiverPhone'}
                rules={[{ required: true, message: 'Điền SĐT người nhận' }]}
              >
                <Input size='large' />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label='Địa chỉ'
                className='mt-5'
                name={'address'}
                rules={[{ required: true, message: 'Điền địa chỉ nhận hàng' }]}
              >
                <Input size='large' />
              </Form.Item>
            </Col>
          </Row>

          <Button className='mt-5' htmlType='submit'>
            Thanh toán
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default CartPage
