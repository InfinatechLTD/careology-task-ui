import styled from "@emotion/styled";

export const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-self: center;
  background-color: #fffefc;
  min-width: 100%;
  justify-content: center;
`;

export const LayoutMain = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0px;
  margin: 0 auto;
  max-width: 1240px;
  width: 100%;

  @media (max-width: 1240px) {
    box-sizing: border-box;
    padding: 0 32px;
  }
`;
