import styled from "styled-components";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`

`;

export default function SignUp() {
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [name, setName] = useState("");

  async function handleSubmit() {
    try {
      await axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/signup`, { email, password, passwordConfirm, name});
      navigate("/signin");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Wrapper>
      <h1>Sign Up</h1>
      <div>
        영문, 숫자 조합으로 9 ~ 20 자리로 가능합니다.
        사용 가능 특수문자 *
      </div>
        <h2>Essential</h2>
        <div>Email: <input name="email" onChange={e => setEmail(e.target.value)} required /></div>
        <div>Password: <input name="password" onChange={e => setPassword(e.target.value)} required /></div>
        <div>Confirm password: <input name="passwordConfirm" onChange={e => setPasswordConfirm(e.target.value)} required /></div>
        <div>User name: <input name="name" onChange={e => setName(e.target.value)} required /></div>
        {/* <h2>Optional</h2>
        <div>Main workout category: <input name="mainCategory" /></div>
        <div>Workout Places: <input name="places" /></div> */}
        <button className="button-auth" onClick={handleSubmit}>Sign up</button>
    </Wrapper>
  );
}
