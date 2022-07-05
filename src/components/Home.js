import React, { useState } from "react";
import ReactDom from "react-dom";
import Card from "./Card";
import sdata from "./sdata";
// import "../node_modules/react-bootstrap/dist/react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
import { Carousel } from "react-bootstrap";
import Footer from "./Footer";
// import { useSelector, useDispatch } from "react-redux";
// import { incrementValue } from "../slices/userLoginSlice";
// const ncard = (val) => {
//   return <Card imgsrc={val.imgsrc} price={val.price} sname={val.sname} />;
// };
function Home() {
  // let data = useSelector((state) => state.user);
  // let dispatch = useDispatch();
  // console.log(data);
  return (
    <>
      {/* <h1>{data.value}</h1>
      <button
        className="btn btn-success"
        onClick={() => dispatch(incrementValue(200))}
      >
        Increment
      </button> */}
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://images-eu.ssl-images-amazon.com/images/G/31/img2020/img21/apparelGW/U599/jun22/eoss/apay/WA_3000._CB633632198_.jpg"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://images-eu.ssl-images-amazon.com/images/G/31/img21/June2022GW/New_FDFO_Stripe/Apay_ICICI/Sports-shoes/EOSS-GW-PC-Bunk_05_3000x._CB633814328_.jpg"
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            // src="https://images-eu.ssl-images-amazon.com/images/G/31/img21/Wireless/WLA/unrec/D39822856_WLA_BAU_GW-Unrec-heroes_DesktopTallHero_3000x1200_p._CB623159886_.jpg"
            src="https://images-eu.ssl-images-amazon.com/images/G/31/img20/AmazonLaunchpad/2022/EBD/June/2x_EBD_Hero_1_PC._CB633803451_.jpg"
            //https://images-eu.ssl-images-amazon.com/images/G/31/img22/Audio/UnrecHeros/Under1499/Under1499_Tallhero_3000x1200._CB636198468_.jpg
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>

      {/* <Card
          imgsrc={sdata[0].imgsrc}
          price={sdata[0].price}
          sname={sdata[0].sname}
        /> */}
      <div className="products">
        {/* {sdata.map(ncard)} */}
        {sdata.map((val) => {
          return (
            <Card imgsrc={val.imgsrc} price={val.price} sname={val.sname} />
          );
        })}
      </div>
      <Footer />
    </>
  );
}

export default Home;
