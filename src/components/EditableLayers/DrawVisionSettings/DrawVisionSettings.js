import React, {useState} from "react";
import {Col, Row, Slider} from 'antd';
import styleProvider from "../../CommonComponents/StyleProvider/styleProvider";

const DrawVisionSettings = props => {


    const {userPreferences, userPreferencesActions} = props;

    const [sizeArray, setSizeArray] = useState({
        start: Number.parseInt(styleProvider(userPreferences,'draw','startMarkerSize')),
        end: Number.parseInt(styleProvider(userPreferences,'draw','endMarkerSize')),
        middle: Number.parseInt(styleProvider(userPreferences,'draw','middleMarkerSize')),
        pseudo: Number.parseInt(styleProvider(userPreferences,'draw','pseudoMarkerSize')),
        width: Number.parseInt(styleProvider(userPreferences,'draw','lineWidth')),
    });

    const handleSizeChange = (value, key) => {
        if (value<=20 && value>=1){
            setSizeArray({
                ...sizeArray,
                [key]:value
            });
        }
    }

    const handleAfterChange = (value, key) => {
        switch (key) {
            case 'width': {
                userPreferencesActions.changeVisualPreference('draw','lineWidth',value);
                break;
            }
            case 'start': {
                userPreferencesActions.changeVisualPreference('draw','startMarkerSize',value);
                break;
            }
            case 'middle': {
                userPreferencesActions.changeVisualPreference('draw','middleMarkerSize',value);
                break;
            }
            case 'end': {
                userPreferencesActions.changeVisualPreference('draw','endMarkerSize',value);
                break;
            }
            case 'pseudo': {
                userPreferencesActions.changeVisualPreference('draw','pseudoMarkerSize',value);
                break;
            }
        }
    }

    return (
        <div className={"settingsBlock"}>
            <div className={'settingsBlock'}>
                <Row align={'middle'}>
                    <Col span={6}>
                        <p>Ширина линии рисования</p>
                    </Col>
                    <Col span={18}>
                        <Slider
                            min={0.5}
                            max={10}
                            onChange={(value)=>handleSizeChange(value,'width')}
                            onAfterChange={(value)=>handleAfterChange(value,'width')}
                            value={typeof sizeArray.width === 'number' ? sizeArray.width : 0}
                            step={0.1}
                            included={true}
                        />
                    </Col>
                </Row>
            </div>
            <div className={'settingsBlock'}>
                <Row align={'middle'}>
                    <Col span={6}>
                        <p>Размер маркера начала маршрута</p>
                    </Col>
                    <Col span={18}>
                        <Slider
                            min={5}
                            max={20}
                            onChange={(value)=>handleSizeChange(value,'start')}
                            onAfterChange={(value)=>handleAfterChange(value,'start')}
                            value={typeof sizeArray.start === 'number' ? sizeArray.start : 0}
                            step={1}
                            included={true}
                        />
                    </Col>
                </Row>
            </div>

            <div className={'settingsBlock'}>
                <Row align={'middle'}>
                    <Col span={6}>
                        <p>Размер маркеров внутри маршрута</p>
                    </Col>
                    <Col span={18}>
                        <Slider
                            min={5}
                            max={20}
                            onChange={(value)=>handleSizeChange(value,'middle')}
                            onAfterChange={(value)=>handleAfterChange(value,'middle')}
                            value={typeof sizeArray.middle === 'number' ? sizeArray.middle : 0}
                            step={1}
                            included={true}
                        />
                    </Col>
                </Row>
            </div>

            <div className={'settingsBlock'}>
                <Row align={'middle'}>
                    <Col span={6}>
                        <p>Размер маркера конца маршрута</p>
                    </Col>
                    <Col span={18}>
                        <Slider
                            min={5}
                            max={20}
                            onChange={(value)=>handleSizeChange(value,'end')}
                            onAfterChange={(value)=>handleAfterChange(value,'end')}
                            value={typeof sizeArray.end === 'number' ? sizeArray.end : 0}
                            step={1}
                            included={true}
                        />
                    </Col>
                </Row>
            </div>

            <div className={'settingsBlock'}>
                <Row align={'middle'}>
                    <Col span={6}>
                        <p>Размер маркера рисования</p>
                    </Col>
                    <Col span={18}>
                        <Slider
                            min={5}
                            max={20}
                            onChange={(value)=>handleSizeChange(value,'pseudo')}
                            onAfterChange={(value)=>handleAfterChange(value,'pseudo')}
                            value={typeof sizeArray.pseudo === 'number' ? sizeArray.pseudo : 0}
                            step={1}
                            included={true}
                        />
                    </Col>
                </Row>
            </div>

        </div>
    )
}

export default DrawVisionSettings;
