import React, {useContext, useState} from "react";
import { ExerciseContext } from "../Home/Home";
import "./AddExercise.css"

const AddExercise = (props) => {

  //Fetch the values from Home component
  const { state, dispatch } = useContext(ExerciseContext);

  const [title, setTitle] = useState("");

  const onClose = (e) => {
    props.onClose && props.onClose(e);
  };

  const isButtonDisabled = title === "";

  const onSubmit = () => {
    dispatch({
      type: "ADD_EXERCISE_REQUEST",
    });
    const data = {
      name: title,
    };
    fetch("http://localhost:5000/addExercise", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res) {
          return res.json();
        } else {
          throw res;
        }
      })
      .then((res) => {
        setTitle("");
        dispatch({
          type: "ADD_EXERCISE_SUCCESS",
          payload: data,
        });
        onClose();
      })
      .catch((error) => {
        dispatch({
          type: "ADD_EXERCISE_FAILURE",
        });
      });
  };
  if (!props.show) {
    return null;
  }
  return (
    <div className="modal" id="modal">
      <div className="modal-overlay small">
        <div >
          <h3 >Add New Exercise</h3>
        </div>
        <form className="modal-form">
          <div className="modal-form-inputs">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              name="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-input"
            />
          </div>
          <div>
            <p>{state.exerciseHasError && "Error Creating Exercise!"}</p>
          </div>
          <div className="form-action">
            <button
              type="button"
              className="button button-primary"
              onClick={onSubmit}
              disabled={isButtonDisabled}
            >
            Submit
            </button>
            <button
              type="button"
              className="button button-default"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddExercise;
