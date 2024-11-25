import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import useStories from "../../Hooks/useStories";
import {
  FacebookShareButton,
  WhatsappShareButton,
  FacebookIcon,
  WhatsappIcon,
} from "react-share";
import TopLayer from "../../Components/TopLayerOfPage/TopLayer";

const StoryDetails = () => {
  const { id } = useParams();
  const { stories } = useStories();
  const storyDetail = stories.find((story) => story._id === id);
  const shareUrl = window.location.href;

  if (!storyDetail) {
    return <div className="text-center py-10 text-xl">Story not found</div>;
  }

  const {
    tourName,
    tourDate,
    tourType,
    description,
    name,
    guideName,
    placeImage,
  } = storyDetail;

  return (
    <main className="bg-white dark:bg-gray-900 pt-8 pb-16 lg:pt-16 lg:pb-24">
      <Helmet>
        <title>Story Details | Traveller Site</title>
      </Helmet>
      <TopLayer />
      <div className="container mx-auto px-4">
        <article className="max-w-3xl mx-auto space-y-8">
          {/* Header Section */}
          <header>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
              The Tour of <span className="text-blue-500">{name}</span>
            </h1>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
              {tourName} <span className="text-lg">({tourType})</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Tour Partner: {guideName}
            </p>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Tour Date: {tourDate}
            </p>
          </header>

          {/* Description Section */}
          <section>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Description
            </h3>
            <p className="text-base text-gray-600 dark:text-gray-300">
              {description}
            </p>
          </section>

          {/* Image Section */}
          <section>
            <figure className="mt-6">
              <img
                src={placeImage}
                alt={tourName}
                className="w-full rounded-lg shadow-lg"
              />
              <figcaption className="text-center mt-2 text-gray-500 dark:text-gray-400">
                Captured by {name}
              </figcaption>
            </figure>
          </section>

          {/* Social Share Section */}
          <section className="flex flex-col md:flex-row justify-between items-center mt-8">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Share this story
            </h3>
            <div className="flex space-x-3 mt-4">
              <FacebookShareButton url={shareUrl}>
                <FacebookIcon size={40} round={true} />
              </FacebookShareButton>
              <WhatsappShareButton url={shareUrl}>
                <WhatsappIcon size={40} round={true} />
              </WhatsappShareButton>
            </div>
          </section>
        </article>
      </div>
    </main>
  );
};

export default StoryDetails;
