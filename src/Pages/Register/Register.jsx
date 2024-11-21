import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { updateProfile } from "firebase/auth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import SocialLogin from "../../Components/SocialLogin/SocialLogin";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";

const cloudinary_url = `https://api.cloudinary.com/v1_1/${
  import.meta.env.VITE_CLOUD_NAME
}/image/upload`;
const cloudinary_upload_preset = import.meta.env.VITE_UPLOAD_PRESET;

const Register = () => {
  const axiosPublic = useAxiosPublic();
  const { registerUser } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const imageFile = data.image[0];
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", cloudinary_upload_preset);

    try {
      // Upload image to Cloudinary
      const res = await fetch(cloudinary_url, {
        method: "POST",
        body: formData,
      });
      const cloudinaryData = await res.json();
      const imageUrl = cloudinaryData.secure_url; // Cloudinary image URL

      // Register user
      const userCredential = await registerUser(data.email, data.password);

      // Update user profile with Cloudinary image URL
      await updateProfile(userCredential.user, {
        displayName: data.name,
        photoURL: imageUrl,
      });

      const userInfo = {
        userName: data.name,
        userEmail: data.email,
        userImage: imageUrl,
        role: "user",
      };
      console.log(userInfo);
      // Save user info to your database
      const reqRes = await axiosPublic.post("/users", userInfo);
      if (reqRes.data.insertedId) {
        toast.success("Account Created");
        // Redirect after registration
        setTimeout(() => {
          navigate(location?.state ? location.state : "/");
        }, 1000);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error creating account. Please try again.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div>
      <Helmet>
        <title>Register | Traveller Site</title>
      </Helmet>
      <div className="flex h-screen items-center justify-center bg-gray-100">
        {/* <!-- Right Pane --> */}
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
          <h1 className="text-4xl font-semibold mb-6 text-black text-center">
            Sign Up
          </h1>
          <h1 className="text-sm font-semibold mb-6 text-gray-500 text-center">
            Welcome Back To Your Place
          </h1>
          <SocialLogin />
          <div className="mt-4 text-sm text-gray-600 text-center">
            <p>or with email</p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label
                htmlFor="userName"
                className="block text-sm font-medium text-gray-700"
              >
                User Name
              </label>
              <input
                type="text"
                id="userName"
                {...register("name", { required: true })}
                className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
              />
              {errors.name && (
                <span className="text-sm text-red-600 font-semibold">
                  Name is required
                </span>
              )}
            </div>
            <div>
              <label
                htmlFor="file_input"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Profile Picture
              </label>
              <input
                type="file"
                {...register("image", { required: true })}
                id="file_input"
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
              />
              {errors.image && (
                <span className="text-sm text-red-600 font-semibold">
                  Image is required
                </span>
              )}
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="text"
                id="email"
                {...register("email", { required: true })}
                className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
              />
              {errors.email && (
                <span className="text-sm text-red-600 font-semibold">
                  Email is required
                </span>
              )}
            </div>
            <div className="relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"} // Toggle input type
                id="password"
                {...register("password", {
                  required: "Password is required", // Required validation
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
                    message:
                      "Password must contain at least 1 uppercase, 1 lowercase, 1 number, and be at least 6 characters long",
                  },
                })}
                className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
              />
              {errors.password && (
                <span className="text-sm text-red-600 font-semibold">
                  {errors.password.message}
                </span>
              )}
              {/* Eye icon for toggle */}
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute top-9 right-3 text-gray-600 hover:text-black"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <div>
              <button
                type="submit"
                className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800 focus:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300"
              >
                Register
              </button>
            </div>
          </form>
          <div className="mt-4 text-sm text-gray-600 text-center">
            <p>
              Already have an account?{" "}
              <Link to="/login" className="text-black hover:underline">
                Login Here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
