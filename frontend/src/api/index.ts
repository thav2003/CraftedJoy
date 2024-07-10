import { AxiosError } from 'axios'
import {
  AuthenApi,
  BoxApi,
  CartApi,
  OrderApi,
  PaymentApi,
  ProductApi,
  StoreApi,
  TagApi,
  UsersApi,
  VoucherApi
} from './v1'

import { BaseAPI } from './v1/base'

const authenApi = new AuthenApi()
const boxApi = new BoxApi()
const cartApi = new CartApi()
const orderApi = new OrderApi()
const paymentApi = new PaymentApi()
const productApi = new ProductApi()
const storeApi = new StoreApi()
const tagApi = new TagApi()
const usersApi = new UsersApi()
const voucherApi = new VoucherApi()

type ApiType = typeof authenApi &
  typeof boxApi &
  typeof cartApi &
  typeof orderApi &
  typeof paymentApi &
  typeof productApi &
  typeof storeApi &
  typeof tagApi &
  typeof usersApi &
  typeof voucherApi

const mergeApis = (...apis: BaseAPI[]): ApiType => {
  const mergedApi = {} as ApiType
  apis.forEach((api) => {
    const proto = Object.getPrototypeOf(api)
    const keys = Object.getOwnPropertyNames(proto)

    keys.forEach((key) => {
      if (key !== 'constructor') {
        const descriptor = Object.getOwnPropertyDescriptor(proto, key)
        if (descriptor && typeof descriptor.value === 'function') {
          mergedApi[key as keyof ApiType] = descriptor.value.bind(api)
        } else if (!mergedApi[key as keyof ApiType]) {
          mergedApi[key as keyof ApiType] = api[key as keyof typeof api]
        }
      }
    })
  })
  return mergedApi
}

const api: ApiType = mergeApis(
  authenApi,
  boxApi,
  cartApi,
  orderApi,
  paymentApi,
  productApi,
  storeApi,
  tagApi,
  usersApi,
  voucherApi
)

export const formatError = (err: unknown) => {
  const error = err as AxiosError

  if (error.message) {
    return error.message
  }
  return 'Có lỗi xảy ra'
}
export default api
