import React, {Fragment} from "react";
import {connect} from "react-redux";
import OrderPreviewLayer from "./OrderPreviewLayer";

const OrderPreviewLayerContainer = (props) => {
    const {previewOrder, visibleList, userPreferences} = props;
    return (
        <Fragment>
            {(previewOrder && visibleList.indexOf("routes") < 0) && <OrderPreviewLayer
                previewOrder={previewOrder}
                userPreferences={userPreferences}
        />}
        </Fragment>
    )
};

const mapStateToProps = state => {
    return {
        previewOrder: state.activeOrder.previewOrder,
        visibleList: state.visibleFilter.invisibleList,
        userPreferences: state.userPreferences
    }
};

const mapDispatchToProps = dispatch => {
    return {

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderPreviewLayerContainer)
