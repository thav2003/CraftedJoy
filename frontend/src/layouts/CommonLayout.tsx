// @ts-nocheck
import React, { useEffect, useState } from 'react'
import {
  Avatar,
  Badge,
  Button,
  Col,
  ConfigProvider,
  Divider,
  Dropdown,
  Flex,
  Input,
  Layout,
  MenuProps,
  Row,
  Space,
  Typography
} from 'antd'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { LogoutOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons'
import { useAuthStore } from '~/stores/auth.store'

import api from '~/api'
const { Header, Content, Footer } = Layout
const { Text } = Typography
type CommonLayoutTypes = {
  children?: React.ReactNode
}

const CommonLayout: React.FC<CommonLayoutTypes> = ({ children }) => {
  const navigate = useNavigate()
  const authStatus = useAuthStore((state) => state.status)
  const accessToken = useAuthStore((state) => state.accessToken)
  const refreshToken = useAuthStore((state) => state.refreshToken)

  const refreshUser = useAuthStore((state) => state.refreshUser)
  const logoutUser = useAuthStore((state) => state.logoutUser)
  // const location = useLocation()
  const [responseCart, setResponseCart] = useState()
  // const [responseCart] = useFetch(
  //   {
  //     fetchFunction: () =>
  //       api.apiCartGet({
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`
  //         }
  //       })
  //   },
  //   location.pathname
  // )
  const items: MenuProps['items'] = [
    {
      label: 'Đăng xuất',
      key: '4',
      icon: <LogoutOutlined />
    }
  ]
  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e)
    if (e.key === '4') {
      logoutUser()
      navigate('/login')
    }
  }
  useEffect(() => {
    // Hàm để gọi API
    const fetchData = async () => {
      if (!accessToken) {
        // Nếu không có accessToken, không thực hiện gọi API
        return
      }
      try {
        const response = await api.apiCartGet({
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })

        setResponseCart(response.data)
      } catch (error) {
        /* empty */
        setResponseCart([])
      }
    }

    // Gọi API ngay lập tức khi component mount
    fetchData()

    // Đặt interval để gọi API mỗi 5 giây
    const intervalId = setInterval(() => {
      fetchData()
    }, 5000)

    // Cleanup function để clear interval khi component unmount
    return () => clearInterval(intervalId)
  }, [accessToken])
  useEffect(() => {
    // Hàm để gọi API
    const fetchData = async () => {
      if (!refreshToken) {
        // Nếu không có accessToken, không thực hiện gọi API
        return
      }
      try {
        const res = await api.apiAuthenRefreshTokenPost({
          refreshToken: refreshToken
        })
        refreshUser(res.data)
      } catch (error) {
        /* empty */
      }
    }

    // Gọi API ngay lập tức khi component mount
    fetchData()

    // Đặt interval để gọi API mỗi 5 giây
    const intervalId = setInterval(() => {
      fetchData()
    }, 60000)

    // Cleanup function để clear interval khi component unmount
    return () => clearInterval(intervalId)
  }, [])
  return (
    <ConfigProvider
      theme={{
        components: {
          Layout: {
            headerBg: '#F27280',
            headerHeight: 116,
            footerBg: '#FECEDA'
          }
        }
      }}
    >
      <Layout className='h-full min-h-screen'>
        <Header
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 1,
            width: '100%'
            // display: 'flex',
            // alignItems: 'center',
            // justifyContent: 'center'
          }}
        >
          <Flex align='center' justify='space-evenly'>
            <Space>
              <Link to='/'>
                <img src='/Asset31.png' />
              </Link>
              <Link to='/'>
                <img src='/Asset41.png' />
              </Link>
            </Space>

            {authStatus === 'unauthorized' && (
              <Flex align='center' justify='flex-end' gap={15}>
                <Button
                  className='h-[48px] !text-[#42464D]'
                  onClick={() => {
                    navigate('/register')
                  }}
                >
                  Đăng kí
                </Button>
                <Button
                  onClick={() => {
                    navigate('/login')
                  }}
                  type='primary'
                  className='h-[48px]'
                >
                  Đăng nhập
                </Button>
              </Flex>
            )}
            {authStatus === 'authorized' && (
              <Flex align='center' gap={10}>
                {/* <Flex align='center' gap={5}>
                  <Input.Search onSearch={(text) => text && navigate(`/search-product?query=${text}`)} />
                </Flex> */}
                <Link to='/cart'>
                  <Flex align='center' gap={10}>
                    <Badge
                      count={!responseCart ? 0 : responseCart && responseCart.value ? responseCart.value.length : 0}
                    >
                      <ShoppingCartOutlined style={{ fontSize: 32 }} />
                    </Badge>

                    <Text>Giỏ hàng</Text>
                  </Flex>
                </Link>
                <Flex align='center' gap={10}>
                  <div>
                    <Dropdown menu={{ items, onClick }} trigger={['click']}>
                      <a onClick={(e) => e.preventDefault()}>
                        <Space>
                          <Avatar size={48} icon={<UserOutlined />} />
                          <Text strong>Tài khoản</Text>
                        </Space>
                      </a>
                    </Dropdown>
                  </div>
                </Flex>
              </Flex>
            )}
          </Flex>
        </Header>
        <Content>
          <div
            style={{
              height: '100%'
            }}
          >
            {children ? children : <Outlet />}
          </div>
        </Content>
        <Footer>
          <Row gutter={32} className='px-40'>
            <Col span={6} className='text-center'>
              <Flex align='center' vertical>
                <img src='/Asset12.png' />
                <Text>
                  CraftedJoy cung cấp những món quà tặng lưu niệm ý nghĩa, gói gém và trao gửi một cách trân trọng.Bạn
                  có thể chọn mua Quà trực tiếp tại cửa hàng,Hoặc đặt quà Online để được chuyển trực tiếp đến người nhận{' '}
                  <Text strong>trong ngày</Text> tại <Text strong>TpHCM </Text> và từ 2-5 ngày với khu vực khác trên
                  Toàn Quốc. <Text underline>Giới thiệu thêm</Text>
                </Text>
                <Divider style={{ background: 'white' }} />
                <Text italic>Kết nối với chúng tôi qua:</Text>
                <Space size={10}>
                  <svg width='26' height='31' viewBox='0 0 26 31' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <g clipPath='url(#clip0_1_101)'>
                      <path
                        d='M24.5742 2.73286C24.9648 2.73286 25.2996 2.87237 25.5786 3.15139C25.8576 3.4304 25.9972 3.76522 25.9972 4.15585V27.0242C25.9972 27.4148 25.8576 27.7496 25.5786 28.0286C25.2996 28.3076 24.9648 28.4471 24.5742 28.4471H18.0284V18.4862H21.3599L21.8621 14.6023H18.0284V12.1246C18.0284 11.4996 18.1595 11.0308 18.4218 10.7183C18.6841 10.4058 19.1947 10.2496 19.9536 10.2496L21.996 10.2329V6.76746C21.2929 6.66701 20.2996 6.61679 19.0161 6.61679C17.4983 6.61679 16.2845 7.06322 15.3749 7.95607C14.4653 8.84893 14.0105 10.1101 14.0105 11.7396V14.6023H10.6623V18.4862H14.0105V28.4471H1.70586C1.31523 28.4471 0.980412 28.3076 0.701394 28.0286C0.422376 27.7496 0.282867 27.4148 0.282867 27.0242V4.15585C0.282867 3.76522 0.422376 3.4304 0.701394 3.15139C0.980412 2.87237 1.31523 2.73286 1.70586 2.73286H24.5742Z'
                        fill='black'
                      />
                    </g>
                    <defs>
                      <clipPath id='clip0_1_101'>
                        <rect width='25.72' height='30' fill='white' transform='matrix(1 0 0 -1 0.279999 30.59)' />
                      </clipPath>
                    </defs>
                  </svg>
                  <svg width='26' height='31' viewBox='0 0 26 31' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <g clipPath='url(#clip0_1_103)'>
                      <path
                        d='M15.8064 21.4159V24.9482C15.8064 25.696 15.5888 26.0699 15.1535 26.0699C14.8968 26.0699 14.6457 25.9471 14.4002 25.7016V20.6625C14.6457 20.417 14.8968 20.2942 15.1535 20.2942C15.5888 20.2942 15.8064 20.6681 15.8064 21.4159ZM21.4649 21.4326V22.2027H19.9582V21.4326C19.9582 20.6737 20.2093 20.2942 20.7116 20.2942C21.2138 20.2942 21.4649 20.6737 21.4649 21.4326ZM5.29305 17.783H7.08434V16.2094H1.86113V17.783H3.61894V27.3087H5.29305V17.783ZM10.1145 27.3087H11.6044V19.0386H10.1145V25.3668C9.77965 25.8355 9.46157 26.0699 9.16023 26.0699C8.95934 26.0699 8.84215 25.9527 8.80867 25.7183C8.79751 25.6848 8.79193 25.4895 8.79193 25.1324V19.0386H7.30198V25.5844C7.30198 26.1313 7.34662 26.5386 7.4359 26.8065C7.56983 27.2194 7.89349 27.4259 8.40689 27.4259C8.9426 27.4259 9.5118 27.0855 10.1145 26.4047V27.3087ZM17.2964 24.831V21.533C17.2964 20.7183 17.2462 20.1659 17.1457 19.8757C16.956 19.2507 16.5598 18.9382 15.9571 18.9382C15.3991 18.9382 14.8801 19.2395 14.4002 19.8422V16.2094H12.9102V27.3087H14.4002V26.5051C14.9024 27.119 15.4214 27.4259 15.9571 27.4259C16.5598 27.4259 16.956 27.119 17.1457 26.5051C17.2462 26.2038 17.2964 25.6458 17.2964 24.831ZM22.9549 24.6636V24.446H21.4314C21.4314 25.0152 21.4203 25.3556 21.398 25.4672C21.3198 25.869 21.0966 26.0699 20.7283 26.0699C20.2149 26.0699 19.9582 25.6848 19.9582 24.9147V23.4583H22.9549V21.7339C22.9549 20.8522 22.8042 20.2049 22.5029 19.792C22.0676 19.2228 21.4761 18.9382 20.7283 18.9382C19.9694 18.9382 19.3723 19.2228 18.937 19.792C18.6245 20.2049 18.4683 20.8522 18.4683 21.7339V24.6301C18.4683 25.5118 18.6301 26.1592 18.9538 26.5721C19.389 27.1413 19.9917 27.4259 20.7618 27.4259C21.5654 27.4259 22.168 27.1301 22.5698 26.5386C22.7707 26.2373 22.8879 25.9359 22.9214 25.6346C22.9437 25.5342 22.9549 25.2105 22.9549 24.6636ZM12.7763 9.37903V5.8634C12.7763 5.09332 12.5364 4.70827 12.0564 4.70827C11.5765 4.70827 11.3366 5.09332 11.3366 5.8634V9.37903C11.3366 10.1603 11.5765 10.5509 12.0564 10.5509C12.5364 10.5509 12.7763 10.1603 12.7763 9.37903ZM24.8131 21.9516C24.8131 24.5632 24.668 26.5163 24.3779 27.8109C24.2216 28.4694 23.898 29.0219 23.4069 29.4683C22.9158 29.9147 22.3466 30.1714 21.6993 30.2384C19.6457 30.4728 16.5486 30.59 12.408 30.59C8.26738 30.59 5.17028 30.4728 3.11671 30.2384C2.46939 30.1714 1.8974 29.9147 1.40075 29.4683C0.904096 29.0219 0.583226 28.4694 0.438136 27.8109C0.147958 26.5609 0.00286865 24.6078 0.00286865 21.9516C0.00286865 19.34 0.147958 17.3868 0.438136 16.0922C0.594386 15.4337 0.918047 14.8813 1.40912 14.4348C1.90019 13.9884 2.47497 13.7261 3.13345 13.648C5.17586 13.4248 8.26738 13.3132 12.408 13.3132C16.5486 13.3132 19.6457 13.4248 21.6993 13.648C22.3466 13.7261 22.9186 13.9884 23.4153 14.4348C23.9119 14.8813 24.2328 15.4337 24.3779 16.0922C24.668 17.3422 24.8131 19.2953 24.8131 21.9516ZM8.10555 0.589966H9.81314L7.78747 7.26965V11.8065H6.11336V7.26965C5.95711 6.44376 5.61671 5.26073 5.09215 3.72055C4.67921 2.57099 4.31648 1.52747 4.00398 0.589966H5.77854L6.96715 4.99287L8.10555 0.589966ZM14.2997 6.16474V9.09443C14.2997 9.99845 14.1435 10.6569 13.831 11.0699C13.4069 11.6391 12.8154 11.9237 12.0564 11.9237C11.3087 11.9237 10.7227 11.6391 10.2986 11.0699C9.98613 10.6458 9.82988 9.98729 9.82988 9.09443V6.16474C9.82988 5.27189 9.98613 4.61898 10.2986 4.20604C10.7227 3.63684 11.3087 3.35224 12.0564 3.35224C12.8154 3.35224 13.4069 3.63684 13.831 4.20604C14.1435 4.61898 14.2997 5.27189 14.2997 6.16474ZM19.908 3.45269V11.8065H18.3846V10.8857C17.793 11.5777 17.2183 11.9237 16.6602 11.9237C16.1468 11.9237 15.8176 11.7172 15.6725 11.3043C15.5832 11.0364 15.5386 10.6179 15.5386 10.0487V3.45269H17.062V9.59666C17.062 9.96497 17.0676 10.1603 17.0788 10.1826C17.1122 10.4281 17.2294 10.5509 17.4303 10.5509C17.7317 10.5509 18.0497 10.3109 18.3846 9.83104V3.45269H19.908Z'
                        fill='black'
                      />
                    </g>
                    <defs>
                      <clipPath id='clip0_1_103'>
                        <rect width='25.72' height='30' fill='white' transform='matrix(1 0 0 -1 0 30.59)' />
                      </clipPath>
                    </defs>
                  </svg>
                </Space>
              </Flex>
            </Col>
            <Col span={6}>
              <Space direction='vertical' className='w-full py-10 '>
                <Text strong>Về CraftedJoy</Text>
                <Text>^ Giới thiệu</Text>
                <Text>^ Dịch vụ</Text>
                <Text>^ Blog quà tặng</Text>
                <Text>^ Liên hệ</Text>
              </Space>
            </Col>
            <Col span={6}>
              <Space direction='vertical' className='w-full py-10 '>
                <Text strong>Khách hàng</Text>
                <Text>^ Hỏi đáp</Text>
                <Text>^ Cước phí vận chuyển</Text>
                <Text>^ Hướng dẫn đặt hàng</Text>
              </Space>
            </Col>
            <Col span={6}>
              <Space direction='vertical' className='w-full py-10 '>
                <Text strong>ĐỊA CHỈ CỬA HÀNG</Text>
                <Flex gap={10}>
                  <svg width='16' height='17' viewBox='0 0 16 17' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <g clipPath='url(#clip0_1_125)'>
                      <path
                        d='M0.825102 9.66358C0.609585 9.83544 0.296135 9.8005 0.124595 9.58468C-0.046945 9.36916 -0.0120133 9.05571 0.202568 8.88323L3.00896 6.63762V3.78413C3.00896 3.23333 3.45621 2.78608 4.00701 2.78608C4.55781 2.78608 5.00506 3.23333 5.00506 3.78413V5.04074L7.68795 2.89493C7.8704 2.74928 8.12896 2.74928 8.31173 2.89493L15.7971 8.88323C16.0117 9.05571 16.0466 9.36916 15.8748 9.58468C15.7759 9.7085 15.6312 9.77243 15.4846 9.77243C15.3748 9.77243 15.265 9.73657 15.1733 9.66358L13.9875 8.71544V15.7607C13.9875 16.3115 13.5403 16.7588 12.9895 16.7588H9.99532C9.44452 16.7588 8.99727 16.3115 8.99727 15.7607V11.7685H7.00116V15.7607C7.00116 16.3115 6.55391 16.7588 6.00311 16.7588H3.00896C2.45816 16.7588 2.01091 16.3115 2.01091 15.7607V8.71544L0.825102 9.66358ZM7.99922 3.92386L3.00896 7.917V15.7607H6.00311V10.7705H9.99532V15.7607H12.9895V7.91606L7.99922 3.92386Z'
                        fill='black'
                      />
                    </g>
                    <defs>
                      <clipPath id='clip0_1_125'>
                        <rect width='16' height='16' fill='white' transform='matrix(1 0 0 -1 0 16.79)' />
                      </clipPath>
                    </defs>
                  </svg>
                  <Text strong>VinhomegrandparkQ9</Text>
                </Flex>
                <Flex gap={10}>
                  <svg width='16' height='17' viewBox='0 0 13 17' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <g clipPath='url(#clip0_1_127)'>
                      <path
                        d='M12.5757 12.0514C12.5757 12.2121 12.546 12.4219 12.4864 12.6808C12.4269 12.9397 12.3644 13.1436 12.2989 13.2924C12.1739 13.59 11.8108 13.9055 11.2096 14.2389C10.6501 14.5424 10.0965 14.6942 9.54893 14.6942C9.38822 14.6942 9.23048 14.6838 9.07572 14.663C8.92095 14.6421 8.74982 14.6049 8.56232 14.5514C8.37482 14.4978 8.23494 14.4546 8.14268 14.4219C8.05042 14.3892 7.88524 14.3281 7.64715 14.2389C7.40905 14.1496 7.26322 14.096 7.20965 14.0781C6.62631 13.8698 6.10548 13.6228 5.64715 13.3371C4.89119 12.8668 4.10548 12.224 3.29 11.4085C2.47453 10.593 1.83167 9.80731 1.36143 9.05136C1.07572 8.59302 0.828692 8.07219 0.620359 7.48886C0.602502 7.43529 0.548931 7.28945 0.459645 7.05136C0.370359 6.81326 0.309347 6.64808 0.276609 6.55582C0.243871 6.46356 0.200716 6.32368 0.147145 6.13618C0.0935734 5.94868 0.0563711 5.77755 0.0355377 5.62278C0.0147044 5.46802 0.00428772 5.31028 0.00428772 5.14957C0.00428772 4.60195 0.156073 4.04838 0.459645 3.48886C0.792978 2.88767 1.10845 2.52457 1.40607 2.39957C1.55488 2.33409 1.75875 2.27159 2.01768 2.21207C2.27661 2.15255 2.48643 2.12278 2.64715 2.12278C2.73048 2.12278 2.79298 2.13171 2.83465 2.14957C2.94179 2.18528 3.09953 2.41148 3.30786 2.82814C3.37334 2.94124 3.46262 3.10195 3.57572 3.31028C3.68881 3.51862 3.79298 3.70761 3.88822 3.87725C3.98345 4.04689 4.07572 4.20612 4.165 4.35493C4.18286 4.37874 4.23494 4.45314 4.32125 4.57814C4.40756 4.70314 4.47155 4.8088 4.51322 4.89511C4.55488 4.98142 4.57572 5.06624 4.57572 5.14957C4.57572 5.26862 4.4909 5.41743 4.32125 5.596C4.15161 5.77457 3.96709 5.93826 3.76768 6.08707C3.56828 6.23588 3.38375 6.39362 3.21411 6.56028C3.04447 6.72695 2.95965 6.86386 2.95965 6.971C2.95965 7.02457 2.97453 7.09154 3.00429 7.17189C3.03405 7.25225 3.05935 7.31326 3.08018 7.35493C3.10101 7.39659 3.14268 7.46802 3.20518 7.56921C3.26768 7.6704 3.30191 7.72695 3.30786 7.73886C3.76024 8.55433 4.2781 9.25374 4.86143 9.83707C5.44476 10.4204 6.14417 10.9383 6.95965 11.3906C6.97155 11.3966 7.0281 11.4308 7.12929 11.4933C7.23048 11.5558 7.30191 11.5975 7.34357 11.6183C7.38524 11.6392 7.44625 11.6645 7.52661 11.6942C7.60697 11.724 7.67393 11.7389 7.7275 11.7389C7.83465 11.7389 7.97155 11.654 8.13822 11.4844C8.30488 11.3147 8.46262 11.1302 8.61143 10.9308C8.76024 10.7314 8.92393 10.5469 9.1025 10.3772C9.28107 10.2076 9.42988 10.1228 9.54893 10.1228C9.63226 10.1228 9.71709 10.1436 9.8034 10.1853C9.8897 10.227 9.99536 10.2909 10.1204 10.3772C10.2454 10.4636 10.3198 10.5156 10.3436 10.5335C10.4924 10.6228 10.6516 10.715 10.8213 10.8103C10.9909 10.9055 11.1799 11.0097 11.3882 11.1228C11.5965 11.2359 11.7573 11.3252 11.8704 11.3906C12.287 11.599 12.5132 11.7567 12.5489 11.8639C12.5668 11.9055 12.5757 11.968 12.5757 12.0514Z'
                        fill='black'
                      />
                    </g>
                    <defs>
                      <clipPath id='clip0_1_127'>
                        <rect width='12.58' height='16' fill='white' transform='matrix(1 0 0 -1 0 16.98)' />
                      </clipPath>
                    </defs>
                  </svg>

                  <Text strong>0938980766</Text>
                </Flex>
                <Text>
                  <Flex gap={10}>
                    <svg width='30' height='17' viewBox='0 0 16 17' fill='none' xmlns='http://www.w3.org/2000/svg'>
                      <g clipPath='url(#clip0_1_131)'>
                        <path
                          d='M8.00285 5.16724V9.16724C8.00285 9.25057 7.97607 9.31902 7.9225 9.37259C7.86893 9.42616 7.80047 9.45295 7.71714 9.45295H4.86C4.77666 9.45295 4.70821 9.42616 4.65464 9.37259C4.60107 9.31902 4.57428 9.25057 4.57428 9.16724V8.59581C4.57428 8.51247 4.60107 8.44402 4.65464 8.39045C4.70821 8.33688 4.77666 8.31009 4.86 8.31009H6.86V5.16724C6.86 5.0839 6.88678 5.01545 6.94035 4.96188C6.99393 4.90831 7.06238 4.88152 7.14571 4.88152H7.71714C7.80047 4.88152 7.86893 4.90831 7.9225 4.96188C7.97607 5.01545 8.00285 5.0839 8.00285 5.16724ZM11.0654 10.7476C11.0654 10.7476 11.174 10.5616 11.3912 10.1896C11.6085 9.81753 11.7171 9.19105 11.7171 8.31009C11.7171 7.42914 11.4999 6.61664 11.0654 5.87259C10.6308 5.12855 10.0415 4.53926 9.2975 4.10474C8.55345 3.67021 7.74095 3.45295 6.86 3.45295C5.97904 3.45295 5.16654 3.67021 4.4225 4.10474C3.67845 4.53926 3.08916 5.12855 2.65464 5.87259C2.22012 6.61664 2.00285 7.42914 2.00285 8.31009C2.00285 9.19105 2.22012 10.0035 2.65464 10.7476C3.08916 11.4916 3.67845 12.0809 4.4225 12.5155C5.16654 12.95 5.97904 13.1672 6.86 13.1672C7.74095 13.1672 8.55345 12.95 9.2975 12.5155C10.0415 12.0809 10.6308 11.4916 11.0654 10.7476ZM12.7975 4.86813C12.7975 4.86813 12.9508 5.13078 13.2573 5.65608C13.5639 6.18137 13.7171 7.06605 13.7171 8.31009C13.7171 9.55414 13.4106 10.7015 12.7975 11.7521C12.1844 12.8027 11.3526 13.6345 10.302 14.2476C9.25137 14.8607 8.10404 15.1672 6.86 15.1672C5.61595 15.1672 4.46863 14.8607 3.41803 14.2476C2.36744 13.6345 1.53559 12.8027 0.922496 11.7521C0.309401 10.7015 0.00285339 9.55414 0.00285339 8.31009C0.00285339 7.06605 0.309401 5.91872 0.922496 4.86813C1.53559 3.81753 2.36744 2.98569 3.41803 2.37259C4.46863 1.7595 5.61595 1.45295 6.86 1.45295C8.10404 1.45295 9.25137 1.7595 10.302 2.37259C11.3526 2.98569 12.1844 3.81753 12.7975 4.86813Z'
                          fill='black'
                        />
                      </g>
                      <defs>
                        <clipPath id='clip0_1_131'>
                          <rect width='16' height='16' fill='white' transform='matrix(1 0 0 -1 0 16.98)' />
                        </clipPath>
                      </defs>
                    </svg>

                    <Text strong>
                      Giờ mở cửa: 8h30 sáng đến 7h30 tối - Thứ 2 đến Thứ 7.Chủ Nhật mở cửa đến 6h30 tối
                    </Text>
                  </Flex>
                </Text>
              </Space>
            </Col>
          </Row>
        </Footer>
      </Layout>
    </ConfigProvider>
  )
}

export default CommonLayout
