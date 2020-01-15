import React from "react";

//onClick - обработчики событий
//icon - иконка JSX Element
//additionalClasses - дополнительные классы, которые будут использоваться кнопкой
//additionalIconClasses - дополнительные классы, которые будут использоваться иконкой
const RippleButton = ({
                          onClick=()=>{},
                          icon=<span>Кнопка</span>,
                          label='',
                          additionalClass='',
                          additionalIconClass='',
                          disabled=true
                      }) => {


    return (
        <div style={
            {
                position:"relative",
                display: "flex",
                flexGrow:1,
                flexDirection:"column",
                alignItems:"center",
                width: '100px',
                marginTop: '10px',
                disabled: disabled
            }
        }>
            <div className={`rippleButton ripple  ${additionalClass}`} onClick={()=>onClick()}>
                <div style={{display:'flex',justifyContent:'center' }} className={additionalIconClass}>
                    {icon}
                </div>
            </div>
            <div>
                <p style={{margin:0, maxWidth: '125px', textAlign: 'center', marginTop: '5px'}}>{label}</p>
            </div>
        </div>
    )
};

export default RippleButton;
