import Link from "next/link";
import { styled } from "@mui/material";
import Image from "next/image";

const LinkStyled = styled(Link)(() => ({
  height: "70px",
  width: "180px",
  overflow: "hidden",
  display: "block",
}));

const Logo = ({
  height = 60,
  width = 160,
  redirectToHome = false,
}: {
  redirectToHome?: boolean;
  height?: number;
  width?: number;
}) =>
  redirectToHome ? (
    <LinkStyled href={"/"}>
      <Image
        src="/images/logos/dark-logo.svg"
        alt="logo"
        height={height}
        width={width}
        priority
      />
    </LinkStyled>
  ) : (
    <Image
      src="/images/logos/dark-logo.svg"
      alt="logo"
      height={height}
      width={width}
      priority
    />
  );

export default Logo;
