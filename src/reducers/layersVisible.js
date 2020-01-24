import {SET_ALL_LAYERS_VISIBLE, SET_LAYER_INVISIBLE, SET_LAYER_VISIBLE,} from '../constants/LayersFilter'

const initialState = {
    invisibleList: []
};


export default function visibleFilter(state = initialState, action) {
    switch (action.type) {
        case SET_LAYER_VISIBLE:
            return {
                ...state,
            invisibleList: state.invisibleList.filter(element=> element!==action.payload)
            };
        case SET_LAYER_INVISIBLE:
            if (state.invisibleList.indexOf(action.payload)>=0) return state;
            else
            return {
                ...state,
                invisibleList: [...state.invisibleList,action.payload]
            };
        case SET_ALL_LAYERS_VISIBLE:
            return initialState;
        default:
            return state;
    }
}

