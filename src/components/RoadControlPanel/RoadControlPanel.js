import React, {useState} from "react";
import SearchFieldWithTags from "../SearchFieldWithTags/SearchFieldWithTags";
import TagsCloud from "../TagsCloud/TagsCloud";
import {Column, Table} from "react-virtualized";
import NewRoadModalContainer from "../NewRoadModal/NewRoadModalContainer";

const RoadControlPanel = (props) => {
    const [tagsList, setTagsList] = useState([]);
    const [searchValue, setSearchValue] = useState();

    const {roads,handleSelectDetailedObject,moveMapToObject,containerCallbacks} = props;

    const upSearchValue = (text) => {
        setSearchValue(text);
        handleSelectDetailedObject(null,null);
    };

    const NewRoadSVG =
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.594 1.8675C11.594 1.63332 11.5011 1.4087 11.3355 1.24305C11.17 1.07741 10.9454 0.984319 10.7112 0.984253C10.5952 0.98422 10.4804 1.00703 10.3733 1.05137C10.2661 1.09572 10.1688 1.16073 10.0868 1.2427C9.92111 1.40825 9.82802 1.63282 9.82795 1.867C9.82795 2.3545 10.711 4.0005 10.711 4.0005C10.711 4.0005 11.594 2.3545 11.594 1.867V1.8675ZM10.2889 1.8675C10.287 1.8109 10.2964 1.75447 10.3167 1.70159C10.337 1.64871 10.3677 1.60045 10.407 1.55969C10.4464 1.51893 10.4935 1.48651 10.5456 1.46436C10.5977 1.4422 10.6538 1.43077 10.7104 1.43073C10.7671 1.4307 10.8231 1.44207 10.8753 1.46416C10.9275 1.48625 10.9746 1.51862 11.014 1.55933C11.0534 1.60004 11.0842 1.64826 11.1045 1.70112C11.1249 1.75398 11.1344 1.8104 11.1325 1.867C11.1288 1.97635 11.0827 2.07998 11.0041 2.15605C10.9255 2.23211 10.8203 2.27467 10.7109 2.27473C10.6015 2.2748 10.4964 2.23237 10.4177 2.1564C10.3389 2.08042 10.2928 1.97684 10.2889 1.8675ZM12.6405 9.2475C12.3605 9.2475 12.092 9.271 11.8455 9.309L5.54995 6.988C5.64995 6.898 5.70595 6.798 5.70595 6.693C5.70467 6.63765 5.68954 6.5835 5.66195 6.5355L9.86695 5.4165C10.097 5.485 10.3784 5.5265 10.6899 5.5265C11.4499 5.5265 12.0649 5.2845 12.0649 4.9855C12.0649 4.6855 11.4499 4.444 10.6899 4.444C9.92995 4.444 9.31495 4.6865 9.31495 4.9855C9.31495 5.0205 9.32495 5.054 9.34195 5.0865L4.94795 6.1C4.57954 5.99607 4.19822 5.94506 3.81545 5.9485C2.77195 5.9485 1.92545 6.282 1.92545 6.6935C1.92545 7.105 2.77195 7.4385 3.81545 7.4385C4.10245 7.4385 4.37045 7.411 4.61445 7.366L10.6095 9.799C10.5145 9.895 10.4565 9.999 10.4565 10.1105C10.4565 10.2055 10.5045 10.2925 10.5745 10.377L4.34745 12.7075C4.26845 12.705 4.18945 12.7025 4.10895 12.7025C2.48895 12.7025 1.17395 13.2205 1.17395 13.8575C1.17395 14.496 2.48895 15.014 4.10895 15.014C5.72895 15.014 7.04395 14.497 7.04395 13.858C7.04395 13.748 7.00245 13.642 6.92895 13.5415L12.062 10.9345C12.247 10.9545 12.4385 10.967 12.6395 10.967C13.846 10.967 14.8245 10.582 14.8245 10.1055C14.8245 9.6335 13.846 9.2475 12.6395 9.2475H12.6405Z" fill="black"/>
</svg>


    const handlerAddTag = (text) => {

        const parsingString = text.trim().split(' ');
        let newText = [];
        for (let it = 0; it < parsingString.length; it++) {
            newText.push(parsingString[it])
        }
        setTagsList([...tagsList, ...newText])
    };

    const handlerRemoveTag = (text) => {
        setTagsList(tagsList.filter(tag => tag !== text));
    };


    let TableCells;
    let iteratedObject;
    if (roads.roads) {

        let searchTabs = [];
        if (searchValue) {
            if (tagsList.indexOf('везде') < 0) {
                for (let road in roads.roads) {
                    for (let field in roads.roads[road]) {
                        if (roads.roads[road][field] && typeof (roads.roads[road][field]) === 'string') {
                            const searchWords = searchValue.toLowerCase().split(' ');
                            let flagIsSuitable = true;
                            for (let searchMeaning in searchWords) {
                                if (!roads.roads[road][field].toLowerCase().includes(searchWords[searchMeaning])) flagIsSuitable = false;
                            }
                            if (flagIsSuitable) {
                                searchTabs.push(roads.roads[road]);
                                break;
                            }
                        }
                    }
                }
                searchTabs.length ? null : alert('Объектов не найдено');
            }
            if (tagsList.indexOf('везде') >= 0) {
                for (let road in roads.roads) {
                    let concatField = '';
                    for (let field in roads.roads[road]) {
                        if (roads.roads[road][field] && typeof (roads.roads[road][field]) === 'string') {
                            concatField += ' ' + roads.roads[road][field].toLowerCase();
                        }
                    }
                    const searchWords = searchValue.toLowerCase().split(' ');
                    let flagIsSuitable = true;
                    for (let searchMeaning in searchWords) {
                        if (!concatField.includes(searchWords[searchMeaning])) flagIsSuitable = false;
                    }
                    if (flagIsSuitable) {
                        searchTabs.push(roads.roads[road]);
                        break;
                    }
                }
                searchTabs.length ? null : alert('Объектов не найдено');
            }
        }
        searchTabs.length ? iteratedObject = searchTabs : iteratedObject = roads.roads;

    }
    return (
        <div className={"mainGroupPanel"}>
            <p className={'mainGroupPanelTitle'}>Список дорог</p>
            <SearchFieldWithTags tagsAddAction={handlerAddTag} upSearchValue={upSearchValue}/>
            <TagsCloud tags={tagsList} tagsRemoveAction={handlerRemoveTag}/>
            <div>


               <Table
                    width={566}
                    height={710}
                    headerHeight={50}
                    rowHeight={50}
                    rowCount={iteratedObject.length}
                    rowGetter={({index}) => iteratedObject[index]}
                    onRowClick={({index})=>{
                        moveMapToObject(iteratedObject[index])
                        handleSelectDetailedObject(iteratedObject[index], 'road')
                    }}
                >

                    <Column width={184}  dataKey={'name'} label={'Наименование'}/>
                    <Column width={80}  dataKey={'district_name'} label={'Округ'}/>
                    <Column width={80}  dataKey={'city_name'} label={'Город'}/>
                    <Column width={121}  dataKey={'road_number'} label={'№ дороги'}/>
                    <Column width={70}  dataKey={'start_road'} label={'Начало, км'}/>
                    <Column width={70}  dataKey={'end_road'} label={'Конец, км'}/>

                </Table>





                {/*<div onClick={containerCallbacks.handleCreateNewRoadButtonClicked} className={'orderMainPanelContainerButton ripple'} style={{marginTop:'10px'}}>*/}
                {/*        {NewRoadSVG}*/}
                {/*    <span>Добавить дорогу</span>*/}
                {/*</div>*/}
                <NewRoadModalContainer/>
            </div>
        </div>
    )
};

export default RoadControlPanel;
