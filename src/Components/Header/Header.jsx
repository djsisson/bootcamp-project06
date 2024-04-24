import "./Header.css";
import UserName from "../UserName/UserName.jsx";
import Theme from "../Theme/Theme.jsx";

const Header = () => {
  return (
    <header className="header">
      <h1>Header</h1>
      <UserName />
      <Theme />
    </header>
  );
};

export default Header;
