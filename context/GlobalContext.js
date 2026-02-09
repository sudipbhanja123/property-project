"use client";
import { useState, createContext, useContext, useEffect } from "react";
import { useSession } from "next-auth/react";
import getUnreadMessageCount from "@/app/actions/getUnreadMessageCount";

//create context
const GlobalContext = createContext();

// create provider
export const GlobalProvider = ({ children }) => {
  const [unreadCount, setUnreadCount] = useState(0);
  const { data: session } = useSession();

  useEffect(() => {
    getUnreadMessageCount().then((res) => {
      if (res.unreadCount) {
        setUnreadCount(res.unreadCount);
      }
    });
  }, [getUnreadMessageCount, session]);

  return (
    <GlobalContext.Provider value={{ unreadCount, setUnreadCount }}>
      {children}
    </GlobalContext.Provider>
  );
};

export function useGlobalContext() {
  return useContext(GlobalContext);
}
