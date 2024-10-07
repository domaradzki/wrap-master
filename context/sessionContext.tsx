"use client";

import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

const SessionContext = createContext<any>({});

export function AuthSessionProvider({
  children,
  propsData,
}: {
  children: ReactNode;
  propsData: any;
}) {
  const [session, setSession] = useState(propsData);

  useEffect(() => {
    async function fetchSession() {
      setSession(propsData);
    }

    fetchSession();
  }, [propsData]);

  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
}

export const useAuthSession = () => {
  const session = useContext(SessionContext);
  return session;
};
