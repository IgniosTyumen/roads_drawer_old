import React from "react";
import {Input, InputNumber, Select} from 'antd';
import SelectLoadingComponent from "../SelectLoadingComponent/SelectLoadingComponent";

const { Option } = Select;



export const ComponentCreatorFromSchema = (name, description, onChangeCallbackFunction) => {

    const debugAddress = 'https://av.admtyumen.ru/';
    switch (description.type) {
        case 'str': {
            const placeholder = description.info.verbose_name || null;
            const isRequired = description.is_required;
            const visible = description.show;
            const defaultValue = description.default;
            if (description.choices) {
                let Options = [];
                for (let it in description.choices){
                    Options.push(<Option value={it}>{description.choices[it]}</Option>)
                }
                return <Select defaultValue={defaultValue} onChange={(value) => onChangeCallbackFunction(value)}>
                    {Options}
                </Select>
            } else {
                if (defaultValue) {
                    return <Input placeholder={placeholder} defaultValue={defaultValue}
                                  onChange={(value) => onChangeCallbackFunction(value)} key={name}/>
                } else {
                    return <Input placeholder={placeholder} onChange={(value) => onChangeCallbackFunction(value)}
                                  key={name}/>
                }
            }
        }
        case 'float': {

            const placeholder = description.info.verbose_name || null;
            const isRequired = description.is_required;
            const visible = description.show;
            const defaultValue = description.default;
            if (defaultValue) {
                return <InputNumber

                    placeholder={placeholder}
                              defaultValue={defaultValue}
                              onChange={(value) => onChangeCallbackFunction(value)}
                              key={name}/>
            } else {
                return <InputNumber placeholder={placeholder} onChange={(value) => onChangeCallbackFunction(value)}
                              key={name}/>
            }
        }

        case 'int': {
            const placeholder = description.info.verbose_name || null;
            const isRequired = description.is_required;
            const visible = description.show;
            const defaultValue = description.default;
            if (defaultValue) {
                return <InputNumber
                    formatter={value => `${value.toFixed(0)}%`}
                    step={1}
                    placeholder={placeholder}
                    defaultValue={defaultValue}
                    onChange={(value) => onChangeCallbackFunction(value)}
                    key={name}/>
            } else {
                return <InputNumber
                    placeholder={placeholder}
                    onChange={(value) => onChangeCallbackFunction(value)}
                    formatter={value => `${value.toFixed(0)}%`}
                    step={1}
                    key={name}
                />
            }
        }
        case 'MANYTOONE': {

            debugger
            const link = debugAddress ? debugAddress + description.url : description.url;
            console.log(link)
            return <SelectLoadingComponent url={link} onChangeCallbackFunction={onChangeCallbackFunction} optionsid={description.pk_field} optionsValue={description.display_field}/>
        }
        default:
            return null
    }
}
