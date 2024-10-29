import { ReactNode, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import axios from "axios";



axios.defaults.withCredentials = true;

type User = {
  _id: string;
  userName: string;
  firstName: string;
  lastName: string;
  role: string;
};

interface AuthContextType {
  user: User | undefined | null;
  login: (data: User) => void;
  logout: () => void;
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | undefined | null>(undefined);
  useEffect(() => {
    async function fetchUser(){
        const res = await axios.get('http://localhost:4000/profile');
        const data = res.data;
        const userData = data.user;
        console.log(userData);
        if(userData) {
            setUser(userData);
        } else{
            setUser(null);  
        } 
    }
    fetchUser();
  }, []);
  const navigate = useNavigate();
  
  const login = (data: User) => {
    setUser(data);
    navigate("/class");
  };
  const logout = () => {
    setUser(null);
    navigate("/", { replace: true });
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
