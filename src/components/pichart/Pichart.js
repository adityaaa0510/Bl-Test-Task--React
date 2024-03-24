
import Chart from "react-apexcharts";
import './Pichart.css'
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import{setCasesdata,setDeathdata,setRecovereddata,setUpdatecase} from '../redux/slices/counter/index'
function Pichart() {
    const dispatch = useDispatch();
    const [totalConfirmed, setTotalConfirmed] = useState({});
    const [totalCases, setTotalCases] = useState(0);
    const [topStates, setTopStates] = useState([]);

    const [totalDeceased, setTotalDeceased] = useState(0);
    const [totalRecovered, setTotalRecovered] = useState({});
    const [totalnumberRecovered, setTotalNumberRecovered] = useState({});

    const stateNames = {
        "TT": "India",
        "MH": "Maharashtra",
        "KL": "Kerala",
        "KA": "Karnataka",
        "TN": "Tamil Nadu",
        "AP": "Andhra Pradesh",
        "UP": "Uttar Pradesh"
    };

    useEffect(() => {
        fetch("https://data.covid19india.org/v4/min/timeseries.min.json")
            .then(response => response.json())
            .then(data => {
                // Calculate total confirmed cases for each date
                console.log(data);
                const totalConfirmedPerDate = {};

                // Iterate over each state
                for (const stateCode in data) {
                    const stateData = data[stateCode];
                    for (const date in stateData.dates) {
                        const confirmed = stateData.dates[date].total?.confirmed || 0;
                        totalConfirmedPerDate[date] = (totalConfirmedPerDate[date] || 0) + confirmed;
                    }
                }

                // Set totalConfirmed state
                setTotalConfirmed(totalConfirmedPerDate);

                // Calculate total confirmed cases across all states for each date
                const totalConfirmedValues = Object.values(totalConfirmedPerDate);
                const total = totalConfirmedValues.reduce((acc, val) => acc + val, 0);

                // Set total cases state
                setTotalCases(total);
                console.log("total", total);
                dispatch(setCasesdata(total));




                // total death

                let totalDeceasedCount = 0;

                for (const stateCode in data) {
                    const stateData = data[stateCode];
                    for (const date in stateData.dates) {
                        // Check if the date has total object and deceased count
                        if (stateData.dates[date].total && stateData.dates[date].total.deceased) {
                            const deceased = stateData.dates[date].total.deceased || 0;
                            totalDeceasedCount += deceased;
                        }
                    }
                }

                // Set totalDeceased state
                setTotalDeceased(totalDeceasedCount);
                console.log("death", totalDeceasedCount)

                dispatch(setDeathdata(totalDeceasedCount));


                //recoverd


                const totalRecoveredPerDate = {};

                // Iterate over each state
                for (const stateCode in data) {
                    const stateData = data[stateCode];

                    // Iterate over dates for each state
                    for (const date in stateData.dates) {
                        const recovered = stateData.dates[date].total?.recovered || 0;

                        // Add recovered cases to the total for this date
                        totalRecoveredPerDate[date] = (totalRecoveredPerDate[date] || 0) + recovered;
                    }
                }

                // Set totalRecovered state
                setTotalRecovered(totalRecoveredPerDate);
                const totaRecoveredValues = Object.values(totalRecoveredPerDate);
                const totalrecover = totaRecoveredValues.reduce((acc, val) => acc + val, 0);
                console.log("recovered", totalrecover);
                setTotalNumberRecovered(totalrecover);

                dispatch(setRecovereddata(totalrecover))




                const stateDataArray = [];

                // Iterate over each state
                for (const stateCode in data) {
                    const stateData = data[stateCode];
                    let totalConfirmed = 0;

                    // Iterate over dates for each state and sum up confirmed cases
                    for (const date in stateData.dates) {
                        totalConfirmed += stateData.dates[date].total?.confirmed || 0;
                    }

                    // Add state data to array
                    stateDataArray.push({
                        stateCode,
                        totalConfirmed
                    });
                }

                // Sort states based on total confirmed cases
                stateDataArray.sort((a, b) => b.totalConfirmed - a.totalConfirmed);

                // Map state codes to full names
                const topStatesWithFullNames = stateDataArray.slice(0, 7).map(state => ({
                    fullName: stateNames[state.stateCode],
                    totalConfirmed: state.totalConfirmed
                }));

                // Set top 7 states with full names
                setTopStates(topStatesWithFullNames);
                console.log("topstates",topStatesWithFullNames)
                

            })
            .catch(err => {
                console.log(err);
            });



    }, []);
    return (
        <div className="containers">
            <div className="wrap-chart-heading">
                <div>
                    <h3>Statistics of COVID-19 cases in the states of India</h3>
                </div>
                <div className="state-chart-image">
                <div className="state-case" >
                {topStates.map((state, index) => (
                    <div key={state.fullName} style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>{index + 1}. {state.fullName}:</span> <span>{state.totalConfirmed}</span>
                    </div>
                ))}
            </div>
                    <div className="chart-img">
                        <div className="chart-pie">
                            <Chart
                                type="donut"
                                width={285}
                                height={350}
                                series={[totalCases, totalDeceased, totalnumberRecovered]}
                                options={{
                                    labels: ['Total Cases', 'Death', 'Recovered']
                                }}
                            />
                        </div>
                        <div>
                            <img className="img-world"  src="https://upload.wikimedia.org/wikipedia/commons/f/f7/Map_of_the_Iraqi_Diaspora_in_the_World.svg"></img>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    );
}

export default Pichart;
