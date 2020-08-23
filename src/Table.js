import React from 'react';
import "./Table.css";
import numeral from "numeral";
import { TextField } from '@material-ui/core';

function Table({ countries }) {
    return (
        <div className="table">
            <tr>
                <th>Country</th>
                <th className="cell-confirmed">Confirmed</th>
                <th>Active</th>
                <th>Recovered</th>
                <th>Deaths</th>
            </tr>
            {countries.map(({ country, cases, active, recovered, deaths }) => (
                <tr>
                    <td><strong>{country}</strong></td>
                    <td className="cell-confirmed">{numeral(cases).format("0,0")}</td>
                    <td>{active}</td>
                    <td>{recovered}</td>
                    <td>{deaths}</td>
                </tr>
            ))}
        </div>
    )
}

export default Table
