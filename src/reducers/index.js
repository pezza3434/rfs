const initialState = {
    number: 1
};

export default function reducer(state = initialState, action) {

    if (action.type === 'ADD_NUMBER') {
        return Object.assign({}, state, {number: state.number + 1});
    }

    return state;
}
