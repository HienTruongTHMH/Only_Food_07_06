import React from "react";

const EmailSendSection = () => {
  return (
    <div className="flex flex-col w-full h-[300px] bg-[#FFD8CA] justify-center items-center text-center p-8">
      <h1 className="text-4xl font-bold">Deliciousness to your inbox</h1>
      <p className="text-sm mb-5">
        Enjoy weekly hand picked recipes and recommendations
      </p>
      <div className="flex flex-row gap-2 bg-white">
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full p-2 hover:outline-none focus:outline-none"
        />
        <button className="bg-orange-600 text-white px-4 py-2 m-0.5">
          Subscribe
        </button>
      </div>
      <div className="flex flex-row gap-2 mt-2">
        <p>By joining our newsletter you agree to our</p>
        <p className="underline">Terms and Conditions</p>
      </div>
    </div>
  );
};

export default EmailSendSection;