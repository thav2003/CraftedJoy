import { MailOutlined, AppstoreOutlined, SettingOutlined, UpOutlined, ArrowRightOutlined } from '@ant-design/icons'
import { Breadcrumb, Col, ConfigProvider, Flex, List, Menu, Row, Space, Typography } from 'antd'
import { Link, useSearchParams } from 'react-router-dom'
import api from '~/api'
import CardItem from '~/components/CardItem'
import useFetch from '~/hooks/useFetch'
const { Text, Title } = Typography
const SearchProductPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [response] = useFetch(
    {
      fetchFunction: () => api.apiProductGetProductsbyTagValuetagvalueGet(searchParams.get('query')!)
    },
    searchParams.get('query')
  )

  console.log(response)

  const data1 = [
    {
      title: 'Thiệp vuông gấp You Are Beautiful'
    },
    {
      title: 'Bộ đôi cốc sứ lá cây Tropical kèm hộp quà tặng'
    },
    {
      title: 'Hoa nến thơm Hũ thủy tinh Orange & Cinnamon'
    },
    {
      title: 'Bộ chăm sóc da mặt cây lăn đá thạch anh chống lão hóa'
    },
    {
      title: 'Thiệp vuông gấp You Are Beautiful'
    },
    {
      title: 'Bộ đôi cốc sứ lá cây Tropical kèm hộp quà tặng'
    },
    {
      title: 'Hoa nến thơm Hũ thủy tinh Orange & Cinnamon'
    },
    {
      title: 'Bộ chăm sóc da mặt cây lăn đá thạch anh chống lão hóa'
    }
  ]
  return (
    <div>
      <div className='py-3 px-12 lg:px-36 bg-[#FFFFFF]'>
        <Breadcrumb
          items={[
            {
              title: <Link to='/'>Trang chủ</Link>
            },

            {
              title: searchParams.get('query')
            }
          ]}
        />
      </div>
      <div className='px-12 lg:px-36 bg-[#FFFFFF]'>
        <div className='text-center'>
          <Title level={4}>{searchParams.get('query')}</Title>
        </div>
        <Row className='bg-[#FFFFFF]' gutter={[16, 16]}>
          <Col span={16}>
            <Flex vertical gap={40}>
              <Space direction='vertical' className='w-full'>
                {/* <Text>Sắp xếp theo</Text> */}
                <List
                  pagination={{
                    pageSize: 6,
                    position: 'bottom',
                    align: 'center'
                  }}
                  grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 2,
                    md: 3,
                    lg: 3,
                    xl: 3,
                    xxl: 3
                  }}
                  dataSource={response ? response : []}
                  renderItem={(item, index) => (
                    <List.Item>
                      <CardItem item={item} />
                    </List.Item>
                  )}
                />
              </Space>
            </Flex>
          </Col>
          <Col span={8}>
            <Space direction='vertical' className='w-full'>
              <div>
                <Text strong>Danh mục</Text>
                <ConfigProvider
                  theme={{
                    components: {
                      Menu: {
                        itemHoverBg: 'transparent',
                        itemSelectedBg: 'transpanrent',
                        itemSelectedColor: 'transpanrent',
                        itemActiveBg: 'transparent'
                      }
                    }
                  }}
                >
                  <Menu
                    className='w-full'
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode='inline'
                    items={[
                      {
                        key: 'sub1',
                        label: 'Navigation One',
                        icon: <UpOutlined />
                      },
                      {
                        type: 'divider'
                      },
                      {
                        key: 'sub2',
                        label: 'Navigation Two',
                        icon: <UpOutlined />
                      },
                      {
                        type: 'divider'
                      },
                      {
                        key: 'sub4',
                        label: 'Navigation Three',
                        icon: <UpOutlined />
                      }
                    ]}
                  />
                </ConfigProvider>
              </div>
              <div>
                <Text strong>Chọn quà nhanh</Text>
                <ConfigProvider
                  theme={{
                    components: {
                      Menu: {
                        itemHoverBg: 'transparent',
                        itemSelectedBg: 'transpanrent',
                        itemSelectedColor: 'transpanrent',
                        itemActiveBg: 'transparent'
                      }
                    }
                  }}
                >
                  <Menu
                    className='w-full'
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode='inline'
                    items={[
                      {
                        key: 'sub1',
                        label: (
                          <Space>
                            <Text className='text-[#CE1F40]'>0 đ</Text>
                            <ArrowRightOutlined />
                            <Text className='text-[#CE1F40]'>300.000đ</Text>
                          </Space>
                        ),
                        icon: <UpOutlined />
                      },
                      {
                        type: 'divider'
                      },
                      {
                        key: 'sub2',
                        label: (
                          <Space>
                            <Text className='text-[#CE1F40]'>0 đ</Text>
                            <ArrowRightOutlined />
                            <Text className='text-[#CE1F40]'>300.000đ</Text>
                          </Space>
                        ),
                        icon: <UpOutlined />
                      },
                      {
                        type: 'divider'
                      },
                      {
                        key: 'sub4',
                        label: (
                          <Space>
                            <Text className='text-[#CE1F40]'>0 đ</Text>
                            <ArrowRightOutlined />
                            <Text className='text-[#CE1F40]'>300.000đ</Text>
                          </Space>
                        ),
                        icon: <UpOutlined />
                      }
                    ]}
                  />
                </ConfigProvider>
              </div>
            </Space>
          </Col>
        </Row>
      </div>
      <div>1</div>
    </div>
  )
}

export default SearchProductPage
