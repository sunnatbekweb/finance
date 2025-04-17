import React, { createContext, useContext, useState, useEffect } from "react";
import { refreshAccessToken } from "@/api/auth";

// Тип для данных в контексте
interface AuthContextType {
  accessToken: string | null;
  isLoading: boolean;
  refreshToken: string | null;
  logout: () => void; // Для функции logout
}

// Создаём контекст
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Типизация пропсов AuthProvider, чтобы передавать children
export const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshToken, setRefreshToken] = useState<string | null>(
    localStorage.getItem("refresh_token")
  );

  // Проверка и обновление токенов
  useEffect(() => {
    const checkTokens = async () => {
      const storedAccessToken = localStorage.getItem("access_token");
      if (storedAccessToken) {
        setAccessToken(storedAccessToken);
        setIsLoading(false);
        return;
      }

      if (refreshToken) {
        try {
          const newAccessToken = await refreshAccessToken(); // Вызов рефреша
          setAccessToken(newAccessToken);
        } catch (error) {
          console.error("Failed to refresh access token", error);
        }
      }

      setIsLoading(false);
    };

    checkTokens();
  }, [refreshToken]);

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setAccessToken(null);
    setRefreshToken(null);
  };

  return (
    <AuthContext.Provider value={{ accessToken, isLoading, refreshToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
