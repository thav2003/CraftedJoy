import { Card, Flex, Button, Typography, Image } from 'antd'
import { useNavigate } from 'react-router-dom'
import { ProductDTO } from '~/api/v1'
import { formatCurrencyVND } from '~/utils'

const { Text } = Typography

const CardItem: React.FC<{ item: ProductDTO }> = ({ item }) => {
  const navigate = useNavigate()
  return (
    <Card
      onClick={() => navigate(`/product/${item.productName}`)}
      hoverable
      styles={{
        body: {
          height: '200px'
        }
      }}
      cover={<Image height={270} className='flex-grow bg-cover' src={item.productVariants![0].thumbnail!} />}
    >
      <Flex vertical gap={10} justify='space-between' className='h-full'>
        <Text strong className='text-center line-clamp-2'>
          {item.productName}
        </Text>
        <Text strong className='text-[#CE1F40] text-center'>
          {formatCurrencyVND(item.productVariants![0].price!)}
        </Text>
        <Text strong className='text-[#9F9295] text-center'>
          {item.quantitySold} đã bán
        </Text>
        <Button ghost className='!text-[#CE1F40] !border-[#CE1F40] !mt-auto'>
          Chọn quà này
        </Button>
      </Flex>
    </Card>
  )
}
export default CardItem
