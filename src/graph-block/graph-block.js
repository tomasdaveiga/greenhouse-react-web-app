import "./graph-block.css"

const ChartComponent = ({ historicalData }) => {

  if (!historicalData) {
    return null;
  }
  
  const data = {
    // Define your chart data here
    labels: historicalData.map(entry => entry.timestamp),
    datasets: [
      {
        label: 'Temperature',
        data: historicalData.map(entry => entry.field1),
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 2,
      },
      // Add datasets for other fields as needed
    ],
  };

  return (
    <div className="graphBox">
          <div className="graphContent">
              <div className="graphText">
                  <p className="graphName">{data.labels}</p>
              </div>
          </div>
    </div>
  );
};

export default ChartComponent;
