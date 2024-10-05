import React from "react";
import { Link } from "react-router-dom";

const CategoryCard = (props) => {
  const { card } = props;
  return (
    <>
      <Link to="/home">
        <div className="min-h-[350px] rounded cursor-pointer flex justify-center">
          <span className="absolute top-4  text-white font-regular">
            {card?.subTitle}
          </span>
          <h3 className="absolute top-10  text-white font-bold text-2xl">
            {card.title}
          </h3>
          <img
            src={card.imageURL}
            className="rounded object-cover mr-0"
            alt=""
          />
        </div>
      </Link>
    </>
  );
};

export default CategoryCard;
