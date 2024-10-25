import styled from "@emotion/styled";

// Should probably think of a better name
export const GreenLink = styled.a`
  font-weight: 600;
  text-decoration: none; /* Optional: to remove underline */

  &:hover {
    text-decoration: underline; /* Optional: to add underline on hover */
  }

  .ant-typography & {
    color: var(--green-color);
  }
`;
