import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import "./Chartbar.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Chartbar() {
  const [covidData, setCovidData] = useState({});
  const [state, setState] = useState("AN");
  const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");
  const [chartData, setChartData] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    fetch("https://data.covid19india.org/v4/min/timeseries.min.json")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCovidData(data);
        if (data[state]) {
          const dates = Object.keys(data[state].dates);
          setMinDate(dates[0]);
          setMaxDate(dates[dates.length - 1]);
          setStartDate(dates[0]);
          setEndDate(dates[dates.length - 1]);
          const chartData = constructChartData(
            data[state].dates,
            dates[150],
            dates[200]
          );
          setChartData(chartData);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [state]);

  const handleStateChange = (e) => {
    setState(e.target.value);
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
    setChartData(
      constructChartData(covidData[state]?.dates, e.target.value, endDate)
    );
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
    setChartData(
      constructChartData(covidData[state]?.dates, startDate, e.target.value)
    );
  };

  const constructChartData = (data, start, end) => {
    if (!data) return null;
    const dates = Object.keys(data);
    const filteredDates = dates.filter((date) => date >= start && date <= end);
    const chartData = {
      labels: filteredDates,
      datasets: [
        {
          label: "Deaths",
          data: filteredDates.map((date) => data[date]?.delta?.deceased || 0),
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
        {
          label: "Recoveries",
          data: filteredDates.map((date) => data[date]?.delta?.recovered || 0),
          backgroundColor: "rgba(75, 192, 192, 0.5)",
        },
      ],
    };
    return chartData;
  };

  return (
    <div className="chart-main">
      <div className="chart-container">
        <div className="graph-control">
          <div>
            <label style={{ marginLeft: "20px" }} htmlFor="chartStartDate">
              Select State:-{" "}
            </label>
            <select
              className="select_state"
              style={{
                width: "180px",
                marginTop: "-17px",
                margiginLeft: "-17px",
              }}
              value={state}
              onChange={handleStateChange}
            >
              <option value="AN">Andaman and Nicobar Islands</option>
              <option value="AP">Andhra Pradesh</option>
              <option value="AR">Arunachal Pradesh</option>
              <option value="AS">Assam</option>
              <option value="BR">Bihar</option>
              <option value="CH">Chandigarh</option>
              <option value="CT">Chhattisgarh</option>
              <option value="DN">
                Dadra and Nagar Haveli and Daman and Diu
              </option>
              <option value="DD">Daman and Diu</option>
              <option value="DL">Delhi</option>
              <option value="GA">Goa</option>
              <option value="GJ">Gujarat</option>
              <option value="HR">Haryana</option>
              <option value="HP">Himachal Pradesh</option>
              <option value="JK">Jammu and Kashmir</option>
              <option value="JH">Jharkhand</option>
              <option value="KA">Karnataka</option>
              <option value="KL">Kerala</option>
              <option value="LA">Ladakh</option>
              <option value="LD">Lakshadweep</option>
              <option value="MP">Madhya Pradesh</option>
              <option value="MH">Maharashtra</option>
              <option value="MN">Manipur</option>
              <option value="ML">Meghalaya</option>
              <option value="MZ">Mizoram</option>
              <option value="NL">Nagaland</option>
              <option value="OR">Odisha</option>
              <option value="PY">Puducherry</option>
              <option value="PB">Punjab</option>
              <option value="RJ">Rajasthan</option>
              <option value="SK">Sikkim</option>
              <option value="TN">Tamil Nadu</option>
              <option value="TG">Telangana</option>
              <option value="TR">Tripura</option>
              <option value="UP">Uttar Pradesh</option>
              <option value="UT">Uttarakhand</option>
              <option value="WB">West Bengal</option>
            </select>
          </div>
          <div style={{marginBottom:"-20px"}}>
            <label htmlFor="chartStartDate">Start Date:- </label>

            <input
              className="chartStartDate"
              type="date"
              value={startDate}
              min={minDate}
              max={endDate}
              onChange={handleStartDateChange}
            />
          </div>
          <div>
            <label htmlFor="chartEndDate">End Date:-</label>

            <input
              className="chartEndDate"
              type="date"
              value={endDate}
              min={startDate}
              max={maxDate}
              onChange={handleEndDateChange}
            />
          </div>
        </div>
        <div style={{height:"470px"}}>
          {chartData && (
            <Bar
              style={{ height: "800px" }}
              data={chartData}
              options={{
                maintainAspectRatio: false,
                responsive: true,
                plugins: {
                  legend: {
                    position: "top",
                  },
                  title: {
                    display: true,
                    text: "COVID-19 Deaths and Recoveries Chart",
                  },
                },
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
