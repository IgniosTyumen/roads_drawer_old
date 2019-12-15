import React, {useState} from "react";
import {connect} from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import SchemaParserToComponentsContainer from "../SchemaParserToComponents/SchemaParserToComponentsContainer";
import {Tabs} from "antd";


const NewRoadModalContainer = (props) => {
    const [tabs,setTabs] = useState([]);

    const handleAddTab = (TabsArray) =>
    {
        setTabs(TabsArray);
    }

    const {newRoadTemplate} = props;

            return (
                <Dialog open={newRoadTemplate.openNewRoadDialog}>
                    <SchemaParserToComponentsContainer handleAddTab={handleAddTab}/>
                    <Tabs type="card">
                        {tabs}
                    </Tabs>
                </Dialog>
            )
        }

const mapStateToProps = (state) => {
    return {
        newRoadTemplate: state.newRoadTemplate
    }
};

const mapDispatchToProps = (dispatch) => {
    return {

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(NewRoadModalContainer)
