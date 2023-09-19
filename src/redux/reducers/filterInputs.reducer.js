// Used to store all the user input from the Filter component
function filterInputsReducer(state = {}, action) {
  switch (action.type) {
    case "SET_FILTER_INPUTS":
      return action.payload;
    default:
      return state;
  }
}

export default filterInputsReducer;
