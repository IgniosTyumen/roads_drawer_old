import React, {Fragment, useState} from "react";
import {Tabs} from 'antd';
import {ComponentCreatorFromSchema} from "../ComponentCreatorFromSchema/ComponentCreatorFromSchema";
import {isEmptyObject} from "../../utils/isEmptyObject";

const {TabPane} = Tabs;


const SchemaParserToComponents = props => {
    const [stateOfComponents, setStateOfComponents] = useState({});
    const [Components, setComponents] = useState([]);
    let templateState = {};
    const {schema,handleAddTab} = props;

    const fields = schema.__meta.fields;
    const tabName = schema.__meta.title;

    const registerToState = (name,value=null) => {
        templateState =
            {
                ...templateState,
                [name]:value
            }

    }

    const onChange = (key) => (value) => {
        console.log(key, value);
        setStateOfComponents ({
            ...stateOfComponents,
            [key]: value
        })
    }

    let divArray = [];
    if (isEmptyObject(stateOfComponents)) {
        for (let it = 0; it < fields.length; it++) {
            let Elements = []
            if (Array.isArray(fields[it])) {
                for (let itElements = 0; itElements < fields[it].length; itElements++) {
                    const nameOfField = fields[it][itElements];
                    const stateName = fields[it][itElements].local_fk_field;
                    const description = schema[nameOfField];
                    registerToState(stateName ? stateName : nameOfField, description.default);
                    const callbackOnChange = (value) => onChange(nameOfField);
                    const Element = ComponentCreatorFromSchema(nameOfField, description, () => callbackOnChange())
                    console.log(Element)
                    if (Element) Elements.push(Element)
                }
            }
            divArray.push(<div className={'tabSector'}>
                {Elements}
            </div>)
        }
    }

        if (isEmptyObject(stateOfComponents)) {
            handleAddTab(
                <TabPane tab="tabName" key="tabName">
                    {divArray}
            </TabPane>
            )
            setComponents(divArray);
            setStateOfComponents(templateState)
        }
        console.log(divArray)
        console.log(Components)
    return (
        <Fragment>
        </Fragment>
    )
};

export default SchemaParserToComponents;
