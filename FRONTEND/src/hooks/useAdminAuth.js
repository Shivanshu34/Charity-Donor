// useAdminAuth.js
import { useSelector } from 'react-redux';

export default function useAdminAuth() {
  const { token, currentAdmin } = useSelector(s => s.admin);
  return { token, currentAdmin, isLoggedIn: !!token }; 
} 
