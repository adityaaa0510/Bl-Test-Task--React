import React, { useEffect, useState } from 'react';
import './Liveupdate.css';

function Liveupdate() {
    const stateNames = {
        "MH": "Maharashtra",
        "KL": "Kerala",
        "KA": "Karnataka",
        "TN": "Tamil Nadu",
        "AP": "Andhra Pradesh",
        "UP": "Uttar Pradesh",
        "DL": "Delhi",
        "WB": "West Bengal",
        "GJ": "Gujarat",
        "MP": "Madhya Pradesh",
        // Add more states as needed
    };

    const [topStates, setTopStates] = useState([]);

    useEffect(() => {
        fetch("https://data.covid19india.org/v4/min/timeseries.min.json")
            .then(response => response.json())
            .then(data => {
                const stateDataArray = [];

                for (const stateCode in data) {
                    if (stateCode !== "TT") { // Exclude India
                        const stateData = data[stateCode];
                        let totalConfirmed = 0;

                        for (const date in stateData.dates) {
                            totalConfirmed += stateData.dates[date].total?.confirmed || 0;
                        }

                        stateDataArray.push({
                            stateCode,
                            totalConfirmed
                        });
                    }
                }

                stateDataArray.sort((a, b) => b.totalConfirmed - a.totalConfirmed);

                const topStatesWithFullNames = stateDataArray.slice(0, 12).map(state => ({
                    fullName: stateNames[state.stateCode],
                    totalConfirmed: state.totalConfirmed
                }));

                setTopStates(topStatesWithFullNames);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    return (
        <div className='main-updates'>
            <h2 className="update-title">Covid-19 Updates</h2>
            <div className='line-news'>
                {topStates.map((state, index) => (
                    <div key={index} className="update-item">
                        <span className="bullet"></span>
                        <p style={{fontSize:"14.5px"}}>{state.totalConfirmed} cases in {state.fullName || 'Unknown'}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Liveupdate;
