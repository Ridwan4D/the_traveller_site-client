import SectionTitle from "../../../../Components/SectionTitle/SectionTitle";
import StoryCard from "../../../../Components/StoryCard/StoryCard";
import useStories from "../../../../Hooks/useStories";

const HomeStory = () => {
  const { stories } = useStories();

  return (
    <div className="container mx-auto py-10 px-4">
      <SectionTitle
        heading="Travel Story"
        subHeading="Read Story of Our Clients"
      />
      {/* Section to display all the stories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {stories?.map((story, idx) => (
          <StoryCard key={idx} story={story} />
        ))}
      </div>
    </div>
  );
};

export default HomeStory;
