import React, {useState} from "react";
import {Col, Row, Slider} from 'antd';

const DrawVisionSettings = props => {


    const {userPreferences, userPreferencesActions} = props;


    const [sizeArray, setSizeArray] = useState({
        start: Number.parseInt(userPreferences.startDrawMarkerSize),
        end: Number.parseInt(userPreferences.endDrawMarkerSize),
        middle: Number.parseInt(userPreferences.middleDrawMarkerSize),
        pseudo: Number.parseInt(userPreferences.pseudoDrawMarkerSize),
        width: Number.parseInt(userPreferences.pseudoDrawMarkerSize),
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
        userPreferencesActions.changeDrawMarkerSize(sizeArray)
    }

    // const initFromProps = () => {
    //     setSizeArray({
    //         start: userPreferences.startDrawMarkerSize,
    //         end: userPreferences.endDrawMarkerSize,
    //         middle: userPreferences.middleDrawMarkerSize,
    //         pseudo: userPreferences.pseudoDrawMarkerSize,
    //     })
    // }
    //
    //
    // useEffect(initFromProps,[]);

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
