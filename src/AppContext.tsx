import { createContext, useContext } from 'react';

type AppContextType = {
  header?: React.ReactNode;
};

export const AppContext = createContext<AppContextType>({});

export const useAppContext = () => useContext(AppContext);