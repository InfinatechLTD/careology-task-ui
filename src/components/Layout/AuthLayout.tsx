import { ReactNode } from "react";
import Header from "./Header";
import { LayoutContainer, LayoutMain } from "./Layout.styles";

interface LayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: LayoutProps) => {
  return (
    <LayoutContainer>
      <Header variant="transparent" />
      <LayoutMain>{children}</LayoutMain>
    </LayoutContainer>
  );
};

export default AuthLayout;
