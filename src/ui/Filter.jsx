import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

const FilterButton = styled.button`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.active
      ? css`
          background-color: var(--color-brand-600);
          color: var(--color-brand-50);
        `
      : undefined}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

const Filter = ({ FilterField, options }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(FilterField) || options.at(0).value;

  function handleClick(value) {
    searchParams.set(FilterField, value);

    if (searchParams.get("page")) searchParams.set("page", 1);
    setSearchParams(searchParams);
  }

  useEffect(() => {
    function initalLoad() {
      searchParams.get(options[0].value);
    }
    if (!searchParams) document.addEventListener("load", initalLoad);
    return () => document.removeEventListener("load", initalLoad);
  }, [searchParams, options]);

  return (
    <StyledFilter>
      {options.map((option) => (
        <FilterButton
          key={option.value}
          active={currentFilter === option.value ? "true" : undefined}
          // disabled={currentFilter === option.value ? "true" : "false"}
          onClick={() => handleClick(option.value)}
        >
          {option.label}
        </FilterButton>
      ))}
    </StyledFilter>
  );
};

export default Filter;
