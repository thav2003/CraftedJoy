import { Col, Row, Image, Typography, Flex, Divider, Button, Card, List, Space } from 'antd'
import { useParams } from 'react-router-dom'
import api from '~/api'
import useFetch from '~/hooks/useFetch'
import { formatCurrencyVND } from '~/utils'

const ProductDetailPage: React.FC = () => {
  const { productName } = useParams()
  const [response] = useFetch({ fetchFunction: () => api.apiProductSearchProductsbyNameproductnameGet(productName!) })
  const item = response ? response[0] : null

  console.log(response)
  return (
    <div>
      <div className='py-10 px-12 lg:px-36 bg-[#FFFFFF]'>
        <Row gutter={[32, 32]}>
          <Col span={8}>
            <Image src={item ? item.productVariants![0].thumbnail! : 'error'} height={400} />
          </Col>
          <Col span={8}>
            <Flex vertical gap={20}>
              <Typography.Text strong>{item?.productName}</Typography.Text>
              <Typography.Text strong className='text-[#CE1F40] text-lg'>
                {formatCurrencyVND(item ? item.productVariants![0].price! : 0)}
              </Typography.Text>
              <Divider className='my-0' />
              <Button type='primary' className='h-fit bg-[#F68C04] hover:!bg-[#F68C04]'>
                <Flex align='cener' justify='center' vertical>
                  <Typography.Text className='text-[#FFFFFF] text-lg'>Chọn quà này</Typography.Text>
                  <Typography.Text className='text-[#FFFFFF]'>Mua Online-Chuyển quà tận nơi</Typography.Text>
                </Flex>
              </Button>
              <div className='border-dashed border-[1px] py-5 px-2 border-red-500 relative'>
                <Button type='primary' className='absolute top-0 -translate-y-5 h-fit bg-red-500 hover:!bg-red-500'>
                  <Flex align='center' gap={10}>
                    <svg
                      className='inline'
                      width='14'
                      height='13'
                      viewBox='0 0 14 13'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M8.28767 11.0871V10.5871V6.40856V4.69427H5.43052V6.40856V10.5871V11.0871C5.43052 11.2359 5.4841 11.3505 5.59124 11.4309C5.69838 11.5112 5.83529 11.5514 6.00195 11.5514H7.71624C7.88291 11.5514 8.01981 11.5112 8.12695 11.4309C8.2341 11.3505 8.28767 11.2359 8.28767 11.0871ZM4.21624 3.55142H5.95731L4.83231 2.11392C4.67755 1.92939 4.47219 1.83713 4.21624 1.83713C3.97814 1.83713 3.77576 1.92046 3.6091 2.08713C3.44243 2.2538 3.3591 2.45618 3.3591 2.69427C3.3591 2.93237 3.44243 3.13475 3.6091 3.30142C3.77576 3.46808 3.97814 3.55142 4.21624 3.55142ZM10.1091 3.30142C10.1091 3.30142 10.1508 3.25975 10.2341 3.17642C10.3174 3.09308 10.3591 2.93237 10.3591 2.69427C10.3591 2.45618 10.2758 2.2538 10.1091 2.08713C9.94243 1.92046 9.74005 1.83713 9.50195 1.83713C9.246 1.83713 9.04064 1.92939 8.88588 2.11392L7.76981 3.55142H9.50195C9.74005 3.55142 9.94243 3.46808 10.1091 3.30142ZM13.7162 4.97999V7.83713C13.7162 7.92046 13.6895 7.98892 13.6359 8.04249C13.5823 8.09606 13.5139 8.12285 13.4305 8.12285H12.5734V11.8371C12.5734 12.0752 12.49 12.2776 12.3234 12.4443C12.1567 12.6109 11.9543 12.6943 11.7162 12.6943H2.00195C1.76386 12.6943 1.56148 12.6109 1.39481 12.4443C1.22814 12.2776 1.14481 12.0752 1.14481 11.8371V8.12285H0.287667C0.204334 8.12285 0.135882 8.09606 0.0823103 8.04249C0.0287388 7.98892 0.00195312 7.92046 0.00195312 7.83713V4.97999C0.00195312 4.89666 0.0287388 4.8282 0.0823103 4.77463C0.135882 4.72106 0.204334 4.69427 0.287667 4.69427H4.21624C3.66267 4.69427 3.19094 4.49933 2.80106 4.10945C2.41118 3.71957 2.21624 3.24785 2.21624 2.69427C2.21624 2.1407 2.41118 1.66898 2.80106 1.2791C3.19094 0.889215 3.66267 0.694274 4.21624 0.694274C4.85314 0.694274 5.35314 0.923441 5.71624 1.38177L6.8591 2.85499L8.00195 1.38177C8.36505 0.923441 8.86505 0.694274 9.50195 0.694274C10.0555 0.694274 10.5273 0.889215 10.9171 1.2791C11.307 1.66898 11.502 2.1407 11.502 2.69427C11.502 3.24785 11.307 3.71957 10.9171 4.10945C10.5273 4.49933 10.0555 4.69427 9.50195 4.69427H13.4305C13.5139 4.69427 13.5823 4.72106 13.6359 4.77463C13.6895 4.8282 13.7162 4.89666 13.7162 4.97999Z'
                        fill='white'
                      />
                    </svg>
                    Miễn phí vận chuyển
                  </Flex>
                </Button>
                <Typography.Text>Cho đơn hàng từ 300k (không áp dụng ship hỏa tốc)</Typography.Text>
              </div>
            </Flex>
          </Col>
          <Col span={8}>
            <Flex vertical gap={20}>
              <Flex gap={20}>
                <svg
                  width='66'
                  height='69'
                  viewBox='0 0 66 69'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                  xmlnsXlink='http://www.w3.org/1999/xlink'
                >
                  <g clipPath='url(#clip0_3_1905)'>
                    <rect y='0.190002' width='66' height='68' fill='url(#pattern0_3_1905)' />
                  </g>
                  <defs>
                    <pattern id='pattern0_3_1905' patternContentUnits='objectBoundingBox' width='1' height='1'>
                      <use xlinkHref='#image0_3_1905' transform='scale(0.0151515 0.0147059)' />
                    </pattern>
                    <clipPath id='clip0_3_1905'>
                      <rect width='66' height='68' fill='white' transform='translate(0 0.190002)' />
                    </clipPath>
                    <image
                      id='image0_3_1905'
                      width='66'
                      height='68'
                      xlinkHref='data:image/png;base64,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'
                    />
                  </defs>
                </svg>
                <Flex vertical gap={3}>
                  <Typography.Text strong className='text-[#CC1F3D] text-xl'>
                    Thời gian chuyển quà
                  </Typography.Text>
                  <Typography.Text strong>Trong ngày tại: Tp. HCM</Typography.Text>
                  <Typography.Text strong>2-5 ngày tại Khu vực khác (*)</Typography.Text>
                </Flex>
              </Flex>
              {item && item.productVariants[0].quantity > 0 ? (
                <Button
                  type='primary'
                  size='large'
                  className='cursor-default h-fit py-3 bg-[#E25A72] hover:!bg-[#E25A72]'
                >
                  Cửa hàng đang còn
                </Button>
              ) : (
                <Button
                  type='primary'
                  size='large'
                  className='cursor-default h-fit py-3 bg-[#E25A72] hover:!bg-[#E25A72]'
                >
                  Cửa hàng hết hàng
                </Button>
              )}

              <Typography.Text strong>Bạn có thể mua trực tiếp tại cửa hàng</Typography.Text>
            </Flex>
          </Col>
          <Col span={16}>
            <Space direction='vertical' className='w-full ' size={'large'}>
              <div className='text-center py-5 bg-primary'>
                <Typography.Text strong className='text-[#FFFFFF]'>
                  Chi tiết món quà
                </Typography.Text>
              </div>
              <div dangerouslySetInnerHTML={{ __html: item ? item.description : '' }} />

              {/* <div>
                Set quà tặng Love Letter gồm đầy đủ những món quà dành cho người phụ nữ bạn yêu: gấu bông lông mềm,
                socola nghệ thuật, bó hoa sáp giúp bạn thể hiện tấm chân tình hoàn hảo. Ngày lễ 8/3 sắp tới,
                Quatructuyen.com gợi ý cho bạn 1 set quà tặng dành cho một nửa xinh đẹp của mình, như 1 bức thư tỏ tình
                lãng mạn giống như tên gọi Love Letter.
                <br />
                <br />
                <img src='/q1.png' />
              </div> */}
            </Space>
          </Col>
          <Col span={8}>
            <Space direction='vertical' className='w-full ' size={'large'}>
              <div className='text-center py-5 bg-primary'>
                <Typography.Text strong className='text-[#FFFFFF]'>
                  Thuộc tính món quà
                </Typography.Text>
              </div>
              <div>
                <div className='border-solid border-[1px] p-5 border-[#CCCCCC]'>
                  <Space direction='vertical' className='w-full'>
                    <Space align='center'>
                      <svg
                        className='inline'
                        width='26'
                        height='29'
                        viewBox='0 0 26 29'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                        xmlnsXlink='http://www.w3.org/1999/xlink'
                      >
                        <rect
                          width='26'
                          height='28.16'
                          transform='translate(0 0.0599976)'
                          fill='url(#pattern0_3_1981)'
                        />
                        <defs>
                          <pattern id='pattern0_3_1981' patternContentUnits='objectBoundingBox' width='1' height='1'>
                            <use xlinkHref='#image0_3_1981' transform='scale(0.0416667 0.0384615)' />
                          </pattern>
                          <image
                            id='image0_3_1981'
                            width='24'
                            height='26'
                            xlinkHref='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAaCAYAAACtv5zzAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTMyIDc5LjE1OTI4NCwgMjAxNi8wNC8xOS0xMzoxMzo0MCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUuNSAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDRCNUYxNUI2MTFGMTFFN0JDMjA5MjczMkI3NDMzOUUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDRCNUYxNUM2MTFGMTFFN0JDMjA5MjczMkI3NDMzOUUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo0NEI1RjE1OTYxMUYxMUU3QkMyMDkyNzMyQjc0MzM5RSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo0NEI1RjE1QTYxMUYxMUU3QkMyMDkyNzMyQjc0MzM5RSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pvkn33cAAAY8SURBVHja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'
                          />
                        </defs>
                      </svg>
                      <Typography.Text>Chuyển quà sau 3h đến nội thành TP.HCM</Typography.Text>
                    </Space>
                    <Space align='center'>
                      <svg
                        className='inline'
                        width='26'
                        height='29'
                        viewBox='0 0 26 29'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                        xmlnsXlink='http://www.w3.org/1999/xlink'
                      >
                        <rect
                          width='26'
                          height='28.16'
                          transform='translate(0 0.0599976)'
                          fill='url(#pattern0_3_1981)'
                        />
                        <defs>
                          <pattern id='pattern0_3_1981' patternContentUnits='objectBoundingBox' width='1' height='1'>
                            <use xlinkHref='#image0_3_1981' transform='scale(0.0416667 0.0384615)' />
                          </pattern>
                          <image
                            id='image0_3_1981'
                            width='24'
                            height='26'
                            xlinkHref='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAaCAYAAACtv5zzAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTMyIDc5LjE1OTI4NCwgMjAxNi8wNC8xOS0xMzoxMzo0MCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUuNSAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDRCNUYxNUI2MTFGMTFFN0JDMjA5MjczMkI3NDMzOUUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDRCNUYxNUM2MTFGMTFFN0JDMjA5MjczMkI3NDMzOUUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo0NEI1RjE1OTYxMUYxMUU3QkMyMDkyNzMyQjc0MzM5RSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo0NEI1RjE1QTYxMUYxMUU3QkMyMDkyNzMyQjc0MzM5RSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pvkn33cAAAY8SURBVHja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'
                          />
                        </defs>
                      </svg>
                      <Typography.Text>
                        {' '}
                        Tặng thiệp miễn phí cho tất cả các đơn hàng (phần chọn thiệp sau khi chọn quà)
                      </Typography.Text>
                    </Space>
                    <Space align='center'>
                      <svg
                        className='inline'
                        width='26'
                        height='29'
                        viewBox='0 0 26 29'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                        xmlnsXlink='http://www.w3.org/1999/xlink'
                      >
                        <rect
                          width='26'
                          height='28.16'
                          transform='translate(0 0.0599976)'
                          fill='url(#pattern0_3_1981)'
                        />
                        <defs>
                          <pattern id='pattern0_3_1981' patternContentUnits='objectBoundingBox' width='1' height='1'>
                            <use xlinkHref='#image0_3_1981' transform='scale(0.0416667 0.0384615)' />
                          </pattern>
                          <image
                            id='image0_3_1981'
                            width='24'
                            height='26'
                            xlinkHref='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAaCAYAAACtv5zzAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTMyIDc5LjE1OTI4NCwgMjAxNi8wNC8xOS0xMzoxMzo0MCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUuNSAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDRCNUYxNUI2MTFGMTFFN0JDMjA5MjczMkI3NDMzOUUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDRCNUYxNUM2MTFGMTFFN0JDMjA5MjczMkI3NDMzOUUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo0NEI1RjE1OTYxMUYxMUU3QkMyMDkyNzMyQjc0MzM5RSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo0NEI1RjE1QTYxMUYxMUU3QkMyMDkyNzMyQjc0MzM5RSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pvkn33cAAAY8SURBVHja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'
                          />
                        </defs>
                      </svg>
                      <Typography.Text> Tặng thiệp Ghi thiệp theo yêu cầu (phần hoàn tất đơn hàng)</Typography.Text>
                    </Space>
                    <Space align='center'>
                      <svg
                        className='inline'
                        width='26'
                        height='29'
                        viewBox='0 0 26 29'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                        xmlnsXlink='http://www.w3.org/1999/xlink'
                      >
                        <rect
                          width='26'
                          height='28.16'
                          transform='translate(0 0.0599976)'
                          fill='url(#pattern0_3_1981)'
                        />
                        <defs>
                          <pattern id='pattern0_3_1981' patternContentUnits='objectBoundingBox' width='1' height='1'>
                            <use xlinkHref='#image0_3_1981' transform='scale(0.0416667 0.0384615)' />
                          </pattern>
                          <image
                            id='image0_3_1981'
                            width='24'
                            height='26'
                            xlinkHref='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAaCAYAAACtv5zzAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTMyIDc5LjE1OTI4NCwgMjAxNi8wNC8xOS0xMzoxMzo0MCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUuNSAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDRCNUYxNUI2MTFGMTFFN0JDMjA5MjczMkI3NDMzOUUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDRCNUYxNUM2MTFGMTFFN0JDMjA5MjczMkI3NDMzOUUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo0NEI1RjE1OTYxMUYxMUU3QkMyMDkyNzMyQjc0MzM5RSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo0NEI1RjE1QTYxMUYxMUU3QkMyMDkyNzMyQjc0MzM5RSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pvkn33cAAAY8SURBVHja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'
                          />
                        </defs>
                      </svg>
                      <Typography.Text> 7 ngày Đổi miễn phí nếu người nhận không thích món quà</Typography.Text>
                    </Space>
                  </Space>
                </div>
              </div>
            </Space>
          </Col>
          <Col span={24}>
            <Flex align='center' justify='center' vertical gap={10}>
              <Typography.Text>Bạn nghĩ gì về món quà này</Typography.Text>
              <Button size='large' type='primary'>
                Viết nhận xét/đánh giá
              </Button>
            </Flex>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default ProductDetailPage
