import React from "react";
import { Link } from "react-router-dom";

const ProjectCard = (props) => {
  const { card } = props;
  return (
    <>
      <Link to="/gigs">
        <div className="overflow-hidden rounded-lg cursor-pointer shadow-lg m-4">
          <img src={card.img} className="object-cover mr-0" alt={card.cat} />
          <div className="flex justify-start items-center py-3 px-2 gap-x-5 bg-white">
            <img
              src={card.pp}
              alt=""
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="font-bold">
              {card.cat}
              <div className="font-normal text-sm">by {card.username}</div>
            </div>
          </div>
          <img />
        </div>
      </Link>
    </>
  );
};

export default ProjectCard;
