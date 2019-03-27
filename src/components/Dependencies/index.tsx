import React from "react";
import styled from "@emotion/styled";
import pkg from "../../../package.json";
import useFilters from "../../hooks/useFilters";
import SearchDependencies from "./SearchDependencies";
import { ThemedComponentProps } from "app-theme-context";

// Helper functions

function objectToArray(obj) {
  const keys = Object.keys(obj);
  return keys.map(k => ({ name: k, value: obj[k] }));
}

function mapDepsArr(deps) {
  return deps.map(({ name, value }) => (
    <li key={name}>
      <S.A
        href={`https://www.npmjs.com/package/${name}`}
        title="View package on npm"
        target="npm"
      >
        {name}
        <S.Version>{value}</S.Version>
      </S.A>
    </li>
  ));
}

// data

const allDependencies = objectToArray(pkg.dependencies);
const allDevDependencies = objectToArray(pkg.devDependencies);

// components

export default function Dependencies() {
  const { addOrUpdateFilter, removeFilter, applyFilters } = useFilters();

  const dependencies = applyFilters(allDependencies);
  const devDependencies = applyFilters(allDevDependencies);

  return (
    <div>
      <SearchDependencies
        addOrUpdateFilter={addOrUpdateFilter}
        removeFilter={removeFilter}
      />

      <div>
        <h4>Dependencies</h4>
        <ul data-testid="depsList">{mapDepsArr(dependencies)}</ul>
      </div>

      <div>
        <h4>Dev Dependencies</h4>
        <ul data-testid="devDepsList">{mapDepsArr(devDependencies)}</ul>
      </div>
    </div>
  );
}

const S = {
  Version: styled.span((props: ThemedComponentProps) => ({
    background: props.theme.bgPrimary,
    color: props.theme.textPrimary,
    marginLeft: "5px",
    fontSize: "0.9rem",
    padding: "1px 4px",
    borderRadius: "3px",
  })),

  A: styled.a`
    color: inherit;
    text-decoration: none;
    :hover {
      text-decoration: underline;
    }
  `,
};
