import React from "react";
import {Select} from "antd";

const { Option } = Select;

const SelectTyleLayer = ({handleSelectTyleLayer,zoom}) => {

    return (
        <div className={'tileSelector'}>
            <p>ЗУМ : {zoom}</p>
            <Select onChange={handleSelectTyleLayer} placeholder={"Выбор подложки"} style={{width:'200px'}}>
                <Option value='https://a.tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=13efc496ac0b486ea05691c820824f5f'>TF cycle 25</Option>
                <Option value='https://b.tile.thunderforest.com/transport-dark/{z}/{x}/{y}.png?apikey=13efc496ac0b486ea05691c820824f5f'>TF transport dark 25</Option>
                <Option value='https://b.tile.thunderforest.com/outdoors/{z}/{x}/{y}.png?apikey=13efc496ac0b486ea05691c820824f5f'>TF outdoors 25</Option>
                <Option value='https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'>dark theme 25</Option>
                <Option value='https://tiles.wmflabs.org/hikebike/{z}/{x}/{y}.png'>hykebike 20</Option>
                <Option value='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'>Стандарт ОСМ 20</Option>
                <Option value='https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png'>Wikipedia map 20</Option>
                <Option value='http://a.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'>ОСМ hot 20</Option>
                <Option value='https://tile.tgt72.ru/{z}/{x}/{y}.png'>ТГТ 19</Option>
                <Option value='https://b.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png'>ОСМ hydra 18</Option>
                <Option value='https://b.tile.opentopomap.org/{z}/{x}/{y}.png'>OTM 17</Option>
            </Select>

        </div>
    )
};

export default SelectTyleLayer;
