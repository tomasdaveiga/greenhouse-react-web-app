import { useState, useEffect } from 'react';
import './App.css';
import { GREENHOUSE_API_URL, WEATHER_API_URL } from './api';
import FeatureBlock from './feature-block/feature-block';
import ChartComponent from './graph-block/graph-block';

const Header = ({ getGreenhouseData }) => {
  return (
    <div>
      <h1 className="headerTitle">Greenhouse</h1>
      <img className="headerImage" alt="greenhouse_fig" src="icons/greenhouse.png" onClick={getGreenhouseData} style={{"pointerEvents": "all"}}/>
    </div>
  );
}

const App = () => {
  const [currentGreenhouse, setGreenhouse] = useState(null);
  const [showChart, setShowChart] = useState(false);

  const handleGreenhouseData = () => {
    fetch(GREENHOUSE_API_URL)
      .then(response => response.json())
      .then(data => {
        setGreenhouse(data); // Update the state with the fetched data
      })
      .catch(error => {
        console.error('Error fetching greenhouse data: ', error);
      });
  }


  const lastFeedIndex = currentGreenhouse?.feeds.length - 1;

  // Use useEffect to fetch data when the component mounts
  useEffect(() => {
    handleGreenhouseData();
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  console.log(currentGreenhouse);

  const handleShowChart = () => {
    setShowChart(!showChart);
  }

  const handleOverlayClick = (event) => {
    if (event.target.classList.contains('overlay')){
      setShowChart(false);
    }
  }

  return (
    <div className="App">
      <div className="header">
        <Header getGreenhouseData={handleGreenhouseData} />
      </div>
      <div className="features">
        {/* Use the currentGreenhouse and forecast state to populate your FeatureBlocks */}
        <FeatureBlock 
          featureName={'Temperature'}
          featureValue={`${Math.round(parseFloat(currentGreenhouse?.feeds[lastFeedIndex].field1))}°C`}
          featureIcon={'icons/thermometer.png'}
          onClick={handleShowChart}
        />
        <FeatureBlock
          featureName={'Humidity'}
          featureValue={`${Math.round(parseFloat(currentGreenhouse?.feeds[lastFeedIndex].field2))}%`}
          featureIcon={'icons/humidity.png'}
          onClick={handleShowChart}
        />
        <FeatureBlock
         featureName={'Sunlight'}
         featureValue={`${Math.round(parseFloat(currentGreenhouse?.feeds[lastFeedIndex].field3))}%`}
         featureIcon={'icons/light.png'}
         onClick={handleShowChart}
        />
        <FeatureBlock
          featureName={'Window'}
          featureValue={`${Math.round(parseFloat(currentGreenhouse?.feeds[lastFeedIndex].field4))}%`}
          featureIcon={'icons/window.png'}
          onClick={handleShowChart}
        />
      </div>
      <div className={`overlay ${showChart ? 'visible' : ''}`} onClick={handleOverlayClick}>
        <div className="modal">
          <ChartComponent
              historicalData={currentGreenhouse?.feeds.map(feed => ({ timestamp: feed.timestamp, field1: feed.field4 }))}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
