import { Image } from "react-bootstrap";

const Logo = ({ width = 50, height = 50 }) => {//eslint-disable-line
  return (
    <Image src="/images/icon.png" width={width} height={height} alt="icon" />
  );
};

export default Logo;
