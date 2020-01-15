import React, {Fragment} from "react";
import {Marker} from "react-leaflet";
import {provideSVGSign} from "~/utils/SignsSVGCollection"

const SignsLayer = (props) => {

    const {roadsigns, userPreferences} = props;


    let Elements;
    const signsVisibleList = userPreferences && userPreferences.visibleSignsList ? userPreferences.visibleSignsList : [];

    //SIGN GROUPS LOGIC
    if (roadsigns.roadsignsGroups) {
        Elements = roadsigns.roadsignsGroups.map((signgroup, groupPosition) => {

            const pointsStr = signgroup.point;
            if (pointsStr) {
                const pointsStrArr = pointsStr.replace('POINT (', '').replace(')', '').replace('POINT(', '');
                const pointStr = pointsStrArr.trim().split(' ');
                const point1 = Number.parseFloat(pointStr[1]).toFixed(6);
                const point2 = Number.parseFloat(pointStr[0]).toFixed(6);
                const points = [point1, point2];


                const signsGroup = signgroup.elements.map((sign, position) => {
                    if (signsVisibleList.indexOf(sign.roadsignstype.mark_number) >= 0) {
                        let signSvg;

                        if (sign.roadsignstype.mark_number === '5.23.1' || sign.roadsignstype.mark_number === '5.24.1') {
                            signSvg = provideSVGSign(sign.roadsignstype.mark_number, (0.08*userPreferences.signsSize/100), 'ТЕСТ');
                        } else {
                            signSvg = provideSVGSign(sign.roadsignstype.mark_number, (0.04*userPreferences.signsSize/100));
                        }

                        if (point1 && point2 && points) {
                            return (
                                signSvg
                            )
                        }
                    } else debugger
                })
                if (signsGroup.length ) {
                    const reducer = (accumulator, currentValue) => {
                        if (currentValue && currentValue!=='undefined\n') return  accumulator + currentValue;
                    }
                    const signArray = signsGroup.reduce(reducer);
                    const divGroup = L.divIcon(
                        {

                            html: (signsGroup.length>1 && signArray )? "<div class='signGroup'>"+ signArray.replace('undefined','')+ "</div>" : signArray
                        }
                    )
                    if (signArray) {
                        return (
                            <Marker position={points} icon={divGroup}
                                    onContextMenu={(event) => {
                            }}>

                            </Marker>
                        )
                    } else return
                }
            }
        });
    }

    return (
        <Fragment>
            {Elements}
        </Fragment>
    )
};

export default SignsLayer;
