import {calculateLengthBetweenPoints} from "./calculateLengthBetweenPoints";

export const calculateLengthOfPolyline = (polyline) => {
    let distance = 0;
    for (let it = 1; it < polyline.length; it++) {
        try {
            if (polyline[it][0] && polyline[it][0][0]){
                distance += calculateLengthBetweenPoints(polyline[it - 1][0], polyline[it][0]);
            } else {
                distance += calculateLengthBetweenPoints(polyline[it - 1], polyline[it]);
            }

        } catch (e)
        {
            console.log(polyline)
        }
    }
    return distance / 1000;
}
