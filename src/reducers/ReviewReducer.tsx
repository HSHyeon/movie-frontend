export function ReviewReducer(state, action) {
    switch (action.type) {
        case "ON_SHOW_ALL_LOAD":
            return {
                ...state,
                ...action.payload,
                loading: false
            };
        case "ON_SHOW_ONE_LOAD":
            return {
                ...state,
                ...action.payload,
                loading: false
            };
        case "ON_CHANGE":
            return {
                ...state,
                [action.payload!.name]: action.payload!.value,
            };
        default:
            return state;
    }
}