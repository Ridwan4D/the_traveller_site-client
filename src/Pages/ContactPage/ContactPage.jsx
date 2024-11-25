import { useState } from "react";
import { useForm } from "react-hook-form";
import emailjs from "emailjs-com";

const ContactPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const onSubmit = async (data) => {
    try {
      const result = await emailjs.send(
        "service_7k25jc1",
        "template_tpkhfgn",
        data,
        "9Kn8AUNmMdrNubQhs"
      );

      setMessage("Your message has been sent successfully!");
      setIsSuccess(true);
      reset();
    } catch (err) {
      setMessage("Something went wrong, please try again.", err);
      setIsSuccess(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-semibold text-indigo-600 text-center mb-8">
        Contact Us
      </h1>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column - Contact Form */}
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-lg font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                {...register("user_name", { required: "Name is required" })}
                className="mt-2 w-full p-3 border border-gray-300 rounded-lg"
              />
              {errors.user_name && (
                <p className="text-red-500 text-sm">
                  {errors.user_name.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                {...register("user_email", { required: "Email is required" })}
                className="mt-2 w-full p-3 border border-gray-300 rounded-lg"
              />
              {errors.user_email && (
                <p className="text-red-500 text-sm">
                  {errors.user_email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-700">
                Message
              </label>
              <textarea
                {...register("message", { required: "Message is required" })}
                className="mt-2 w-full p-3 border border-gray-300 rounded-lg"
                rows="5"
              />
              {errors.message && (
                <p className="text-red-500 text-sm">{errors.message.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-all"
            >
              Send Message
            </button>
          </form>

          {message && (
            <div
              className={`mt-6 p-4 text-center rounded-lg ${
                isSuccess
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {message}
            </div>
          )}
        </div>

        {/* Right Column - Contact Information */}
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold text-indigo-600 mb-4">
            Contact Information
          </h3>
          <p className="text-lg text-gray-600">
            If you have any questions or need support, feel free to reach out to
            us:
          </p>
          <div className="mt-6">
            <p className="text-lg text-gray-700">Email:</p>
            <a
              href="mailto:support@tourguide.com"
              className="text-indigo-600 hover:underline"
            >
              support@tourguide.com
            </a>
          </div>
          <div className="mt-4">
            <p className="text-lg text-gray-700">Phone:</p>
            <p className="text-gray-600">+880 123 456 7890</p>
          </div>
          <div className="mt-4">
            <p className="text-lg text-gray-700">Follow Us:</p>
            <div className="flex space-x-4">
              <a href="#" className="text-indigo-600 hover:text-indigo-800">
                Facebook
              </a>
              <a href="#" className="text-indigo-600 hover:text-indigo-800">
                Twitter
              </a>
              <a href="#" className="text-indigo-600 hover:text-indigo-800">
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
