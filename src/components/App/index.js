import React, {Fragment, useEffect} from 'react';
import {connect, Provider} from 'react-redux';
import Map from "~/components/Map";
import MainControlPanelContainer from "../Controls/MainControlPanel/MainControlPanelContainer";
import * as AppActions from "~/actions/AppActions";
import {bindActionCreators, compose} from "redux";
import PreloaderContainer from "../CommonComponents/Preloader/PreloaderContainer";
import {HashRouter, Route, withRouter} from "react-router-dom";
import {store} from "~/store/configureStore";
import DrawPanelContainer from "../Controls/DrawPanel/DrawPanelContainer";
import SelectTyleLayerContainer from "../Controls/SelectTyleLayerContainer/SelectTyleLayerContainer";

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
                                   && <SelectTyleLayerContainer/>
                               }
                               <Map style={{overflow: 'hidden'}}/>
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
                <AppContainer/>
            </Provider>
        </HashRouter>
    )
}

export default AppEntryPoint;
