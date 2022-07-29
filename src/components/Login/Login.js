import React, {useContext, useState} from "react";
import { AuthContext } from "../../App";
import "./Login.css";

export const Login = () => {
  const { dispatch } = useContext(AuthContext);
  const initialState = {
    username: "",
    password: "",
    isSubmitting: false,
    errorMessage: null,
  };

  const [data, setData] = useState(initialState);

  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setData({
      ...data,
      isSubmitting: true,
      errorMessage: null,
    });

    try {
      if (data.username === "admin" && data.password === "admin") {
        dispatch({
          type: "LOGIN",
          payload: {
            user: data.username
          },
        });
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      setData({
        ...data,
        isSubmitting: false,
        errorMessage: error.message,
      });
    }
  };

  return (
    <div className="login__section">
        <div className="container">
          <form onSubmit={handleFormSubmit}>
            <h1>Login</h1>

            <label htmlFor="username">
              Username
              <input
                type="text"
                value={data.username}
                onChange={handleInputChange}
                name="username"
                id="username"
              />
            </label>

            <label htmlFor="password">
              Password
              <input
                type="password"
                value={data.password}
                onChange={handleInputChange}
                name="password"
                id="password"
              />
            </label>

            {data.errorMessage && (
              <span className="form-error">{data.errorMessage}</span>
            )}

            <button disabled={data.isSubmitting}>Login</button>
          </form>
        </div>
    </div>
  );
};

export default Login;
