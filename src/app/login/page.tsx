// components/SignUp.tsx
import Image from "next/image";
import Link from "next/link";
import LoginForm from "@/components/login/LoginForm";

const Login = () => {
  return (
    <div className="fixed inset-0 bg-[#f9f9f9] flex items-center justify-center min-h-screen z-[9999]">
      {/* Video Background */}   
      <video
        autoPlay
        muted
        loop
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/videos/bg-web-1280.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Form Container */}
      <div className="relative z-20 flex items-center justify-center w-full h-full p-4">
        <div className="bg-white shadow-lg rounded-3xl flex flex-col md:flex-row p-6 md:p-10 max-w-5xl w-full gap-6 md:gap-10 items-center border border-gray-200">
          
          {/* Mobile Logo - Only visible on mobile */}
          <div className="md:hidden w-full flex justify-center mb-4">
            <Link href="/" className="inline-block">
              <Image src="/images/logo.png" alt="logo" width={60} height={60} />
            </Link>
          </div>

          {/* Left: Image - Hidden on mobile */}
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
          <div className="w-full md:w-2/5 relative">
            <LoginForm />
            
            {/* Back to home button - Only visible on mobile - Moved to bottom left */}
            <div className="md:hidden absolute -bottom-2 left-0">
              <Link 
                href="/" 
                className="flex items-center text-gray-600 hover:text-gray-800 transition-colors duration-200 text-sm"
              >
                <svg 
                  className="w-4 h-4 mr-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M10 19l-7-7m0 0l7-7m-7 7h18" 
                  />
                </svg>
                Back to home page
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;