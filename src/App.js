import React, {useState} from 'react';
import useFetch from 'use-http';
import './App.scss';
import Header from './components/Header.js';
import Graph from './components/Graph.js';
import Heading from './components/Heading.js';
import StatusMessage from './components/StatusMessage.js';

const actualMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
let autoPlayInterval = null;

export default function App() {
  const {request, loading, error, data} = useFetch('https://api.myjson.com/bins/bxobk', []); // api request onMount
  const [monthsAndDays, setMonthsAndDays] = useState(null);
  const [selectedMonthAndDay, selectMonthAndDay] = useState({month: '', day: ''});
  const [sortBy, setSortBy] = useState('Name');
  const [graphItems, setGraphItems] = useState({label: [], image: []});
  const [autoPlay, setAutoPlay] = useState(false);
  
  const refetchData = () => {
    setMonthsAndDays(null);
    request.get();
  }

  const selectMonthHandler = (month) => {
    selectMonthAndDay({month: month, day: monthsAndDays['months'][month][0]}); // select the first day of the selected month
  }

  const selectDayHandler = (day) => {
    selectMonthAndDay({month: selectedMonthAndDay.month, day: day});
  }

  // autoplay
  const toggleAutoPlay = () => {
    if( data && !autoPlayInterval ) {
      let currentMonth = Object.keys(monthsAndDays.months)[0];
      let [currentMonthIndex, currentDayIndex] = [0, 0];
      selectMonthHandler(currentMonth);
      autoPlayInterval = window.setInterval(() => {
        try {
          currentDayIndex++;
          if( !monthsAndDays['months'][currentMonth][currentDayIndex] ) {
            currentMonthIndex++;
            currentMonth = Object.keys(monthsAndDays['months'])[currentMonthIndex];
            currentDayIndex = 0;
          }
          selectMonthAndDay({
            month: currentMonth,
            day: monthsAndDays['months'][currentMonth][currentDayIndex]
          });
        } catch {
          window.clearInterval(autoPlayInterval);
          autoPlayInterval = null;
          setAutoPlay(false);
        }
      }, 1000);
      setAutoPlay(true);
    } else {
      window.clearInterval(autoPlayInterval);
      autoPlayInterval = null;
      setAutoPlay(false);
    }
  }

  if( data ) {
    // Create object structured to store months and days
    if( monthsAndDays === null ) {
      let monthsAndDaysObj = {months: []}
      data.forEach(data => {
        data.forEach(array => {
          const [day, month] = array[0].split('-'); // '26-March' -> [26, March]
          if( actualMonths.includes(month) ) {
            // add empty array to month if not already present, then add the day to the array.
            !monthsAndDaysObj.months[month] && (monthsAndDaysObj.months[month] = []);
            !monthsAndDaysObj.months.includes && monthsAndDaysObj.months.push(month);
            monthsAndDaysObj.months[month].push(day);
          }
        });
      });
      setMonthsAndDays(monthsAndDaysObj);
      // select the first month and day as default
      const firstMonth = Object.keys(monthsAndDaysObj.months)[0];
      const firstDay = monthsAndDaysObj.months[firstMonth][0];
      selectMonthAndDay({month: firstMonth, day: firstDay});
    }

    // graph items array including label and image
    if( !graphItems.label.length ) {
      const graphItemsLabel = data[0][0];
      const graphItemsImages = graphItemsLabel.map((item, i) => {
        try {
          return require(`./assets/candidates-2020/${graphItemsLabel[i].toLowerCase().replace(' ', '-')}.jpg`);
        } catch(e) {
          return require('./assets/candidates-2020/missing.png');
        }
      });
      setGraphItems({label: graphItemsLabel, image: graphItemsImages});
    }
  }

  return (
    <div className="App">
      <Header
        selectOptions={monthsAndDays}
        selectedMonthAndDay={selectedMonthAndDay}
        selectMonthHandler={selectMonthHandler}
        selectDayHandler={selectDayHandler}
        sortBy={sortBy}
        sortByHandler={setSortBy}
        refetchData={refetchData}
        autoPlay={autoPlay}
        toggleAutoPlay={toggleAutoPlay}
      />
      {!loading && !error ?
        <React.Fragment>
          <Heading title={`${selectedMonthAndDay.month} ${selectedMonthAndDay.day}`} subtitle="Poll Results For"/>
          <Graph graphItems={graphItems} selection={`${selectedMonthAndDay.day}-${selectedMonthAndDay.month}`} sortBy={sortBy} data={data && data[0]}/>
        </React.Fragment>
      : 
        <StatusMessage message={loading === true ? 'Fetching data...' : error.toString()} icon={loading === true ? 'loading' : 'error'}/>}
    </div>
  );
}
