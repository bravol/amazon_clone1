import React from "react";
import "../styles/Home.css";
import Header from "./Header";
import Product from "./Product";

function Home() {
  return (
    <>
      <Header />

      <div className="home">
        <div className="home__container">
          <img
            className="home__image"
            src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
            alt=""
          />
          <div className="home__row">
            <Product
              id="13"
              title="Lorem ipsum dolor sit amet, consectetur adipiscing elit,"
              price="100"
              image="https://images-na.ssl-images-amazon.com/images/I/71HuyKCcs4L._AC_UL127_SR127,127_.jpg"
              rating={5}
            />
            <Product
              id="14"
              title="Lorem ipsum dolor sit amet, consectetur adipiscing elit,"
              price="100"
              image="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2021/September/DashboardCards/Fuji_Dash_SmartWatch_1X._SY304_CB639922137_.jpg"
              rating={5}
            />
          </div>
          <div className="home__row">
            <Product
              id="15"
              title="Lorem ipsum dolor sit amet, consectetur adipiscing elit,"
              price="100"
              image="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2021/September/DashboardCards/Fuji_Dash_Fitness_1X._SY304_CB639748186_.jpg"
              rating={5}
            />
            <Product
              id="16"
              title="Lorem ipsum dolor sit amet, consectetur adipiscing elit,"
              price="100"
              image="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Dashboard/Fuji_Dash_StripLighting_379x304_1X_en_US._SY304_CB418597476_.jpg"
              rating={5}
            />
            <Product
              id="17"
              title="Lorem ipsum dolor sit amet, consectetur adipiscing elit,"
              price="100"
              image="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Dashboard/Fuji_Dash_Laptops_379x304_1X_en_US._SY304_CB418608471_.jpg"
              rating={5}
            />
          </div>
          <div className="home__row">
            <Product
              id="18"
              title="Lorem ipsum dolor sit amet, consectetur adipiscing elit,"
              price="100"
              image="https://m.media-amazon.com/images/I/81IT4HwC3VL._AC_SY200_.jpg"
              rating={5}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
