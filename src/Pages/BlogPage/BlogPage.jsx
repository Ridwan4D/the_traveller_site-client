import { Link } from "react-router-dom";

const BlogPage = () => {
  const blogPosts = [
    {
      id: 1,
      title: "The Ultimate Guide to Tour Planning",
      date: "Nov 10, 2024",
      excerpt:
        "Planning your next vacation can be overwhelming. Here's a guide to help you create the perfect tour plan for your next trip...",
      image:
        "https://res.cloudinary.com/duv5fiurz/image/upload/v1732536228/download_66_otxgx0.jpg",
    },
    {
      id: 2,
      title: "Top 10 Tourist Destinations in Bangladesh",
      date: "Nov 15, 2024",
      excerpt:
        "Bangladesh is home to some of the most beautiful and underrated tourist spots. In this post, we cover the top 10 destinations...",
      image:
        "https://res.cloudinary.com/duv5fiurz/image/upload/v1732536229/download_68_uohjzj.jpg",
    },
    {
      id: 3,
      title: "How to Choose the Right Tour Guide",
      date: "Nov 18, 2024",
      excerpt:
        "Choosing the right tour guide can make or break your trip. Learn the essential qualities to look for when selecting a guide...",
      image:
        "https://res.cloudinary.com/duv5fiurz/image/upload/v1732536228/download_69_uqhe5s.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-semibold text-indigo-600 text-center mb-8">
        Blog
      </h1>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h2 className="text-2xl font-semibold text-indigo-600 mb-4">
              {post.title}
            </h2>
            <p className="text-gray-500 text-sm mb-4">{post.date}</p>
            <p className="text-gray-700 mb-6">{post.excerpt}</p>
            <Link
              to={`/blog/${post.id}`}
              className="text-indigo-600 hover:text-indigo-800"
            >
              Read more &rarr;
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
