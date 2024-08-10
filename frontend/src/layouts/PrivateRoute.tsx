import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '~/stores/auth.store'

const PrivateRoute: React.FC = () => {
  const status = useAuthStore((state) => state.status)
  if (status === 'authorized') {
    return <Outlet />
  } else {
    return <Navigate to='/admin/login' />
  }
}

export default PrivateRoute
