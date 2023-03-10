import styled from "styled-components";
import customAxios from "../utils/customAxios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../features/loginSlice";

const Wrapper = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  height: 5vh;
  min-height: 5vh;
  width: 100vw;
  min-width: 100vw;
  margin-bottom: 10px;
  background-color: #292929;

  .button-default {
    margin-left: 10px;
  }

  .title {
    font-weight: 600;
  }

  a {
    color: #00B7FF;
    text-decoration: none;
  }

  @media only screen and (min-device-width : 375px) and (max-device-width : 479px) {
    font-size: 0.9rem;
    height: 7vh;
    justify-content: space-around;
    flex-wrap: wrap;

    .button-default {
      font-size: 0.7rem;
    }
  }
`;

export default function Header () {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogined = useSelector(state => state.login.isLogined);
  const username = useSelector(state => state.login.name);

  async function handleSignOut() {
    window.localStorage.clear();
    dispatch(removeUser());

    try {
      await customAxios.post(`${process.env.REACT_APP_SERVER_URL}/auth/signout`);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Wrapper>
      <span className="title"><Link to="/">My Workout Manager</Link></span>
      <span><Link to={isLogined ? "/setting" : "/signin"}>Setting</Link></span>
      <span><Link to={isLogined ? "/analysis" : "/signin"}>Analysis</Link></span>
      {isLogined
        ? <div>
            <span>user : {username}</span>
            <button className="button-default" onClick={handleSignOut}>Sign out</button>
          </div>
        : <div>
            <Link className="button-default" to="/signup">Sign Up</Link>
            <Link className="button-default" to="/signin">Sign In</Link>
          </div>}
    </Wrapper>
  );
}
