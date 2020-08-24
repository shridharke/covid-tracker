import React from 'react';
import "./MyTable.css";

function Mytable({ countries }) {
    return (
        <div className="mytable">
            <div className="roww heading">
                <div className="celll heading">
                    <div>Country</div>
                </div>
                <div className="celll heading">
                    <div>Confirmed</div>
                </div>
                <div className="celll heading">
                    <div>Active</div>
                </div>
                <div className="celll heading">
                    <div>Recovered</div>
                </div>
                <div className="celll heading">
                    <div>Deceased</div>
                </div>
            </div>
            
            { countries.map(({ country, cases, active, recovered, deaths }) => (
                <div className="roww">
                    <div className="celll">
                        <div className="country-name">{country}</div>
                    </div>
                    <div className="celll statistic">
                        <div className="total">{cases}</div>
                    </div>
                    <div className="celll statistic">
                        <div className="total">{active}</div>
                    </div>
                    <div className="celll statistic">
                        <div className="total">{recovered}</div>
                    </div>
                    <div className="celll statistic">
                        <div className="total">{deaths}</div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Mytable
