import { AppHeader, AppTitle, HeaderVariant } from "./Header.styles";

interface HeaderProps {
  variant: HeaderVariant;
}

// I have made the header layout the same despite the Figma having a slighty different layout for the 'Checked' logo, hope that is ok.
// Otherwise I would have had two distinct layouts for the two different layouts
const Header = ({ variant }: HeaderProps) => {
  return (
    <AppHeader variant={variant}>
      <AppTitle variant={variant}>Checked</AppTitle>
    </AppHeader>
  );
};

export default Header;
