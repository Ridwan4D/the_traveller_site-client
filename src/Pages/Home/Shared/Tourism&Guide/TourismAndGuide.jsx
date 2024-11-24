import SectionTitle from "../../../../Components/SectionTitle/SectionTitle";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Overview from "./Overview";
import HomePackage from "./HomePackage";

const TourismAndGuide = () => {
  return (
    <div>
      <SectionTitle heading="Tourism and Travel Guide Section" />
      <div>
        <Tabs defaultIndex={0}>
          <TabList>
            <Tab>Overview</Tab>
            <Tab>Our Packages</Tab>
            <Tab>Meet Our Tour Guides</Tab>
          </TabList>

          <TabPanel>
            <Overview />
          </TabPanel>
          <TabPanel>
            <HomePackage />
          </TabPanel>
          <TabPanel>
            <h2>Any content 3</h2>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default TourismAndGuide;
