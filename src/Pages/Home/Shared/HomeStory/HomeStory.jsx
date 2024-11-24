import SectionTitle from "../../../../Components/SectionTitle/SectionTitle";
import StoryCard from "../../../../Components/StoryCard/StoryCard";
import useStories from "../../../../Hooks/useStories";
import { useState } from "react";

const HomeStory = () => {
  const { stories } = useStories();
  const [visibleCount, setVisibleCount] = useState(3); // Initially show 3 cards

  // Function to show all stories
  const handleShowAll = () => {
    setVisibleCount(stories?.length); // Set visible count to total stories
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <SectionTitle
        heading="Travel Story"
        subHeading="Read Story of Our Clients"
      />
      {/* Section to display the stories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {stories?.slice(0, visibleCount).map((story, idx) => (
          <StoryCard key={idx} story={story} />
        ))}
      </div>
      {/* Button to show all stories */}
      {stories?.length > 3 && (
        <div className="text-center mt-6">
          <button
            onClick={handleShowAll}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg"
          >
            Show All Stories
          </button>
        </div>
      )}
    </div>
  );
};

export default HomeStory;
