import PropTypes from "prop-types";

const SectionTitle = ({ heading, subHeading }) => {
  return (
    <div className="text-center mb-12 px-6">
      <h3 className="text-3xl md:text-5xl font-extrabold text-gray-800 leading-tight md:leading-snug">
        {heading}
      </h3>
      <p className="text-lg md:text-xl text-gray-600 uppercase tracking-wide font-semibold mb-3">
        {subHeading}
      </p>
      <div className="mt-4 mx-auto h-1 w-16 bg-gradient-to-r from-blue-500 to-teal-400 rounded-full" />
    </div>
  );
};

SectionTitle.propTypes = {
  heading: PropTypes.string.isRequired,
  subHeading: PropTypes.string.isRequired,
};

export default SectionTitle;
