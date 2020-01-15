import React, {useEffect, useState} from "react";
import IconButton from "@material-ui/core/IconButton";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import CloseIcon from '@material-ui/icons/Close';
import GroupButtonBoxContainer from "../GroupButtonsBox/GroupButtonBoxContainer";
import LayersPanelContainer from "../LayersPanel/LayersPanelContainer";
import DetailsObjectPanelContainer from "../DetailsObjectPanel/DetailsObjectPanelContainer";
import RoadControlPanelContainer from "../../StaticLayers/Roads/RoadControlPanel/RoadControlPanelContainer";
import {bridgesApi, dangersApi, roadsApi} from "../../../api/api";
import DangerRoadsPanelContainer from "../../StaticLayers/DangerRoads/DangerRoadsPanel/DangerRoadsPanelContainer";
import OrderControlPanelContainer from "../../StaticLayers/Order/OrderControlPanel/OrderControlPanelContainer";
import DrawAlgorithmPanelContainer from "../Draw/DrawAlgorithmPanel/DrawAlgorithmPanelContainer";

const MainControlPanel = ({activeRoad}) => {
    const [openedPanel, setOpenedPanel] = useState('initClosedPanel');
    const [mainGroupWindow, setMainGroupWindow] = useState('');
    const [detailedObject, setDetailedObject] = useState();
    const [detailedObjectType, setDetailedObjectType] = useState();
    const [detailedObjectFetching, setDetailedObjectFetching] = useState(false);


    const handleSelectDetailedObject = async (obj, type) => {
        let detailedObject = null;
        if (type) {
            switch (type) {
                case 'road': {
                    setDetailedObjectFetching(true);
                    detailedObject = await roadsApi.getRoadInfoById(obj.id);
                    setDetailedObjectFetching(false);
                    break;
                }
                case 'bridge': {
                    setDetailedObjectFetching(true);
                    detailedObject = await bridgesApi.getBridgeInfoById(obj.id);
                    setDetailedObjectFetching(false);
                    break;
                }
                case 'dangerRoad': {
                    setDetailedObjectFetching(true);
                    detailedObject = await dangersApi.getDangerRoadInfoById(obj.id);
                    setDetailedObjectFetching(false);
                    break;
                }
            }

        }
        setDetailedObject(detailedObject);
        setDetailedObjectType(type);
    };

    const handleSetMainGroupWindow = (value) => {
        setMainGroupWindow(value)
    };

    const handleOpeningPanel = (event) => {
        event.stopPropagation();
        if (!openedPanel || openedPanel === 'closedMainControlPanel' || openedPanel==='initClosedPanel') {
            setOpenedPanel('openedMainControlPanel');
        }
    };

    const handleClosePanel = (event) => {
        event.stopPropagation();
        setOpenedPanel('closedMainControlPanel');
        setDetailedObject(null);
        setDetailedObjectType(null);
    };

    const handleClearMainWindow = (event)=> {
        event.stopPropagation();
        setMainGroupWindow('');
        setDetailedObject(null);
        setDetailedObjectType(null);
    };
    useEffect(()=> {
        if (activeRoad && openedPanel!=='openedMainControlPanel') {
            setMainGroupWindow('roads');
            setOpenedPanel('openedMainControlPanel');

        }
    },[activeRoad]);
    return (
        <div className={`mainControlPanel ${openedPanel}`}>
            {openedPanel === 'openedMainControlPanel' && <div className={"mainControlButtonDefault"} onClick={handleClearMainWindow}>
                <IconButton>
                    <CloseIcon/>
                </IconButton>
            </div>}
            {openedPanel !== 'openedMainControlPanel' &&
            <div className={"mainControlButtonSwitch"} onClick={handleOpeningPanel}>
                <IconButton>
                    <ChevronRightIcon/>
                </IconButton>
            </div>
            }
            {openedPanel === 'openedMainControlPanel' &&
            <div className={"mainControlButtonSwitch"} onClick={handleClosePanel}>
                <IconButton>
                    <ChevronLeftIcon/>
                </IconButton>
            </div>}

            {
                <GroupButtonBoxContainer handleSetMainGroupWindow={handleSetMainGroupWindow} handleSelectDetailedObject={handleSelectDetailedObject}/>
            }

            {
                <div className={`mainGroupWindow ${mainGroupWindow ? 'activateMainGroupWindowAnimation opened' : 'closed'}`}>
                    {mainGroupWindow==='layers' && <LayersPanelContainer handleSelectDetailedObject={handleSelectDetailedObject}/>}
                    {mainGroupWindow==='roads' && <RoadControlPanelContainer handleSelectDetailedObject={handleSelectDetailedObject}/>}
                    {mainGroupWindow==='dangers' && <DangerRoadsPanelContainer handleSelectDetailedObject={handleSelectDetailedObject}/>}
                    {mainGroupWindow==='order' && <OrderControlPanelContainer handleSelectDetailedObject={handleSelectDetailedObject}/>}
                    {mainGroupWindow==='drawAlgorithm' && <DrawAlgorithmPanelContainer handleSelectDetailedObject={handleSelectDetailedObject}/>}
                </div>
            }

            {
                detailedObject && <DetailsObjectPanelContainer detailedObject={detailedObject} detailedObjectType={detailedObjectType} handleSelectDetailedObject={handleSelectDetailedObject} fetching={detailedObjectFetching}/>
            }

        </div>
    )
};

export default MainControlPanel;
