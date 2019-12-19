const initialState = {}

export default function urlAutocompleteDictionaries(state = initialState, action) {
    switch (action.type) {
        case "UPLOAD_DICTIONARIES":
            return {...state,
                ...action.payload,
            };
        default:
            return state;
    }
}
