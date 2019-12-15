import React from 'react'
import {connect} from "react-redux";
import SchemaParserToComponents from "./SchemaParserToComponents";

const SchemaParserToComponentsContainer = props =>{
    const {schema, handleAddTab} = props

    return (
        <SchemaParserToComponents schema={schema} handleAddTab={handleAddTab}/>
    )
};

const mapStateToProps = state => {
    return {
        schema: state.schema.schema
    }
};

const mapDispatchToProps = dispatch => {
    return {

    }
};

export default connect(mapStateToProps,mapDispatchToProps)(SchemaParserToComponentsContainer);
