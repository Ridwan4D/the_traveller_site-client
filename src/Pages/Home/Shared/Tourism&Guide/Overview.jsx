const Overview = () => {
  return (
    <div className="bg-gray-100 py-10 px-2 md:px-20">
      {/* Hero Section */}
      <div className="relative w-full h-[300px] md:h-[500px] overflow-hidden rounded-lg shadow-lg">
        <img
          src="https://res.cloudinary.com/duv5fiurz/image/upload/v1732386020/bangladesh-places-to-visit-FEATURE-compressed_e20igs.jpg"
          alt="Beautiful Landscape"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <h1 className="text-white text-3xl md:text-5xl font-bold text-center">
            Explore the Beauty of Bangladesh
          </h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="mt-10 text-center">
        <h2 className="text-2xl md:text-4xl font-semibold text-gray-800">
          Why Choose Us?
        </h2>
        <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
          Our platform provides a one-stop solution for all your travel needs.
          Discover top tourist destinations, book guided tours, and immerse
          yourself in the vibrant culture and rich heritage of World.
        </p>
      </div>

      {/* Features Section */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Feature 1 */}
        <div className="flex flex-col items-center text-center">
          <img
            src="https://res.cloudinary.com/duv5fiurz/image/upload/v1732386282/download_58_rk6dwd.jpg"
            alt="Icon"
            className="w-20 h-20 mb-4"
          />
          <h3 className="text-xl font-semibold text-gray-800">
            Top Destinations
          </h3>
          <p className="text-gray-600">
            Explore handpicked tourist spots curated for the best travel
            experiences.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="flex flex-col items-center text-center">
          <img
            src="https://res.cloudinary.com/duv5fiurz/image/upload/v1732386191/download_57_aslpfh.jpg"
            alt="Icon"
            className="w-20 h-20 mb-4"
          />
          <h3 className="text-xl font-semibold text-gray-800">
            Experienced Guides
          </h3>
          <p className="text-gray-600">
            Our professional guides ensure you have an informative and memorable
            journey.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="flex flex-col items-center text-center">
          <img
            src="https://res.cloudinary.com/duv5fiurz/image/upload/v1732386347/download_1_ljyk6n.png"
            alt="Icon"
            className="w-20 h-20 mb-4"
          />
          <h3 className="text-xl font-semibold text-gray-800">Easy Booking</h3>
          <p className="text-gray-600">
            Seamless booking experience with secure payment options.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Overview;
