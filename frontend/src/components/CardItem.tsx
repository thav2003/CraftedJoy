import { Card, Flex, Button, Typography, Image } from 'antd'
import { useNavigate } from 'react-router-dom'

const { Text } = Typography
/* eslint-disable @typescript-eslint/no-explicit-any */
const CardItem: React.FC<{ item: any }> = ({ item }) => {
  const navigate = useNavigate()
  return (
    <Card
      onClick={() => navigate('/product/1')}
      hoverable
      styles={{
        body: {
          height: '200px'
        }
      }}
      cover={
        <Image
          // height={270}
          className='flex-grow bg-cover'
          src='/product.png'
        />
      }
    >
      <Flex vertical gap={10} justify='space-between' className='h-full'>
        <Text strong className='text-center line-clamp-2'>
          {item.title}
        </Text>
        <Text strong className='text-[#CE1F40] text-center'>
          6.000 ₫
        </Text>
        <Text strong className='text-[#9F9295] text-center'>
          60 đã bán
        </Text>
        <Button ghost className='!text-[#CE1F40] !border-[#CE1F40] !mt-auto'>
          Chọn quà này
        </Button>
      </Flex>
    </Card>
  )
}
export default CardItem
