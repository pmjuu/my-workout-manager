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

  const [username, setUsername] = useState("");

  return (
    <Wrapper>
      <span className="title"><Link to="/">My Workout Manager</Link></span>
      <span><Link to="/setting">Setting</Link></span>
      <span><Link to="/analysis">Analysis</Link></span>
      <span>user : {username}</span>
      {isLogined
        ? <button className="button-default" onClick={handleSignOut}>Sign out</button>
        : <div>
            <Link className="button-default" to="/signup">Sign Up</Link>
            <Link className="button-default" to="/signin">Sign In</Link>
          </div>}
    </Wrapper>
  );
}
