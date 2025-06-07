// components/SignUp.tsx
import Image from "next/image";
import LoginForm from "@/components/login/LoginForm";

const Login = () => {
  return (
    <div className="bg-[#f9f9f9] flex items-center justify-center">
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="bg-white shadow-lg rounded-3xl flex p-6 md:p-10 max-w-5xl w-full gap-10 items-center border border-gray-200">
          {/* Left: Image */}
          <div className="hidden md:block w-3/5 relative h-full">
            <Image src="/images/logo.png" alt="logo" width={50} height={50} />
            <div className="relative w-full h-[350px] mt-20">
              <Image
                src="/images/banner login.png" // đặt đúng đường dẫn ảnh
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