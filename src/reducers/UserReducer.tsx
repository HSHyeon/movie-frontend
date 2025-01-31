import {UserStateType} from "../pages/LoginPage.tsx";

export type ActionType = {
    type: string;
    payload?: {
        name: string;
        value: string;
    };
};

export function UserReducer(state:UserStateType, action: ActionType): UserStateType {
    switch (action.type) {
        case "ON_CHANGE":
            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.payload!.name]: action.payload!.value,
                },
            };
        default:
            return state;
    }
}