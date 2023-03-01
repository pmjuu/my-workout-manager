import styled from "styled-components";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Calendar from "./components/Calendar";
import Setting from "./components/Setting";
import Analysis from "./components/Analysis";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function App() {
  const [isLogined, setIsLogined] = useState(Boolean(localStorage.getItem("user")));

  return (
    <Wrapper>
      <Header onLogin={(e) => setIsLogined(e)} isLogined={isLogined} />
      <Routes>
        <Route path="/" element={<Calendar />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/analysis" element={<Analysis />} />
      </Routes>
    </Wrapper>
  );
}

export default App;
