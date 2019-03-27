import React, { createContext, useState, useEffect } from "react";
import { ThemeProvider as EmotionThemeProvider } from "emotion-theming";

// TYPES

export enum Themes {
  Light,
  Dark,
}

export interface ThemeColors {
  bgPrimary: string;
  bgHighlighted: string;
  textPrimary: string;
  textHighlighted: string;
}

export interface ThemeContext {
  (theme: Themes): void;
}

export interface ThemedComponentProps {
  theme?: ThemeColors;
}

// MISC

const applyThemeGlobalStyles = (colors: ThemeColors) => {
  Object.entries(colors).forEach(property => {
    document.documentElement.style.setProperty(`--${property[0]}`, property[1]);
  });
}

// COLORS

const THEME_COLORS_LIGHT: ThemeColors = {
  bgPrimary: "#f0f4f8",
  bgHighlighted: "#ffffff",
  textPrimary: "#486581",
  textHighlighted: "lightblue",
};

const THEME_COLORS_DARK: ThemeColors = {
  bgPrimary: "#303233",
  bgHighlighted: "#3f4244",
  textPrimary: "#f0f4f8",
  textHighlighted: "white",
};

// REACT THINGS

const initial = () => null;
export const ThemeContext = createContext<ThemeContext | null>(initial);

export function ThemeProvider({ children, ...props }) {
  const [theme, setTheme] = useState(Themes.Dark);
  const [themeColors, setColors] = useState(THEME_COLORS_DARK);

  useEffect(() => {
    let newColors: ThemeColors;

    switch (theme) {
      default:
      case Themes.Light:
        newColors = THEME_COLORS_LIGHT;
        break;
      case Themes.Dark:
        newColors = THEME_COLORS_DARK;
        break;
    }

    applyThemeGlobalStyles(newColors);
    setColors(newColors);
  }, [theme]);

  return (
    <EmotionThemeProvider theme={themeColors}>
      <ThemeContext.Provider value={setTheme} {...props}>
        {children}
      </ThemeContext.Provider>
    </EmotionThemeProvider>
  );
}
