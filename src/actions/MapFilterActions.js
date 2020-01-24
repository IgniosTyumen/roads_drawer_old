import {SET_LAYER_INVISIBLE, SET_LAYER_VISIBLE,} from '../constants/LayersFilter'

export const setLayerVisible = (key) => (dispatch) => {
    dispatch({
        type:SET_LAYER_VISIBLE,
        payload:key
    })
};

export const setLayerInvisible = (key) => (dispatch) => {
    dispatch({
        type:SET_LAYER_INVISIBLE,
        payload:key
    })
};
