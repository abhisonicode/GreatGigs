import React from "react";

const TrustedBy = () => {
  return (
    <div className="py-4 bg-gray-100 text-gray-400">
      <div className="flex flex-wrap justify-center items-center px-5 gap-x-4 md:gap-x-12">
        <span className="font-bold text-2xl">Trusted by:</span>
        <img
          src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/meta.12b5e5c.png"
          alt=""
          className="w-20 md:w-24"
        />
        <img
          src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/google.61e78c8.png"
          alt=""
          className="w-20 md:w-24"
        />
        <img
          src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/netflix.96c5e3f.png"
          alt=""
          className="w-20 md:w-24"
        />
        <img
          src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/pandg.0f4cfc2.png"
          alt=""
          className="w-12 md:w-16"
        />
      </div>
    </div>
  );
};

export default TrustedBy;
