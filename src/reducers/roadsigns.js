import {SET_SIGNS} from '../constants/RoadsConstants'

const initialState = {
    roadsigns: [],
    roadsignsGroups:[],
};

const combineSignsToGroups = (groups, newSigns) =>{
    let groupsCopy = [...groups];
    for (let it=0;it<newSigns.length;it++){
        const serachEl = groupsCopy.findIndex(el=>el.point === newSigns[it].point);
        if (serachEl===-1){
            const newGroup = {
                point: newSigns[it].point,
                elements: [newSigns[it]]
            };
            groupsCopy = [...groupsCopy, newGroup]
        } else {
            const searchEl = groupsCopy[serachEl].elements.findIndex(el=>el.roadsignstype.mark_number===newSigns[it].roadsignstype.mark_number);
            if (searchEl<0) groupsCopy[serachEl].elements.push(newSigns[it]);
        }
    }
    return groupsCopy;
};

export default function pedestrian(state = initialState, action) {
    switch (action.type) {
        case SET_SIGNS:

            return {
                ...state,
                roadsigns: [...state.roadsigns, ...action.payload],
                roadsignsGroups: [...state.roadsignsGroups, ...combineSignsToGroups(state.roadsignsGroups,action.payload)]

            };
        default:
            return state;
    }
}
