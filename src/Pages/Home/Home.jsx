import { Helmet } from "react-helmet";
import Slider from "./Shared/Slider/Slider";
import TourismAndGuide from "./Shared/Tourism&Guide/TourismAndGuide";
import HomeStory from "./Shared/HomeStory/HomeStory";

const Home = () => {
  return (
    <div className="px-1">
      <Helmet>
        <title>Traveler Site</title>
      </Helmet>
      <section className="mt-6 border-b border-gray-300 border-dashed md:pb-5">
        <Slider />
      </section>
      <section className="mt-10 border-b border-gray-300 border-dashed">
        <TourismAndGuide />
      </section>
      <section className="mt-10 border-b border-gray-300 border-dashed">
        <HomeStory />
      </section>

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default Home;
