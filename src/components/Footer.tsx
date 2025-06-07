import Image from "next/image";
import Link from "next/link";

// Giả sử bạn có các SVG icon này dưới dạng component hoặc đường dẫn trực tiếp.
// Thay thế bằng các SVG icon thực tế của bạn.
const SocialIconTwitter = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
  </svg>
);

// Trong code gốc có 2 icon Twitter. Giả sử 1 cái là Facebook.
const SocialIconFacebook = () => ( 
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
   <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
  </svg>
);

const SocialIconPinterest = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.747 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001 12.017.001z" />
  </svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { href: "/", text: "Home" },
    { href: "/recipes", text: "Recipes" }, // Đổi /recipe/123 thành /recipes
    { href: "/favorites", text: "Favorites" },
    { href: "/profile", text: "Profile" },
  ];

  const categoryLinks = [
    { href: "#breakfast", text: "Breakfast" }, // Sử dụng # cho link placeholder
    { href: "#lunch", text: "Lunch" },
    { href: "#dinner", text: "Dinner" },
    { href: "#desserts", text: "Desserts" },
  ];

  const socialLinks = [
    { href: "#", label: "Twitter", icon: <SocialIconTwitter /> },
    { href: "#", label: "Facebook", icon: <SocialIconFacebook /> },
    { href: "#", label: "Pinterest", icon: <SocialIconPinterest /> },
  ];

  return (
    <footer className="bg-slate-50 border-t border-slate-200 mt-16 sm:mt-20 lg:mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Logo and Description */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center mb-4">
              <Image
                src="/images/logo.png" // Đảm bảo đường dẫn này đúng
                alt="Only Food Logo"
                width={40} // Giữ kích thước gốc hoặc điều chỉnh nếu muốn
                height={40}
                className="sm:w-[48px] sm:h-[48px]" // Có thể điều chỉnh kích thước ở đây
              />
              <span className="ml-3 text-xl sm:text-2xl font-bold text-slate-800">
                Only Food
              </span>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">
              Discover and share amazing recipes from around the world. Cook,
              share, and enjoy delicious meals with our community.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-4 text-base">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.text}>
                  <Link
                    href={link.href}
                    className="text-slate-600 hover:text-orange-600 text-sm transition-colors duration-150"
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-4 text-base">
              Categories
            </h3>
            <ul className="space-y-3">
              {categoryLinks.map((link) => (
                <li key={link.text}>
                  <Link // Đổi <a> thành <Link> cho nhất quán
                    href={link.href}
                    className="text-slate-600 hover:text-orange-600 text-sm transition-colors duration-150"
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-4 text-base">
              Get in Touch
            </h3>
            <ul className="space-y-3 mb-5">
              <li className="text-slate-600 text-sm flex items-start">
                <span className="mr-2 pt-0.5 shrink-0">📧</span> hello@onlyfood.com
              </li>
              <li className="text-slate-600 text-sm flex items-start">
                <span className="mr-2 pt-0.5 shrink-0">📱</span> +1 234 567 890
              </li>
              <li className="text-slate-600 text-sm flex items-start">
                <span className="mr-2 pt-0.5 shrink-0">📍</span> 123 Food Street, Cityville
              </li>
            </ul>
            {/* Social Media */}
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="text-slate-400 hover:text-orange-600 transition-colors duration-150 p-1 rounded-md" // Thêm p-1 và rounded-md
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-200 mt-10 pt-8 sm:mt-12 sm:pt-10">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-y-4 gap-x-6">
            <p className="text-slate-500 text-xs sm:text-sm text-center sm:text-left">
              &copy; {currentYear} Only Food. All rights reserved.
            </p>
            <div className="flex space-x-4 sm:space-x-6">
              <Link
                href="#privacy" // Sử dụng link thực tế
                className="text-slate-500 hover:text-orange-600 text-xs sm:text-sm transition-colors duration-150"
              >
                Privacy Policy
              </Link>
              <Link
                href="#terms" // Sử dụng link thực tế
                className="text-slate-500 hover:text-orange-600 text-xs sm:text-sm transition-colors duration-150"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}