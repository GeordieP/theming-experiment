import React from "react";
import styled from "@emotion/styled";

import "./app.css";

import Greeting from "./components/Greeting";
import Dependencies from "./components/Dependencies";

// this import is an alias in both parcel (package.json > alias) and typescript (tsconfig.json > paths)
import { ThemeProvider, ThemedComponentProps } from "app-theme-context";

function App() {
  return (
    <S.Centered>
      <S.Split>
        <S.Panel>
          <Greeting />
        </S.Panel>
        <S.Panel>
          <Dependencies />
        </S.Panel>
      </S.Split>
    </S.Centered>
  );
}

export default function ThemedApp(props) {
  return (
    <ThemeProvider>
      <App {...props} />
    </ThemeProvider>
  );
}

const S = {
  Centered: styled.div`
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    height: 100%;
  `,

  Split: styled.div`
    display: grid;
    grid-template-columns: 40% auto;
    width: 80%;
    grid-gap: 30px;
  `,

  Panel: styled.div((props: ThemedComponentProps) => ({
    background: props.theme.bgHighlighted,
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 8px 19px hsla(0, 0%, 0%, 0.06)",
    height: "500px",
    overflow: "auto",
  })),
};
