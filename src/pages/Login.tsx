import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

type User = {
  _id: string;
  userName: string;
  firstName: string;
  lastName: string;
  role: string;
};

axios.defaults.withCredentials = true;

export const Login = () => {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if(user){
        navigate('/class');
    };
  },[user,navigate]);
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:4000/login", {
      username: userName,
      password: password,
    });
    const data = res.data;
    const user: User = data.user;
    console.log(user);
    if (user) {
      login(user);
    } else {
      alert(data);
    }
  };


  return (
    <form onSubmit={handleLogin}>
      <label htmlFor="username">Username:</label>
      <input
        id="username"
        type="text"
        value={userName}
        onChange={(e) => setUsername(e.target.value)}
      />
      <label htmlFor="password">Password:</label>
      <input
        id="password"
        type="text"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
};
