import { useState, useEffect } from "react";
import InstructionOverlay from "./InstructionOverlay";

const steps = [
  {
    text: "Click here to add your first property.",
    position: { top: "80px", left: "70%" },
  },
  {
    text: "Check out your financial analytics here.",
    position: { top: "10px", left: "60%" },
  },
  {
    text: "Manage your settings here.",
    position: { top: "10px", left: "80%" },
  },
];

const InstructionDashboard = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const isComplete = localStorage.getItem("isUserCompleteInstruction");
    if (isComplete === "true") setStep(-1);
  }, []);

  const handleNext = () => {
    if (step + 1 === steps.length) {
      localStorage.setItem("isUserCompleteInstruction", "true");
      setStep(-1);
    } else {
      setStep((prev) => prev + 1);
    }
  };

  const handleSkip = () => {
    localStorage.setItem("isUserCompleteInstruction", "true");
    setStep(-1);
  };

  if (step === -1) return null;

  return (
    <InstructionOverlay
      step={step + 1}
      totalSteps={steps.length}
      text={steps[step].text}
      position={steps[step].position}
      onNext={handleNext}
      onSkip={handleSkip}
    />
  );
};

export default InstructionDashboard;
