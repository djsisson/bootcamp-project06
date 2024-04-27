import "./Header.css";
import UserName from "../UserName/UserName.jsx";
import Reset from "../Reset/Reset.jsx";
import Theme from "../Theme/Theme.jsx";

const Header = () => {
  return (
    <header className="header">
      <h1>Asteroid Miner</h1>
      <UserName />
      <Reset />
      <Theme />
    </header>
  );
};

export default Header;
