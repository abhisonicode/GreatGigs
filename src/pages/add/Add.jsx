import React, { useReducer, useState } from "react";
import { gigReducer, INITIAL_STATE } from "../../reducers/gigReducer";
import uploadFile from "../../utils/uploadFile";
import Loader from "../../components/loader/Loader";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateGig } from "../../api/restapi";
import { LoaderIcon } from "react-hot-toast";
import { showErrorAlert, showSuccessAlert } from "../../utils/alerts";
import { ApiStatus } from "../../models/ApiResponse";

const Add = () => {
  const [singleFile, setSingleFile] = useState(undefined);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const [state, dispatch] = useReducer(gigReducer, INITIAL_STATE);

  const handleChange = (e) => {
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  const handleUpload = async () => {
    if (!singleFile || files.length === 0) {
      return showErrorAlert("Please choose both, cover and gallery images");
    }

    setUploading(true);
    try {
      const cover = await uploadFile(singleFile);
      const images = await Promise.all(
        [...files].map(async (file) => {
          const url = await uploadFile(file);
          return url;
        })
      );
      showSuccessAlert("Images uploaded successfully!");
      dispatch({ type: "ADD_IMAGES", payload: { cover, images } });
    } catch (err) {
      console.log(err);
    } finally {
      setUploading(false);
    }
  };

  const handleFeature = (e) => {
    e.preventDefault();
    if (e.target[0].value) {
      dispatch({
        type: "ADD_FEATURE",
        payload: e.target[0].value,
      });
      e.target[0].value = "";
    }
  };

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (gig) => {
      return await CreateGig(gig);
    },
    onSuccess: ({ data, status }) => {
      if (status === 200 && data.status === ApiStatus.success) {
        showSuccessAlert(data.message);
        navigate("/my-gigs");
        queryClient.invalidateQueries(["my-gigs"]);
      }
    },
    onError: (error) => {
      const { response } = error;
      const { data } = response;
      showErrorAlert(data.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !state.cover ||
      !state.title ||
      !state.desc ||
      !state.cat ||
      !state.price ||
      !state.cover ||
      !state.shortTitle ||
      !state.shortDesc ||
      !state.deliveryTime ||
      !state.revisionNumber ||
      state.images.length === 0 ||
      state.features.length === 0
    ) {
      showErrorAlert("All fields are required!");
      return;
    }
    mutation.mutate(state);
    // navigate("/mygigs")
  };

  return (
    <div className="max-w-screen-2xl mx-auto py-12 px-8 md:py-16 md:px-16">
      <div className="flex justify-between mb-6">
        <h1 className="font-bold text-2xl">Add New Gig</h1>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-8">
        {/* Left */}
        <div>
          <div className="mb-6">
            <label
              htmlFor="title"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Title
            </label>
            <input
              maxLength={80}
              type="text"
              name="title"
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5 focus:outline-none"
              placeholder="eg. I will create a super powerfull react application..."
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="category"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Category
            </label>
            <select
              name="cat"
              onChange={handleChange}
              id="category"
              className="bg-gray-50 border text-sm rounded-lg cursor-pointer text-gray-900 focus:outline-none border-gray-300 placeholder-gray-400 block w-full p-2.5"
            >
              <option value="graphic-design">Graphics & Design</option>
              <option value="digital-marketing">Digital Marketing</option>
              <option value="writing-translation">Writing & Translation</option>
              <option value="video-animation">Video & Animation</option>
              <option value="web-development">Web Development</option>
              <option value="programming-tech">Programming & Tech</option>
              <option value="business-services">Business Services</option>
              <option value="lifestyle-services">Lifestyle Services</option>
            </select>
          </div>
          <div className="mb-6">
            <label
              htmlFor="cover-image"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Cover Image
            </label>
            <input
              onChange={(e) => setSingleFile(e.target.files[0])}
              className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5 focus:outline-none"
              aria-describedby="cover-image"
              id="cover-image"
              type="file"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="upload-images"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Upload Images
            </label>
            <input
              onChange={(e) => setFiles(e.target.files)}
              className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5 focus:outline-none"
              aria-describedby="upload-images"
              id="upload-images"
              type="file"
              multiple
            />
          </div>
          <div className="mb-6">
            <button
              onClick={handleUpload}
              className="text-white bg-blue-500 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              {uploading ? (
                <>
                  <div className="flex gap-2 items-center">
                    <LoaderIcon /> <span>uploading</span>
                  </div>
                </>
              ) : (
                "Upload"
              )}
            </button>
          </div>
          <div className="mb-6">
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Description
            </label>
            <textarea
              name="desc"
              id="description"
              className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5 focus:outline-none min-h-[300px]"
              required=""
              onChange={handleChange}
            />
          </div>

          <button
            onClick={handleSubmit}
            className="hidden xl:block text-white bg-blue-500 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            Create Gig
          </button>
        </div>

        {/* Right */}
        <div>
          <div className="mb-6 mt-8 xl:mt-0">
            <label
              htmlFor="service-title"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Service Title
            </label>
            <input
              name="shortTitle"
              type="service-title"
              id="service-title"
              className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5 focus:outline-none"
              placeholder="eg. Powerfull react application..."
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="short-description"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Short Description
            </label>
            <textarea
              name="shortDesc"
              onChange={handleChange}
              id="short-description"
              className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5 focus:outline-none min-h-[80px]"
              required=""
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="price"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Price
            </label>
            <input
              name="price"
              onChange={handleChange}
              type="number"
              id="price"
              className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5 focus:outline-none"
              placeholder="Enter Price (eg. 10)"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="delivery-time"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Delivery Time
            </label>
            <input
              name="deliveryTime"
              onChange={handleChange}
              type="number"
              id="delivery-time"
              className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5 focus:outline-none"
              placeholder="Enter number (eg. 3)"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="revisions"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Number of Revisions
            </label>
            <input
              name="revisionNumber"
              onChange={handleChange}
              type="number"
              id="revisionsx"
              className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5 focus:outline-none"
              placeholder="Enter number (eg. 1)"
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900 ">
              Add Features
            </label>
            <form className="flex flex-row gap-x-2" onSubmit={handleFeature}>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5 focus:outline-none"
                placeholder="eg. Powerfull react application..."
              />
              <button className="bg-blue-500 text-white rounded-lg px-4 p-2">
                Add
              </button>
            </form>
            <div className="flex mt-3 flex-row flex-wrap gap-3 ">
              {state.features?.map((feature, index) => {
                return (
                  <div
                    key={index}
                    className="flex items-center gap-1 border-blue-800 p-1 px-3 rounded border text-blue-800"
                  >
                    {feature}
                    <svg
                      onClick={() =>
                        dispatch({ type: "REMOVE_FEATURE", payload: { index } })
                      }
                      className="ml-2 w-4 h-4 text-blue-800 cursor-pointer"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18 17.94 6M18 18 6.06 6"
                      />
                    </svg>
                  </div>
                );
              })}
            </div>
          </div>
          <button
            onClick={handleSubmit}
            className="block xl:hidden w-full text-white bg-blue-500 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  sm:w-full px-5 py-2.5 text-center"
          >
            Create Gig
          </button>
        </div>
      </div>
    </div>
  );
};

export default Add;
