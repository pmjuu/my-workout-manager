import styled from "styled-components";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`

`;

export default function SignIn({ onLogin }) {
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignIn() {
    try {
      await axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/signin`, { email, password });
      onLogin(true);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Wrapper>
      <h1>Sign In</h1>
      <div>Email: <input name="email" onChange={e => setEmail(e.target.value)} required /></div>
      <div>Password: <input type="password" name="password" onChange={e => setPassword(e.target.value)} required /></div>
      <button className="button-default" onClick={handleSignIn}>Sign in</button>
    </Wrapper>
  );
}
