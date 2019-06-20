import * as types from './../constants/ActionTypes';
export const listAll = () => {
    return {
        type : types.LIST_ALL
    }
};

export const deleteNote = (note) => {
    return {
        type : types.DELETE_NOTE,
        note
    }
}

export const addNote = (note) => {
    return {
        type : types.ADD_NOTE,
        note
    }
}

export const editNote = (note) => {
    return {
        type : types.EDIT_NOTE,
        note
    }
}

export const paginPage = (pageIndex) => {
    return {
        type : types.PAGIN,
        pageIndex
    }
}