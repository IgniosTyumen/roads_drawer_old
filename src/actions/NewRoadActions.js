import {CLOSE_CREATE_NEW_ROAD_DIALOG, OPEN_CREATE_NEW_ROAD_DIALOG} from '~/constants/NewRoadConstants'

export const openCreateDialog = () => dispatch =>{
    dispatch({
        type:OPEN_CREATE_NEW_ROAD_DIALOG
    })
}

export const closeCreateDialog = () => dispatch =>{
    dispatch({
        type:CLOSE_CREATE_NEW_ROAD_DIALOG
    })
}
