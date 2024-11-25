import useStories from "../../Hooks/useStories";
import useUsers from "../../Hooks/useUser";
import StoryCard from "../StoryCard/StoryCard";

const UserStory = () => {
  const { theUser } = useUsers();
  const { stories } = useStories();
  const userStories = stories.filter(
    (story) => story?.email === theUser?.userEmail
  );

  return (
    <div className="p-4">
      {userStories.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          You haven&apos;t shared any stories yet. Start sharing your
          experiences!
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {userStories.map((story, index) => (
            <StoryCard key={index} story={story} />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserStory;
