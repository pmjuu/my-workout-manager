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

  .place-selection {
    width: 100%;
    border-color: #292929;
    background-color: transparent;
    color: white;
    transition: 0.3s all ease;
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
  }

  .place-selection:hover {
    border-color: #ededed;
  }
`;

export default function Daily({ date }) {
  const givenDate = date.toISOString().slice(0,10);
  const todayDate = new Date().toISOString().slice(0,10);
  const [isToday, setIsToday] = useState(givenDate === todayDate);

  return (
    <Wrapper color={isToday ? "#00B7FF" : ""}>
      <div className="date" >{date.getDate()}</div>
      <form>
        <select className="place-selection">
          <option key="1" value="default"></option>
          <option key="2" value="신림">신림</option>
        </select>
      </form>
    </Wrapper>
  );
}
