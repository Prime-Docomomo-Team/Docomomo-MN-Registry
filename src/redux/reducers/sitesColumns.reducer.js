// Used to store all the columns used in sites table
function sitesReducer(state = [], action) {
  switch (action.type) {
    case "SET_SITES_COLUMNS":
      return action.payload;
    default:
      return state;
  }
}

export default sitesColumnsReducer;
