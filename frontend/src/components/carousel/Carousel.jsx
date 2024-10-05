import React from "react";
import Slider from "infinite-react-carousel";
import CategoryCard from "../cards/CategoryCard";
import { Link } from "react-router-dom";
import ProjectCard from "../cards/ProjectCard";

const Carousel = (props) => {
  const {
    items,
    heading,
    seeMore,
    customClasses,
    arrowsScroll,
    slidesToShow,
    cardType,
    adaptiveHeight,
  } = props;
  return (
    <>
      <div className={`${customClasses ? customClasses : ""}`}>
        <div
          className={`max-w-screen-2xl mx-auto py-10 sm:py-12 md:py-20 px-8 sm:px-12 md:px-12 Round-Arrow-Dots`}
        >
          <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center mr-8">
            <h2 className="font-bold text-3xl mb-8">{heading}</h2>
            {seeMore && (
              <Link to={seeMore}>
                <span className="text-blue-400 font-bold cursor-pointer">
                  See More {">"}
                </span>
              </Link>
            )}
          </div>
          <Slider
            key={slidesToShow}
            arrows
            arrowsScroll={arrowsScroll}
            slidesToShow={slidesToShow}
            adaptiveHeight={adaptiveHeight}
            centerMode={true}
          >
            {items.map((card, index) => {
              switch (cardType) {
                case "categoryCard":
                  return (
                    <div key={index} className="hello">
                      <CategoryCard card={card} />
                    </div>
                  );

                case "projectCard":
                  return (
                    <div key={index} className="py-4">
                      <ProjectCard card={card} />
                    </div>
                  );

                default:
                  return "";
              }
            })}
          </Slider>
        </div>
      </div>
    </>
  );
};

export default Carousel;
