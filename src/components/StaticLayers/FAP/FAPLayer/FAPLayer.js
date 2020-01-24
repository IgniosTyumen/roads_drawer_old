import React, {Fragment} from "react";
import {Marker} from "react-leaflet";
import FAPPopupContainer from "../FAPPopup/FAPPopupContainer";

const FAPLayer = (props) => {

    const {obj,tile} = props;

    const isDark = tile.includes('dark');
    const color= isDark? '#ddd' : '#000';

    const iconSVG = `
 <svg width="15" height="15" viewBox="0 0 14 16" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
        <path
            d="M4 7.625V6.375C4 6.16791 4.16791 6 4.375 6H5.625C5.83209 6 6 6.16791 6 6.375V7.625C6 7.83209 5.83209 8 5.625 8H4.375C4.16791 8 4 7.83209 4 7.625ZM8.375 8H9.625C9.83209 8 10 7.83209 10 7.625V6.375C10 6.16791 9.83209 6 9.625 6H8.375C8.16791 6 8 6.16791 8 6.375V7.625C8 7.83209 8.16791 8 8.375 8ZM6 10.625V9.375C6 9.16791 5.83209 9 5.625 9H4.375C4.16791 9 4 9.16791 4 9.375V10.625C4 10.8321 4.16791 11 4.375 11H5.625C5.83209 11 6 10.8321 6 10.625ZM8.375 11H9.625C9.83209 11 10 10.8321 10 10.625V9.375C10 9.16791 9.83209 9 9.625 9H8.375C8.16791 9 8 9.16791 8 9.375V10.625C8 10.8321 8.16791 11 8.375 11ZM14 14.875V16H0V14.875C0 14.6679 0.167906 14.5 0.375 14.5H0.984375V2.65734C0.984375 2.29431 1.32016 2 1.73438 2H4.5V0.75C4.5 0.335781 4.83578 0 5.25 0H8.75C9.16422 0 9.5 0.335781 9.5 0.75V2H12.2656C12.6798 2 13.0156 2.29431 13.0156 2.65734V14.5H13.625C13.8321 14.5 14 14.6679 14 14.875ZM2.48438 14.4688H6V12.375C6 12.1679 6.16791 12 6.375 12H7.625C7.83209 12 8 12.1679 8 12.375V14.4688H11.5156V3.5H9.5V4.25C9.5 4.66422 9.16422 5 8.75 5H5.25C4.83578 5 4.5 4.66422 4.5 4.25V3.5H2.48438V14.4688ZM8.3125 2H7.5V1.1875C7.5 1.13777 7.48025 1.09008 7.44508 1.05492C7.40992 1.01975 7.36223 1 7.3125 1H6.6875C6.63777 1 6.59008 1.01975 6.55492 1.05492C6.51975 1.09008 6.5 1.13777 6.5 1.1875V2H5.6875C5.63777 2 5.59008 2.01975 5.55492 2.05492C5.51975 2.09008 5.5 2.13777 5.5 2.1875V2.8125C5.5 2.86223 5.51975 2.90992 5.55492 2.94508C5.59008 2.98025 5.63777 3 5.6875 3H6.5V3.8125C6.5 3.86223 6.51975 3.90992 6.55492 3.94508C6.59008 3.98025 6.63777 4 6.6875 4H7.3125C7.36223 4 7.40992 3.98025 7.44508 3.94508C7.48025 3.90992 7.5 3.86223 7.5 3.8125V3H8.3125C8.36223 3 8.40992 2.98025 8.44508 2.94508C8.48025 2.90992 8.5 2.86223 8.5 2.8125V2.1875C8.5 2.13777 8.48025 2.09008 8.44508 2.05492C8.40992 2.01975 8.36223 2 8.3125 2Z"
            fill="black"/>
    </svg>
    `;

    const divIcon = L.divIcon(
        {
            className: "trashIcon",
            html: iconSVG
        }
    );

    let Elements;
    let iteratedList = obj.fap
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
                       <FAPPopupContainer obj={objectIterator}/>
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

export default FAPLayer;
