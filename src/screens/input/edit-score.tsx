import { useState } from "react";
import "./edit-score.css";

interface EditScoreProps {
  onSubmit: (score: number) => void;
  onClose: () => void;
  currentScore: number;
}

export const EditScore = ({
  onSubmit,
  onClose,
  currentScore,
}: EditScoreProps) => {
  const [scoreInput, setScoreInput] = useState<number | null>(null);

  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <div className="popup-header">
          <h2 className="popup-title">Edit Reps</h2>
          <button className="popup-close" onClick={onClose}>
            <span className="popup-close-symbol">close</span>
          </button>
        </div>

        <div className="popup-body">
          <label className="score-input-label" htmlFor="score-input">
            Count
          </label>
          <input
            className="score-input"
            placeholder="Your Score"
            type="number"
            id="score-input"
            min={0}
            onChange={(e) => {
              setScoreInput(Number(e.target.value));
            }}
          ></input>
        </div>

        <div className="popup-footer">
          <button
            className="popup-submit"
            onClick={() => onSubmit(scoreInput ? scoreInput : currentScore)}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};
