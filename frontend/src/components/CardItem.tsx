import { Card, Flex, Button, Typography, Image, App } from 'antd'
import { useNavigate } from 'react-router-dom'
import api from '~/api'
import { Product } from '~/api/v1'
import { useAuthStore } from '~/stores/auth.store'
import { formatCurrencyVND } from '~/utils'

const { Text } = Typography

const CardItem: React.FC<{ item: Product }> = ({ item }) => {
  const navigate = useNavigate()
  const accessToken = useAuthStore((state) => state.accessToken)
  const { notification } = App.useApp()
  const handleAddItem = async () => {
    try {
      await api.apiCartSingleAddPost(
        {
          type: 1,
          id: item.id,
          quantity: 1
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      )
      notification.success({ message: 'Thêm vào giỏ hàng thành công' })
    } catch (error) {
      notification.error({ message: 'Vui lòng đăng nhập' })
      console.log(error)
    }
  }
  return (
    <Card
      onClick={() => navigate(`/product/${item.id!}`)}
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
        <Button
          onClick={(e) => {
            e.stopPropagation()
            console.log('test')
            handleAddItem()
          }}
          ghost
          className='!text-[#CE1F40] !border-[#CE1F40] !mt-auto'
        >
          Chọn quà này
        </Button>
      </Flex>
    </Card>
  )
}
export default CardItem
