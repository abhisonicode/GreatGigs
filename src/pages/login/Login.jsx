import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginUser } from "../../api/restapi";
import { UserContext } from "../../context/userContext";
import { showErrorAlert, showSuccessAlert } from "../../utils/alerts";
import { ApiStatus } from "../../models/ApiResponse";
import Loader from "../../components/loader/Loader";

const Login = () => {
  const [username, setUsername] = useState("buyer1");
  const [password, setPassword] = useState("Buyer@123");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { loginUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const handleLogin = async ({ username, password }) => {
    setLoading(true);
    try {
      const { data } = await LoginUser({
        username: username,
        password: password,
      });
      if (data?.status === ApiStatus.success) {
        loginUser(data.data);
        navigate("/");
        showSuccessAlert("Login Success");
      }
    } catch (error) {
      const { response } = error;
      showErrorAlert(response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleLogin({ username, password });
  };

  const handleSellerLogin = async () => {
    await handleLogin({
      username: "seller1",
      password: "Seller@123",
    });
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="max-w-screen-2xl mx-auto py-12 px-8 md:py-16 md:px-16">
      <div className="flex flex-col items-center justify-center">
        <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0   ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl  ">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div
                  className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
                  role="alert"
                >
                  <span className="sr-only">Info</span>
                  <div className="font-medium"> {error}</div>
                </div>
              )}

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
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 "
                      required=""
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="remember" className="text-gray-500 ">
                      Remember me
                    </label>
                  </div>
                </div>
                {/* <a
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </a> */}
              </div>
              <button className="w-full bg-blue-500 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                Sign in
              </button>
              <div className="text-base text-slate-500   text-center">or</div>
              <button
                type="button"
                onClick={handleSellerLogin}
                className="w-full bg-slate-900 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-lg px-5 py-3 text-center"
              >
                Quick Login as Seller
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <Link to="/register">
                  <span
                    href="#"
                    className="cursor-pointer font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Sign up
                  </span>
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
