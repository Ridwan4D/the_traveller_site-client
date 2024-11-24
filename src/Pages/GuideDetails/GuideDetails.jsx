import { useParams } from "react-router-dom";
import useGuides from "../../Hooks/useGuides";

const GuideDetails = () => {
    const {id} = useParams();
    const {guides}  = useGuides();
    const theGuide = guides.find(guide=> guide?._id === id);
    console.log(theGuide);
    return (
        <div>
            <h3 className="text-xl">{theGuide.userName}</h3>
        </div>
    );
};

export default GuideDetails;