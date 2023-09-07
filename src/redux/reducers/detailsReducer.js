// Used to store projects returned from the server
function detailsReducer(state = [], action){
    switch (action.type) {
        case 'SET_DETAILS':
            return action.payload;
        default:
            return state;    
    }
}

export default detailsReducer;

