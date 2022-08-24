import { createContext } from 'react';
import { UserContextInterface } from '../types/UserInterface';

export const UserContext = createContext<UserContextInterface>({ setUser: () => {} });
