import { useState } from "react";

import "./input.css";
import standGIF from "../../../public/sit-stand.gif";

import type { TestResult, UserSettings } from "../../App";
import { EditScore } from "./edit-score";
import { useNavigate } from "react-router";
import CountdownTimer from "./timer";

interface InputProps {
  onTestEnd: (result: TestResult) => void;
  settings: UserSettings;
}

export const Input = ({ onTestEnd, settings }: InputProps) => {
  const [displayEditScore, setDisplayEditScore] = useState(false);
  const [userScore, setUserScore] = useState<number>(0);

  const calcScoreRating = (score: number) => {
    const scoreBoundaries = settings.gender == "male" ? [10, 15] : [12, 20];

    if (score >= scoreBoundaries[1]) return "above-avg";
    else if (score >= scoreBoundaries[0]) return "avg";
    else return "below-avg";
  };

  const navigate = useNavigate();
  const handleEndTest = () => {
    const newResult: TestResult = {
      score: userScore,
      timestamp: Date.now(),
      rating: calcScoreRating(userScore),
    };
    console.log(newResult.rating);

    onTestEnd(newResult);

    navigate("/test");
  };

  const handleEditScore = (score: number) => {
    setDisplayEditScore(false);
    setUserScore(score);
  };

  return (
    <div className="input-screen-background">
      {displayEditScore && (
        <EditScore
          onSubmit={handleEditScore}
          onClose={() => setDisplayEditScore(false)}
          currentScore={userScore}
        />
      )}

      <h2 className="input-screen-header">Sit & Stand Test</h2>

      <div className="input-screen-content">
        <div className="input-screen-content-gif">
          <img className="stand-gif" src={standGIF} />
          <div>
            <div className="circle outer-circle" />
            <div className="circle inner-circle" />
          </div>
        </div>

        <div className="input-screen-content-timer-reps">
          <div className="input-screen-content-timer">
            <CountdownTimer />
          </div>
          <div className="input-screen-content-reps">
            <p className="input-screen-reps-label">Reps Counter</p>
            <div className="edit-score-button-group">
              <p className="edit-score-button-label">{userScore}</p>
              <button
                className="edit-score-button"
                id="edit-score-button"
                onClick={() => setDisplayEditScore(true)}
              >
                <span className="edit-score-button-symbol">edit</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="input-screen-footer">
        <button className="input-screen-submit" onClick={handleEndTest}>
          End Test
        </button>
      </div>
    </div>
  );
};
