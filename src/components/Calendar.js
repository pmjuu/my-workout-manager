import styled from "styled-components";
import { useState } from "react";
import Daily from "./common/Daily";

const Wrapper = styled.section`
  display: flex;
  min-width: 500px;
  width: 500px;
  max-width: 500px;
  height: 90vh;

  .main-calendar {
    box-shadow: 0px 1px 5px 1px rgba(255, 255, 255, 0.1);
  }

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
    grid-template-rows: repeat(9, 1fr);

    min-height: 88vh;
    height: 88vh;
    overflow: scroll;
  }
`;

export default function Calendar() {
  const [firstDay, setFirstDay] = useState("MON");
  const defaultDayList = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const dayList = getDayList(firstDay);

  function getDayList(firstDay) {
    const firstDayIndex = defaultDayList.indexOf(firstDay);

    return defaultDayList.map((day, i) => defaultDayList[(firstDayIndex + i) % 7]);
  }

  const prevWeeks = 4;
  const dateList = [];
  const date = new Date();
  date.setDate(date.getDate() - date.getDay() + defaultDayList.indexOf(firstDay) - prevWeeks * 7);

  for (let i = 0; i < 35; i += 1) {
    dateList.push(new Date(date.toISOString()));
    date.setDate(date.getDate() + 1);
  }

  const [errorHTML, setErrorHTML] = useState(null);

  return (
    <Wrapper>
      <div>
        <select onChange={e => setFirstDay(e.target.value)}>
          {dayList.map(day => <option key={day} value={day}>{day}</option>)}
        </select>
      </div>
      <div className="main-calendar">
        <div className="first-row">
          {dayList.map((day, i) => <div className="day" key={i}>{day}</div>)}
        </div>
        <div className="dates">
          {dateList.map(date => <Daily key={date.toISOString()} date={date} setErrorHTML={setErrorHTML} />)}
        </div>
        <article className="warning" dangerouslySetInnerHTML={{ __html: errorHTML }} />
      </div>
    </Wrapper>
  );
}
