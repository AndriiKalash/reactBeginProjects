import React, { useEffect, useState } from 'react';
import './index.scss';


function Collection({ name, images }) {
  return (
    <div className="collection">
      <img className="collection__big" src={images[0]} alt="Item" />
      <div className="collection__bottom">
        <img className="collection__mini" src={images[1]} alt="Item" />
        <img className="collection__mini" src={images[2]} alt="Item" />
        <img className="collection__mini" src={images[3]} alt="Item" />
      </div>
      <h4>{name}</h4>
    </div>
  );
}

function App() {

 const categories =  [
  { name: "Все"},
  { name: "Море" },
  { name: "Горы" },
  { name: "Архитектура" },
  { name: "Города" }
 ];
  
  const [data , setData] = useState([]);
  const [activeCategories, setActiveCategories] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  const [isloading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);

  const category = activeCategories > 0 ? `category=${activeCategories}`:""

  

  useEffect(() => {
    
    setIsLoading(true);    fetch(`https://63f695a3ab76703b15c1c124.mockapi.io/photo_colactions?page=${page}&limit=3&${category}`)
    .then((res) => res.json())
    .then(json => {
      // console.log(json);
      setData(json);
    })
    .catch((err) => {
      console.warn(err);
      alert('coud not fetch');
    }) 
    .finally(()=>setIsLoading(false))
  },[activeCategories, page]);

  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {
            categories.map((elem, i)=>{
              return (
                <li key={i} 
                    onClick = {()=>setActiveCategories(i)}
                    className = {activeCategories===i ? "active" : ''}
                >
                  {elem.name}
                </li>
              )
              
            })
          }
        </ul>
        <input value={searchValue}
               onChange={(e)=>setSearchValue(e.target.value)} 
               className="search-input" placeholder="Поиск по названию" />
      </div>
      <div className="content">
        {

          isloading
          ?
         ( <h2>Loading...</h2> )
          :
          (data.filter((obj) => obj.name.toLowerCase().includes(searchValue.toLowerCase()))
          .map((obj) => ( <Collection
                           key={obj.name}
                           name = {obj.name}
                           images = {obj.photos}
                          /> )    
          ))
        }
       
      </div>
      <ul className="pagination">{
        [...Array(5)].map((_,i) => (
          <li onClick={()=>setPage(i+1)} key={i} className={page===(i+1) ? "active": ''} >{i+1}</li>
        ))
      }
      </ul>
    </div>
  );
}

export default App;
