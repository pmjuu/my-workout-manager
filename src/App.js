import styled from "styled-components";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Calendar from "./components/Calendar";
import Setting from "./components/Setting";
import Analysis from "./components/Analysis";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function App() {

  return (
    <Wrapper>
      <Header />
      <Routes>
        <Route path="/" element={<Calendar />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/analysis" element={<Analysis />} />
      </Routes>
    </Wrapper>
  );
}

export default App;
