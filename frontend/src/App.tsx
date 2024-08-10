import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'

import { Fallback, RootErrorBoundary, Project, ProjectErrorBoundary, projectLoader } from './routes'
import { ForgetPasswordPage, HomePage, LoginPage, RegisterPage, ResetPasswordPage, VerifyPage } from './pages'
import CommonLayout from './layouts/CommonLayout'
import ProductDetailPage from './pages/ProductDetail'
import SearchProductPage from './pages/Search'
import BoxPage from './pages/Box'
import CartPage from './pages/Cart'
import OrderPage from './pages/Admin/Order'
import AccountPage from './pages/Admin/Account'
import DashboardPage from './pages/Admin/Dashboard'
import AdminProductPage from './pages/Admin/Product'

const router = createBrowserRouter([
  {
    path: '/',
    element: <CommonLayout />,
    children: [
      {
        path: '',
        element: <Outlet />,
        errorElement: <RootErrorBoundary />,
        children: [
          {
            index: true,
            element: <HomePage />
          },

          {
            path: 'projects/:projectId',
            element: <Project />,
            errorElement: <ProjectErrorBoundary />,
            loader: projectLoader
          },
          {
            path: '/login',
            element: <LoginPage />
          },
          {
            path: '/register',
            element: <RegisterPage />
          },
          {
            path: '/forgetpassword',
            element: <ForgetPasswordPage />
          },
          {
            path: '/verify',
            element: <VerifyPage />
          },
          {
            path: '/resetpassword',
            element: <ResetPasswordPage />
          },
          {
            path: 'product/:productName',
            element: <ProductDetailPage />
          },
          {
            path: 'product/box',
            element: <BoxPage />
          },
          {
            path: 'search-product',
            element: <SearchProductPage />
          },
          {
            path: 'cart',
            element: <CartPage />
          },
          {
            path: 'admin/order',
            element: <OrderPage />
          },
          {
            path: 'admin/account',
            element: <AccountPage />
          },
          {
            path: 'admin/dashboard',
            element: <DashboardPage />
          },
          {
            path: 'admin/product',
            element: <AdminProductPage />
          }
        ]
      }
    ]
  }
])

if (import.meta.hot) {
  import.meta.hot.dispose(() => router.dispose())
}

export default function App() {
  return <RouterProvider router={router} fallbackElement={<Fallback />} />
}
