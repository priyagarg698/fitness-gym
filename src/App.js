import React, {createContext, useReducer, useEffect} from "react";
import "./App.css";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import Header from "./components/Header/Header";

export const AuthContext = createContext();

//Set the default value
const initialState = {
  isAuthenticated: false,
  user: null
};

//Created the reducer with different action types to allow user to login and logout
const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      //set the user credentials in the localstorage as {user:admin}
      localStorage.setItem("user", JSON.stringify(action.payload));
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload
      };
    case "LOGOUT":
      //It clears the localstorage on logout
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

  //get the credentails from the localstorage
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
    //useContext to pass props to the child components
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
