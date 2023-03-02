import styled from "styled-components";
import Daily from "./common/Daily";

const Wrapper = styled.section`
  /* display: grid; */
  min-width: 300px;
  width: 500px;
  max-width: 500px;
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
  const dayTypeList = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const prevWeeks = 6;

  const dateList = [];
  const date = new Date();
  date.setDate(date.getDate() - date.getDay() - prevWeeks * 7);

  for (let i = 0; i < 70; i += 1) {
    dateList.push(new Date(date.toISOString()));
    date.setDate(date.getDate() + 1);
  }

  return (
    <Wrapper>
      <div className="first-row">
        {dayTypeList.map((day, i) => <div className="day" key={i}>{day}</div>)}
      </div>
      <div className="dates">
        {dateList.map(date => <Daily key={date.toISOString()} date={date} />)}
      </div>
    </Wrapper>
  );
}
