import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import "./InfoBox.css";

function InfoBox({ title, active, cases, total, ...props }) {
    return (
        <div>
            <Card onClick={props.onClick} className={`infoBox ${active && "infoBox-selected"}`}>
                <CardContent>
                    <Typography className="infoBox-title" color="textSecondary">{title}</Typography>
                    <h2 className="infoBox-cases">{cases}</h2>
                    <Typography className="infoBox-total" color="textSecondary">{total}</Typography>
                </CardContent>
            </Card>
        </div>
    )
}

export default InfoBox
