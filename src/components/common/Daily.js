import { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 90px;
  border: 1px solid #ededed;

  .date {
    margin-bottom: 3px;
    color: ${props => props.color};
    text-align: center;
  }

  select {
    width: 99%;
    border: 1px solid #292929;
    background-color: transparent;
    color: white;
    transition: 0.3s all ease;
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
  }

  select:hover {
    border-color: #ededed;
  }

  .text-input {
    width: 97%;
    border: 1px solid #292929;
    border-color: #292929;
    background-color: transparent;
    transition: 0.3s all ease;
  }

  .text-input:hover {
    border-color: #ededed;
    color: white;
  }

  .text-input:focus {
    outline: none;
    color: white;
  }
`;

export default function Daily({ date }) {
  const givenDate = date.toISOString().slice(0,10);
  const todayDate = new Date().toISOString().slice(0,10);
  const [isToday, setIsToday] = useState(givenDate === todayDate);

  function submitPlace() {
    console.log("submit place")
  }

  function submitHealth() {
    
  }

  return (
    <Wrapper color={isToday ? "#00B7FF" : ""}>
      <div className="date" >{date.getDate()}</div>
      <select onChange={submitPlace}>
        <option value="default"></option>
        <option value="클라이밍">클라이밍</option>
      </select>
      <select onChange={submitPlace}>
        <option value="default"></option>
        <option value="신림">신림</option>
      </select>
      <input className="text-input" />
      <input className="text-input" />
    </Wrapper>
  );
}
