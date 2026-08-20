import { useContext } from 'react';
import { AuthContext } from './authContextValue';

export const useAdminAuth = () => useContext(AuthContext);
