import styled from "styled-components";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Wrapper = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  height: 5vh;
  min-height: 5vh;
  width: 100vw;
  background-color: #292929;

  .title {
    font-weight: 600;
  }

  a {
    color: #00B7FF;
    text-decoration: none;
  }

  .button-default {
    margin: 5px;
    padding: 3px 7px;
    font-size: 0.8rem;
    color: rgb(122, 173, 255);
    background-color: #ededed;
    border: 1px solid #ededed;
    border-radius: 5px;
    transition: 0.3s all ease;

    :hover {
      background-color: rgb(122, 173, 255);
      color: white;
      cursor: pointer;
    }
  }
`;

export default function Header ({ onLogin, isLogined }) {
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();

  async function handleSignOut() {
    await axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/signout`);
    window.localStorage.clear();
    setUsername("");
    onLogin(false);
    return navigate("/");
  }

  async function handleSignIn() {
    try {
      await axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/signin`);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleSignUp() {
    try {
      await axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/signup`);
    } catch (err) {
      console.error(err);
    }
  }

  const [username, setUsername] = useState(JSON.parse(localStorage.getItem("user"))?.displayName);

  return (
    <Wrapper>
      <span className="title"><Link to="/">My Workout Manager</Link></span>
      <span><Link to="/setting">Setting</Link></span>
      <span><Link to="/analysis">Analysis</Link></span>
      <span>user : {username}</span>
      {isLogined
        ? <button className="button-default" onClick={handleSignOut}>Sign out</button>
        : <div>
            <button className="button-default" onClick={handleSignIn}>Sign in</button>
            <button className="button-default" onClick={handleSignUp}>Sign Up</button>
          </div>}
    </Wrapper>
  );
}
