import React, { useState } from 'react';
import { UserContext } from '../utils/UserContext';

interface Props {
  children: React.ReactNode;
}

const UserProvider = ({ children }: Props) => {
  const [user, setUser] = useState({ auth: false });

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

export default UserProvider;
