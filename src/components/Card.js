import React from "react";
import { FcRating } from "react-icons/fc";
const Card = (props) => {
  return (
    <>
      <div className="card">
        <img src={props.imgsrc} alt="myPic" className="card_img"></img>
        <hr />
        <div className="card_info">
          <FcRating />
          <span className="card_category">{props.price}</span>
          <h3 className="card_title">{props.sname}</h3>
        </div>
      </div>
    </>
  );
};

export default Card;
