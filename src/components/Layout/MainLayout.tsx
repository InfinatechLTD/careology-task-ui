import { ReactNode } from "react";
import Header from "./Header";
import { LayoutContainer, LayoutMain } from "./Layout.styles";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <LayoutContainer>
      <Header variant="inverse" />
      <LayoutMain>{children}</LayoutMain>
    </LayoutContainer>
  );
};

export default Layout;
