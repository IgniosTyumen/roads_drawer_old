import React from "react";
import IconButton from "@material-ui/core/IconButton";
import {Tooltip} from "antd";


const CalculationsPanel = (props) => {

    const {
        blockPanel,
        handleCalculateRoadsAccessibilityStart,
        handleCalculateCityClosestStart,
        tile,
        selectedCity,
        cities
    } = props;

    const isDark = tile.includes('dark');
    const color = isDark ? '#fff' : '#000';

    const ZoneSVG = <svg width="20" height="20" viewBox="0 0 57 57" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M28.5 0C12.825 0 0 12.825 0 28.5C0 44.175 12.825 57 28.5 57C44.175 57 57 44.175 57 28.5C57 12.825 44.175 0 28.5 0ZM28.5 7.125C40.3275 7.125 49.875 16.6725 49.875 28.5C49.875 40.3275 40.3275 49.875 28.5 49.875C16.6725 49.875 7.125 40.3275 7.125 28.5C7.125 16.6725 16.6725 7.125 28.5 7.125ZM28.5 14.25C20.6625 14.25 14.25 20.6625 14.25 28.5C14.25 36.3375 20.6625 42.75 28.5 42.75C36.3375 42.75 42.75 36.3375 42.75 28.5C42.75 20.6625 36.3375 14.25 28.5 14.25ZM28.5 21.375C32.49 21.375 35.625 24.51 35.625 28.5C35.625 32.49 32.49 35.625 28.5 35.625C24.51 35.625 21.375 32.49 21.375 28.5C21.375 24.51 24.51 21.375 28.5 21.375Z" fill={color}/>
    </svg>

    const RadiusSVG = <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C10.6868 2 9.38642 2.25866 8.17317 2.7612C6.95991 3.26375 5.85752 4.00035 4.92893 4.92893C3.05357 6.8043 2 9.34784 2 12C2 14.6522 3.05357 17.1957 4.92893 19.0711C5.85752 19.9997 6.95991 20.7362 8.17317 21.2388C9.38642 21.7413 10.6868 22 12 22C14.6522 22 17.1957 20.9464 19.0711 19.0711C20.9464 17.1957 22 14.6522 22 12C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7362 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2V2ZM12 20C9.87827 20 7.84344 19.1571 6.34315 17.6569C4.84285 16.1566 4 14.1217 4 12C4 9.87827 4.84285 7.84344 6.34315 6.34315C7.84344 4.84285 9.87827 4 12 4C14.1217 4 16.1566 4.84285 17.6569 6.34315C19.1571 7.84344 20 9.87827 20 12C20 14.1217 19.1571 16.1566 17.6569 17.6569C16.1566 19.1571 14.1217 20 12 20V20ZM16 15V13H13.72C13.36 13.62 12.71 14 12 14C11.4696 14 10.9609 13.7893 10.5858 13.4142C10.2107 13.0391 10 12.5304 10 12C10 11.4696 10.2107 10.9609 10.5858 10.5858C10.9609 10.2107 11.4696 10 12 10C12.71 10 13.36 10.38 13.72 11H16V9L19 12L16 15Z" fill="black"/>
    </svg>




    return (

        <div>
            <div className={'calculatorPanel'}>
                {cities.cities && cities.cities.length ? <Tooltip placement="bottom" title={'Отобразить доступность автодорог и летных площадок'}>
                    <IconButton color="primary" onClick={()=>handleCalculateRoadsAccessibilityStart()}
                    >
                        {ZoneSVG}
                    </IconButton>
                </Tooltip> : null}
                {selectedCity &&
                <Tooltip placement="bottom" title={'Отобразить близжайшие аэроплощадки и дороги'}>
                    <IconButton color="primary" onClick={() => handleCalculateCityClosestStart()}
                    >
                        {RadiusSVG}
                    </IconButton>
                </Tooltip>
                }
            </div>
            <div className={'drawPanelMessageBox'}>

            </div>

        </div>
    )
};

export default CalculationsPanel;
