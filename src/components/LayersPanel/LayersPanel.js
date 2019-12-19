import React, {Fragment, useState} from "react";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Checkbox from "@material-ui/core/Checkbox";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SignsVisionFilterContainer from "../SignsVisionFilter/SignsVisionFilterContainer";
import RoadVisionSettingsContainer from "../RoadsVisionSettings/RoadVisionSettingsContainer";
import SaveIcon from '@material-ui/icons/Save';
import IconButton from "@material-ui/core/IconButton";
import DangerRoadVisionSettingsContainer from "../DangerRoadsVisionSettings/DangerRoadVisionSettingsContainer";
import DrawVisionSettingsContainer from "../DrawVisionSettings/DrawVisionSettingsContainer";
import SignsVisualSettingsContainer from "../SignsVisualSettings/SignsVisualSettingsContainer";


const LayersPanel = (props) => {
    const [expandedPanelsList,setExpandedPanelList] = useState({
        roads: false,
        bridges:false,
        signs:false,
        dangers: false,
        routes:false,
        draw:false
    });

    const {mapVisibleFiltersActions, mapInvisibleList, userPreferencesActions} = props;

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


        {/*<ExpansionPanel expanded={expandedPanelsList.bridges}>*/}
        {/*    <ExpansionPanelSummary>*/}
        {/*        <div className={"panelSummaryDecorator"}>*/}
        {/*            <p className={"panelSummaryDecoratorText"}>Слой мостов</p>*/}
        {/*            <div className={"panelSummaryDecoratorActions"}>*/}
        {/*                <Checkbox icon={<VisibilityIcon/>} checkedIcon={<VisibilityOffIcon/>}*/}
        {/*                          value={mapInvisibleList.includes('bridges') }*/}
        {/*                          color={"primary"}*/}
        {/*                          onClick={(event) => {*/}
        {/*                              event.stopPropagation();*/}
        {/*                              handleVisibleChange('bridges', event)*/}
        {/*                          }}*/}
        {/*                />*/}
        {/*                <Checkbox icon={<ExpandMoreIcon/>} checkedIcon={<ExpandLessIcon/>}*/}
        {/*                          value={expandedPanelsList.roads}*/}
        {/*                          color={"primary"}*/}
        {/*                          onClick={*/}
        {/*                              (event)=>{*/}
        {/*                                  event.stopPropagation();*/}
        {/*                                  handleExpandLayouts('bridges')*/}
        {/*                              }*/}
        {/*                          }/>*/}
        {/*            </div>*/}
        {/*        </div>*/}
        {/*    </ExpansionPanelSummary>*/}
        {/*    <ExpansionPanelDetails>*/}
        {/*        <h1>bridges</h1>*/}
        {/*    </ExpansionPanelDetails>*/}
        {/*</ExpansionPanel>*/}


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

                {/*<ExpansionPanel expanded={expandedPanelsList.routes}>*/}
                {/*    <ExpansionPanelSummary>*/}
                {/*        <div className={"panelSummaryDecorator"}>*/}
                {/*            <p className={"panelSummaryDecoratorText"}>Слой участков</p>*/}
                {/*            <div className={"panelSummaryDecoratorActions"}>*/}
                {/*                <Checkbox icon={<VisibilityIcon/>} checkedIcon={<VisibilityOffIcon/>}*/}
                {/*                          value={mapInvisibleList.includes('routes') }*/}
                {/*                          color={"primary"}*/}
                {/*                          onClick={(event) => {*/}
                {/*                              event.stopPropagation();*/}
                {/*                              handleVisibleChange('routes', event)*/}
                {/*                          }}*/}
                {/*                />*/}
                {/*                <Checkbox icon={<ExpandMoreIcon/>} checkedIcon={<ExpandLessIcon/>}*/}
                {/*                          value={expandedPanelsList.routes}*/}
                {/*                          color={"primary"}*/}
                {/*                          onClick={*/}
                {/*                              (event)=>{*/}
                {/*                                  event.stopPropagation();*/}
                {/*                                  handleExpandLayouts('routes')*/}
                {/*                              }*/}
                {/*                          }/>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </ExpansionPanelSummary>*/}
                {/*    <ExpansionPanelDetails>*/}
                {/*        <RouteVisionSettingsContainer/>*/}
                {/*    </ExpansionPanelDetails>*/}
                {/*</ExpansionPanel>*/}

            <ExpansionPanel expanded={expandedPanelsList.draw}>
                <ExpansionPanelSummary>
                    <div className={"panelSummaryDecorator"}>
                        <p className={"panelSummaryDecoratorText"}>Слой рисования</p>
                        <div className={"panelSummaryDecoratorActions"}>
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
