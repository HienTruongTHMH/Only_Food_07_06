import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-10 mx-auto ">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 text-sm text-gray-700 px-4">
        {/* Logo & Quote */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="text-red-500 font-bold text-2xl">
              <Image src="/images/logo.png" alt="logo" width={50} height={50} />
            </div>
          </div>
          <p className="text-gray-500">
            “On the other hand, we denounce with righteous indignation and
            dislike men who are so beguiled and demoralized by the charms of
            pleasure of the moment”
          </p>
        </div>

        {/* Tastibite */}
        <div>
          <h4 className="font-semibold mb-2">Tastibite</h4>
          <ul className="space-y-1 text-gray-600">
            <li>
              <a href="#">About us</a>
            </li>
            <li>
              <a href="#">Careers</a>
            </li>
            <li>
              <a href="#">Contact us</a>
            </li>
            <li>
              <a href="#">Feedback</a>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="font-semibold mb-2">Legal</h4>
          <ul className="space-y-1 text-gray-600">
            <li>
              <a href="#">Terms</a>
            </li>
            <li>
              <a href="#">Conditions</a>
            </li>
            <li>
              <a href="#">Cookies</a>
            </li>
            <li>
              <a href="#">Copyright</a>
            </li>
          </ul>
        </div>

        {/* Follow */}
        <div>
          <h4 className="font-semibold mb-2">Follow</h4>
          <ul className="space-y-1 text-gray-600">
            <li className="flex items-center gap-2">
              <Facebook />
              <a href="#">Facebook</a>
            </li>
            <li className="flex items-center gap-2">
              <Twitter />
              <a href="#">Twitter</a>
            </li>
            <li className="flex items-center gap-2">
              <Instagram />
              <a href="#">Instagram</a>
            </li>
            <li className="flex items-center gap-2">
              <Youtube />
              <a href="#">Youtube</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
