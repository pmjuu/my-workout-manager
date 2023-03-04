import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Daily from "./common/Daily";

const Wrapper = styled.div`
  display: flex;
  height: 90vh;

  @media only screen and (min-device-width : 375px) and (max-device-width : 479px) {
    flex-direction: column;
  }

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
  axios.defaults.withCredentials = true;
  const isLogined = useSelector(state => state.login.isLogined);
  const defaultDayList = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const [firstDay, setFirstDay] = useState("MON");
  const dayList = getDayList(firstDay);

  function getDayList(firstDay) {
    const firstDayIndex = defaultDayList.indexOf(firstDay);

    return defaultDayList.map((day, i) => defaultDayList[(firstDayIndex + i) % 7]);
  }

  const prevWeeks = 5;
  const date = new Date();
  date.setDate(date.getDate() - date.getDay() + defaultDayList.indexOf(firstDay) - prevWeeks * 7);
  const dateList = [];

  for (let i = 0; i < 42; i += 1) {
    dateList.push(new Date(date.toISOString()));
    date.setDate(date.getDate() + 1);
  }

  const [placeList, setPlaceList] = useState(null);
  const [categoryList, setCategoryList] = useState(null);

  useEffect(() => {
    if (isLogined) {
      getPlaceList();
      getCategoryList();
    }
  }, []);

  async function getPlaceList() {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/setting/place`);
      setPlaceList(response.data.places);
    } catch (err) {
      setErrorHTML(err.response.data);
    }
  }

  async function getCategoryList() {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/setting/category`);
      setCategoryList(response.data.categories);
    } catch (err) {
      setErrorHTML(err.response.data);
    }
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
          {dateList.map(date => <Daily key={date.toISOString()} date={date} setErrorHTML={setErrorHTML} placeList={placeList} categoryList={categoryList} />)}
        </div>
        <article className="warning" dangerouslySetInnerHTML={{ __html: errorHTML }} />
      </div>
    </Wrapper>
  );
}
