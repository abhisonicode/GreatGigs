import React, { useEffect, useState } from "react";
import Hero from "../../components/hero/Hero";
import TrustedBy from "../../components/trustedby/TrustedBy";
import Carousel from "../../components/carousel/Carousel";
import { BaseCategories, cardsData, projects } from "../../data";
import { Link } from "react-router-dom";
import _ from "lodash";

const Home = () => {
  const [slidesToShow, setSlidesToShow] = useState(5); // Default for desktop
  const [gigsToSlide, setGigsToSlide] = useState(4); // Default for desktop

  const updateSlidesToShow = () => {
    if (window.innerWidth <= 780) {
      setSlidesToShow(1); // Mobile
      setGigsToSlide(1); // Mobile
    } else if (window.innerWidth <= 1039) {
      setSlidesToShow(2); // Small Tablet
      setGigsToSlide(2); // Small Tablet
    } else if (window.innerWidth <= 1200) {
      setSlidesToShow(3); // Medium Tablet
    } else if (window.innerWidth <= 1252) {
      setGigsToSlide(2); // Medium Tablet
    } else if (window.innerWidth <= 1500) {
      setSlidesToShow(4); // Large Tablet / Small Desktop
      setGigsToSlide(3); // Large Tablet / Small Desktop
    } else {
      setSlidesToShow(5); // Desktop
      setGigsToSlide(4); // Desktop
    }
  };

  // Throttled version of the update function
  const handleResize = _.throttle(() => {
    updateSlidesToShow();
  }, 200); // Adjust the throttle time as needed

  useEffect(() => {
    updateSlidesToShow(); // Set initial value on mount
    window.addEventListener("resize", handleResize); // Add resize listener

    return () => {
      window.removeEventListener("resize", handleResize); // Cleanup listener on unmount
    };
  }, []);

  useEffect(() => {
    console.log(slidesToShow);
  }, [slidesToShow]);

  return (
    <>
      <Hero />
      <TrustedBy />

      {/* Services Slider */}
      <Carousel
        items={cardsData}
        heading="Popular Services"
        cardType="categoryCard"
        adaptiveHeight={false}
        slidesToShow={slidesToShow}
        arrowsScroll={slidesToShow}
      />

      {/* Business Solutions */}
      <div className="bg-indigo-950">
        <div className="container mx-auto py-12 px-8 md:py-20 md:px-16 grid xl:grid-cols-2 gap-x-44 gap-y-16">
          {/* Left Section  */}
          <div className="flex flex-col gap-y-5 text-white justify-center">
            <div className="font-bolder text-3xl mb-4">
              Advanced solutions and professional talent for businesses
            </div>
            <div className="flex flex-row gap-x-3 justify-start items-center">
              <svg
                width="24"
                height="24"
                viewBox="0 0 14 14"
                xmlns="http://www.w3.org/2000/svg"
                fill="#B1ABFF"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8.203.432a1.891 1.891 0 0 0-2.406 0l-1.113.912a1.904 1.904 0 0 1-.783.384l-1.395.318c-.88.2-1.503.997-1.5 1.915l.007 1.456c0 .299-.065.594-.194.863L.194 7.59a1.978 1.978 0 0 0 .535 2.388l1.12.903c.231.185.417.422.543.692l.615 1.314a1.908 1.908 0 0 0 2.166 1.063l1.392-.33c.286-.068.584-.068.87 0l1.392.33a1.908 1.908 0 0 0 2.166-1.063l.615-1.314c.126-.27.312-.507.542-.692l1.121-.903c.707-.57.93-1.563.535-2.388l-.625-1.309a1.983 1.983 0 0 1-.194-.863l.006-1.456a1.947 1.947 0 0 0-1.5-1.915L10.1 1.728a1.904 1.904 0 0 1-.784-.384L8.203.432Zm2.184 5.883a.742.742 0 0 0 0-1.036.71.71 0 0 0-1.018 0L6.565 8.135 5.095 6.73a.71.71 0 0 0-1.018.032.742.742 0 0 0 .032 1.036L6.088 9.69a.71.71 0 0 0 1.001-.016l3.297-3.359Z"
                ></path>
              </svg>
              <div className="font-bold">
                GreatGigs Pro
                <div className="font-normal">
                  Access top freelancers and professional business tools for any
                  project
                </div>
              </div>
            </div>
            <div className="flex flex-row gap-x-3 justify-start items-center">
              <svg
                width="24"
                height="24"
                viewBox="0 0 14 14"
                xmlns="http://www.w3.org/2000/svg"
                fill="#B1ABFF"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8.203.432a1.891 1.891 0 0 0-2.406 0l-1.113.912a1.904 1.904 0 0 1-.783.384l-1.395.318c-.88.2-1.503.997-1.5 1.915l.007 1.456c0 .299-.065.594-.194.863L.194 7.59a1.978 1.978 0 0 0 .535 2.388l1.12.903c.231.185.417.422.543.692l.615 1.314a1.908 1.908 0 0 0 2.166 1.063l1.392-.33c.286-.068.584-.068.87 0l1.392.33a1.908 1.908 0 0 0 2.166-1.063l.615-1.314c.126-.27.312-.507.542-.692l1.121-.903c.707-.57.93-1.563.535-2.388l-.625-1.309a1.983 1.983 0 0 1-.194-.863l.006-1.456a1.947 1.947 0 0 0-1.5-1.915L10.1 1.728a1.904 1.904 0 0 1-.784-.384L8.203.432Zm2.184 5.883a.742.742 0 0 0 0-1.036.71.71 0 0 0-1.018 0L6.565 8.135 5.095 6.73a.71.71 0 0 0-1.018.032.742.742 0 0 0 .032 1.036L6.088 9.69a.71.71 0 0 0 1.001-.016l3.297-3.359Z"
                ></path>
              </svg>
              <div className="font-bold">
                GreatGigs Certified
                <div className="font-normal">
                  Build your own branded marketplace of certified experts
                </div>
              </div>
            </div>
            <div className="flex flex-row gap-x-3 justify-start items-center mb-4">
              <svg
                width="24"
                height="24"
                viewBox="0 0 14 14"
                xmlns="http://www.w3.org/2000/svg"
                fill="#B1ABFF"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8.203.432a1.891 1.891 0 0 0-2.406 0l-1.113.912a1.904 1.904 0 0 1-.783.384l-1.395.318c-.88.2-1.503.997-1.5 1.915l.007 1.456c0 .299-.065.594-.194.863L.194 7.59a1.978 1.978 0 0 0 .535 2.388l1.12.903c.231.185.417.422.543.692l.615 1.314a1.908 1.908 0 0 0 2.166 1.063l1.392-.33c.286-.068.584-.068.87 0l1.392.33a1.908 1.908 0 0 0 2.166-1.063l.615-1.314c.126-.27.312-.507.542-.692l1.121-.903c.707-.57.93-1.563.535-2.388l-.625-1.309a1.983 1.983 0 0 1-.194-.863l.006-1.456a1.947 1.947 0 0 0-1.5-1.915L10.1 1.728a1.904 1.904 0 0 1-.784-.384L8.203.432Zm2.184 5.883a.742.742 0 0 0 0-1.036.71.71 0 0 0-1.018 0L6.565 8.135 5.095 6.73a.71.71 0 0 0-1.018.032.742.742 0 0 0 .032 1.036L6.088 9.69a.71.71 0 0 0 1.001-.016l3.297-3.359Z"
                ></path>
              </svg>
              <div className="font-bold">
                GreatGigs Enterprise
                <div className="font-normal">
                  Manage your freelance workforce and onboard additional talent
                  with an end-to-end SaaS solution
                </div>
              </div>
            </div>
            <button className="rounded bg-white text-indigo-950 px-6 py-2 font-bold w-max">
              Learn More
            </button>
          </div>

          {/* Right Section */}
          <div className="flex justify-center items-center">
            <img
              src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_870,dpr_1.0/v1/attachments/generic_asset/asset/51c35c7cecf75e6a5a0110d27909a2f5-1690202609364/EN.png"
              alt=""
            />
          </div>
        </div>
      </div>

      {/* Gigs Categores Icons */}
      <div className="container mx-auto py-12 px-8 md:py-20 md:px-16">
        <h2 className="font-bold text-3xl mb-12 text-center">
          {"You need it, we've got it"}
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-y-12 gap-x-5">
          {BaseCategories.map((category, index) => {
            return (
              <Link to={"/gigs?search=" + category} key={index}>
                <div className="flex flex-col justify-center items-center gap-y-3 cursor-pointer group">
                  <div className="">
                    <img
                      src={
                        "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/graphics-design.91dfe44.svg"
                      }
                      alt={category}
                      className="w-12 h-12 pb-2"
                    />
                    <span className="border-b-2 h-1 block border-zinc-400 transition-all ease-in-out duration-300 group-hover:scale-x-150 group-hover:border-blue-500"></span>
                  </div>
                  <span className="text-base text-center">{category}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Popular Gigs Slider */}
      <Carousel
        items={projects}
        customClasses="bg-gray-100"
        heading="Inspiring work made on GreatGigs"
        seeMore={"/gigs"}
        slidesToShow={gigsToSlide}
        arrowsScroll={gigsToSlide}
        cardType="projectCard"
        adaptiveHeight={true}
      />
    </>
  );
};

export default Home;
