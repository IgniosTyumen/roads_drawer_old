import React, {useState} from "react";
import {Popup} from "react-leaflet";
import {Button, Icon, Spin, Tag} from "antd";

const { CheckableTag } = Tag;

export class BoolTag extends React.Component {
    state = { checked: this.props.defaultChecked };

    handleChange = checked => {
        this.setState({ checked });
        this.props.onChange? this.props.onChange(this.props.changeIdData, this.props.changeFieldData,checked) : null;
    };

    render() {
        return (
            <CheckableTag {...this.props} checked={this.state.checked} onChange={this.handleChange} >
                {this.state.checked? this.props.textOnTrue : this.props.textOnFalse}
            </CheckableTag>
        );
    }
}




const CityPopup = ({obj, dispatch,handleFieldChange}) => {


    const farAwayBooleanRenderer =  (record) => {
        return (
            <BoolTag defaultChecked={record.is_faraway ? record.is_faraway : false} textOnTrue={'Да'} textOnFalse={'Нет'} changeIdData={record.id} changeFieldData={'is_faraway'} onChange={handleFieldChange}/>
        );
    }

    const airportsNeedsBooleanRenderer =  (record) => {
        return (
            <BoolTag defaultChecked={record.is_need_airport ? record.is_need_airport : false} textOnTrue={'Да'} textOnFalse={'Нет'} changeIdData={record.id} changeFieldData={'is_need_airport'} onChange={handleFieldChange}/>
        );
    }

    const roadsNeedsBooleanRenderer =  (record) => {
        return (
            <BoolTag defaultChecked={record.is_need_road ? record.is_need_road : false} textOnTrue={'Да'} textOnFalse={'Нет'} changeIdData={record.id} changeFieldData={'is_need_road'} onChange={handleFieldChange}/>
        );
    }

    const [fetching,setFetching] = useState('initial');

    const takeAllData = () => {
        setFetching('fetching');
        dispatch({
            type: 'GET_FULL_OBJECT_DATA',
            id: obj.id,
            reducer: 'city',
            callbackOnFinish: setFetching
        });
    };

    let DetailedInfo;


    if (fetching==='initial'){

        DetailedInfo =
            <div>
                <p>Полная информация:</p>
            <Button type="link" size={'small'} onClick={takeAllData}>
                Загрузить
            </Button>
            </div>
    };

    if (fetching==='fetching') {
        const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
        DetailedInfo = <Spin indicator={antIcon} />
    };

    if (fetching==='loaded'){
        DetailedInfo =
            <div>
                <p>Тип поселения: {obj.objectFullInfo.settlements_types && obj.objectFullInfo.settlements_types.name ? obj.objectFullInfo.settlements_types.name : "Не установлено"}</p>
                <p>Муниципалитет: {obj.objectFullInfo.district && obj.objectFullInfo.district.name ? obj.objectFullInfo.district.name : "Не установлено"}</p>
                <p>Дорог ссылается на город: {obj.objectFullInfo.cities_roads && obj.objectFullInfo.cities_roads.length ? obj.objectFullInfo.cities_roads.length : "0"}</p>
                <p>Расстояние до мед. объекта: {obj.objectFullInfo.distance_to_hospital ? obj.objectFullInfo.distance_to_hospital+' км' : "Не установлено"}</p>
                <p>Тип основного покрытия: { obj.objectFullInfo.road_coverage ? obj.objectFullInfo.road_coverage : "Не установлено"}</p>
            </div>
    }
    const FarElement = () => farAwayBooleanRenderer(obj);
    const AirfieldElement = () => roadsNeedsBooleanRenderer(obj);
    const RoadElement = () => airportsNeedsBooleanRenderer(obj);


    return (
        <Popup>
            <div>
                <p>Название населенного пункта: {obj.name}</p>
                {/*<p>Отдаленный?: {obj.is_faraway ? 'да' : 'нет'}</p>*/}
                <p>Отдаленный?:  <FarElement/> </p>
                {/*{FarElement}*/}

                <p>Необходима постройка дороги?:  <RoadElement/>  </p>
                {/*{RoadElement}*/}

                <p>Необходима постройка аэроплощадки?:    <AirfieldElement/> </p>
                {/*{AirfieldElement}*/}

                <p>Численность населения: {obj.population ? obj.population : 'Не указано'}</p>
                <a href={`https://av.admtyumen.ru/#/directory/city/inst_id=${obj.id}`} target='_blank' rel="noopener noreferrer" >Открыть в справочнике</a>
                {DetailedInfo}
            </div>

        </Popup>
    )
};

export default CityPopup;
