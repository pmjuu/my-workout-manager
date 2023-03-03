import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";

const Wrapper = styled.div`
  min-width: 70px;
  width: 70px;
  height: 100px;
  border: 1px solid #ededed;

  .date {
    margin-bottom: 3px;
    color: ${props => props.dateColor};
    text-align: center;
  }

  select {
    width: 99%;
    border: 1px solid transparent;
    background-color: transparent;
    /* color: transparent; */
    color: white;
    transition: 0.3s all ease;
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
  }

  select:hover {
    border-color: #ededed;
    color: white;
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

export default function Daily({ date, setErrorHTML }) {
  axios.defaults.withCredentials = true;
  const displayedDate = date.toISOString().slice(0,10);
  const todayDate = new Date().toISOString().slice(0,10);
  const [categoryList, setCategoryList] = useState(null);
  const [placeList, setPlaceList] = useState(null);
  const [displayedPlace, setDisplayedPlace] = useState("");

  useEffect(() => {
    getCategoryList();
    getPlaceList();
    showDisplayedContents();
  }, []);

  async function getCategoryList() {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/setting/category`);
      setCategoryList(response.data.categories);
    } catch (err) {
      setErrorHTML(err.response.data);
    }
  }

  async function getPlaceList() {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/setting/place`);
      setPlaceList(response.data.places);
    } catch (err) {
      setErrorHTML(err.response.data);
    }
  }

  async function showDisplayedContents() {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/daily/${displayedDate}`);
      response.data?.daily && setDisplayedPlace(response.data.daily.place);
    } catch (err) {
      setErrorHTML(err.response.data);
    }
  }

  async function submitCategory() {
    // try {
    //   const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/daily/category`);
    // } catch (err) {
    //   setErrorHTML(err.response.data);
    // }
  }

  async function submitPlace(e) {
    try {
      const data = {
        date: displayedDate,
        place: e.target.value,
      };
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/daily/place`, data);
      setDisplayedPlace(e.target.value);
    } catch (err) {
      setErrorHTML(err.response.data);
    }
  }

  return (
    <Wrapper dateColor={displayedDate === todayDate ? "#00B7FF" : ""}>
      <div className="date" >{date.getDate()}</div>
      <select onChange={submitCategory}>
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
