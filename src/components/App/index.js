import React, {Fragment, useEffect} from 'react';
import {connect, Provider} from 'react-redux';
import Map from "~/components/Map";
import MainControlPanelContainer from "../MainControlPanel/MainControlPanelContainer";
import * as AppActions from "~/actions/AppActions";
import {bindActionCreators, compose} from "redux";
import PreloaderContainer from "../Preloader/PreloaderContainer";
import {store} from "~/store/configureStore";
import DrawPanelContainer from "../DrawPanel/DrawPanelContainer";

const App = ({appActions, isInitialized,...props}) => {
    useEffect(() => appActions.initApp(props), []);
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
                               <Map style={{overflow: 'hidden'}}/>
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
    connect(mapStateToProps, mapDispatchToProps))(App)


const AppEntryPoint = () => {
    return (
            <Provider store={store}>
                <AppContainer/>
            </Provider>
    )
}

export default AppEntryPoint;
