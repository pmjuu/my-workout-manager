import styled from "styled-components";
import customAxios from "../utils/customAxios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Wrapper = styled.div`
  .button-default.setting {
    padding: 0 4px;
    font-size: 1.2rem;
  }

  .button-default.delete {
    padding: 0 3px;
    background-color: transparent;
    border: none;
    color: #AF4141;

    :hover {
      background-color: #AF4141;
      color: white;
    }
  }

  .warning {
    color: gray;
  }
`;

export default function Setting() {
  const isLogined = useSelector(state => state.login.isLogined);
  const [errorHTML, setErrorHTML] = useState(null);
  const [category, setCategory] = useState("");
  const [place, setPlace] = useState("");
  const [categoryList, setCategoryList] = useState(null);
  const [placeList, setPlaceList] = useState(null);

  useEffect(() => {
    if (isLogined) {
      showUserInfo();
    }
  }, []);

  async function showUserInfo() {
    try {
      const response = await customAxios.get(`${process.env.REACT_APP_SERVER_URL}/setting/`);
      setCategoryList(response.data.user.categories);
      setPlaceList(response.data.user.places);
    } catch (err) {
      setErrorHTML(err.response.data);
    }
  }

  async function showCategoryList() {
    try {
      const response = await customAxios.get(`${process.env.REACT_APP_SERVER_URL}/setting/category`);
      setCategoryList(response.data.categories);
    } catch (err) {
      setErrorHTML(err.response.data);
    }
  }

  async function addCategory() {
    try {
      await customAxios.post(`${process.env.REACT_APP_SERVER_URL}/setting/category`, { category });
      setCategory("");
      showCategoryList();
    } catch (err) {
      setErrorHTML(err.response.data);
    }
  }

  async function showPlaceList() {
    try {
      const response = await customAxios.get(`${process.env.REACT_APP_SERVER_URL}/setting/place`);
      setPlaceList(response.data.places);
    } catch (err) {
      setErrorHTML(err.response.data);
    }
  }

  async function addPlace() {
    try {
      await customAxios.post(`${process.env.REACT_APP_SERVER_URL}/setting/place`, { place });
      setPlace("");
      showPlaceList();
    } catch (err) {
      setErrorHTML(err.response.data);
    }
  }

  async function deleteCategory(e) {
    const item = e.target.parentElement.innerText.slice(0, -2);

    try {
      await customAxios.delete(`${process.env.REACT_APP_SERVER_URL}/setting/category`, { data: { item } });
      showCategoryList();
    } catch (err) {
      setErrorHTML(err.response.data);
    }
  }

  async function deletePlace(e) {
    const item = e.target.parentElement.innerText.slice(0, -2);

    try {
      await customAxios.delete(`${process.env.REACT_APP_SERVER_URL}/setting/place`, { data: { item } });
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
          {categoryList?.map(item => <li key={item}>{item} <button className="button-default delete" onClick={deleteCategory}>X</button></li>)}
        </ul>
        <input value={category} onChange={e => setCategory(e.target.value)} />
        <button className="button-default setting" onClick={addCategory}>+</button>
      </article>
      <article>
        <h2>Workout Places</h2>
        <ul>
          {placeList?.map(item => <li key={item}>{item} <button className="button-default delete" onClick={deletePlace}>X</button></li>)}
        </ul>
        <input value={place} onChange={e => setPlace(e.target.value)} />
        <button className="button-default setting" onClick={addPlace}>+</button>
      </article>

      <hr />
      <article className="warning" dangerouslySetInnerHTML={{ __html: errorHTML }} />
    </Wrapper>
  );
}
