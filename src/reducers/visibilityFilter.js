const initialState = 'SHOW_ALL';

export const visibilityFilter = (state = initialState, action) => {
    switch(action.type) {
        case 'SET_VISIBILITY_FILTER':
            return action.filter;

        default:
            return state;
    }
}
