import "./UserName.css";
import {
  useGameState,
  useGameStateDispatch,
} from "../../Context/gameStateContext.jsx";
import { useEffect, useState } from "react";

let timeout
const UserName = () => {
  const [showName, setShowName] = useState(false);
  const userName = useGameState().playername;
  const dispatch = useGameStateDispatch()

  const onClick = (e) => {
    e.stopPropagation()
    if (e.target.className=="editname") setShowName(!showName);
    clearTimeout(timeout)
  };

  const onFocus = (e) => {
    e.target.select()
    setShowName(true)
    clearTimeout(timeout)
  }
  const onKeyDown = (e) => {
    if (e.code=="Enter") {
      setShowName(false)
    }
    clearTimeout(timeout)
  }

  const onMouseLeave = () => {
    timeout = setTimeout(()=> setShowName(false), 3000)
  };

  const onMouseEnter = () => {
    clearTimeout(timeout)
  }

  const onChange = (e) => {
    dispatch({
      type: "changeName",
      value: e.target.value,
    });
  }

  useEffect(() => {}, [userName]);

  return (
    <div className="player-name">
      <div>{userName || "Traveller"}</div>
      <div onClick={onClick} className="editcontainer">
        <img className="editname" />
        {showName ? (
          <div  className="input-container">
            <label className="label-name" htmlForfor="playername">
              Name:
            </label>
            <input onMouseLeave={onMouseLeave}
            onMouseEnter={onMouseEnter}
            onFocus={onFocus}
            onChange={onChange}
            onKeyDown={onKeyDown}
              className="input-name"
              defaultValue={userName || "Traveller"}
              type="text"
              name="Player"
              id="playername"
              maxLength="12"
              minLength="1"
              pattern="^[a-zA-Z0-9_]*$"
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default UserName;
