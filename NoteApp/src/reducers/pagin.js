import * as types from './../constants/ActionTypes';

let pageIndex = 1;

var myReducer = (state = pageIndex, action) => {
    switch (action.type) {
        case types.PAGIN:
            console.log(action);
            return action.pageIndex;
        default:
            return state;
    }
}

export default myReducer;
