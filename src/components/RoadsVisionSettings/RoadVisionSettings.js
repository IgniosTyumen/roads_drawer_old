import React, {useEffect, useState} from "react";
import {SketchPicker} from 'react-color';
import Dialog from "@material-ui/core/Dialog";
import Button from "../ui/Button";
import {Checkbox, Col, Row, Slider} from 'antd';

const RoadVisionSettings = props => {

    const [colorRoad, setColorRoad] = useState()
    const [visibleColorPicker, setVisibleColorPicker] = useState(false);
    const [lineWidth, setLineWidth] = useState();

    const [colorSegment, setColorSegment] = useState()
    const [visibleColorPickerSegment, setVisibleColorPickerSegment] = useState(false);
    const [lineWidthSegment, setLineWidthSegment] = useState();

    const [endpointVisible, setEndpointVisible] = useState(true);
    const [endpointWidth, setEndpointWidth] = useState(10)
    const {userPreferences, userPreferencesActions} = props;

    const handleChangeComplete = (color) => {
        setColorRoad(color.hex);
        userPreferencesActions.changeRoadColor(color.hex);

    }

    const handleColorPickerOpen = () => {
        setVisibleColorPicker(true)
    }

    const handleColorPickerClose = () => {
        setVisibleColorPicker(false)
    }

    const handleLineWidthChange = (value) => {
        setLineWidth(value);
    }


    const handleChangeCompleteSegment = (color) => {
        setColorSegment(color.hex);
        userPreferencesActions.changeColorSegment(color.hex);

    }

    const handleColorPickerSegmentOpen = () => {
        setVisibleColorPickerSegment(true)
    }

    const handleColorPickerSegmentClose = () => {
        setVisibleColorPickerSegment(false)
    }

    const handleLineWidthSegmentChange = (value) => {
        setLineWidthSegment(value);
    }

    const handleLineWidthAfterChange = (value) => {
        userPreferencesActions.changeRoadLineWeight(value);
    }

    const coverStyle = {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
    };

    const initFromProps = () => {
        setColorRoad(userPreferences.roadColor);
        setLineWidth(userPreferences.roadWidth);
    }

    const handleEndpointsVisible = (event) => {
        setEndpointVisible(event.target.checked);
        userPreferencesActions.changeRoadWaypointsVisible(event.target.checked)
    }

    const handleEndpointWidthChange = (value) => {
        setEndpointWidth(value);
    }

    const handleLineWidthSegmentAfterChange = (value) => {
        userPreferencesActions.changeSegmentLineWeight(value);
    }

    const handleEndpointWidthAfterChange = (value) => {
        userPreferencesActions.changeRoadWaypointsWidth(value);
    }

    useEffect(initFromProps,[]);

    return (
        <div className={"settingsBlock"}>
            <div onClick={handleColorPickerSegmentOpen} className={'roadColorSelectorWrapper'}>
                <span>Цвет линии участка</span>
                <div style={{backgroundColor: colorRoad}} className={'roadColorSelector'}/>
            </div>
            <Dialog open={visibleColorPickerSegment}>
                <div>
                    <SketchPicker
                        color={colorSegment}
                        onChangeComplete={handleChangeCompleteSegment}
                    />
                    <Button variant onClick={handleColorPickerSegmentClose}>OK</Button>
                </div>
            </Dialog>
            <div className={'settingsBlock'}>
                <Row align={'middle'}>
                    <Col span={6}>
                        <p>Ширина линии участка</p>
                    </Col>
                    <Col span={18}>
                        <Slider
                            min={0.5}
                            max={10}
                            onChange={handleLineWidthSegmentChange}
                            onAfterChange={handleLineWidthSegmentAfterChange}
                            value={typeof lineWidthSegment === 'number' ? lineWidthSegment : 0}
                            step={0.1}
                            included={true}
                        />
                    </Col>
                </Row>

                <div onClick={handleColorPickerOpen} className={'roadColorSelectorWrapper'}>
                    <span>Цвет линии дороги</span>
                    <div style={{backgroundColor: colorRoad}} className={'roadColorSelector'}/>
                </div>
                <Dialog open={visibleColorPicker}>
                    <div>
                        <SketchPicker
                            color={colorRoad}
                            onChangeComplete={handleChangeComplete}
                        />
                        <Button variant onClick={handleColorPickerClose}>OK</Button>
                    </div>
                </Dialog>
                <div className={'settingsBlock'}>
                    <Row align={'middle'}>
                        <Col span={6}>
                            <p>Ширина линии</p>
                        </Col>
                        <Col span={18}>
                            <Slider
                                min={0.5}
                                max={5}
                                onChange={handleLineWidthChange}
                                onAfterChange={handleLineWidthAfterChange}
                                value={typeof lineWidth === 'number' ? lineWidth : 0}
                                step={0.1}
                                included={true}
                            />
                        </Col>
                    </Row>
                </div>



                <Row align={'middle'}>
                    <Checkbox onChange={handleEndpointsVisible}>Видимость границ дороги</Checkbox>
                </Row>
                <Row align={'middle'}>
                    <Col span={6}>
                        <p>Ширина маркера границы дорог</p>
                    </Col>
                    <Col span={18}>
                        <Slider
                            min={1}
                            max={5}
                            onChange={handleEndpointWidthChange}
                            onAfterChange={handleEndpointWidthAfterChange}
                            value={typeof endpointWidth === 'number' ? endpointWidth : 0}
                            step={1}
                            included={true}
                        />
                    </Col>
                </Row>

            </div>
        </div>
    )
}

export default RoadVisionSettings;
