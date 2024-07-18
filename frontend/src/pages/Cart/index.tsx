import { Breadcrumb, Button, Flex, Input, Form, Table, Typography, Row, Col, Radio, message } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import api from '~/api'
import useFetch from '~/hooks/useFetch'
import { useAuthStore } from '~/stores/auth.store'
import { formatCurrencyVND } from '~/utils'

const { Text } = Typography

const CartPage: React.FC = () => {
  const navigate = useNavigate()
  const accessToken = useAuthStore((state) => state.accessToken)
  const [responseCart] = useFetch({
    fetchFunction: () =>
      api.apiCartGet({
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
  })
  console.log(responseCart)
  const handlePayment = async (values) => {
    try {
      const res = await axios.get('https://api.ipify.org?format=json')
      await axios.post(
        'https://catcake.onthewifi.com:201/api/Order',
        {
          receiverAddress: values.address,
          listCartItem: responseCart?.value?.map((cart) => ({
            type: cart.quantity,
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
      key: 'quantity'
    },
    {
      title: 'Giá tiền',
      dataIndex: 'price',
      key: 'price',
      render: (price) => formatCurrencyVND(price)
    }
  ]
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
      <Form layout='vertical' onFinish={handlePayment} onFinishFailed={onFinishFailed}>
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
            dataSource={responseCart ? responseCart.value : []}
            pagination={false}
            summary={(pageData) => {
              let total = 0
              console.log(pageData)
              pageData.forEach(({ price, quantity }) => {
                total += price * quantity
              })

              return (
                <>
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
                <Radio.Group>
                  <Flex vertical gap={10}>
                    <Radio value={1}>Ship 0 đồng</Radio>
                    <Radio value={0}> Ship COD </Radio>
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
                    <Radio value={0}> COD </Radio>
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
