import * as types from './../constants/ActionTypes';

let data = JSON.parse(localStorage.getItem("notes"));

var initialState = data ? data : [];

var myReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.LIST_ALL:
            return state;

        case types.DELETE_NOTE:
            state = [...deleteNote(state, action.note)];
            console.log(action.note.id, state);
            localStorage.setItem("notes", JSON.stringify(state));

            return state;

        case types.ADD_NOTE:
            var newNote = {
                id: state.length > 0 ? state[state.length - 1].id + 1 : 1,
                title: action.note.title,
                content: action.note.content
            }
            state.push(newNote);
            localStorage.setItem("notes", JSON.stringify(state));
            return state;

        case types.EDIT_NOTE:
            state = [...editNote(state, action.note)];
            localStorage.setItem("notes", JSON.stringify(state));

            return state;

        default:
            return state;
    }
};

var editNote = (state, note) => {
    console.log(note.id);
    for (let i = 0; i < state.length; i++) {
        if (state[i].id === parseInt(note.id)) {
            state[i].title = note.title;
            state[i].content = note.content;
            console.log(state[i]);
            return state;
        }
    }
    return state;
}

var deleteNote = (state, note) => {
    fetch("http://192.168.1.3:3000/api/notes/" + note.id, {
        method: 'DELETE', // or 'PUT'
        body: JSON.stringify(note.id), // data can be `string` or {object}!
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        .then(response => console.log('Success:', JSON.stringify(response)))
        .catch(error => console.error('Error:', error));
    // for(let i = 0; i < state.length; i++){
    //     if(state[i].id === note.id){
    //         state.splice(i, 1);
    //         return state;
    //     }
    // }
    
    return state;
}

export default myReducer;