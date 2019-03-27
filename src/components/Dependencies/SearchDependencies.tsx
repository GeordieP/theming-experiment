import React, { useState } from "react";
import { AddOrUpdateFilter, RemoveFilter } from "../../hooks/useFilters";
import styled from "@emotion/styled";
import { ThemedComponentProps } from "app-theme-context";

interface SearchDependenciesProps {
  addOrUpdateFilter: AddOrUpdateFilter;
  removeFilter: RemoveFilter;
}

export default function SearchDependencies({
  addOrUpdateFilter,
  removeFilter
}: SearchDependenciesProps) {
  const [value, setValue] = useState("");

  const updateSearch = e => {
    const newValue = e.target.value;

    if (newValue.length === 0) {
      removeFilter("search");
    } else {
      addOrUpdateFilter("search", item => item.name.includes(newValue));
    }

    setValue(newValue);
  };

  return (
    <S.SearchInput
      type="text"
      value={value}
      onChange={updateSearch}
      placeholder="Search..."
      data-testid="searchDependencies_searchBar"
    />
  );
}

const S = {
  SearchInput: styled.input((props: ThemedComponentProps) => ({
    background: props.theme.bgPrimary,
    color: props.theme.textHighlighted,
    width: "100%",
    borderRadius: "3px",
    marginBottom: "10px",
    border: "1px solid rgba(0, 0, 0, 0.1)",
    fontSize: "10px",
    padding: "6px",
  }))
};