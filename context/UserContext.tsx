import { User } from '@/models/user';
import { UserServiceAsyncStorage } from '@/services/UserServiceAsyncStorage';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface UserContextProps {
  user: User | null;
  setUser: (user: User) => void;
  refreshUser: () => Promise<void>;
}

const UserContext = createContext<UserContextProps>({
  user: null,
  setUser: () => {},
  refreshUser: async () => {},
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const refreshUser = async () => {
    const storedUser = await UserServiceAsyncStorage.getUser();
    if (storedUser) {
      setUser(storedUser);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  const contextValue = React.useMemo(() => ({ user, setUser, refreshUser }), [user, setUser]);

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
