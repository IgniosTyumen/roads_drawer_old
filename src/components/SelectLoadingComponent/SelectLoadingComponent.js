import React from "react";
import {Select} from "antd";
import {axiosInstance} from "../../utils/axiosInstance";

const { Option } = Select;

class SelectLoadingComponent extends React.Component {
    constructor(props) {
        super(props);
    };

    state = {
        dataset:[],
        fetching:false
    }

    onDropdownVisibleChange(){
        this.setState({dataset:[],fetching:true});
        axiosInstance.get(this.props.url).then(
            response=>this.setState({dataset:response.data.objects,fetching:false})
        )
    }


    render() {

        const {url} = this.props;

        let Options = [];
        for (let it = 0; it < this.state.dataset.length; it++) {
            console.log(this.state.dataset[it])
            Options.push(<Option value={this.state.dataset[it][this.props.optionsid]}>{this.state.dataset[it][this.props.optionsValue]}</Option>)
        }

        return (
            <Select onDropdownVisibleChange={()=>this.onDropdownVisibleChange()} onChange={(value) => this.props.onChangeCallbackFunction(value)}>
                {Options}
            </Select>
        )
    }
}


export default SelectLoadingComponent
