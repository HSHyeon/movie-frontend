import {ReviewType} from "../components/review/Review.type.ts";

interface ReviewState {
    list: ReviewType[];
    total: number;
    loading: boolean;
}

export function ReviewReducer(state:ReviewState, action) {
    switch (action.type) {
        case "ON_SHOW_ALL_LOAD":
            return {
                ...state,
                list: action.payload.list || [],
                total: action.payload.total || 0,
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