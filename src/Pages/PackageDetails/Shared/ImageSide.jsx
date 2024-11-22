import PropTypes from "prop-types";
import { useState } from "react";

const ImageSide = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="w-full flex flex-col items-center">
      {/* Main Image */}
      <div className="w-full max-w-lg h-80 relative mb-6">
        <img
          src={selectedImage}
          alt="Package Preview"
          className="w-full h-full object-cover rounded-lg shadow-xl border border-gray-200"
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
            className={`w-24 h-24 rounded-lg border-2 overflow-hidden transition-all 
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
  );
};

ImageSide.propTypes = {
  images: PropTypes.array.isRequired,
};

export default ImageSide;
