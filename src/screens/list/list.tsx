import "./list.css";
import { useNavigate } from "react-router-dom";
import { ItemContent } from "./item-content";

import type { TestResult, UserSettings } from "../../App";

interface ListProps {
  settings: UserSettings;
  results: TestResult[];
  onDisplayDetails: (result: TestResult) => void;
}

export const List = ({ settings, results, onDisplayDetails }: ListProps) => {
  const listItems = results
    .map((item, index) => (
      <li key={item.timestamp} className="list-item">
        <div className="item-content">
          <ItemContent
            settings={settings}
            result={item}
            index={index}
            onDisplayDetails={onDisplayDetails}
          />
        </div>
      </li>
    ))
    .reverse();

  const navigate = useNavigate();
  const handleStartTest = () => {
    navigate("/input");
  };

  const pageContent =
    results.length === 0 ? (
      <div className="empty-results">
        <p>Record your test results, then check back here!</p>
        <small>(Click the button in the top right corner to begin.)</small>
      </div>
    ) : (
      <ul className="results-list">{listItems}</ul>
    );

  return (
    <>
      <div className="banner">
        <label className="banner-text">Sit & Stand Tests</label>
        <button className="banner-start-test-button" onClick={handleStartTest}>
          <span className="start-test-button-symbol">add</span>
        </button>
      </div>
      <div>{pageContent}</div>
    </>
  );
};
