import {MovieType} from "../components/movie/Movie.type.ts";

interface MovieState {
    list: MovieType[];
    loading: boolean;
}

export function MovieReducer(state:MovieState, action) {
    switch (action.type) {
        case "ON_SHOW_ALL_LOAD":
            return {
                ...state,
                list: action.payload.list || [],
                loading: false
            };
        case "ON_SHOW_ONE_LOAD":
            return {
                ...state,
                ...action.payload,
                loading: false
            };
        case 'ON_DELETE':
            return{
                ...state,
                list: state.list.filter(review => review.id !== action.payload.id)
            }
        case "ON_CHANGE":
            return {
                ...state,
                [action.payload!.name]: action.payload!.value,
            };
        default:
            return state;
    }
}