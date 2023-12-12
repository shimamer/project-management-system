/** @format */
import { jwtDecode } from "jwt-decode";
import PropTypes from "prop-types";

import { createContext, ReactNode, useEffect, useState } from "react";

interface AuthContextProviderProps {
  children: ReactNode;
}

interface JwtHeader {
  username: string;
  exp: number;
}

interface AuthContextProps {
  baseUrl: string;
  headerAuth: string;
  userData: JwtHeader | null;
  isLogin: boolean;
}

const AuthContext = createContext<AuthContextProps | null>(null);

const baseUrl: string = "http://upskilling-egypt.com:3003/api/v1";
const headerAuth: string = `Bearer ${localStorage.getItem("adminToken")}`;

const AuthContextProvider: React.FC<AuthContextProviderProps> = (props) => {
  const [userData, setUserData] = useState<JwtHeader | null>(null);
  // const [authUser,setAuthUser]=useState(null);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    let token: string | null = localStorage.getItem("tokenUser");
    if (token) {
      setIsLogin(isLogin);
      const decodedToken = jwtDecode(token) as JwtHeader;
      setUserData(decodedToken);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ baseUrl, headerAuth, userData, isLogin }}>
      {props.children}
    </AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthContext, AuthContextProvider };
