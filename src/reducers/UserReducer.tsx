import {UserType} from "../components/user/User.type.ts";

export type ActionType = {
    type: string;
    payload?: {
        name: string;
        value: string;
    };
};

export function UserReducer(state: UserType, action: ActionType): UserType {
    switch (action.type) {
        case "ON_CHANGE":
            return {
                ...state,
                [action.payload!.name]: action.payload!.value,
            };
        default:
            return state;
    }
}