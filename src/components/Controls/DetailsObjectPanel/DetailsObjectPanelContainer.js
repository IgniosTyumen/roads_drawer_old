import React from "react";
import {connect} from "react-redux";
import DetailsObjectPanel from "./DetailsObjectPanel";

const DetailsObjectPanelContainer = ({detailedObject, detailedObjectType, handleSelectDetailedObject,fetching}) => {
    return (
       <DetailsObjectPanel
            detailedObject={detailedObject}
            detailedObjectType={detailedObjectType}
            handleSelectDetailedObject={handleSelectDetailedObject}
            fetching={fetching}
        />
    )
};

const mapStateToProps = state => {
    return {

    }
};

const mapDispatchToProps = dispatch => {
    return {

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailsObjectPanelContainer);
