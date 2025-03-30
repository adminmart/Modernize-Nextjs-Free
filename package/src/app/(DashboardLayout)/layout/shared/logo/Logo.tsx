import Link from "next/link";
import { styled, Typography } from "@mui/material";

const LinkStyled = styled(Link)(() => ({
  textDecoration: "none",
  display: "flex",
  alignItems: "center",
}));

const Logo = () => {
  return (
    <LinkStyled href="/">
      <Typography
        variant="h4"
        color="primary"
        sx={{
          fontWeight: 700,
          lineHeight: 1.2,
        }}
      >
        Innovative
        <Typography
          component="span"
          variant="h4"
          sx={{
            color: "text.secondary",
            fontWeight: 700,
            display: "block",
          }}
        >
          Centre
        </Typography>
      </Typography>
    </LinkStyled>
  );
};

export default Logo;
  