import React, {Fragment, useState} from "react";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Checkbox from "@material-ui/core/Checkbox";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SignsVisionFilterContainer from "../../StaticLayers/Signs/SignsVisionFilter/SignsVisionFilterContainer";
import RoadVisionSettingsContainer from "../../StaticLayers/Roads/RoadsVisionSettings/RoadVisionSettingsContainer";
import SaveIcon from '@material-ui/icons/Save';
import IconButton from "@material-ui/core/IconButton";
import DangerRoadVisionSettingsContainer
    from "../../StaticLayers/DangerRoads/DangerRoadsVisionSettings/DangerRoadVisionSettingsContainer";
import DrawVisionSettingsContainer from "../../EditableLayers/DrawVisionSettings/DrawVisionSettingsContainer";
import SignsVisualSettingsContainer from "../../StaticLayers/Signs/SignsVisualSettings/SignsVisualSettingsContainer";
import styleProvider from "../../CommonComponents/StyleProvider/styleProvider";
import {Slider} from "antd";


const LayersPanel = (props) => {


    const {mapVisibleFiltersActions, mapInvisibleList, userPreferencesActions,userPreferences} = props;

    const [expandedPanelsList,setExpandedPanelList] = useState({
        roads: false,
        // bridges:false,
        signs:false,
        dangers: false,
        // routes:false,
        draw:false
    });

    const [opacityLayer,setOpacityLayer] = useState({
        roads: styleProvider(userPreferences,'opacity','roads'),
        signs: styleProvider(userPreferences,'opacity','signs'),
        dangers: styleProvider(userPreferences,'opacity','dangerRoads'),
        draw: styleProvider(userPreferences,'opacity','draw'),
    })

    const handleOpacityChange = (value,type) => {
        setOpacityLayer({
            ...opacityLayer,
            [type]: value
        })
    };

    const handleOpacityAfterChange = (value,type) => {
        switch (type) {
            case 'roads' : {
                userPreferencesActions.changeVisualPreference('opacity','roads',value);
                break;
            }
            case 'signs' : {
                userPreferencesActions.changeVisualPreference('opacity','signs',value);
                break;
            }
            case 'dangers' : {
                userPreferencesActions.changeVisualPreference('opacity','dangerRoads',value);
                break;
            }
            case 'draw' : {
                userPreferencesActions.changeVisualPreference('opacity','draw',value);
                break;
            }
        }

    }



    const handleVisibleChange = (key) => {
        if (mapInvisibleList.includes(key)) {
            mapVisibleFiltersActions.setLayerVisible(key);
        }
        else {
            mapVisibleFiltersActions.setLayerInvisible(key);
        }
    };

    const handleExpandLayouts = (key) =>{
        setExpandedPanelList({
            ...expandedPanelsList,
            [key]: !expandedPanelsList[key]
        })
    };

    return (
        <Fragment>
    <ExpansionPanel expanded={expandedPanelsList.roads}>
        <ExpansionPanelSummary>
            <div className={"panelSummaryDecorator"}>
                <p className={"panelSummaryDecoratorText"}>Слой дорог</p>
                <div className={"panelSummaryDecoratorActions"}>
                    <Slider
                        style={{width:'100px'}}
                        min={0}
                        max={1}
                        onChange={(val)=>handleOpacityChange(val,'roads')}
                        onAfterChange={(val)=>handleOpacityAfterChange(val,'roads')}
                        value={typeof opacityLayer.roads === 'number' ? opacityLayer.roads : 0}
                        step={0.05}
                        included={true}
                    />
                    <Checkbox icon={<VisibilityIcon/>} checkedIcon={<VisibilityOffIcon/>}
                              value={mapInvisibleList.includes('roads') }
                              color={"primary"}
                              onClick={(event) => {
                                  event.stopPropagation();
                                  handleVisibleChange('roads', event)
                              }}
                    />
                    <Checkbox icon={<ExpandMoreIcon/>} checkedIcon={<ExpandLessIcon/>}
                              value={expandedPanelsList.roads}
                              color={"primary"}
                              onClick={
                                  (event)=>{
                                      event.stopPropagation();
                                      handleExpandLayouts('roads')
                                  }
                              }/>
                </div>
            </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
            <RoadVisionSettingsContainer/>
        </ExpansionPanelDetails>
    </ExpansionPanel>

            <ExpansionPanel expanded={expandedPanelsList.signs}>
                <ExpansionPanelSummary>
                    <div className={"panelSummaryDecorator"}>
                        <p className={"panelSummaryDecoratorText"}>Слой знаков</p>
                        <div className={"panelSummaryDecoratorActions"}>

                            <Checkbox icon={<VisibilityIcon/>} checkedIcon={<VisibilityOffIcon/>}
                                      value={mapInvisibleList.includes('signs') }
                                      color={"primary"}
                                      onClick={(event) => {
                                          event.stopPropagation();
                                          handleVisibleChange('signs', event)
                                      }}
                            />
                            <Checkbox icon={<ExpandMoreIcon/>} checkedIcon={<ExpandLessIcon/>}
                                      value={expandedPanelsList.signs}
                                      color={"primary"}
                                      onClick={
                                          (event)=>{
                                              event.stopPropagation();
                                              handleExpandLayouts('signs')
                                          }
                                      }/>
                        </div>
                    </div>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <div style={{display:'flex',flexDirection:'column',width: '100%'}}>
                    <SignsVisionFilterContainer/>
                    <SignsVisualSettingsContainer/>
                    </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>

            <ExpansionPanel expanded={expandedPanelsList.dangers}>
                <ExpansionPanelSummary>
                    <div className={"panelSummaryDecorator"}>
                        <p className={"panelSummaryDecoratorText"}>Слой объектов контроля</p>
                        <div className={"panelSummaryDecoratorActions"}>
                            <Slider
                                style={{width:'100px'}}
                                min={0}
                                max={1}
                                onChange={(val)=>handleOpacityChange(val,'dangers')}
                                onAfterChange={(val)=>handleOpacityAfterChange(val,'dangers')}
                                value={typeof opacityLayer.dangers === 'number' ? opacityLayer.dangers : 0}
                                step={0.05}
                                included={true}
                            />
                            <Checkbox icon={<VisibilityIcon/>} checkedIcon={<VisibilityOffIcon/>}
                                      value={mapInvisibleList.includes('dangers') }
                                      color={"primary"}
                                      onClick={(event) => {
                                          event.stopPropagation();
                                          handleVisibleChange('dangers', event)
                                      }}
                            />
                            <Checkbox icon={<ExpandMoreIcon/>} checkedIcon={<ExpandLessIcon/>}
                                      value={expandedPanelsList.dangers}
                                      color={"primary"}
                                      onClick={
                                          (event)=>{
                                              event.stopPropagation();
                                              handleExpandLayouts('dangers')
                                          }
                                      }/>
                        </div>
                    </div>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <DangerRoadVisionSettingsContainer/>
                </ExpansionPanelDetails>
            </ExpansionPanel>



            <ExpansionPanel expanded={expandedPanelsList.draw}>
                <ExpansionPanelSummary>
                    <div className={"panelSummaryDecorator"}>
                        <p className={"panelSummaryDecoratorText"}>Слой рисования</p>
                        <div className={"panelSummaryDecoratorActions"}>
                            <Slider
                                style={{width:'100px'}}
                                min={0}
                                max={1}
                                onChange={(val)=>handleOpacityChange(val,'draw')}
                                onAfterChange={(val)=>handleOpacityAfterChange(val,'draw')}
                                value={typeof opacityLayer.draw === 'number' ? opacityLayer.draw : 0}
                                step={0.05}
                                included={true}
                            />
                            <Checkbox icon={<VisibilityIcon/>} checkedIcon={<VisibilityOffIcon/>}
                                      value={mapInvisibleList.includes('draw') }
                                      color={"primary"}
                                      onClick={(event) => {
                                          event.stopPropagation();
                                          handleVisibleChange('draw', event)
                                      }}
                            />
                            <Checkbox icon={<ExpandMoreIcon/>} checkedIcon={<ExpandLessIcon/>}
                                      value={expandedPanelsList.draw}
                                      color={"primary"}
                                      onClick={
                                          (event)=>{
                                              event.stopPropagation();
                                              handleExpandLayouts('draw')
                                          }
                                      }/>
                        </div>
                    </div>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <DrawVisionSettingsContainer/>
                </ExpansionPanelDetails>
            </ExpansionPanel>





                    <div onClick={userPreferencesActions.saveAllUserPreferences} className={'orderMainPanelContainerButton ripple'} style={{marginTop: "20px"}}>
                        <IconButton aria-label="Сохранить настройки слоя">
                            <SaveIcon />
                        </IconButton>
                        <span>Сохранить как настройки по умолчанию</span>
                    </div>


    </Fragment>
        )
};

export default LayersPanel;
