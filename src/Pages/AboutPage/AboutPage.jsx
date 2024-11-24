import { useState } from "react";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";

const AboutPage = () => {
  const [teamMembers] = useState([
    { name: "Alice", role: "Lead Tour Guide", image: "/images/alice.jpg" },
    { name: "Bob", role: "Frontend Developer", image: "/images/bob.jpg" },
    {
      name: "Charlie",
      role: "Backend Developer",
      image: "/images/charlie.jpg",
    },
  ]);

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Navbar Section */}
      <nav className="bg-blue-600 p-4 text-white">
        <div className="flex items-center justify-between">
          <div className="text-xl font-bold">Tourist Guide</div>
          <div className="flex items-center space-x-4">
            {/* User Profile and Links */}
            <button className="text-white">Login</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div
        className="bg-cover bg-center h-64 text-white flex items-center justify-center"
        style={{ backgroundImage: "url('/images/about-banner.jpg')" }}
      >
        <h1 className="text-4xl font-semibold">About Us</h1>
      </div>

      {/* Mission Statement Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <SectionTitle heading={"Our Mission"} subHeading={"What drives us"} />
        <p className="text-lg text-gray-700">
          Our mission is to make tourism in Bangladesh more accessible and
          enjoyable by connecting tourists with knowledgeable and professional
          tour guides. We aim to provide a seamless experience for both tourists
          and tour guides to explore the beauty of our country while creating
          lasting memories.
        </p>
      </div>

      {/* Our Team Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <SectionTitle
          heading={"Meet Our Team"}
          subHeading={"The people behind the platform"}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-lg shadow-lg text-center"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-gray-500">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-blue-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <SectionTitle
            heading={"How It Works"}
            subHeading={"For Tourists, Guides, and Admins"}
          />
          <p className="text-lg">
            For Tourists: Discover beautiful destinations, find the perfect tour
            guide, and enjoy personalized tours tailored to your interests.
            <br />
            For Guides: Create a profile, offer tours, and connect with tourists
            looking for expert guidance.
            <br />
            For Admins: Manage the platform, ensure smooth interactions, and
            oversee the content and user activity.
          </p>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <SectionTitle
          heading={"What Our Users Say"}
          subHeading={"Real stories from our community"}
        />
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="italic text-gray-700">
              The Tourist Guide platform made my trip to Bangladesh
              unforgettable. The guide was knowledgeable and friendly!
            </p>
            <div className="mt-4 text-right">
              <p className="font-semibold">Sarah, Tourist</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="italic text-gray-700">
              As a tour guide, this platform has helped me connect with amazing
              tourists. The process is easy, and I love meeting people from
              around the world!
            </p>
            <div className="mt-4 text-right">
              <p className="font-semibold">John, Tour Guide</p>
            </div>
          </div>
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

export default AboutPage;
