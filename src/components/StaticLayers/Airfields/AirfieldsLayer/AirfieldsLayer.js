import React, {Fragment} from "react";
import {Marker} from "react-leaflet";
import AirfieldsPopupContainer from "../AirfieldsPopup/AirfieldsPopupContainer";

const AirfieldsLayer = (props) => {

    const {obj,tile} = props;

    const isDark = tile.includes('dark');
    const color= isDark? '#ddd' : '#000';

    const iconSVG = `
  <svg width="25" height="25" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M8 0.0550537C3.582 0.0550537 0 3.62105 0 8.02305C0 12.4231 3.582 15.9911 8 15.9911C12.418 15.9911 16 12.4241 16 8.02305C16 3.62105 12.418 0.0550537 8 0.0550537ZM8.004 15.1121C4.07 15.1121 0.883 11.9311 0.883 8.00705C0.883 4.08305 4.071 0.902054 8.004 0.902054C11.937 0.902054 15.125 4.08305 15.125 8.00705C15.125 11.9311 11.938 15.1121 8.004 15.1121Z" fill="${color}"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.01803 2.08008C4.75403 2.08008 2.10803 4.73408 2.10803 8.00708C2.10803 11.2801 4.75403 13.9341 8.01803 13.9341C11.282 13.9341 13.929 11.2801 13.929 8.00708C13.929 4.73408 11.281 2.08008 8.01803 2.08008ZM10.077 10.1191H8.93703V9.06208H7.06203V10.1191H5.94403V5.96108H7.06203V7.87508H8.93703V5.96108H10.077V10.1191Z" fill="${color}"/>
</svg>
    `;

    const divIcon = L.divIcon(
        {
            className: "trashIcon",
            html: iconSVG
        }
    );

    let Elements;
    let iteratedList = obj.airfields
    if (obj.filtered && iteratedList) {
        let newList  = [];
        for (let it = 0; it<obj.filtered.length;it++){
            const cityToList = iteratedList.find(el=> el.id===obj.filtered[it].id);
            newList.push(cityToList)
        }
        iteratedList = newList;
    }
    if (iteratedList) {
        Elements = iteratedList.map(objectIterator => {
            const pointsStr = objectIterator.point;
            if (pointsStr) {
                const pointsStrArr = pointsStr.replace('POINT (', '').replace(')', '').replace('POINT(', '');
                const pointStr = pointsStrArr.trim().split(' ');
                const point1 = Number.parseFloat(pointStr[1]).toFixed(6);
                const point2 = Number.parseFloat(pointStr[0]).toFixed(6);
                const points = [point1, point2];
                if (point1 && point2 && points) {
                    return (
                    <Marker position={points}
                            key={'airfield'+objectIterator.id} icon={divIcon}
                            onContextMenu={(event) => {
                    }}>
                       <AirfieldsPopupContainer obj={objectIterator}/>
                    </Marker>
                    )
                } else debugger
            }
        });
    }
    return (
        <Fragment>
            {Elements}
        </Fragment>
    )
};

export default AirfieldsLayer;
