import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <section className="flex items-center justify-center h-screen bg-gradient-to-r from-indigo-200 via-white to-indigo-200">
      <div className="text-center max-w-md px-5">
        {/* Error Code */}
        <h2 className="mb-8 font-extrabold text-9xl text-indigo-500">
          <span className="sr-only">Error</span>404
        </h2>
        {/* Error Message */}
        <p className="text-2xl font-semibold md:text-3xl text-gray-800">
          Oops! The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <p className="mt-4 mb-8 text-gray-600">
          It seems we can&apos;t find the page you&apos;re looking for. Head
          back to the homepage and continue exploring.
        </p>
        {/* Back Button */}
        <Link
          to="/"
          className="px-8 py-3 font-semibold text-white bg-indigo-500 hover:bg-indigo-600 transition rounded-lg shadow-md"
        >
          Back to Homepage
        </Link>
      </div>
    </section>
  );
};

export default ErrorPage;
