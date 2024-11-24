import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa"; // Import social media icons

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Traveller Site</h3>
            <p className="text-gray-400">
              Explore the best tours and vacation packages to unforgettable
              destinations.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-teal-400">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/allPackages"
                  className="text-gray-400 hover:text-teal-400"
                >
                  Packages
                </Link>
              </li>
              <li>
                <Link
                  to="/allGuides"
                  className="text-gray-400 hover:text-teal-400"
                >
                  All Guides
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-400 hover:text-teal-400"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <p className="text-gray-400 mb-2">
              Email: support@travellersite.com
            </p>
            <p className="text-gray-400">Phone: +1 234 567 890</p>
          </div>

          {/* Social Media Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook className="text-gray-400 hover:text-teal-400 text-2xl" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter className="text-gray-400 hover:text-teal-400 text-2xl" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram className="text-gray-400 hover:text-teal-400 text-2xl" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin className="text-gray-400 hover:text-teal-400 text-2xl" />
              </a>
            </div>
          </div>
        </div>

        {/* Legal Links */}
        <div className="mt-10 border-t border-gray-700 pt-6 text-center text-gray-400 text-sm">
          <div className="space-x-6">
            <Link to="/privacy-policy" className="hover:text-teal-400">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="hover:text-teal-400">
              Terms of Service
            </Link>
          </div>
          <p className="mt-4">© 2024 Traveller Site. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
