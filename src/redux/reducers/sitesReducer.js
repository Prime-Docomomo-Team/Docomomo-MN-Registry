// Used to store projects returned from the server
function sitesReducer(state = [], action){
    switch (action.type) {
        case 'SET_SITES':
            return action.payload;
        default:
            return state;    
    }
}

export default sitesReducer;

