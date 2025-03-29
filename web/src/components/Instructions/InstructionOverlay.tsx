import React from "react";
import styled, { keyframes } from "styled-components";
import { colors, spacing, borderRadius } from "../../styles/foundation";

const fadeIn = keyframes`
  from { opacity: 0 }
  to { opacity: 1 }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 9999;
  animation: ${fadeIn} 0.4s ease-in-out;
`;

const InstructionBox = styled.div`
  position: absolute;
  background: ${colors.background};
  color: ${colors.text.primary};
  padding: ${spacing.lg};
  border-radius: ${borderRadius.md};
  max-width: 280px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
`;

const Arrow = styled.div`
  width: 0;
  height: 0;
  border-left: 12px solid transparent;
  border-right: 12px solid transparent;
  border-bottom: 18px solid ${colors.primary};
  margin: ${spacing.sm} auto;
`;

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${spacing.md};

  button {
    background: ${colors.primary};
    color: ${colors.text.inverted};
    border: none;
    padding: ${spacing.sm} ${spacing.md};
    border-radius: ${borderRadius.sm};
    cursor: pointer;
  }
`;

interface Props {
  step: number;
  totalSteps: number;
  text: string;
  position: { top: string; left: string };
  onNext: () => void;
  onSkip: () => void;
}

const InstructionOverlay: React.FC<Props> = ({
  step,
  totalSteps,
  text,
  position,
  onNext,
  onSkip,
}) => {
  return (
    <Overlay>
      <InstructionBox style={position}>
        <h4>
          Step {step} of {totalSteps}
        </h4>
        <p>{text}</p>
        <Arrow />
        <Controls>
          <button onClick={onSkip}>Skip</button>
          <button onClick={onNext}>
            {step === totalSteps ? "Finish" : "Next"}
          </button>
        </Controls>
      </InstructionBox>
    </Overlay>
  );
};

export default InstructionOverlay;
