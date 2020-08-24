import React from 'react';
import "./InfoBox.css";

function InfoBox({ title, active, casesType, cases, total, ...props }) {
    const infoClass = "infoBox-" + title;
    return (
        <div>
            <div onClick={props.onClick} className={`infoBox ${infoClass} ${active && "infoBox-selected-"+title}`}>
                <div>
                    <h5 className="infoBox-title" color="textSecondary">{title}</h5>
                    <h4 className="infoBox-cases">{cases}</h4>
                    <h1 className="infoBox-total" color="textSecondary">{total}</h1>
                </div>
            </div>
        </div>
    )
}

export default InfoBox
