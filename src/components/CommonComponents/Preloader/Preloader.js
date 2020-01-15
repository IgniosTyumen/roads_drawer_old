import React from "react";
import {Alert, Button} from "antd";

const Preloader = (props) => {
    const {initial, dispatch} = props;


    const svgLogo =
        <div className={'logoITS'}>
            <svg width="240" height="240" viewBox="0 0 52 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g transform="scale(0.1) translate(10,-746.36218)">
                    <path fill={'green'} stroke={'green'}
                          d="m 199.78209,650.92217 c -110.84804,0 -200.70813473,89.86009 -200.70813473,200.70813 0,110.84803 89.86009473,200.7082 200.70813473,200.7082 110.84803,0 200.70812,-89.86017 200.70812,-200.7082 l -0.52267,-14.63497 C 392.29864,732.10559 304.95182,650.92217 199.78209,650.92217 z m 22.9978,86.97352 44.2882,0 -146.87235,229.14178 -43.451921,0 146.036071,-229.14178 z m 56.24009,0.83629 44.2882,0 -146.87235,229.14177 -43.45192,0 146.03607,-229.14177 z"
                          id="logo-path"/>
                </g>
            </svg>
        </div>;

    const roadsPercentage = initial.roadsToDownload ? (initial.roadsDownloaded / initial.roadsToDownload) * 100 : 0;
    const bridgesPercentage = initial.bridgesToDownload ? (initial.bridgesDownloaded / initial.bridgesToDownload) * 100 : 0;
    const signsPercentage = initial.signsToDownload ? (initial.signsDownloaded / initial.signsToDownload) * 100 : 0;
    const dangersPercentage = initial.dangersToDownload ? (initial.dangersDownloaded / initial.dangersToDownload) * 100 : 0;
    const classForRoadsLoader = `loaderStyle  ${(roadsPercentage < 100) ? "" : "hideLoaderAnimation"}  ${(roadsPercentage > 100) ? "hideLoader" : ""}`;
    const classForBridgesLoader = `loaderStyle  ${bridgesPercentage < 100 ? "" : "hideLoaderAnimation"} ${(bridgesPercentage > 100) ? "hideLoader" : ""}`;
    const classForSignsLoader = `loaderStyle  ${(signsPercentage < 100) ? "" : "hideLoaderAnimation"} ${(signsPercentage > 100) ? "hideLoader" : ""}`;
    const classForDangersLoader = `loaderStyle  ${(dangersPercentage < 100) ? "" : "hideLoaderAnimation"} ${(dangersPercentage > 100) ? "hideLoader" : ""}`;

    const handleReinitApp = () => {
        dispatch({
            type: 'INITIALIZE_APP'
        })
    };

    if (roadsPercentage===100) {
        setTimeout(()=>{
            dispatch({
                type: 'SET_ROADS_DOWNLOADED',
                payload: initial.roadsDownloaded+1
            })
        }, 1750)
    }
    if (bridgesPercentage===100) {
        setTimeout(()=>{
            dispatch({
                type: 'SET_BRIDGES_DOWNLOADED',
                payload: initial.bridgesDownloaded+1
            })
        }, 1750)
    }
    if (signsPercentage===100) {
        setTimeout(()=>{
            dispatch({
                type: 'SET_SIGNS_DOWNLOADED',
                payload: initial.signsDownloaded+1
            })
        }, 1750)
    }
    if (dangersPercentage===100) {
        setTimeout(()=>{
            dispatch({
                type: 'SET_DANGERS_DOWNLOADED',
                payload: initial.dangersDownloaded+1
            })
        }, 1750)
    }

    return (
        <div className={initial.isInitialized ? 'closedPreloader animatePreloadOut' : 'preloader'}>
            {initial.isInitialized===false ? <Alert
                type="error"
                message="Во время загрузки произошла ошибка"
                banner
                closable
            /> : null}
            {svgLogo}
            <p className={'preloaderTitle'}>Работа начнется как только все файлы будут загружены</p>
            <div style={{display:'flex',justifyContent:"center"}}>

                {initial.isInitialized===false ? <Button onClick={handleReinitApp} >Перезапустить приложение</Button> : null}

            </div>
        </div>
    )
};
export default Preloader;
