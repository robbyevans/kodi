import React, { useState } from "react";
import * as S from "./styles";

const ThemeToggle: React.FC = () => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => setIsDark((prev) => !prev);

  return (
    <S.ToggleContainer>
      <S.ToggleLabel>
        <S.ToggleInput
          type="checkbox"
          checked={isDark}
          onChange={toggleTheme}
        />
        <S.ToggleSlider />
      </S.ToggleLabel>
    </S.ToggleContainer>
  );
};

export default ThemeToggle;
