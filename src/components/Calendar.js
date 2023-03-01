import styled from "styled-components";
import Daily from "./common/Daily";

const Wrapper = styled.section`
  /* display: grid; */
  min-width: 300px;
  width: 600px;
  max-width: 600px;
  height: 90vh;
  box-shadow: 0px 1px 5px 1px rgba(255, 255, 255, 0.1);

  .first-row {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
  }

  .day {
    height: 2vh;
    background-color: gray;
    border: 1px solid #ededed;
    text-align: center;
  }

  .dates {
    display: grid;
    grid-template-columns: repeat(7, 1fr);

    min-height: 88vh;
    height: 88vh;
    /* border: 1px solid black; */
    overflow: scroll;
  }
`;

export default function Calendar() {
  const dayTypeList = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

  return (
    <Wrapper>
      <div className="first-row">
        {dayTypeList.map((day, i) => <div className="day" key={i}>{day}</div>)}
      </div>
      <div className="dates">
        {Array.from(Array(80)).map(i => <Daily />)}
      </div>
    </Wrapper>
  );
}
