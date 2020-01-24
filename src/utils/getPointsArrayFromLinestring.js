const getPointsArrayFromLinestring = (str, swap=false) => {
    let result = [];
    let pointsStr = '';
    if (str) {
        pointsStr = str.replace('LINESTRING (','').replace('LINESTRING(','').replace(')','').split(',')
    } else {
    }
    for (let it=0; it<pointsStr.length; it++){
        const workOnArray = pointsStr[it].trim().split(' ');
        if (!swap) result.push([Number.parseFloat(workOnArray[1]), Number.parseFloat(workOnArray[0])])
        if (swap)  result.push([Number.parseFloat(workOnArray[0]), Number.parseFloat(workOnArray[1])])
    }
    return result;
};

export default getPointsArrayFromLinestring;
