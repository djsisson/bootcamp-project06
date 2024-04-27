import "./Reset.css";

const Reset = () => {
  const onClick = () => {
    localStorage.clear();
    window.location.reload();
  };

  return <button className="Reset" onClick={onClick}>Reset</button>;
};

export default Reset;
