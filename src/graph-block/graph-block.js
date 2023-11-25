import "./graph-block.css"
import React, { useEffect, useRef, useState } from 'react';
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
  
    // Create a new chart instance
    const chart = 
      new Chart(
        chartRef.current.getContext('2d'), 
        {
          type: 'line',
          data: {
            labels: data.map(row => row.created_at),
            datasets: [
              {
                label: name,
                data: data.map(row => row[fieldMap[name]]),
              },
            ],
          },
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
        <div className="graphText">
          <p className="graphName">{historicalData.name}</p>
          <LineChart name={historicalData.name} data={historicalData.data} />
        </div>
      </div>
    </div>
  );
};

export default GraphBlock;

