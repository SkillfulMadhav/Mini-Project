import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();//central authentication system

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  /* CHECK COOKIE ON LOAD */
  useEffect(() => {
    const cookies = document.cookie.split(";");
    cookies.forEach((c) => {
      let [key, value] = c.trim().split("=");
      if (key === "autodocUser") {
        setUser(value);
      }
    });
  }, []);

  /* LOGIN */
  const login = (username) => {
    document.cookie = "autodocUser=" + username + "; path=/";
    setUser(username);//controls entire app login state
  };

  /* LOGOUT */
  const logout = () => {
    document.cookie =
      "autodocUser=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}