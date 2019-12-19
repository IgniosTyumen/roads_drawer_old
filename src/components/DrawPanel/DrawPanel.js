import React from "react";
import IconButton from "@material-ui/core/IconButton";

const DrawPanel = (props) => {

    const {handleProjectTemplate, handleReverse, editMode, pullMode, handleSwitchPullMode, handleSwitchEditMode,
        handleUndo, blockPanel, templateHistoryIsEmpty, waypointsTemplateGeometry,handleSave,handleClean} = props;

    const ProjectionSVG = <svg width="15" height="15" viewBox="0 0 718 709" fill="none"
                               xmlns="http://www.w3.org/2000/svg">
        <path
            d="M304.188 151L275.188 244L247.188 151L154.188 122L247.188 94L275.188 0L304.188 94L397.188 122L304.188 151ZM466.188 100L452.188 147L436.188 100L390.188 85L436.188 71L452.188 25L466.188 71L512.188 85L466.188 100ZM9.18799 611L582.188 55C586.188 50 592.188 47 599.188 47C608.188 46 617.188 49 624.188 56C627.188 58 631.188 62 637.188 67C648.188 77 660.188 89 669.188 101C673.188 107 675.188 112 675.188 117C676.188 127 673.188 136 667.188 142L94.188 700C89.188 705 83.188 707 76.188 708C67.188 709 58.188 706 51.188 699C48.188 696 44.188 693 38.188 687C27.188 678 15.188 666 7.18799 653C3.18799 647 1.18799 641 0.187988 636C-0.812012 626 2.18799 618 9.18799 611ZM469.188 207L511.188 250L644.188 121L602.188 77L469.188 207ZM190.188 264L177.188 310L163.188 264L117.188 249L163.188 235L177.188 188L190.188 235L238.188 249L190.188 264ZM656.188 229L671.188 276L717.188 290L671.188 305L656.188 351L641.188 305L595.188 290L641.188 276L656.188 229Z"
            fill="black"/>
    </svg>

    const AddToEndSVG = <svg width="15" height="8" viewBox="0 0 22 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M22 4L18 8V5H5.83C5.62439 5.58597 5.24142 6.09339 4.73429 6.45179C4.22715 6.81019 3.621 7.0018 3 7C2.20435 7 1.44129 6.68393 0.87868 6.12132C0.31607 5.55871 0 4.79565 0 4C0 3.20435 0.31607 2.44129 0.87868 1.87868C1.44129 1.31607 2.20435 1 3 1C4.31 1 5.42 1.83 5.83 3H18V0L22 4Z"
            fill="black"/>
    </svg>

    const AddToBeginSVG = <svg width="15" height="8" viewBox="0 0 22 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M0 4L4 8V5H16.17C16.58 6.17 17.69 7 19 7C19.7956 7 20.5587 6.68393 21.1213 6.12132C21.6839 5.55871 22 4.79565 22 4C22 3.20435 21.6839 2.44129 21.1213 1.87868C20.5587 1.31607 19.7956 1 19 1C17.69 1 16.58 1.83 16.17 3H4V0L0 4Z"
            fill="black"/>
    </svg>

    const UndoSVG = <svg width="15" height="15" viewBox="0 0 1025 1025" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M512.342 1025C433.675 1025 359.675 1008.17 290.342 974.5C221.009 940.833 162.342 894.333 114.342 835L215.342 756C251.342 800 295.175 834.5 346.842 859.5C398.509 884.5 453.675 897 512.342 897C581.675 897 645.842 879.833 704.842 845.5C763.842 811.167 810.509 764.5 844.842 705.5C879.175 646.5 896.342 582.333 896.342 513C896.342 443.667 879.175 379.5 844.842 320.5C810.509 261.5 763.842 214.833 704.842 180.5C645.842 146.167 581.675 129 512.342 129C416.342 129 332.009 161 259.342 225L385.342 351C386.009 374.333 378.342 385.667 362.342 385H32.342C23.6753 385 16.5087 380.333 10.842 371C5.17532 361.667 2.00865 352 1.34199 342L0.341987 24C-0.32468 8.00001 11.0087 0.33334 34.342 1.00001L168.342 135C215.009 93 267.842 60.1667 326.842 36.5C385.842 12.8333 447.675 1.00001 512.342 1.00001C581.675 1.00001 648.009 14.6667 711.342 42C774.675 69.3333 829.175 105.833 874.842 151.5C920.509 197.167 956.842 251.5 983.842 314.5C1010.84 377.5 1024.34 443.667 1024.34 513C1024.34 582.333 1010.84 648.667 983.842 712C956.842 775.333 920.509 829.833 874.842 875.5C829.175 921.167 774.675 957.5 711.342 984.5C648.009 1011.5 581.675 1025 512.342 1025V1025Z"
            fill="black"/>
    </svg>

    const SaveSVG = <svg width="15" height="15" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M12.9578 3.58281L10.4172 1.04219C10.3 0.925 10.1562 0.839062 10 0.792187V0.75H1.25C0.973437 0.75 0.75 0.973437 0.75 1.25V12.75C0.75 13.0266 0.973437 13.25 1.25 13.25H12.75C13.0266 13.25 13.25 13.0266 13.25 12.75V4.28906C13.25 4.02344 13.1453 3.77031 12.9578 3.58281ZM5 1.875H9V3.5H5V1.875ZM12.125 12.125H1.875V1.875H4V4C4 4.27656 4.22344 4.5 4.5 4.5H9.5C9.77656 4.5 10 4.27656 10 4V2.21563L12.125 4.34062V12.125ZM7 5.90625C5.75781 5.90625 4.75 6.91406 4.75 8.15625C4.75 9.39844 5.75781 10.4062 7 10.4062C8.24219 10.4062 9.25 9.39844 9.25 8.15625C9.25 6.91406 8.24219 5.90625 7 5.90625ZM7 9.40625C6.30937 9.40625 5.75 8.84688 5.75 8.15625C5.75 7.46562 6.30937 6.90625 7 6.90625C7.69063 6.90625 8.25 7.46562 8.25 8.15625C8.25 8.84688 7.69063 9.40625 7 9.40625Z"
            fill="black"/>
    </svg>

    const SwapDirectionsSVG = <svg width="15" height="10" viewBox="0 0 20 15" fill="none"
                                   xmlns="http://www.w3.org/2000/svg">
        <path
            d="M16 0L12 4H15V11C15 12.1 14.1 13 13 13C11.9 13 11 12.1 11 11V4C11 1.79 9.21 0 7 0C4.79 0 3 1.79 3 4V11H0L4 15L8 11H5V4C5 2.9 5.9 2 7 2C8.1 2 9 2.9 9 4V11C9 13.21 10.79 15 13 15C15.21 15 17 13.21 17 11V4H20L16 0Z"
            fill="black"/>
    </svg>

    const EraserSVG = <svg width="15" height="15" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.09999 13L14.5 5.8C15.1 5.1 15.1 4 14.4 3.3L11.7 0.6C11.4 0.2 10.9 0 10.4 0H8.59999C8.09999 0 7.59999 0.2 7.19999 0.6L0.499989 8.2C-0.100011 8.9 -0.100011 10.1 0.599989 10.7L3.29999 13.4C3.59999 13.8 4.09999 14 4.59999 14H16V13H8.09999V13ZM6.79999 12.9C6.79999 12.9 6.79999 12.8 6.79999 12.9L4.09999 10.2C3.69999 9.8 3.69999 9.3 4.09999 8.9L7.49999 5H6.49999L3.49999 8.3C2.89999 9 2.89999 10 3.59999 10.7L5.89999 13H4.59999C4.39999 13 4.19999 12.9 3.99999 12.8L1.19999 10C0.899989 9.7 0.899989 9.2 1.19999 8.9L4.69999 5H6.49999L9.99999 1H11L7.49999 5L10.6 8.7L7.09999 12.7C6.99999 12.8 6.89999 12.8 6.79999 12.9V12.9Z" fill="black"/>
    </svg>

    return (

        <div>
            {!blockPanel && waypointsTemplateGeometry &&
            <div className={'drawPanel'}>

                <IconButton color="primary" aria-label="Добавление в начало" onClick={handleSwitchPullMode}
                            className={pullMode ? 'pullMode' : ''}>
                    {AddToBeginSVG}
                </IconButton>
                <IconButton color="primary" aria-label="Поменять направление движения" onClick={handleReverse}>
                    {SwapDirectionsSVG}
                </IconButton>
                <IconButton color="primary" aria-label="Добавление в конец" onClick={handleSwitchEditMode}
                            className={editMode ? 'editMode' : ''}>
                    {AddToEndSVG}
                </IconButton>
                {templateHistoryIsEmpty &&
                <IconButton color="primary" aria-label="Проецировать" onClick={handleProjectTemplate}>
                    {ProjectionSVG}
                </IconButton>}
                {!templateHistoryIsEmpty ? <IconButton color="primary" aria-label="Отменить" onClick={handleUndo}>
                    {UndoSVG}
                </IconButton> : null}
                <IconButton color="primary" aria-label="Сохранить" onClick={handleSave}>
                    {SaveSVG}
                </IconButton>
                <IconButton color="primary" aria-label="Стереть" onClick={handleClean}>
                    {EraserSVG}
                </IconButton>
            </div>
            }
            <div className={'drawPanelMessageBox'}>
                {editMode && <p>Включен режим добавления точек в конец маршрута</p>}
                {pullMode && <p>Включен режим добавления точек в начало маршрута</p>}
                {blockPanel && <p>Идет расчет, пожалуйста, подождите</p>}
            </div>
        </div>
    )
};

export default DrawPanel;
