import React from "react";
import {Select} from "antd";
import {axiosInstance} from "../../utils/axiosInstance";

const { Option } = Select;

class SelectLoadingComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            dataset:{}
        }
    };

    async onDropdownVisibleChange(){
        const response = await  axiosInstance.get(this.props.url)
        debugger;
        this.setState('dataset',response.data.objects);
    }


    render() {

        const {url} = this.props;

        const onDropdownVisibleChange = () => {
            axiosInstance.get(url).then(response => setDataset(response));
        }

        let Options = [];
        for (let it = 0; it < dataset.length; it++) {
            Options.push(<Option value={it}>{it}</Option>)
        }

        return (
            <Select onDropdownVisibleChange={onDropdownVisibleChange}>
                {Options}
            </Select>
        )
    }
}


export default SelectLoadingComponent
