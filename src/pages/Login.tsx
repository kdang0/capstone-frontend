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


type Quote = {
  q: string;
  a: string;
}

axios.defaults.withCredentials = true;

export const Login = () => {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [quote, setQuote] = useState<Quote>({q:"", a:""});
  const { login, user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    //Fetch random quote
    async function fetchQuote(){
      const res = await axios.get('http://localhost:4000/quote');
      const data = res.data;
      console.log(data);
      setQuote(data);
    }
    fetchQuote();
    //If the user is authenticated then send them to the class dashboard
    if(user){
        navigate('/class');
    }
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
    <div className='displayFlex flexColumn alignItemsCenter container gap10 padding15'>
      <h1>Login</h1>
      <p>"{quote.q}" - {quote.a}</p>
      <form className='displayFlex flexColumn gap10' onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            type="text"
            value={userName}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="container displayFlex justifyContentCenter">
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};
