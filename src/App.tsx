import React, {createContext, useReducer} from "react";
import "./App.css";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import Header from "./components/Header/Header";


type InitialState = {
  isAuthenticated: boolean,
  user: {} | string | null
}

//Set the default value
const initialState : InitialState = {
  isAuthenticated: false,
  user: null
};

type Action = {
  type: "LOGIN" | "LOGOUT",
  payload?: any
}

export const AuthContext = createContext<{state: InitialState; dispatch: React.Dispatch<Action>}>({
  state: initialState,
  dispatch: ()=>{}
});


//Created the reducer with different action types to allow user to login and logout
const reducer = (state : InitialState, action : Action) => {
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
