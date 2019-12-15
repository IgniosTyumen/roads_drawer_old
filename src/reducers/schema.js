import {SAVE_SCHEMA} from '~/constants/SchemaConstants'

const initialState = {
    schema:{}
};

export default function schema(state = initialState, action) {
    switch (action.type) {
        case SAVE_SCHEMA:
            return {
                ...state,
                schema: action.payload
            };
        default:
            return state;
    }
}
