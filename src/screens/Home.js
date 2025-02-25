import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function Home() {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [search, setSearch] = useState('');

  const loadFoodItems = async () => {
    let response = await fetch("http://localhost:5000/api/auth/foodData", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    response = await response.json();
    setFoodItems(response[0]);
    setFoodCat(response[1]);
  };

  useEffect(() => {
    loadFoodItems();
  }, []);

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
          <div className="carousel-inner" id='carousel'>
            <div className="carousel-caption" style={{ zIndex: "9" }}>
              <div className="d-flex justify-content-center">
                <input
                  className="form-control me-2 w-75 bg-white text-dark"
                  type="search"
                  placeholder="Search in here..."
                  aria-label="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button className="btn text-white bg-danger" onClick={() => setSearch('')}>X</button>
              </div>
            </div>
            <div className="carousel-item active">
              <img src="https://i.postimg.cc/fL4H72Sw/indian.webp" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="Indian Food" />
            </div>
            <div className="carousel-item">
              <img src="https://i.postimg.cc/Dyj6rt5K/Momo-ring-20190717185705.jpg" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="Momo" />
            </div>
            <div className="carousel-item">
              <img src="https://i.postimg.cc/JzXXsg2x/Samaybaji-20190717195839.jpg" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="Samay Baji" />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className='container'>
        {foodCat.length !== 0
          ? foodCat.map((data) => {
              return (
                <div className='row mb-3' key={data.id}>
                  <div className='fs-3 m-3'>
                    {data.CategoryName}
                  </div>
                  <hr id="hr-success" style={{ height: "4px", backgroundImage: "-webkit-linear-gradient(left,rgb(0, 255, 137),rgb(0, 0, 0))" }} />
                  {foodItems.length !== 0
                    ? foodItems
                        .filter((items) => items.CategoryName === data.CategoryName && items.name.toLowerCase().includes(search.toLowerCase()))
                        .map((filterItems) => {
                          return (
                            <div key={filterItems.id} className='col-12 col-md-6 col-lg-3'>
                              <Card
                                foodName={filterItems.name}
                                item={filterItems}
                                options={filterItems.options[0]}
                                 ImgSrc={filterItems.img}
                                description={filterItems.description} // Pass the description
                              />
                            </div>
                          );
                        })
                    : <div>No Such Data</div>}
                </div>
              );
            })
          : <div>No Categories Available</div>}
      </div>
      <Footer />
    </div>
  );
}