// components/SignUp.tsx
import Image from "next/image";
import Link from "next/link";
import LoginForm from "@/components/login/LoginForm";

const Login = () => {
  return (
    <div className= "fixed inset-0 bg-[#f9f9f9] flex items-center justify-center min-h-screen  z-[9999]">
      {/* Video Background */}   
      <video
        autoPlay
        muted
        loop
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/videos/bg-web-1280.mp4" type="video/mp4" />
        {/* Thêm source khác nếu cần */}
        {/* <source src="public/videos/cooking-video.webm" type="video/webm" /> */}
        Your browser does not support the video tag.
      </video>

      {/* Overlay để làm tối video */}
      {/* <div className="absolute inset-0 bg-black/40 z-10"></div> */}

      {/* Form Container */}
      <div className="relative z-20 flex items-center justify-center w-full h-full">
        <div className="bg-white shadow-lg rounded-3xl flex p-6 md:p-10 max-w-5xl w-full gap-10 items-center border border-gray-200">
          {/* Left: Image */}
          <div className="hidden md:block w-3/5 relative h-full">
            <Link href="/" className="inline-block">
              <Image src="/images/logo.png" alt="logo" width={50} height={50} />
            </Link>
            <div className="relative w-full h-[350px] mt-20">
              <Image
                src="/images/banner login.png"
                alt="Burger"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Right: Form */}
          <div className="w-full md:w-2/5">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;