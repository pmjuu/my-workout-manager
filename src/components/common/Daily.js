import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Wrapper = styled.div`
  min-width: 50px;
  width: 80px;
  height: 100px;
  border: 1px solid #ededed;

  @media only screen and (min-device-width : 375px) and (max-device-width : 479px) {
    width: 50px;
  }

  .date {
    margin-bottom: 3px;
    color: ${props => props.dateColor};
    text-align: center;
    font-weight: 600;
  }

  select {
    width: 99%;
    padding: 2px 3px;
    border: 1px solid transparent;
    background-color: transparent;
    color: white;
    font-size: 1rem;
    transition: 0.3s all ease;
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
  }

  select:hover {
    border-color: #ededed;
    color: white;
  }

  select.category {
    font-size: 0.9rem;
    color: #a0a0a0;
  }

  .text-input {
    width: 97%;
    border: 1px solid transparent;
    background-color: transparent;
    transition: 0.3s all ease;
  }

  .text-input:hover {
    border-color: #ededed;
    color: white;
  }

  .text-input:focus {
    border-color: #ededed;
    color: white;
  }
`;

export default function Daily({ date, setErrorHTML, placeList, categoryList }) {
  axios.defaults.withCredentials = true;
  const isLogined = useSelector(state => state.login.isLogined);
  const displayedDate = date.toISOString().slice(0,10);
  const todayDate = new Date().toISOString().slice(0,10);
  const [displayedPlace, setDisplayedPlace] = useState("");

  useEffect(() => {
    if (isLogined) {
      showDisplayedContents();
    }
  }, []);

  async function showDisplayedContents() {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/daily/${displayedDate}`);
      response.data?.daily && setDisplayedPlace(response.data.daily.place);
    } catch (err) {
      setErrorHTML(err.response.data);
    }
  }

  async function submitCategory() {}

  async function submitPlace(e) {
    try {
      const data = {
        date: displayedDate,
        place: e.target.value,
      };
      await axios.post(`${process.env.REACT_APP_SERVER_URL}/daily/place`, data);
      setDisplayedPlace(e.target.value);
    } catch (err) {
      setErrorHTML(err.response.data);
    }
  }

  return (
    <Wrapper dateColor={displayedDate === todayDate ? "#00B7FF" : ""}>
      <div className="date" >{date.getDate()}</div>
      <select className="category" onChange={submitCategory}>
        <option value="default"></option>
        {categoryList?.map(item => <option key={item} value={item}>{item}</option>)}
      </select>
      <select onChange={submitPlace}>
        <option value="default"></option>
        {placeList?.map(item => <option selected={item === displayedPlace} value={item} key={item}>{item}</option>)}
      </select>
      {/* <input className="text-input" />
      <input className="text-input" /> */}
    </Wrapper>
  );
}
