import React from "react";
import { Link } from "react-router-dom";

const Messages = () => {
  const currentUser = {
    id: 1,
    username: "Abhishek Soni",
    isSeller: true,
  };

  return (
    <div className="max-w-screen-2xl mx-auto py-12 px-8 md:py-16 md:px-16">
      <div className="flex justify-between mb-6">
        <h1 className="font-bold text-2xl">Messages</h1>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs py-3 text-white uppercase bg-neutral-500">
            <tr>
              <th scope="col" className="px-6 py-3">
                {currentUser?.isSeller ? "Buyer" : "Seller"}
              </th>
              <th scope="col" className="px-6 py-3">
                Last Message
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b font-bold bg-blue-50">
              <td className="px-6 py-4">Anna Bell</td>

              <td className="px-6 py-4">
                <Link to="/message/123">
                  {`Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut,
                velit?Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Aut, velit?Lorem ipsum dolor sit amet consectetur adipisicing
                elit. Aut, velit?Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Aut, velit?Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Aut, velit?Lorem ipsum dolor sit
                amet consectetur adipisicing elit. Aut, velit?Lorem ipsum dolor
                sit amet consectetur adipisicing elit. Aut, velit?`.substring(
                    0,
                    100
                  )}
                  ...
                </Link>
              </td>
              <td className="px-6 py-4">10 min ago</td>
              <td className="px-6 py-4">
                <button className="bg-blue-500 p-2 text-white rounded-md">
                  Mark as read
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Messages;
