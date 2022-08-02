import React, {useEffect, useReducer, useState, createContext} from "react";
import AddExercise from "../AddExercise/AddExercise";
import "./Home.css";

type InitialState = {
  exerciseData: any,
  isFetching: boolean,
  hasError: boolean,
  isDataSubmitting: boolean,
  exerciseHasError: boolean
};

//set the default values
const initialState : InitialState= {
  exerciseData: [],
  isFetching: false,
  hasError: false,
  isDataSubmitting: false,
  exerciseHasError: false,
};

type Action = {
  type: "FETCH_EXERCISE_REQUEST" | "FETCH_EXERCISE_SUCCESS" | "FETCH_EXERCISE_FAILURE" | "ADD_EXERCISE_REQUEST" | "ADD_EXERCISE_SUCCESS" | "ADD_EXERCISE_FAILURE",
  payload?: any,
  isFetching?: boolean,
  hasError?: boolean,
  isDataSubmitting?: boolean,
  exerciseHasError?: boolean
}


export const ExerciseContext = createContext<{state: InitialState; dispatch: React.Dispatch<Action>}>({
  state: initialState,
  dispatch: ()=>{}
});
//Fetch the gym exercise list and add the new exercise to the list
const reducer = (state: InitialState, action: Action) => {
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

  //Vairable to hide and show the overlay to add class
  const [isAddExerciseModalVisible, setAddExerciseModalVisibility] = useState(false);

  const toggleAddExercise = () => {
    setAddExerciseModalVisibility(!isAddExerciseModalVisible);
  }

  //Request the exercise list
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
            state.exerciseData.map((ele: { name: string}, index: React.Key | null | undefined) => (
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
