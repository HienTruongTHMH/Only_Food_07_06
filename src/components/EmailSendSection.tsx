import React from "react";

const EmailSendSection = () => {
  return (
    <div className="flex flex-col w-full bg-[#FFD8CA] justify-center items-center text-center py-16 px-6 md:px-8 rounded-xl shadow-xl">
      <h1 className="text-3xl sm:text-4xl font-bold text-orange-800 mb-3">
        Deliciousness to your inbox
      </h1>
      <p className="text-gray-700 text-base mb-8 max-w-md">
        Enjoy weekly hand-picked recipes and recommendations delivered straight to you.
      </p>
      <div className="flex w-full max-w-sm bg-white rounded-lg shadow-md overflow-hidden">
        <input
          type="email"
          placeholder="Enter your email address"
          className="flex-grow p-3 text-gray-800 focus:outline-none placeholder-gray-500"
        />
        <button className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-3 font-semibold transition-colors duration-200 ease-in-out whitespace-nowrap">
          Subscribe
        </button>
      </div>
      <div className="flex flex-row items-center justify-center gap-1.5 mt-6 text-xs text-orange-700">
        <p>By joining, you agree to our</p>
        <p className="underline hover:text-orange-800 cursor-pointer">Terms and Conditions</p>
      </div>
    </div>
  );
};

export default EmailSendSection;