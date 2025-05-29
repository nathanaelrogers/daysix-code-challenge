import "./test.css";

import type { TestResult, UserSettings } from "../../App";
import { Link, useNavigate } from "react-router";

interface TestProps {
  result: TestResult | null;
  userSettings: UserSettings | null;
  freshResult: boolean;
  onRetryTest: () => void;
  onSubmitResults: (newResult: TestResult) => void;
}
export const Test = ({
  result,
  userSettings,
  freshResult,
  onRetryTest,
  onSubmitResults,
}: TestProps) => {
  const navigate = useNavigate();

  const handleRetryTest = () => {
    onRetryTest();
    navigate("/input");
  };

  const handleSubmitResults = (newResult: TestResult) => {
    onSubmitResults(newResult);
    navigate("/");
  };

  const handleStartNewTest = () => {
    navigate("/input");
  };

  if (!result)
    return (
      <div className="test-screen-background">
        <div className="test-screen-no-result">
          It looks like you're here by accident. Please select a result to view,
          or record a new one! (Go to the <Link to="/">homepage</Link>).
        </div>
      </div>
    );

  if (!userSettings) return;

  const freshTestButtons = (
    <div className="test-screen-footer">
      <button onClick={handleRetryTest} className="test-screen-button">
        Try Again
      </button>
      <button
        onClick={() => {
          handleSubmitResults(result);
        }}
        className="test-screen-button"
      >
        Submit Result
      </button>
    </div>
  );

  const oldTestButtons = (
    <div className="test-screen-footer">
      <button onClick={handleStartNewTest} className="test-screen-button">
        Start New Test
      </button>
    </div>
  );

  const congratMessage = (
    <small>
      Hi {userSettings.name}, great job on doing another sit stand test. Your
      results are in.
    </small>
  );

  const aboveAverageFeedback = (
    <>
      <p>How does this compare</p>
      <p>
        Excellent result! Your score is higher than average. This is a great
        sign of your current strength and balance
      </p>
      <p>Actionable tips</p>
      <ul>
        <li>
          To keep this advantage, continue your current activities and consider
          adding variety. For example, if you walk, try routes with hills. If
          you do strength exercises, ensure you're including movements that
          challenge your legs in different ways (like lunges or step-ups
          safely). This helps keep your muscles adaptable and strong.
        </li>
        <li>
          Challenge your excellent balance further. Try activities like Tai Chi,
          yoga, or even simple exercises like standing on one leg for 15-30
          seconds while brushing your teeth (ensure you have support nearby if
          needed). This enhances your stability, further protecting against
          falls.
        </li>
      </ul>
    </>
  );

  const averageFeedback = (
    <>
      <p>How does this compare</p>
      <p>
        Nice work! Your performance is on par with others your age and gender.
        This is a great baseline – you can continue to build from here!
      </p>
      <p>Actionable tips</p>
      <ul>
        <li>
          Incorporate more 'sit-to-stands' into your daily routine. For example,
          each time you sit down or stand up from a chair at home or work, do it
          mindfully, perhaps a couple of extra times. Try to use your leg
          muscles more and rely less on your arms. This directly strengthens the
          muscles used in the test.
        </li>
        <li>
          Add two 10-minute 'strength snacks' to your week. This could be as
          simple as doing 2-3 sets of 8-12 bodyweight squats (focus on good
          form, going as low as comfortable) or calf raises. Small, regular
          efforts make a big difference in maintaining and improving the
          strength this test measures.
        </li>
      </ul>
    </>
  );

  const belowAverageFeedback = (
    <>
      <p>How does this compare</p>
      <p>
        You've taken a positive step by doing the test! While your score is
        currently below average, this is valuable information. Let's look at
        ways to gradually build your strength and balance
      </p>
      <p>Actionable tips</p>
      <ul>
        <li>
          Start by practicing the sit-to-stand motion safely. Sit towards the
          front of a sturdy chair, feet flat. If needed, use the armrests to
          help you push up to a full stand, and then control your movement back
          down. Aim for 5-8 repetitions, 1-2 times a day. Focus on quality over
          quantity. As you get stronger, try to use your arms less.
        </li>
        <li>
          Incorporate simple leg-strengthening exercises. While seated, you can
          do leg extensions (straighten one knee, hold for a few seconds, then
          lower slowly). Or, try heel raises and toe raises while seated or
          standing (holding onto a counter for support). Aim for 10-15
          repetitions of each, a few times a week. These build the foundational
          strength needed for better sit-stand performance and easier daily
          movement.
        </li>
        <li>
          If comfortable and safe for you, try to add short walks to your day,
          even 5-10 minutes. Walking helps build overall leg endurance and
          strength. Start slow and gradually increase your time or distance as
          you feel able. Every step helps!
        </li>
      </ul>
    </>
  );

  const tipMessage = () => {
    if (result.rating == "above-avg") return aboveAverageFeedback;
    else if (result.rating == "avg") return averageFeedback;
    else return belowAverageFeedback;
  };

  return (
    <body className="test-screen">
      <div className="test-screen-background">
        <div className="test-screen-header">
          <button className="test-screen-back-button">
            <span
              className="test-screen-back-button-symbol"
              onClick={() => {
                navigate("/");
              }}
            >
              arrow_back_ios
            </span>
          </button>
          <h2>Sit Stand Test Result</h2>
          {freshResult ? congratMessage : null}
        </div>
        <div className="test-screen-body">
          <div className="test-screen-body-repcount">
            <div>Repetitions</div>
            <div>{result.score}</div>
          </div>
          <div className="test-screen-body-averages-table">
            <div className="averages-table-row">
              <span className="averages-table-label">Above Average:</span>
              <span className="averages-table-value">
                Men: {">"}14, Women: {">"}20
              </span>
            </div>
            <div className="averages-table-row">
              <span className="averages-table-label">Average:</span>
              <span className="averages-table-value">
                Men: 10-14, Women: 12-19
              </span>
            </div>
            <div className="averages-table-row">
              <span className="averages-table-label">Below Average:</span>
              <span className="averages-table-value">
                Men: {"<"}10, Women: {"<"}8
              </span>
            </div>
          </div>
          <div className="test-screen-body-tips">{tipMessage()}</div>
        </div>
        {freshResult ? freshTestButtons : oldTestButtons}
      </div>
    </body>
  );
};
