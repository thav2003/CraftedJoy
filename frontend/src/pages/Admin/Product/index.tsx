import api from '~/api'
import useFetch from '~/hooks/useFetch'
import {
  App,
  Button,
  Flex,
  Modal,
  Space,
  Table,
  Typography,
  Image,
  Form,
  Input,
  Upload,
  Select,
  InputNumber
} from 'antd'

import { useAppStore } from '~/stores/app.store'
import { useAuthStore } from '~/stores/auth.store'
import axios from 'axios'
import { useState } from 'react'
import { Link } from 'react-router-dom'
const { Text, Title } = Typography
const AdminProductPage: React.FC = () => {
  const accessToken = useAuthStore((state) => state.accessToken)
  const { notification, message } = App.useApp()
  const [imageUrl, setImageUrl] = useState(null)
  const [openModal, setOpenModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [createForm] = Form.useForm()
  const refetchApp = useAppStore((state) => state.refetchApp)
  const [response] = useFetch({
    fetchFunction: () => api.apiProductGet()
  })
  const [responseType] = useFetch({ fetchFunction: () => axios.get(`https://catcake.onthewifi.com:201/api/Tag`) })
  const tagValuesList = responseType
    ? responseType.flatMap((tag) => tag.tagValues.map((tagValue) => tagValue.value))
    : []
  console.log(tagValuesList)
  const props = {
    name: 'file',
    accept: 'image/*',
    beforeUpload: (file) => {
      const isImage = file.type.startsWith('image/')
      if (!isImage) {
        message.error('You can only upload image files!')
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        message.error('Image must be smaller than 2MB!')
      }
      return false
    },
    onChange: (info) => {
      getBase64(info.file.originFileObj ? info.file.originFileObj : info.file, (url) => {
        console.log(url)
        setImageUrl(url)
      })
    }
  }
  const getBase64 = (file, callback) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => callback(reader.result)
    reader.onerror = (error) => message.error(`Error reading file: ${error}`)
  }
  const handleDelete = async (item) => {
    try {
      await axios.delete(`https://catcake.onthewifi.com:201/api/Product/DeleteProduct/${item.id}`, {
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
  const onFinish = async (values) => {
    console.log('Success:', values)
    try {
      setLoading(true)
      const payload = {
        productName: values.productName,
        quantitySold: 0,
        description: values.description,
        productVariants: [
          {
            // sizeName: 'string',
            // brandName: 'string',
            // colorName: 'string',
            // thumbnail: 'string',
            price: values.price,
            quantity: values.quantity
          }
        ],
        mediaUrls: [imageUrl],
        tagValues: values.tagValues
      }

      await axios.post(`https://catcake.onthewifi.com:201/api/Product`, payload, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      refetchApp()
      createForm.resetFields()
      // alert('Thêm thành công');
    } catch {
      // alert('Thêm thất bại');
      // notification.error({ message: 'Sorry! Something went wrong. App server error' });
    } finally {
      setLoading(false)
    }
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }
  const columns = [
    {
      title: 'Hình ảnh',
      dataIndex: 'productVariants',
      key: 'image',
      render: (_, record) => (
        <Image height={270} className='flex-grow bg-cover' src={record.productVariants![0].thumbnail!} />
      )
    },
    {
      title: 'Sản phẩm',
      dataIndex: 'productName',
      key: 'productName'
    },
    {
      title: 'Số lượng bán ra',
      dataIndex: 'quantitySold',
      key: 'quantitySold'
    },
    {
      title: 'Tồn kho',
      dataIndex: 'productVariants',
      key: 'quantity',
      render: (_, record) => record.productVariants[0].quantity
    },
    {
      title: 'Giá tiền',
      dataIndex: 'productVariants',
      key: 'price',
      render: (_, record) => record.productVariants[0].price
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
        <Button onClick={() => setOpenModal(true)}>Thêm sản phẩm</Button>
        <Modal
          title='Modal 1000px width'
          open={openModal}
          onOk={() => setOpenModal(false)}
          onCancel={() => setOpenModal(false)}
          style={{ top: 20 }}
          footer={null}
        >
          <Form
            form={createForm}
            layout='vertical'
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete='off'
          >
            <Form.Item
              label='Tên sản phẩm'
              name='productName'
              rules={[{ required: true, message: 'Nhập tên sản phẩm!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label='Image'
              name='imageUrl'
              rules={[{ required: true, message: 'Please input your imageUrl!' }]}
            >
              <Upload {...props}>
                <Button>Click to Upload</Button>
              </Upload>
            </Form.Item>
            <Form.Item label='Giá tiền' name='price' rules={[{ required: true, message: 'Please input your price!' }]}>
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item
              label='Số lượng'
              name='quantity'
              rules={[{ required: true, message: 'Please input your quantity!' }]}
            >
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item label='Tag' name='tagValues' rules={[{ required: true, message: 'Please input your typeID!' }]}>
              <Select mode='tags' placeholder='Type' allowClear>
                {tagValuesList?.map((cl) => (
                  <Select.Option key={cl} value={cl}>
                    {cl}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label='Mô tả' name='description' rules={[{ required: true, message: 'Nhập mô tả' }]}>
              <Input.TextArea />
            </Form.Item>

            <Form.Item>
              <Button loading={loading} htmlType='submit'>
                Submit
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

export default AdminProductPage
