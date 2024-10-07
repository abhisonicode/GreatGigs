import React from "react";
import { Link } from "react-router-dom";

const Message = () => {
  return (
    <div className="max-w-screen-2xl mx-auto py-12 px-8 md:py-16 md:px-16 min-h-screen">
      <div className="flex items-center gap-x-3 mb-4">
        <Link to="/messages" className="underline">
          Messages
        </Link>
        /<span> John Doee</span>
      </div>

      {/* Chat View */}
      <>
        {/* component */}
        {/* This is an example component */}
        <div className="container mx-auto rounded-lg">
          {/* Chatting */}
          <div className="flex flex-row justify-between bg-white">
            <div className="w-2/5 max-h-fit px-5 shadow">
              <div className="flex flex-col">
                <div className="font-semibold text-xl py-4">John Doee</div>
                <img
                  src="https://images.unsplash.com/photo-1587620962725-abab7fe55159?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=600&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4MTg1MDA0OA&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=600"
                  className="object-cover w-32 h-32 rounded-full"
                  alt=""
                />
                <div className="font-semibold py-4">Full Stack Developer</div>
                <div className="font-light">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Deserunt, perspiciatis!
                </div>
              </div>
            </div>
            {/* message */}
            <div className="w-full px-5 flex flex-col justify-between">
              <div className="flex flex-col mt-5">
                <div className="flex justify-end mb-4">
                  <div className="mr-2 py-3 px-4 bg-blue-500 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">
                    Welcome to group everyone !
                  </div>
                  <img
                    src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                    className="object-cover h-8 w-8 rounded-full"
                    alt=""
                  />
                </div>
                <div className="flex justify-start mb-4">
                  <img
                    src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                    className="object-cover h-8 w-8 rounded-full"
                    alt=""
                  />
                  <div className="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quaerat at praesentium, aut ullam delectus odio error sit
                    rem. Architecto nulla doloribus laborum illo rem enim dolor
                    odio saepe, consequatur quas?
                  </div>
                </div>
                <div className="flex justify-end mb-4">
                  <div>
                    <div className="mr-2 py-3 px-4 bg-blue-500 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                      Magnam, repudiandae.
                    </div>
                    <div className="mt-4 mr-2 py-3 px-4 bg-blue-500 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Debitis, reiciendis!
                    </div>
                  </div>
                  <img
                    src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                    className="object-cover h-8 w-8 rounded-full"
                    alt=""
                  />
                </div>
                <div className="flex justify-start mb-4">
                  <img
                    src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                    className="object-cover h-8 w-8 rounded-full"
                    alt=""
                  />
                  <div className="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white">
                    happy holiday guys!
                  </div>
                </div>
              </div>
              <div className="py-5">
                <div className="relative">
                  <textarea
                    type="search"
                    id="default-search"
                    className="min-h-[100px] block w-full p-4 text-sm text-gray-500 border border-gray-400 rounded-lg bg-gray-50 focus:outline-none"
                    placeholder="Write Your message..."
                    required=""
                  />
                  <button className="text-white absolute right-2.5 bottom-2.5 bg-blue-500  focus:outline-none  font-medium rounded-lg text-sm px-4 py-2 ">
                    Send
                  </button>
                </div>
              </div>
            </div>
            {/* end message */}
          </div>
        </div>
      </>

      {/* Send Message */}
    </div>
  );
};

export default Message;
