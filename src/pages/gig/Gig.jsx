import React, { useContext } from "react";
import { Slider } from "infinite-react-carousel";
import { noAvatarUrl } from "../../data";
import { useNavigate, useParams } from "react-router-dom";
import { GetGigById, GetUserById } from "../../api/restapi";
import { useQuery } from "@tanstack/react-query";
import { ApiStatus } from "../../models/ApiResponse";
import Loader from "../../components/loader/Loader";
import Reviews from "../../components/reviews/Reviews";
import { UserContext } from "../../context/userContext";
import { showErrorAlert } from "../../utils/alerts";

const Gig = () => {
  const { id } = useParams();
  const { loggedInUser } = useContext(UserContext);
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery({
    queryKey: ["gigDetails"],
    queryFn: async () => {
      const { data, status } = await GetGigById({ gigId: id });
      if (status == 200 && data.status === ApiStatus.success) {
        return data.data;
      } else {
        return null;
      }
    },
  });

  const userId = data?.userId;

  const { data: dataSeller } = useQuery({
    queryKey: ["sellerInfo"],
    queryFn: async () => {
      const { data, status } = await GetUserById({ userId });
      if (status == 200 && data.status === ApiStatus.success) {
        return data.data;
      } else {
        return null;
      }
    },
    enabled: !!userId,
  });

  const formatMemberSince = (inputDateStr) => {
    const inputDate = new Date(inputDateStr);
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const memberSince = `${
      monthNames[inputDate.getMonth()]
    } ${inputDate.getFullYear()}`;
    return `${memberSince}`;
  };

  const handleContinue = () => {
    if (loggedInUser?.isSeller) {
      showErrorAlert("Sellers can't place order!");
    } else {
      navigate("/payment/" + data._id);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (!data) {
    return <div className="my-12 text-center w-full"> Gig Not Found!</div>;
  }

  return (
    <div className="max-w-screen-2xl xl:mx-auto py-12 px-8 md:py-16 md:px-16 flex-col xl:flex-row flex justify-between gap-x-16">
      {error ? (
        <div className="my-12 text-center w-full"> Something went wrong!</div>
      ) : (
        <>
          {/* Info Section */}
          <div className="basis-2/3">
            {/* BreadCrumb */}
            <div className="flex items-center gap-x-3 mb-4">
              <img
                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/search_perseus/home-breadcrumb.2ba1681.svg"
                alt=""
              />
              /<span> {data.cat}</span>
            </div>
            <h1 className="text-3xl font-bold mb-4">{data.title}</h1>

            {dataSeller && (
              <div className="text-gray-600 mb-8">
                <div className="flex justify-start items-center gap-x-3 ">
                  <img
                    src={dataSeller.img || noAvatarUrl}
                    alt=""
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <div className="font-bold">{dataSeller.username}</div>
                  <div className="font-bold">
                    {!isNaN(data.totalStars / data.starNumber) && (
                      <>
                        {Array(Math.round(data.totalStars / data.starNumber))
                          .fill()
                          .map((item, i) => (
                            <React.Fragment key={i}>⭐</React.Fragment>
                          ))}
                        <span>
                          {Math.round(data.totalStars / data.starNumber)}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Gigs Images Slider */}
            <div className="Round-Arrow-Dots mb-8">
              <Slider arrows arrowsScroll={1} slidesToShow={1}>
                {data.images.map((image) => {
                  return <img key={image} src={image} alt="" />;
                })}
              </Slider>
            </div>

            {/* About the Gig */}
            <div className="mb-12">
              <h3 className="font-bold text-2xl mb-3">About the Gig</h3>
              <span>{data.desc}</span>
            </div>

            {/* About the seller */}
            {dataSeller && (
              <div className="mb-16">
                <h3 className="font-bold text-2xl mb-6">About the seller</h3>
                <div className="flex flex-col mb-10">
                  <div className="flex gap-x-6 mb-4">
                    <img
                      className="rounded-full w-28 h-28"
                      src={dataSeller.img || noAvatarUrl}
                      alt=""
                    />
                    <div className="flex flex-col gap-y-1 justify-center">
                      <div className="font-bold text-xl">
                        @{dataSeller.username}{" "}
                        {/* <span className="font-normal text-base text-gray-500">
                        @eeveliin
                      </span> */}
                      </div>
                      <span>Certified GreatGigs Seller</span>
                      {/* <div className="font-bold">
                      ⭐ 4.9 <span className="font-normal">(408)</span>
                    </div> */}
                    </div>
                  </div>
                  {/* <button className="p-2 w-max px-6 border rounded-md border-gray-400 font-bold text-gray-500">
                    Contact Me
                  </button> */}
                </div>
                <div className="border rounded-md text-zinc-500 p-6 border-gray-300">
                  <div className="grid grid-cols-2 gap-y-6  border-b pb-6 border-gray-300">
                    <div>
                      From
                      <div className="font-bold ">{dataSeller.country}</div>
                    </div>
                    <div>
                      Member since
                      <div className="font-bold ">
                        {formatMemberSince(dataSeller.createdAt)}
                      </div>
                    </div>
                    <div>
                      Avg. response time
                      <div className="font-bold ">1 hour</div>
                    </div>
                    {/* <div>
                      Last delivery
                      <div className="font-bold ">about 23 hours</div>
                    </div> */}
                    <div>
                      Languages
                      <div className="font-bold ">English</div>
                    </div>
                  </div>
                  <div className="pt-4">{dataSeller.desc}</div>
                </div>
              </div>
            )}

            {/* Reviews */}
            <Reviews gigId={data._id} />
          </div>

          {/* Pricing Section */}
          <div className="basis-1/3">
            <div className="border border-zinc-300 rounded-md p-6 flex flex-col gap-y-4 sticky top-40 shadow-2xl">
              <div className="flex flex-col md:flex-row justify-between gap-x-4">
                <div className="font-bold text-base whitespace-normal break-words">
                  {data.shortTitle}
                </div>
                <div className="min-w-[100px] text-blue-500 text-xl font-bold">
                  ₹ {data.price}
                </div>
              </div>
              <span>{data.shortDesc}</span>
              <div className="flex flex-col md:flex-row gap-y-3 justify-between font-bold">
                <div>⏲️ {data.deliveryTime} days delivery</div>
                <div>♻️ {data.revisionNumber} revisions</div>
              </div>
              <div className="flex flex-col gap-y-1">
                {data.features.map((feature) => {
                  return <span key={feature}>✔️ {feature}</span>;
                })}
              </div>
              <button
                className="rounded-md bg-blue-500 text-center text-white p-3"
                onClick={handleContinue}
              >
                Continue & Pay
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Gig;
