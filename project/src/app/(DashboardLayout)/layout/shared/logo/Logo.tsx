import { styled } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

const LinkStyled = styled(Link)(() => ({
  height: "70px",
  width: "180px",
  overflow: "hidden",
  display: "block",
  marginLeft: "20px",
}));

const Logo = () => {
  return (
    <LinkStyled href="https://www.getmurphy.ai/">
      <Image
        src="/images/logos/logo.svg"
        alt="logo"
        height={70}
        width={174}
        priority
      />
    </LinkStyled>
  );
};

export default Logo;
