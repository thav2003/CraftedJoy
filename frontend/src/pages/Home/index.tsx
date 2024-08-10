// @ts-nocheck
import { Badge, Button, Card, Dropdown, Flex, Image, List, Menu, Space, Typography } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import CardItem from '~/components/CardItem'
import useFetch from '~/hooks/useFetch'
import api from '~/api'
import useFetchAll from '~/hooks/useFetchAll'
import { useEffect, useState } from 'react'
import { ProductDTO } from '~/api/v1'
import { Link } from 'react-router-dom'

const { Text, Title } = Typography

const items: MenuProps['items'] = [
  {
    label: (
      <a target='_blank' rel='noopener noreferrer' href='https://www.antgroup.com'>
        1st menu item
      </a>
    ),
    key: '0'
  },
  {
    label: (
      <a target='_blank' rel='noopener noreferrer' href='https://www.aliyun.com'>
        2nd menu item
      </a>
    ),
    key: '1'
  },
  {
    type: 'divider'
  },
  {
    label: '3rd menu item（disabled）',
    key: '3',
    disabled: true
  }
]

const HomePage: React.FC = () => {
  const [responseTag, loadingTag, errorTag] = useFetch({ fetchFunction: () => api.apiTagGet() })
  const [responseProducts] = useFetch({ fetchFunction: () => api.apiProductGet() })

  const [listProduct, setListProduct] = useState<Record<string, ProductDTO[]>>()
  useEffect(() => {
    const fetchData = async () => {
      if (responseTag) {
        // Sử dụng mảng promise để lấy dữ liệu cho từng tag
        await Promise.all(
          responseTag.map((tag) =>
            tag.tagValues?.map(async (tagValue) => {
              try {
                const res = await api.apiProductGetProductsbyTagValuetagvalueGet(tagValue.value!)

                // Set dữ liệu vào state data ngay khi lấy được
                setListProduct((prevData) => ({
                  ...prevData,
                  [tagValue.value!]: res.data
                }))
              } catch (error) {
                // Xử lý lỗi nếu cần
                console.error(`Error fetching products for tag ${tagValue.value}:`, error)
              }
            })
          )
        )
      }
    }

    fetchData()
  }, [responseTag])
  console.log(listProduct)
  if (loadingTag) return <div>Loading...</div>
  if (errorTag) return <div>Error loading data</div>

  return (
    <div>
      <div className='py-3 px-12 lg:px-36 bg-[#FFFFFF]'>
        <Flex gap={20}>
          <Text strong>Trang chủ</Text>
          {/* <Link to='/product/box' className='cursor-pointer'>
            <Space>
              <Text strong>CRAFTED gifts</Text>

              <DownOutlined style={{ color: 'black' }} />
            </Space>
          </Link> */}
          {responseTag &&
            responseTag.map((t) => (
              <Dropdown
                menu={{
                  items: t.tagValues.map((i) => ({
                    label: <Link to={`search-product?query=${i.value}`}>{i.value}</Link>,
                    key: i.id
                  }))
                }}
                placement='bottomRight'
                trigger={['click']}
              >
                <Text className='cursor-pointer' onClick={(e) => e.preventDefault()}>
                  <Space>
                    <Text strong>{t.tagName}</Text>

                    <DownOutlined />
                  </Space>
                </Text>
              </Dropdown>
            ))}
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
      <div className='bg-home relative overflow-hidden rounded-lg bg-cover bg-no-repeat p-12 text-center h-[400px]'>
        <div
          className='absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed'
          // style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
        ></div>
      </div>

      {listProduct &&
        Object.keys(listProduct).map((key) => (
          <div className='py-10 px-12 lg:px-36 bg-[#FFFFFF]'>
            <Space direction='vertical' className='w-full ' size={'large'}>
              <div className='text-center py-5 bg-primary'>
                <Text strong>{`${key}`}</Text>
              </div>
              <div>
                <List
                  grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 2,
                    md: 4,
                    lg: 4,
                    xl: 4,
                    xxl: 4
                  }}
                  dataSource={listProduct[key]}
                  renderItem={(item) => (
                    <List.Item>
                      <CardItem item={item} />
                    </List.Item>
                  )}
                />
              </div>
            </Space>
          </div>
        ))}
      <div className='py-10 px-12 lg:px-36 bg-[#FFFFFF]'>
        <Space direction='vertical' className='w-full ' size={'large'}>
          <div className='text-center py-5 bg-primary'>
            <Text strong>{`Tổng hợp`}</Text>
          </div>
          <div>
            <List
              grid={{
                gutter: 16,
                xs: 1,
                sm: 2,
                md: 4,
                lg: 4,
                xl: 4,
                xxl: 4
              }}
              dataSource={responseProducts ? responseProducts : []}
              renderItem={(item) => (
                <List.Item>
                  <CardItem item={item} />
                </List.Item>
              )}
            />
          </div>
        </Space>
      </div>
      {/* <div className='py-10 px-12 lg:px-36 bg-[#FFFFFF]'>
        <Space direction='vertical' className='w-full ' size={'large'}>
          <div className='text-center py-5 bg-primary'>
            <Text strong>Quà tặng 8/3</Text>
          </div>
          <div>
            <List
              grid={{
                gutter: 16,
                xs: 1,
                sm: 2,
                md: 4,
                lg: 4,
                xl: 4,
                xxl: 4
              }}
              dataSource={data}
              renderItem={(item, index) => (
                <List.Item>
                  <CardItem item={item} />
                </List.Item>
              )}
            />
          </div>
        </Space>
      </div>
      <div className='py-10 px-12 lg:px-36 bg-[#FFFFFF]'>
        <Space direction='vertical' className='w-full ' size={'large'}>
          <div className='text-center py-5 bg-primary'>
            <Text strong>Quà tặng bạn gái</Text>
          </div>
          <div>
            <List
              grid={{
                gutter: 16,
                xs: 1,
                sm: 2,
                md: 4,
                lg: 4,
                xl: 4,
                xxl: 4
              }}
              dataSource={data1}
              renderItem={(item, index) => (
                <List.Item>
                  <CardItem item={item} />
                </List.Item>
              )}
            />
          </div>
        </Space>
      </div>
      <div className='py-10 px-12 lg:px-36 bg-[#FFFFFF]'>
        <Space direction='vertical' className='w-full ' size={'large'}>
          <div className='text-center py-5 bg-primary'>
            <Text strong>Quà tặng mới về</Text>
          </div>
          <div>
            <List
              grid={{
                gutter: 16,
                xs: 1,
                sm: 2,
                md: 4,
                lg: 4,
                xl: 4,
                xxl: 4
              }}
              dataSource={data1}
              renderItem={(item, index) => (
                <List.Item>
                  <CardItem item={item} />
                </List.Item>
              )}
            />
          </div>
        </Space>
      </div>
      <div className='py-10 px-12 lg:px-36 bg-[#FFFFFF]'>
        <Space direction='vertical' className='w-full ' size={'large'}>
          <div className='text-center py-5 bg-primary'>
            <Text strong>Quà tặng LuvGift</Text>
          </div>
          <div>
            <List
              grid={{
                gutter: 16,
                xs: 1,
                sm: 2,
                md: 4,
                lg: 4,
                xl: 4,
                xxl: 4
              }}
              dataSource={data}
              renderItem={(item, index) => (
                <List.Item>
                  <CardItem item={item} />
                </List.Item>
              )}
            />
          </div>
        </Space>
      </div>
      <div className='py-10 px-12 lg:px-36 bg-[#FFFFFF]'>
        <Space direction='vertical' className='w-full ' size={'large'}>
          <div className='text-center py-5 bg-primary'>
            <Text strong>Quà tặng đặt nhiều nhất trong tháng</Text>
          </div>
          <div>
            <List
              grid={{
                gutter: 16,
                xs: 1,
                sm: 2,
                md: 4,
                lg: 4,
                xl: 4,
                xxl: 4
              }}
              dataSource={data}
              renderItem={(item, index) => (
                <List.Item>
                  <CardItem item={item} />
                </List.Item>
              )}
            />
          </div>
        </Space>
      </div>
      <div className='py-10 px-12 lg:px-36 bg-[#FFFFFF]'>
        <Space direction='vertical' className='w-full ' size={'large'}>
          <div className='text-center py-5 bg-primary'>
            <Text strong>Đèn ngủ-đèn trang trí</Text>
          </div>
          <div>
            <List
              grid={{
                gutter: 16,
                xs: 1,
                sm: 2,
                md: 4,
                lg: 4,
                xl: 4,
                xxl: 4
              }}
              dataSource={data}
              renderItem={(item, index) => (
                <List.Item>
                  <CardItem item={item} />
                </List.Item>
              )}
            />
          </div>
        </Space>
      </div>
      <div className='py-10 px-12 lg:px-36 bg-[#FFFFFF]'>
        <Space direction='vertical' className='w-full ' size={'large'}>
          <div className='text-center py-5 bg-primary'>
            <Text strong>Bút quà tặng</Text>
          </div>
          <div>
            <List
              grid={{
                gutter: 16,
                xs: 1,
                sm: 2,
                md: 4,
                lg: 4,
                xl: 4,
                xxl: 4
              }}
              dataSource={data1}
              renderItem={(item, index) => (
                <List.Item>
                  <Badge.Ribbon text='-10%' color='volcano'>
                    <CardItem item={item} />
                  </Badge.Ribbon>
                </List.Item>
              )}
            />
          </div>
        </Space>
      </div>
      <div className='py-10 px-12 lg:px-36 bg-[#FFFFFF]'>
        <Space direction='vertical' className='w-full ' size={'large'}>
          <div className='text-center py-5 bg-primary'>
            <Text strong>Quà Tặng Sinh Nhật Ý Nghĩa</Text>
          </div>
          <div>
            <List
              grid={{
                gutter: 16,
                xs: 1,
                sm: 2,
                md: 4,
                lg: 4,
                xl: 4,
                xxl: 4
              }}
              dataSource={data1}
              renderItem={(item, index) => (
                <List.Item>
                  <CardItem item={item} />
                </List.Item>
              )}
            />
          </div>
        </Space>
      </div>
      <div className='py-10 px-12 lg:px-36 bg-[#FFFFFF]'>
        <Space direction='vertical' className='w-full ' size={'large'}>
          <div className='text-center py-5 bg-primary'>
            <Text strong>Đuổi Đen Đón Đỏ &gt;&gt;&gt;Rước Ngay Mèo Thần Tài</Text>
          </div>
          <div>
            <List
              grid={{
                gutter: 16,
                xs: 1,
                sm: 2,
                md: 4,
                lg: 4,
                xl: 4,
                xxl: 4
              }}
              dataSource={data1}
              renderItem={(item, index) => (
                <List.Item>
                  <CardItem item={item} />
                </List.Item>
              )}
            />
          </div>
        </Space>
      </div>
      <div className='px-12 lg:px-36 bg-[#FFFFFF] '>
        <div className="bg-[url('/stage.png')] bg-no-repeat bg-cover bg-center  h-[400px]">
          <Space direction='vertical' className='w-full ' size={'large'}>
            <div className='text-center'>
              <Title level={2}>Tại CraftedJoy Có Gì Đặc Biệt ?</Title>
            </div>
            <Flex align='center' justify='space-between' className='w-full' gap={10}>
              <Flex align='center' vertical>
                <img src='/goiqua.png' />
              </Flex>
              <Flex align='center' vertical>
                <img src='/thiep.png' />
              </Flex>
              <Flex align='center' vertical>
                <img src='/chuyenqua.png' />
              </Flex>
              <Flex align='center' vertical>
                <img src='/tuvan.png' />
              </Flex>
            </Flex>
          </Space>
        </div>
      </div> */}
    </div>
  )
}

export default HomePage
