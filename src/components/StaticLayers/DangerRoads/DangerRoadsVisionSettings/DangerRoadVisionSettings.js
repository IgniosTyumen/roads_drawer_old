import React, {useState} from "react";
import {SketchPicker} from 'react-color';
import Dialog from "@material-ui/core/Dialog";
import {Col, Row, Slider} from 'antd';
import Button from "@material-ui/core/Button";
import styleProvider from "../../../CommonComponents/StyleProvider/styleProvider";

const DangerRoadVisionSettings = props => {

    const {userPreferences, userPreferencesActions} = props;
    const [colorRoadPrimary, setColorRoadPrimary] = useState(styleProvider(userPreferences,'dangerRoads','colorPrimary'));
    const [colorRoadSecondary, setColorRoadSecondary] = useState(styleProvider(userPreferences,'dangerRoads','colorSecondary'));

    const [lineWidth, setLineWidth] = useState(styleProvider(userPreferences,'dangerRoads','strokeWidth'));
    const [strokeLength, setStrokeLength] = useState(styleProvider(userPreferences,'dangerRoads','strokeLength'));

    const [visibleColorPickerPrimary, setVisibleColorPickerPrimary] = useState(false);
    const [visibleColorPickerSecondary, setVisibleColorPickerSecondary] = useState(false);


    const handleColorPickerOpenPrimary = () => {
        setVisibleColorPickerPrimary(true)
    }

    const handleColorPickerClosePrimary = () => {
        setVisibleColorPickerPrimary(false)
    }

    const handleColorPickerOpenSecondary = () => {
        setVisibleColorPickerSecondary(true)
    }

    const handleColorPickerCloseSecondary = () => {
        setVisibleColorPickerSecondary(false)
    }

    const handleLineWidthChange = (value) => {
        setLineWidth(value);
    }



    const handleStrokeLengthChange = (value) => {
        setStrokeLength(value);
    }



    const handleChangeCompletePrimary = (color) => {
        setColorRoadPrimary(color.hex);
        userPreferencesActions.changeVisualPreference('dangerRoads','colorPrimary',color.hex);
    }

    const handleChangeCompleteSecondary = (color) => {
        setColorRoadSecondary(color.hex);
        userPreferencesActions.changeVisualPreference('dangerRoads','colorSecondary',color.hex);

    }
    const handleStrokeLengthAfterChange = (value) => {
        userPreferencesActions.changeVisualPreference('dangerRoads','strokeLength',value);
    }
    const handleLineWidthAfterChange = (value) => {
        userPreferencesActions.changeVisualPreference('dangerRoads','strokeWidth',value);
    }

    return (
        <div className={"settingsBlock"}>
            <div onClick={handleColorPickerOpenPrimary} className={'roadColorSelectorWrapper'}>
                <span>Цвет линии дороги</span>
                <div style={{backgroundColor: colorRoadPrimary}} className={'roadColorSelector'}/>
            </div>
            <Dialog open={visibleColorPickerPrimary}>
                <div>
                    <SketchPicker
                        color={colorRoadPrimary}
                        onChangeComplete={handleChangeCompletePrimary}
                    />
                    <Button variant onClick={handleColorPickerClosePrimary}>OK</Button>
                </div>
            </Dialog>
            <div onClick={handleColorPickerOpenSecondary} className={'roadColorSelectorWrapper'}>
                <span>Цвет  штриха линии дороги</span>
                <div style={{backgroundColor: colorRoadSecondary}} className={'roadColorSelector'}/>
            </div>
            <Dialog open={visibleColorPickerSecondary}>
                <div>
                    <SketchPicker
                        color={colorRoadSecondary}
                        onChangeComplete={handleChangeCompleteSecondary}
                    />
                    <Button variant onClick={handleColorPickerCloseSecondary}>OK</Button>
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

            <div className={'settingsBlock'}>
                <Row align={'middle'}>
                    <Col span={6}>
                        <p>Ширина штриха</p>
                    </Col>
                    <Col span={18}>
                        <Slider
                            min={0}
                            max={100}
                            onChange={handleStrokeLengthChange}
                            onAfterChange={handleStrokeLengthAfterChange}
                            value={typeof strokeLength === 'number' ? strokeLength : 0}
                            step={5}
                            included={true}
                        />
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default DangerRoadVisionSettings;
