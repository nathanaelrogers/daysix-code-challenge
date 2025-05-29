import { useState } from "react";
import type { UserSettings } from "./App";
import "./config-settings.css";

interface ConfigSettingsProps {
  onSubmit: (profile: UserSettings) => void;
}

export const ConfigSettings = ({ onSubmit }: ConfigSettingsProps) => {
  const [nameInput, setNameInput] = useState("");
  const [genderInput, setGenderInput] = useState("");

  return (
    <div className="config-popup-overlay">
      <div className="config-popup-content">
        <h2 className="config-popup-title">
          Please enter your name and gender to continue:
        </h2>
        <form
          className="config-popup-form"
          onSubmit={(e) => {
            e.preventDefault();
            if (nameInput.trim() && genderInput) {
              onSubmit({ name: nameInput.trim(), gender: genderInput });
            }
          }}
        >
          <input
            placeholder="Your Name"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
          ></input>
          <input
            type="radio"
            id="male"
            name="gender"
            value="male"
            onChange={(e) => {
              setGenderInput(e.target.value);
            }}
          />
          <label htmlFor="male">Male</label>
          <input
            type="radio"
            id="female"
            name="gender"
            value="female"
            onChange={(e) => {
              setGenderInput(e.target.value);
            }}
          />
          <label htmlFor="female">Female</label>
          <button type="submit" className="config-popup-submit">
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};
