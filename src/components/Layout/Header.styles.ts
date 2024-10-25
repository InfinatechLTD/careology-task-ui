import styled from "@emotion/styled";

export type HeaderVariant = "transparent" | "inverse";

export const AppHeader = styled.header<{ variant: HeaderVariant }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background-color: ${({ variant }) =>
    variant === "transparent" ? "#fffefc" : "#000000"};
`;

export const AppTitle = styled.h1<{ variant: HeaderVariant }>`
  font-family: "Poppins", sans-serif;
  font-size: 20px;
  font-weight: 600;
  margin: 0;
  color: ${({ variant }) =>
    variant === "transparent" ? "#000000" : "#FFFFFF"};
`;
