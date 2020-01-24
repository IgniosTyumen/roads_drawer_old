import React, {useState} from "react";
import {SketchPicker} from 'react-color';
import Dialog from "@material-ui/core/Dialog";
import {Checkbox, Col, Row, Slider} from 'antd';
import Button from "@material-ui/core/Button";
import styleProvider from "../../../CommonComponents/StyleProvider/styleProvider";

const RoadVisionSettings = props => {
    const {userPreferences, userPreferencesActions} = props;

    const [endpointVisible, setEndpointVisible] = useState(styleProvider(userPreferences, 'roads', 'endpointsVisible'));
    const [endpointWidth, setEndpointWidth] = useState(styleProvider(userPreferences, 'roads', 'endpointsWidth'));
    const [colorRoadFederal, setColorRoadFederal] = useState(styleProvider(userPreferences, 'roads', 'colorRoadFederal'))
    const [colorRoadRegional, setColorRoadRegional] = useState(styleProvider(userPreferences, 'roads', 'colorRoadRegional'))
    const [colorRoadMunicipal, setColorRoadMunicipal] = useState(styleProvider(userPreferences, 'roads', 'colorRoadMunicipal'))
    const [lineWidthRoadFederal, setLineWidthRoadFederal] = useState(styleProvider(userPreferences, 'roads', 'widthRoadFederal'));
    const [lineWidthRoadRegional, setLineWidthRoadRegional] = useState(styleProvider(userPreferences, 'roads', 'widthRoadRegional'));
    const [lineWidthRoadMunicipal, setLineWidthRoadMunicipal] = useState(styleProvider(userPreferences, 'roads', 'widthRoadMunicipal'));

    const [visibleColorPickerRoadFederal, setVisibleColorPickerRoadFederal] = useState(false);
    const [visibleColorPickerRoadMunicipal, setVisibleColorPickerRoadMunicipal] = useState(false);
    const [visibleColorPickerRoadRegional, setVisibleColorPickerRoadRegional] = useState(false);

    const [opacityLayer,setOpacityLayer] = useState({
        roads: styleProvider(userPreferences,'opacity','roads'),
        signs: styleProvider(userPreferences,'opacity','signs'),
        dangers: styleProvider(userPreferences,'opacity','dangerRoads'),
        draw: styleProvider(userPreferences,'opacity','draw'),
        cities: styleProvider(userPreferences,'opacity','cities'),
        airfields: styleProvider(userPreferences,'opacity','airfields'),
    })

    const handleOpacityChange = (value,type) => {
        setOpacityLayer({
            ...opacityLayer,
            [type]: value
        })
    };


    const handleChangeComplete = (color, type) => {
        switch (type) {
            case 'federal':
                setColorRoadFederal(color.hex);
                userPreferencesActions.changeVisualPreference('roads', 'colorRoadFederal', color.hex);
                break;
            case 'regional':
                setColorRoadRegional(color.hex);
                userPreferencesActions.changeVisualPreference('roads', 'colorRoadRegional', color.hex);
                break;
            case 'municipal':
                setColorRoadMunicipal(color.hex);
                userPreferencesActions.changeVisualPreference('roads', 'colorRoadMunicipal', color.hex);
                break;
        }
    }


    const handleColorPickerOpen = (type) => {
        switch (type) {
            case 'federal':
                setVisibleColorPickerRoadFederal(true)
                break;
            case 'regional':
                setVisibleColorPickerRoadRegional(true)
                break;
            case 'municipal':
                setVisibleColorPickerRoadMunicipal(true)
                break;
        }
    }

    const handleColorPickerClose = (type) => {
        switch (type) {
            case 'federal':
                setVisibleColorPickerRoadFederal(false)
                break;
            case 'regional':
                setVisibleColorPickerRoadRegional(false)
                break;
            case 'municipal':
                setVisibleColorPickerRoadMunicipal(false)
                break;
        }
    }

    const handleLineWidthChange = (value, type) => {
        switch (type) {
            case 'federal':
                setLineWidthRoadFederal(value);
                break;
            case 'regional':
                setLineWidthRoadRegional(value);
                break;
            case 'municipal':
                setLineWidthRoadMunicipal(value);
                break;
        }
    }

    const handleLineWidthAfterChange = (value, type) => {
        switch (type) {
            case 'federal':
                userPreferencesActions.changeVisualPreference('roads', 'widthRoadFederal', value);
                break;
            case 'regional':
                userPreferencesActions.changeVisualPreference('roads', 'widthRoadRegional', value);
                break;
            case 'municipal':
                userPreferencesActions.changeVisualPreference('roads', 'widthRoadMunicipal', value);
                break;
        }
    }
    const handleEndpointWidthChange = (value) => {
        setEndpointWidth(value);
    }

    const handleEndpointWidthAfterChange = (value) => {
        userPreferencesActions.changeVisualPreference('roads', 'endpointsVisible', value);
    }

    const handleEndpointsVisible = (event) => {
        setEndpointVisible(event.target.checked);
        userPreferencesActions.changeVisualPreference('roads', 'endpointsVisible', event.target.checked);
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
            case 'cities' : {
                userPreferencesActions.changeVisualPreference('opacity','cities',value);
                break;
            }
            case 'airfields' : {
                userPreferencesActions.changeVisualPreference('opacity','airfields',value);
                break;
            }
        }

    }

    return (
        <div className={"settingsBlock"}>
            <Row align={'middle'}>
                <Col span={6}>
                    <p>Прозрачность дорог</p>
                </Col>
                <Col span={18}>
                    <Slider
                        min={0}
                        max={1}
                        onChange={(val) => handleOpacityChange(val, 'roads')}
                        onAfterChange={(val) => handleOpacityAfterChange(val, 'roads')}
                        value={typeof opacityLayer.roads === 'number' ? opacityLayer.roads : 0}
                        step={0.05}
                        included={true}
                    />
                </Col>
            </Row>
            <div onClick={() => handleColorPickerOpen('federal')} className={'roadColorSelectorWrapper'}>
                <span>Цвет линии федеральной дороги</span>
                <div style={{backgroundColor: colorRoadFederal}} className={'roadColorSelector'}/>
            </div>
            <Dialog open={visibleColorPickerRoadFederal}>
                <div>
                    <SketchPicker
                        color={colorRoadFederal}
                        onChangeComplete={(val) => handleChangeComplete(val, 'federal')}
                    />
                    <Button variant onClick={() => handleColorPickerClose('federal')}>OK</Button>
                </div>
            </Dialog>
            <Row align={'middle'}>
                <Col span={6}>
                    <p>Ширина линии федеральной дороги</p>
                </Col>
                <Col span={18}>
                    <Slider
                        min={1}
                        max={5}
                        onChange={(val) => handleLineWidthChange(val, 'federal')}
                        onAfterChange={(val) => handleLineWidthAfterChange(val, 'federal')}
                        value={typeof lineWidthRoadFederal === 'number' ? lineWidthRoadFederal : 0}
                        step={0.1}
                        included={true}
                    />
                </Col>
            </Row>


            <div onClick={() => handleColorPickerOpen('regional')} className={'roadColorSelectorWrapper'}>
                <span>Цвет линии региональной дороги</span>
                <div style={{backgroundColor: colorRoadRegional}} className={'roadColorSelector'}/>
            </div>
            <Dialog open={visibleColorPickerRoadRegional}>
                <div>
                    <SketchPicker
                        color={colorRoadRegional}
                        onChangeComplete={(val) => handleChangeComplete(val, 'regional')}
                    />
                    <Button variant onClick={() => handleColorPickerClose('regional')}>OK</Button>
                </div>
            </Dialog>
            <Row align={'middle'}>
                <Col span={6}>
                    <p>Ширина линии региональной дороги</p>
                </Col>
                <Col span={18}>
                    <Slider
                        min={0.5}
                        max={5}
                        onChange={(val) => handleLineWidthChange(val, 'regional')}
                        onAfterChange={(val) => handleLineWidthAfterChange(val, 'regional')}
                        value={typeof lineWidthRoadRegional === 'number' ? lineWidthRoadRegional : 0}
                        step={0.1}
                        included={true}
                    />
                </Col>
            </Row>


            <div onClick={() => handleColorPickerOpen('municipal')} className={'roadColorSelectorWrapper'}>
                <span>Цвет линии муниципальной дороги</span>
                <div style={{backgroundColor: colorRoadMunicipal}} className={'roadColorSelector'}/>
            </div>
            <Dialog open={visibleColorPickerRoadMunicipal}>
                <div>
                    <SketchPicker
                        color={colorRoadMunicipal}
                        onChangeComplete={(val) => handleChangeComplete(val, 'municipal')}
                    />
                    <Button variant onClick={() => handleColorPickerClose('municipal')}>OK</Button>
                </div>
            </Dialog>
            <Row align={'middle'}>
                <Col span={6}>
                    <p>Ширина линии муниципальной дороги</p>
                </Col>
                <Col span={18}>
                    <Slider
                        min={0.5}
                        max={5}
                        onChange={(val) => handleLineWidthChange(val, 'municipal')}
                        onAfterChange={(val) => handleLineWidthAfterChange(val, 'municipal')}
                        value={typeof lineWidthRoadMunicipal === 'number' ? lineWidthRoadMunicipal : 0}
                        step={0.1}
                        included={true}
                    />
                </Col>
            </Row>

            <div className={'settingsBlock'}>
                <Row align={'middle'}>
                    <Checkbox onChange={handleEndpointsVisible} defaultChecked={endpointVisible}>Видимость границ
                        дороги</Checkbox>
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
