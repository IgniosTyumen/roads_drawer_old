import React, {useState} from "react";
import {Icon, Tooltip} from "antd";

const Legend = (props) => {

    const [isOpened, setOpened] = useState(false)

    const iconColorify = (color) => {
        return (
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M0 21V10L7.5 5L15 10V21H10V14H5V21H0ZM24 2V21H17V8.93L16 8.27V6H14V6.93L10 4.27V2H24ZM21 14H19V16H21V14ZM21 10H19V12H21V10ZM21 6H19V8H21V6Z"
                    fill={color}/>
            </svg>
        )
    }

    const changeLegendVisibility = () => {
        setOpened(!isOpened)
    }

    const LegendSVG = () => (
        <svg viewBox="0 0 64 64" width="25" height="25" fill="black" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M29.78,45.89v5.56H46.44V45.89Zm-11.11,0v5.56h5.56V45.89ZM29.78,34.78v5.56H46.44V34.78Zm-11.11,0v5.56h5.56V34.78ZM29.78,23.67v5.56H46.44V23.67Zm-11.11,0v5.56h5.56V23.67ZM29.78,12.56v5.56H46.44V12.56Zm-11.11,0v5.56h5.56V12.56ZM15.89,7H49.22A2.78,2.78,0,0,1,52,9.78V54.22A2.78,2.78,0,0,1,49.22,57H15.89a2.78,2.78,0,0,1-2.78-2.78V9.78A2.78,2.78,0,0,1,15.89,7Z"/>
        </svg>
    );

    const LegendIcon = props => <Icon component={LegendSVG} {...props}/>

    return (
        <div className={'legendContainer'} onClick={changeLegendVisibility}>
            {!isOpened &&
            <div className={'legendOnButton'}>
                <Tooltip title={'Показать легенду'}>
                    {/*<Button onClick={changeLegendVisibility} icon={LegendIcon}/>*/}
                    <LegendIcon/>
                </Tooltip>
            </div>
            }
            {isOpened &&
            <Tooltip title={'Скрыть легенду'}>
                <div>
                    <div>
                        {iconColorify('#9e9c9c')}
                        <span>: Не труднодоступный</span>
                    </div>
                    <div>
                        {iconColorify('#63ad2a')}
                        <span>: Труднодоступный, строительство не требуется</span>
                    </div>
                    <div>
                        {iconColorify('#ff3eec')}
                        <span>: Труднодоступный, требуется строительство дороги и аэроплощадки</span>
                    </div>
                    <div>
                        {iconColorify('#68f0f0')}
                        <span>: Труднодоступный, требуется строительство аэроплощадки</span>
                    </div>
                    <div>
                        {iconColorify('#f2ab31')}
                        <span>: Труднодоступный, требуется строительство дороги</span>
                    </div>
                    <div className={'legendOffButtonContainer'}>

                        {/*<Button onClick={changeLegendVisibility} icon={LegendIcon}/>*/}
                        {/*<LegendIcon/>*/}

                    </div>
                </div>
            </Tooltip>}

        </div>
    )
}

export default Legend;
