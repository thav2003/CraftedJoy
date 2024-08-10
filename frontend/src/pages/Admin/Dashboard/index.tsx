import { Row, Col, Statistic, Card, Flex, Typography, Space } from 'antd'
import axios from 'axios'
import useFetch from '~/hooks/useFetch'
const { Text, Title } = Typography
// import EChart from '~/components/chart/EChart'
import Chart from 'react-apexcharts'
import { DownOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
const DashboardPage: React.FC = () => {
  const [responseUser] = useFetch({
    fetchFunction: () => axios.get('https://catcake.onthewifi.com:201/api/Analytic/UserCount')
  })
  const [responseProduct] = useFetch({
    fetchFunction: () => axios.get('https://catcake.onthewifi.com:201/api/Analytic/ProductCount')
  })
  const [responseOrder] = useFetch({
    fetchFunction: () => axios.get('https://catcake.onthewifi.com:201/api/Analytic/OrderCount')
  })
  const [responseTotalPrice] = useFetch({
    fetchFunction: () => axios.get('https://catcake.onthewifi.com:201/api/Analytic/TotalPriceCount')
  })

  const series = [10566500, 1215000, 405000, 0]
  const labels = ['Chi phí nhập hàng', 'Chi phí đóng gói', 'Chi phí giao hàng', 'Chi phí chạy ads']

  const options = {
    chart: {
      type: 'donut',
      width: '380'
    },
    plotOptions: {
      pie: {
        donut: {}
      }
    },
    // dataLabels: {
    //   enabled: true,
    //   formatter: function (val, opts) {
    //     return `${opts.w.globals.labels[opts.seriesIndex]}: ${val}`
    //   }
    // },
    legend: {
      show: true
    },
    labels: labels, // Ensure you use the labels array
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          }
        }
      }
    ]
  }

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
      <div className='p-10 space-y-10'>
        <Row gutter={[32, 32]}>
          <Col span={6}>
            <Card>
              <Statistic title='Tổng người dùng' value={responseUser ? responseUser : 0} />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic title='Tổng sản phẩm' value={responseProduct ? responseProduct : 0} />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic title='Tổng hóa đơn' value={responseOrder ? responseOrder : 0} />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic title='Tổng doanh thu (VNĐ)' value={responseTotalPrice ? responseTotalPrice : 0} />
            </Card>
          </Col>
        </Row>
        <Row gutter={[24, 0]}>
          <Col xs={24} sm={24} md={24} lg={24} xl={10} className='mb-24'>
            <Card bordered={false} className='criclebox h-full'>
              <div className='mb-3 font-semibold'>Chi phí bán hàng tháng 7</div>
              <Chart options={options} series={series} type='donut' width='380' />
              {/* <Echart
                data={[
                  {
                    name: 'VNĐ',
                    data: resultWeekly?.map((e) => e.value),
                    color: '#fff'
                  }
                ]}
              /> */}
            </Card>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={14} className='mb-24'>
            <Card bordered={false} className='criclebox h-full'>
              <div className='mb-3 font-semibold'>Doanh thu</div>
              <Chart
                options={{
                  chart: {
                    type: 'bar',
                    // height: 350,
                    width: '100%',
                    stacked: true,
                    toolbar: {
                      show: true
                    },
                    zoom: {
                      enabled: true
                    }
                  },
                  responsive: [
                    {
                      breakpoint: 480,
                      options: {
                        legend: {
                          position: 'bottom',
                          offsetX: -10,
                          offsetY: 0
                        }
                      }
                    }
                  ],
                  plotOptions: {
                    bar: {
                      horizontal: false,
                      borderRadius: 10,
                      borderRadiusApplication: 'end', // 'around', 'end'
                      borderRadiusWhenStacked: 'last', // 'all', 'last'
                      dataLabels: {
                        total: {
                          enabled: true,
                          style: {
                            fontSize: '13px',
                            fontWeight: 900
                          }
                        }
                      }
                    }
                  },
                  xaxis: {
                    type: 'category',
                    categories: [
                      '22/07/2024',
                      '23/07/2024',
                      '24/07/2024',
                      '25/07/2024',
                      '26/07/2024',
                      '27/07/2024',
                      '28/07/2024',
                      '29/07/2024',
                      '30/07/2024',
                      '31/07/2024',
                      '01/08/2024',
                      '02/08/2024',
                      '03/08/2024',
                      '04/08/2024',
                      '05/08/2024',
                      '06/08/2024',
                      '07/08/2024',
                      '08/08/2024'
                    ]
                  },
                  legend: {
                    position: 'right',
                    offsetY: 40
                  },
                  fill: {
                    opacity: 1
                  }
                }}
                series={[
                  {
                    name: 'VNPAY',
                    data: [
                      100000, // 22/07/2024
                      150000, // 23/07/2024
                      0, // 24/07/2024
                      600000, // 25/07/2024 (300,000 + 300,000)
                      0, // 26/07/2024
                      0, // 27/07/2024
                      230000, // 28/07/2024 (50,000 + 100,000 + 80,000)
                      0, // 29/07/2024
                      800000, // 30/07/2024 (80,000 + 500,000 + 250,000)
                      200000, // 31/07/2024
                      100000, // 01/08/2024
                      250000, // 02/08/2024
                      245000, // 03/08/2024 (50,000 + 55,000 + 70,000 + 90,000)
                      350000, // 04/08/2024 (60,000 + 100,000 + 60,000 + 60,000 + 50,000 + 50,000 + 60,000 + 70,000 + 100,000)
                      480000, // 05/08/2024 (60,000 + 90,000 + 75,000 + 65,000 + 45,000 + 90,000 + 75,000)
                      360000, // 06/08/2024 (70,000 + 60,000 + 45,000 + 55,000 + 75,000 + 90,000 + 75,000 + 50,000 + 120,000)
                      480000, // 07/08/2024 (70,000 + 45,000 + 45,000 + 90,000 + 100,000 + 65,000 + 30,000 + 60,000)
                      345000 // 08/08/2024 (55,000 + 120,000 + 70,000 + 100,000 + 60,000 + 60,000)
                    ]
                  },
                  {
                    name: 'COD',
                    data: [
                      120000, // 22/07/2024
                      300000, // 23/07/2024
                      300000, // 24/07/2024
                      0, // 25/07/2024
                      0, // 26/07/2024
                      0, // 27/07/2024
                      0, // 28/07/2024
                      0, // 29/07/2024
                      0, // 30/07/2024
                      0, // 31/07/2024
                      100000, // 01/08/2024
                      100000, // 02/08/2024
                      0, // 03/08/2024
                      60000, // 04/08/2024
                      60000, // 05/08/2024
                      90000, // 06/08/2024
                      120000, // 07/08/2024
                      300000 // 08/08/2024
                    ]
                  },
                  {
                    name: 'BANKING',
                    data: [
                      0, // 22/07/2024
                      0, // 23/07/2024
                      0, // 24/07/2024
                      0, // 25/07/2024
                      0, // 26/07/2024
                      0, // 27/07/2024
                      0, // 28/07/2024
                      0, // 29/07/2024
                      0, // 30/07/2024
                      0, // 31/07/2024
                      100000, // 01/08/2024
                      0, // 02/08/2024
                      50000, // 03/08/2024
                      55000, // 04/08/2024
                      60000, // 05/08/2024
                      65000, // 06/08/2024
                      70000, // 07/08/2024
                      50000 // 08/08/2024
                    ]
                  }
                ]}
                type='bar'
              />
              {/* <Echart
                data={[
                  {
                    name: 'VNĐ',
                    data: resultWeekly?.map((e) => e.value),
                    color: '#fff'
                  }
                ]}
              /> */}
            </Card>
          </Col>
          {/* <Col xs={24} sm={24} md={24} lg={24} xl={14} className='mb-24'>
            <Card bordered={false} className='criclebox h-full'>
              <div className='mb-3 font-semibold'>Doanh thu theo tháng</div>
              <Echart
                data={[
                  {
                    name: 'VNĐ',
                    data: resultMonthly?.map((e) => e.value),
                    color: '#fff'
                  }
                ]}
                settings={{
                  chart: {
                    type: 'bar',
                    width: '100%',
                    height: 'auto',

                    toolbar: {
                      show: false
                    }
                  },
                  plotOptions: {
                    bar: {
                      horizontal: false,
                      columnWidth: '55%',
                      borderRadius: 5
                    }
                  },
                  dataLabels: {
                    enabled: false
                  },
                  stroke: {
                    show: true,
                    width: 1,
                    colors: ['transparent']
                  },
                  grid: {
                    show: true,
                    borderColor: '#ccc',
                    strokeDashArray: 2
                  },
                  xaxis: {
                    categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
                    labels: {
                      show: true,
                      align: 'right',
                      minWidth: 0,
                      maxWidth: 160,
                      style: {
                        colors: [
                          '#fff',
                          '#fff',
                          '#fff',
                          '#fff',
                          '#fff',
                          '#fff',
                          '#fff',
                          '#fff',
                          '#fff',
                          '#fff',
                          '#fff',
                          '#fff'
                        ]
                      }
                    }
                  },
                  yaxis: {
                    labels: {
                      show: true,
                      align: 'right',
                      minWidth: 0,
                      maxWidth: 160,
                      style: {
                        colors: ['#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff']
                      },

                      formatter: function (value) {
                        return Math.floor(value) // Chuyển đổi các giá trị thành số nguyên
                      }
                    }
                  },

                  tooltip: {
                    y: {
                      formatter: function (val) {
                        return val + ' VNĐ'
                      }
                    }
                  }
                }}
              />
            </Card>
          </Col> */}
        </Row>
      </div>
    </div>
  )
}

export default DashboardPage
