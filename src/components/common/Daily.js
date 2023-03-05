import styled from "styled-components";
import customAxios from "../../utils/customAxios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { format } from "date-fns";

const Wrapper = styled.div`
  height: 100px;
  border: 1px solid #ededed;

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

  .memo {
    width: 97%;
    border: 1px solid transparent;
    background-color: transparent;
    transition: 0.3s all ease;
  }

  .memo:hover {
    border-color: #ededed;
    color: white;
  }

  .memo:focus {
    border-color: #ededed;
    color: white;
  }

  @media only screen and (min-device-width : 375px) and (max-device-width : 479px) {
    select {
      padding: 0 3px;
    }

    select.category {
      font-size: 0.6rem;
    }

    select.place {
      font-size: 0.9rem;
    }
  }
`;

export default function Daily({ date, setErrorHTML, placeList, categoryList }) {
  const isLogined = useSelector(state => state.login.isLogined);
  const displayedDate = format(date, "yyyy-MM-dd");
  const todayDate = format(new Date(), "yyyy-MM-dd");
  const [displayedPlace, setDisplayedPlace] = useState("");
  const [displayedCategory, setDisplayedCategory] = useState("");

  useEffect(() => {
    if (isLogined) {
      showDisplayedContents();
    }
  }, []);

  async function showDisplayedContents() {
    try {
      const response = await customAxios.get(`${process.env.REACT_APP_SERVER_URL}/daily/${displayedDate}`);

      if (response.data?.daily) {
        setDisplayedPlace(response.data.daily.place);
        setDisplayedCategory(response.data.daily.category);
      }
    } catch (err) {
      setErrorHTML(err.response.data);
    }
  }

  async function addCategory(e) {
    try {
      const data = {
        date: displayedDate,
        category: e.target.value,
      };
      await customAxios.post(`${process.env.REACT_APP_SERVER_URL}/daily/category`, data);
    } catch (err) {
      setErrorHTML(err.response.data);
    }
  }

  async function addPlace(e) {
    try {
      const data = {
        date: displayedDate,
        place: e.target.value,
      };
      await customAxios.post(`${process.env.REACT_APP_SERVER_URL}/daily/place`, data);
    } catch (err) {
      setErrorHTML(err.response.data);
    }
  }

  return (
    <Wrapper dateColor={displayedDate === todayDate ? "#00B7FF" : ""}>
      <div className="date" >{date.getDate()}</div>
      <select className="category" onChange={addCategory}>
        <option value=""></option>
        {categoryList?.map(item => <option key={item} value={item} selected={item === displayedCategory}>{item}</option>)}
      </select>
      <select className="place" onChange={addPlace}>
        <option value=""></option>
        {placeList?.map(item => <option key={item} value={item} selected={item === displayedPlace}>{item}</option>)}
      </select>
      <input className="memo" />
    </Wrapper>
  );
}
