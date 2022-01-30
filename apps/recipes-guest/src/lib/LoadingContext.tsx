import { createContext, ReactElement, useContext, useState } from "react";

export interface LoadingProviderProps {
  children: string | ReactElement | ReactElement[];
}

export interface LoadingProviderInterface {
  loading: boolean;
  handleSetLoading: (isLoading: boolean) => void;
}

const LoadingContext = createContext<LoadingProviderInterface | null>(null);

export const LoadingProvider = ({ children }: LoadingProviderProps) => {
  const [loading, setLoading] = useState(false);

  const handleSetLoading = (isLoading: boolean): void => {
    setLoading(isLoading);
  };

  const LoadingState: LoadingProviderInterface = {
    loading,
    handleSetLoading,
  };

  return (
    <LoadingContext.Provider value={LoadingState}>
      {children}
    </LoadingContext.Provider>
  );
};

export function useLoadingContext() {
  return useContext(LoadingContext);
}
