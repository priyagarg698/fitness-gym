import React, {useEffect, useReducer, useState, createContext} from "react";
import AddExercise from "../AddExercise/AddExercise";
import "./Home.css";

export const ExerciseContext = createContext();

const initialState = {
  exerciseData: [],
  isFetching: false,
  hasError: false,
  isDataSubmitting: false,
  exerciseHasError: false,
};

const reducer = (state, action) => {
  console.log("LLLLLLLLLLLLLLLLLLLLLL", action.type, state)
  switch (action.type) {
    case "FETCH_EXERCISE_REQUEST":
      return {
        ...state,
        isFetching: true,
        hasError: false
      };
    case "FETCH_EXERCISE_SUCCESS":
      return {
        ...state,
        isFetching: false,
        exerciseData: action.payload
      };
    case "FETCH_EXERCISE_FAILURE":
      return {
        ...state,
        hasError: true,
        isFetching: false
      };
    case "ADD_EXERCISE_REQUEST":
      return {
        ...state,
        isDataSubmitting: true,
        exerciseHasError: false,
      }
    case "ADD_EXERCISE_SUCCESS":
      console.log("KKKKKKKKKKKKKKKKKKKKKKKK", action.payload)
      return {
        ...state,
        isDataSubmitting: false,
        exerciseData: [...state.exerciseData, action.payload]
      }
    case "ADD_EXERCISE_FAILURE":
      return {
        ...state,
        isDataSubmitting: false,
        exerciseHasError: true,
      }
    default:
      return state;
  }
};

export const Home = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isAddExerciseModalVisible, setAddExerciseModalVisibility] = useState(false);

  const toggleAddExercise = () => {
    setAddExerciseModalVisibility(!isAddExerciseModalVisible);
  }

  useEffect(() => {
    dispatch({
      type: "FETCH_EXERCISE_REQUEST"
    });

    fetch("http://localhost:5000/exercise")
      .then(res => {
        if (res) {
          return res.json();
        } else {
          throw res;
        }
      })
      .then(resJson => {
        console.log(resJson);
        dispatch({
          type: "FETCH_EXERCISE_SUCCESS",
          payload: resJson
        });
      })
      .catch(error => {
        console.log(error);
        dispatch({
          type: "FETCH_EXERCISE_FAILURE"
        });
      });

  }, []);



  return (
    <div className="home__main">
    
    <div >
      {state.isFetching ? (
        <span className="loader">Fetching...</span>
      ) : state.hasError ? (
        <span className="error">Opps something went wrong..........!</span>
      ) : (
        <>
          {state.exerciseData.length > 0 &&
            state.exerciseData.map((ele, index) => (
              <h2 key={index}>{ele.name}</h2>
            ))}
        </>
      )}
    </div>

    <ExerciseContext.Provider value={{
      state,
      dispatch
    }}>
      <button className="add-button" onClick={toggleAddExercise}>Add Exercise</button>
      <AddExercise onClose={toggleAddExercise} show={isAddExerciseModalVisible} />
    </ExerciseContext.Provider>
    </div>
  );
};

export default Home;
