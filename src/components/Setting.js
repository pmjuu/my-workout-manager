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
      showCategoryList();
      showPlaceList();
    }
  }, []);

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
      setCategory("");
      await customAxios.post(`${process.env.REACT_APP_SERVER_URL}/setting/category`, { category });
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
      setPlace("");
      await customAxios.post(`${process.env.REACT_APP_SERVER_URL}/setting/place`, { place });
      showPlaceList();
    } catch (err) {
      setErrorHTML(err.response.data);
    }
  }

  function deleteCategory(e) {
    const item = e.target.parentElement.__reactFiber$38hiqpvrwtx.key;
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
