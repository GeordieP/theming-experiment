import React, { useState, useContext, useEffect } from "react";
import { ThemeContext, Themes, ThemedComponentProps } from "app-theme-context";
import styled from "@emotion/styled";

const now = () => new Date().toLocaleString();

export default function Greeting() {
  const setTheme = useContext(ThemeContext);
  const [time, setTime] = useState(now());

  const darkTheme = () => setTheme(Themes.Dark);
  const lightTheme = () => setTheme(Themes.Light);

  useEffect(() => {
    const intvl = setInterval(() => setTime(now()), 1000);
    return () => { clearInterval(intvl); }
  }, []);

  return (
    <>
      <div className="u-flexV u-centerBoth u-fullHeight">
        <h1>Hello, world!</h1>
        <p>{time}</p>
      </div>

      <div className="u-flexV u-centerBoth u-fullHeight">
        <h3>Themes</h3>
        <div className="u-flexH u-centerBoth">
          <S.Button onClick={darkTheme}>Dark</S.Button>
          <S.Button onClick={lightTheme}>Light</S.Button>
        </div>
      </div>
    </>
  );
}

const S = {
  Button: styled.button((props: ThemedComponentProps) => ({
    background: props.theme.bgPrimary,
    color: props.theme.textPrimary,
    border: "none",
    ":hover": {
      color: props.theme.bgPrimary,
      background: props.theme.textPrimary,
    }
  }))
};