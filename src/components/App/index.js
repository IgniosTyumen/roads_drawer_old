import React, {Fragment, useEffect} from 'react';
import {connect, Provider} from 'react-redux';
import MainControlPanelContainer from "../Controls/MainControlPanel/MainControlPanelContainer";
import * as AppActions from "../../actions/AppActions";
import {bindActionCreators, compose} from "redux";
import PreloaderContainer from "../CommonComponents/Preloader/PreloaderContainer";
import {HashRouter, Route, withRouter} from "react-router-dom";
import {store} from "../../store/configureStore";
import DrawPanelContainer from "../Controls/DrawPanel/DrawPanelContainer";
import SelectTyleLayerContainer from "../Controls/SelectTyleLayerContainer/SelectTyleLayerContainer";
import CalculationsPanelContainer from "../Controls/Calculations/CalculationsPanelContainer";
import Legend from "../Controls/Legend/Legend";
import Map from "../Map";
// import MapOnGl from "../MapGl/MapGl";

const App = ({appActions, isInitialized,...props}) => {
    useEffect(() => appActions.initApp(props), []);
    return (
        <Fragment>
            <Route path='/:documentId'
                   render={() => {
                       return (
                           <Fragment>
                               {<PreloaderContainer/>}
                               {
                                   isInitialized
                                   && <MainControlPanelContainer/>
                               }
                               {
                                   isInitialized
                                   && <DrawPanelContainer/>
                               }
                               {
                                   isInitialized
                                   && <SelectTyleLayerContainer/>
                               }
                               <Map style={{overflow: 'hidden'}}/>
                           </Fragment>
                       )
                   }
                   }
            />
            <Route path='/' exact
                   render={() => {
                       return (
                           <Fragment>
                               {<PreloaderContainer/>}
                               {
                                   isInitialized
                                   && <MainControlPanelContainer/>
                               }
                               {
                                   isInitialized
                                   && <DrawPanelContainer/>
                               }
                               {
                                   isInitialized
                                   && <CalculationsPanelContainer/>
                               }
                               {
                                   isInitialized
                                   && <SelectTyleLayerContainer/>
                               }
                               {
                                   isInitialized
                                   && <Legend/>
                               }
                               <Map style={{overflow: 'hidden'}}/>
                               {/*<MapOnGl/>*/}
                           </Fragment>
                       )
                   }
                   }
            />
        </Fragment>
    );
}

const mapStateToProps = state => {
    return {
        isInitialized: state.initial.isInitialized
    }
};
const mapDispatchToProps = dispatch => {
    return {
        appActions: bindActionCreators(AppActions, dispatch),
    }
};

let AppContainer = compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps))(App)


const AppEntryPoint = () => {
    return (
        <HashRouter>
            <Provider store={store}>
                {/*<Profiler id="Panel" onRender={(id, // проп "id" из дерева компонента Profiler, для которого было зафиксировано изменение*/}
                {/*    phase, // либо "mount" (если дерево было смонтировано), либо "update" (если дерево было повторно отрендерено)*/}
                {/*    actualDuration, // время, затраченное на рендер зафиксированного обновления*/}
                {/*    baseDuration, // предполагаемое время рендера всего поддерева без кеширования*/}
                {/*    startTime, // когда React начал рендерить это обновление*/}
                {/*    commitTime, // когда React зафиксировал это обновление*/}
                {/*interactions // Множество «взаимодействий» для данного обновления*/}
                {/*)=>console.log(id,phase,actualDuration,interactions)}>*/}
                 <AppContainer/>
                {/*</Profiler>*/}
            </Provider>
        </HashRouter>
    )
}

export default AppEntryPoint;
