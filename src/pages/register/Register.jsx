import React, { useContext, useState } from "react";
import uploadFile from "../../utils/uploadFile";
import { useNavigate } from "react-router-dom";
import { RegisterUser } from "../../api/restapi";
import { UserContext } from "../../context/userContext";
import { showErrorAlert, showSuccessAlert } from "../../utils/alerts";
import Loader from "../../components/loader/Loader";
import { ApiStatus } from "../../models/ApiResponse";

const Register = () => {
  const navigate = useNavigate();
  const { loginUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const [profile, setProfile] = useState(null);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    country: "",
    phone: "",
    img: "",
    desc: "",
    isSeller: false,
  });

  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSeller = (e) => {
    setUser((prev) => {
      return { ...prev, isSeller: e.target.checked };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!profile) {
      showErrorAlert("Please choose a image");
      return;
    }

    setLoading(true);
    const url = await uploadFile(profile);
    setLoading(false);

    try {
      if (!url) return;
      setLoading(true);
      const { data } = await RegisterUser({ user, img: url });
      setLoading(false);
      if (data.status === ApiStatus.success) {
        showSuccessAlert(data.message);
        loginUser(data.data);
        navigate("/home");
      }
    } catch (error) {
      setLoading(false);
      const { response } = error;
      showErrorAlert(response?.data?.message);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="max-w-screen-2xl mx-auto py-12 px-8 md:py-16 md:px-16 min-h-screen">
      <div className="flex flex-col items-center justify-center">
        <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-6xl xl:p-0   ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 gap-y-8 xl:grid-cols-2 gap-x-10 md:gap-x-20"
            >
              {/* Left Section */}
              <div className="space-y-4 md:space-y-5">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl  ">
                  Create a new account
                </h1>
                <div>
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    username
                  </label>
                  <input
                    type="username"
                    name="username"
                    id="username"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="username"
                    required=""
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="name@gmail.com"
                    required=""
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900  "
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    required=""
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="profileimage"
                    className="block mb-2 text-sm font-medium text-gray-900  "
                  >
                    Profile Image
                  </label>
                  <input
                    type="file"
                    name="profileimage"
                    id="profileimage"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    aria-describedby="profileimage"
                    onChange={(e) => setProfile(e.target.files[0])}
                  />
                </div>
                <div>
                  <label
                    htmlFor="country"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Country
                  </label>
                  <input
                    type="text"
                    name="country"
                    id="country"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="India"
                    required=""
                    onChange={handleChange}
                  />
                </div>
                <button
                  onClick={handleSubmit}
                  type="button"
                  className="hidden xl:block w-full bg-blue-500 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Create Account
                </button>
              </div>

              {/* Right Section */}

              <div className="space-y-4 md:space-y-5">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl  ">
                  I want to become a seller
                </h1>
                <div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      defaultValue=""
                      className="sr-only peer"
                      onChange={handleSeller}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-100 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
                    <span className="ml-3 text-sm font-medium text-gray-500">
                      Activate my seller account
                    </span>
                  </label>
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Phone Number
                  </label>
                  <input
                    type="phone"
                    name="phone"
                    id="phone"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="+1 232-3443-343"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="desc"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Description
                  </label>
                  <textarea
                    name="desc"
                    id="desc"
                    className="min-h-[300px] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    onChange={handleChange}
                  ></textarea>
                </div>
                <button
                  onClick={handleSubmit}
                  type="button"
                  className="block xl:hidden w-full bg-blue-500 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Register;
