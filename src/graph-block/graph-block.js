import "./graph-block.css"
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const LineChart = ({ name, data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current || !data || data.length === 0) return;
  
    // Define a mapping for field names
    const fieldMap = {
      Temperature: 'field1',
      Humidity: 'field2',
      Light: 'field3',
      Window: 'field4',
    };

    // Data needs to be filtered out based on the date.
    // Add a few buttons to show data:
    // - today, 
    // - past 7 days,
    // - past 30 days,
    // - past year,
    // - since beginning

    // Create a new chart instance
    const chart = 
      new Chart(
        chartRef.current.getContext('2d'), 
        {
          type: 'line',
          data: {
            labels: data.map(row => {
              const date = new Date(row.created_at);
              return date.toLocaleTimeString();
            }),
            datasets: [
              {
                label: name,
                data: data.map(row => row[fieldMap[name]]),
              },
            ],
          },
          options: {
            scales: {
              x: {
                type: 'linear',
                position: 'bottom',
                ticks: {
                  stepSize: 60,
                  callback: (value, index, values) => {
                    const hours = Math.floor(value/60).toString().padStart(2,'0');
                    return `${hours}`;
                  },
                },
                min: 0,
                max: 1440,
              },
            },
            plugins: {
              legend: {
                display: false,
              }
            }
          }
        }
      );
    
    // Cleanup function to destroy the chart when the component unmounts
    return () => chart.destroy();
  }, [name, data]);

  return <canvas ref={chartRef} />;
};

const GraphBlock = ({ historicalData, onClose }) => {

  if (!historicalData) {
    return null;
  }
  
  return (
    <div className="graphBox">
      <div className="closeButton" onClick={onClose}>
        &times;
      </div>
      <div className="graphContent">
        <div className="graphTitle">
          <p>{historicalData.name}</p>
        </div>
        <div className="graphPlot">
          <LineChart name={historicalData.name} data={historicalData.data} />
        </div>
      </div>
    </div>
  );
};

export default GraphBlock;

