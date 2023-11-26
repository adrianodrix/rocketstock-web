import { BrowserRouter } from 'react-router-dom';

import { useAuth } from "../hooks/auth";

import { AdminRoutes } from './admin.routes';
import { CustomerRoutes } from './customer.routes';
import { SaleRoutes } from './sale.routes';
import { AuthRoutes } from './auth.routes';
import { USER_ROLE } from '../utils/roles';
import { useEffect } from 'react';
import { api } from '../services/api';

export function Routes() {
  const { user, signOut } = useAuth();

  function AccessRoute() {
    switch(user.role) {
      case USER_ROLE.ADMIN: 
        return <AdminRoutes /> 
      case USER_ROLE.CUSTOMER:
        return <CustomerRoutes />
      case USER_ROLE.SALE:
        return <SaleRoutes />
      default:
        return <CustomerRoutes />
    }
  }

  useEffect(() => {
    async function fetchData() {
      try {
        await api.get('users/validated')
      } catch (err) {
        console.log(err)
        if(err.response?.status == 401) {
          signOut()
        }
      }
    }

    fetchData()
  }, [])

  return (
    <BrowserRouter>
      { user ? <AccessRoute /> : <AuthRoutes />}
    </BrowserRouter>
  );
}