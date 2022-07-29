import React, {createContext, useReducer, useEffect} from "react";
import "./App.css";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import Header from "./components/Header/Header";

export const AuthContext = createContext();

const initialState = {
  isAuthenticated: false,
  user: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("user", JSON.stringify(action.payload));
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null
      };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || null)

    if(user){
      dispatch({
        type: 'LOGIN',
        payload: {
          user
        }
      })
    }
  }, [])
  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch
      }}
    >
      <Header />
      <div className="App">{!state.isAuthenticated ? <Login /> : <Home />}</div>
    </AuthContext.Provider>
  );
}

export default App;
