import React , {useContext} from "react";
import { AuthContext } from "../../App";
import "./Header.css"

export const Header = () => {
  const { state, dispatch } = useContext(AuthContext);

  return (
    <nav className="main__header">
      <h1 className="logo">
        Fitness Gym
      </h1>
      <button
        onClick={() =>
          dispatch({
            type: "LOGOUT"
          })
        }
      >
        {state.isAuthenticated && (
          <h1>Logout</h1>
        )}
      </button>
    </nav>
  );
};

export default Header;
