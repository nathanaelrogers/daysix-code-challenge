import { useNavigate } from "react-router-dom";
import type { TestResult, UserSettings } from "../../App";

interface ItemContentProps {
  settings: UserSettings;
  result: TestResult;
  index: number;
  onDisplayDetails: (result: TestResult) => void;
}

export const ItemContent = ({
  settings,
  result,
  index,
  onDisplayDetails,
}: ItemContentProps) => {
  const rtf1 = new Intl.RelativeTimeFormat("en", { style: "short" });
  const navigate = useNavigate();

  const handleDisplayDetails = () => {
    onDisplayDetails(result);
    navigate("/test");
  };

  const calcRelativeTime = (eventTime: number) => {
    const millis = eventTime - Date.now();
    const seconds = millis / 1000;
    const mins = seconds / 60;
    const hours = mins / 60;
    const days = hours / 24;

    if (Math.abs(days) >= 1) return rtf1.format(Math.floor(days), "days");
    else if (Math.abs(hours) >= 1)
      return rtf1.format(Math.floor(hours), "hours");
    else if (Math.abs(mins) >= 1)
      return rtf1.format(Math.floor(mins), "minutes");
    else return rtf1.format(Math.floor(seconds), "seconds");
  };

  const calcRatingStyle = (rating: string) => {
    if (rating == "above-avg")
      return (
        <div className="info-block above-average-score">Above Average</div>
      );
    else if (rating == "avg")
      return <div className="info-block average-score">Average</div>;
    else
      return (
        <div className="info-block below-average-score">Below Average</div>
      );
  };

  return (
    <>
      <div className="info-grid">
        <div className="info-block">Test {index + 1}</div>
        <div className="info-block">Score: {result.score}</div>
        <div className="info-block" style={{ color: "gray" }}>
          {calcRelativeTime(result.timestamp)}
        </div>
        {calcRatingStyle(result.rating)}
      </div>
      <button onClick={handleDisplayDetails} className="display-details-button">
        <span className="display-details-button-symbol">arrow_forward_ios</span>
      </button>
    </>
  );
};
