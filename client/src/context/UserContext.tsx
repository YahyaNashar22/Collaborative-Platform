import React, { createContext, useContext, useState } from "react";

interface UserContextType {
  currentUserId: string | null;
  setCurrentUserId: (id: string | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  return (
    <UserContext.Provider value={{ currentUserId, setCurrentUserId }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
