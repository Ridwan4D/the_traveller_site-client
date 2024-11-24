import { useState, useEffect } from "react";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import { Link } from "react-router-dom";

const CommunityPage = () => {
  const [posts] = useState([]);

  useEffect(() => {
    // Fetch posts from an API or database
    // setPosts(fetchedPosts);
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Navbar Section */}
      <nav className="bg-blue-600 p-4 text-white">
        <div className="flex items-center justify-between">
          <div className="text-xl font-bold">Tourist Guide</div>
          <div className="flex items-center space-x-4">
            {/* User Profile and Links */}
            <Link to="/login" className="btn text-white">
              Login
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div
        className="bg-cover bg-center h-64 text-blue-600 flex items-center justify-center"
        style={{ backgroundImage: "url('/images/community-banner.jpg')" }}
      >
        <h1 className="text-4xl font-semibold">Join the Community</h1>
      </div>

      {/* Community Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <SectionTitle
          heading={"Community Discussions"}
          subHeading={"Join the conversation!"}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Displaying Sample Posts */}
          {posts.map((post, idx) => (
            <div key={idx} className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold">{post.title}</h3>
              <p className="mt-2">{post.snippet}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-gray-500">By {post.author}</span>
                <button className="text-blue-500 hover:underline">
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Call-to-Action Section */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold mb-4">
            Join the Conversation!
          </h2>
          <p className="mb-6">
            Sign up today to share your experiences and ask questions!
          </p>
          <Link
            to="/register"
            className="btn bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-500"
          >
            Sign Up
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-blue-600 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>© 2024 Tourist Guide | All Rights Reserved</p>
        </div>
      </footer>
    </div>
  );
};

export default CommunityPage;
