import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Wrapper = styled.div`
  .setting {
    padding: 0 4px;
    font-size: 1.2rem;
  }

  .warning {
    color: gray;
  }
`;

export default function Setting() {
  axios.defaults.withCredentials = true;
  const isLogined = useSelector(state => state.login.isLogined);
  const [errorHTML, setErrorHTML] = useState(null);
  const [category, setCategory] = useState("");
  const [place, setPlace] = useState("");
  const [categoryList, setCategoryList] = useState(null);
  const [placeList, setPlaceList] = useState(null);

  useEffect(() => {
    if (isLogined) {
      showCategoryList();
      showPlaceList();
    }
  }, []);

  async function showCategoryList() {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}setting/category`);
      setCategoryList(response.data.categories);
    } catch (err) {
      setErrorHTML(err.response.data);
    }
  }

  async function addCategory() {
    try {
      setCategory("");
      await axios.post(`${process.env.REACT_APP_SERVER_URL}/setting/category`, { category });
      showCategoryList();
    } catch (err) {
      setErrorHTML(err.response.data);
    }
  }

  async function showPlaceList() {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}setting/place`);
      setPlaceList(response.data.places);
    } catch (err) {
      setErrorHTML(err.response.data);
    }
  }

  async function addPlace() {
    try {
      setPlace("");
      await axios.post(`${process.env.REACT_APP_SERVER_URL}/setting/place`, { place });
      showPlaceList();
    } catch (err) {
      setErrorHTML(err.response.data);
    }
  }

  return (
    <Wrapper>
      <h1>Setting</h1>
      <article>
        <h2>Workout Categories</h2>
        <ul>
          {categoryList?.map(item => <li key={item}>{item}</li>)}
        </ul>
        <input value={category} onChange={e => setCategory(e.target.value)} />
        <button className="button-default setting" onClick={addCategory}>+</button>
      </article>
      <article>
        <h2>Workout Places</h2>
        <ul>
          {placeList?.map(item => <li key={item}>{item}</li>)}
        </ul>
        <input value={place} onChange={e => setPlace(e.target.value)} />
        <button className="button-default setting" onClick={addPlace}>+</button>
      </article>

      <hr />
      <article className="warning" dangerouslySetInnerHTML={{ __html: errorHTML }} />
    </Wrapper>
  );
}
