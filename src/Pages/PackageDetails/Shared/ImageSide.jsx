import PropTypes from "prop-types";
import { useState } from "react";
import parse from "html-react-parser";

const ImageSide = ({ images, packDetails }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const parsedContent = parse(packDetails);

  return (
    <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 bg-white rounded-lg shadow-lg p-6">
      {/* Image Section */}
      <div className="flex-1 flex flex-col items-center">
        {/* Main Image */}
        <div className="w-full max-w-lg h-80 relative mb-6">
          <img
            src={selectedImage}
            alt="Package Preview"
            className="w-full h-full object-contain rounded-lg shadow-xl border border-gray-200"
          />
          <div className="absolute top-2 right-2 bg-white bg-opacity-70 rounded-full p-1 px-3 text-gray-800 font-medium shadow-sm">
            {images.indexOf(selectedImage) + 1}/{images.length}
          </div>
        </div>

        {/* Thumbnail Images */}
        <div className="flex gap-4 overflow-x-auto p-2">
          {images.map((image, index) => (
            <button
              key={index}
              className={`w-20 h-20 rounded-lg border-2 overflow-hidden transition-all 
              ${
                selectedImage === image
                  ? "border-blue-500 ring-2 ring-blue-300"
                  : "border-gray-200"
              }`}
              onClick={() => setSelectedImage(image)}
            >
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-200"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Details Section */}
      <div className="flex-1 hidden xl:block text-gray-700 leading-relaxed">
        <h2 className="text-2xl md:text-2xl font-bold text-gray-900 mb-4">
          Package Details
        </h2>
        <div className="bg-gray-100 p-4 rounded-lg shadow-inner space-y-4 text-lg">
          {parsedContent}
        </div>
      </div>
    </div>
  );
};

ImageSide.propTypes = {
  images: PropTypes.array.isRequired,
  packDetails: PropTypes.string,
};

export default ImageSide;
