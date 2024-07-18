import { Card, Flex, Button, Typography, Image, App } from 'antd'
import { useNavigate } from 'react-router-dom'
import api from '~/api'
import { ProductDTO } from '~/api/v1'
import { useAppStore } from '~/stores/app.store'
import { useAuthStore } from '~/stores/auth.store'
import { formatCurrencyVND } from '~/utils'

const { Text } = Typography

const CardItem: React.FC<{ item: ProductDTO }> = ({ item }) => {
  const navigate = useNavigate()
  const accessToken = useAuthStore((state) => state.accessToken)
  const { notification } = App.useApp()
  const handleAddItem = async () => {
    try {
      const res = await api.apiProductIdGet(item.productTags![0].productId!)

      await api.apiCartSingleAddPost(
        {
          type: 1,
          id: res.data.productVariants[0].id,
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
      console.log(error)
    }
  }
  return (
    <Card
      onClick={() => navigate(`/product/${item.productTags![0].productId!}`)}
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
