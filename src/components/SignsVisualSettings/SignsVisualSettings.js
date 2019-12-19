import React, {useEffect, useState} from "react";
import {Col, Row, Slider} from "antd";

const SignsVisualSettings = ({userPreferencesActions,userPreferences}) => {

    const [signsSize,setSignsSize] = useState(100);
    const [zoomMinSignsRender,setZoomMinSignsRender] = useState(5);
    const [zoomMaxSignsRender,setZoomMaxSignsRender] = useState(14);

    const handleSignsSizeChange = (value) => {
        setSignsSize(value)
    }

    const handleSignsSizeAfterChange = (value) => {
        userPreferencesActions.changeSignsSize(value)
    }

    const handleZoomChange = ([valueMin, valueMax]) => {
        setZoomMinSignsRender(valueMin);
        setZoomMaxSignsRender(valueMax);
    }

    const handleZoomAfterChange = (valueMin, valueMax) => {
        userPreferencesActions.changeSignsZoomAvailable([valueMin,valueMax]);
    }

    const initFromProps = () => {

        setSignsSize(userPreferences.signsSize ? userPreferences.signsSize : 100);
        setZoomMinSignsRender(userPreferences.zoomMinSignsRender ? userPreferences.zoomMinSignsRender : 5);
        setZoomMaxSignsRender(userPreferences.zoomMaxSignsRender ? userPreferences.zoomMaxSignsRender : 14);

    }


    useEffect(initFromProps,[]);

    return (
        <div className={'settingsBlock'}>
            <Row align={'middle'}>
                <Col span={6}>
                    <p>Размер знаков</p>
                </Col>
                <Col span={18}>
                    <Slider
                        min={1}
                        max={100}
                        onChange={handleSignsSizeChange}
                        onAfterChange={handleSignsSizeAfterChange}
                        value={typeof signsSize === 'number' ? signsSize : 1}
                        step={1}
                        included={true}
                    />
                </Col>
            </Row>
            <Row align={'middle'}>
                <Col span={6}>
                    <p>Отрисовка на зумах карты</p>
                </Col>
                <Col span={18}>
                    <Slider
                        min={5}
                        max={20}
                        range
                        onChange={handleZoomChange}
                        onAfterChange={handleZoomAfterChange}
                        value={typeof zoomMinSignsRender === 'number' && typeof zoomMaxSignsRender === 'number' ? [zoomMinSignsRender,zoomMaxSignsRender] : [5,6]}
                        step={1}
                        included={true}
                    />
                </Col>
            </Row>
        </div>
    )
}

export default SignsVisualSettings;
