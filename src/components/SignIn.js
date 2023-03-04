import styled from "styled-components";
import customAxios from "../utils/customAxios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../features/loginSlice";

const Wrapper = styled.div`

`;

export default function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignIn() {
    try {
      const response = await customAxios.post(`${process.env.REACT_APP_SERVER_URL}/auth/signin`, { email, password });
      localStorage.setItem("user-mwm", JSON.stringify(response.data.user));
      localStorage.setItem("signinToken", JSON.stringify(response.data.token));
      dispatch(setUser(response.data.user));
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
