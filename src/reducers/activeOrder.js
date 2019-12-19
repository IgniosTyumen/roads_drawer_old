const initialState = {
    activeOrder: undefined,
    previewOrder: undefined
};

export default function activeOrders(state = initialState, action) {

    switch (action.type) {

        // case SET_ACTIVE_ORDER:
        //     return {
        //         activeOrder: action.payload
        //     }
        // case SET_ORDER_PREVIEW:
        //     return {
        //         ...state,
        //         previewOrder: action.payload
        //     }
        // case SAVE_DIRECTION: {
        //     const newState = {...state};
        //     newState.activeOrder.waypoints = [...state.activeOrder.waypoints];
        //     const index = newState.activeOrder.waypoints.findIndex(element => element.id === action.payload.templateWaypoint.id);
        //     if (index === -1) {
        //         newState.activeOrder.waypoints.push(action.payload.templateWaypoint)
        //     } else {
        //         newState.activeOrder.waypoints[index] = action.payload.templateWaypoint;
        //     }
        //     newState.previewOrder = {...newState.activeOrder};
        //
        //     return {...newState}
        // }
        // case REMOVE_WAYPOINT: {
        //     const newState = {...state};
        //     newState.activeOrder.waypoints = [...state.activeOrder.waypoints.filter(element=>element.id!==action.payload)];
        //     return newState
        // }
        default:
            return state;
    }
}
