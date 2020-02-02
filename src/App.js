import React, {useState} from 'react';
import useFetch from 'use-http';
import './App.scss';
import Header from './components/Header.js';
import Graph from './components/Graph.js';
import Heading from './components/Heading.js';

const url = 'https://api.myjson.com/bins/bxobk';
const actualMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
let autoPlayInterval = null;

export default function App() {
  const {request, response, loading, error, data} = useFetch(url, []); // api request onMount
  const [monthsAndDays, setMonthsAndDays] = useState(null);
  const [selectedMonth, selectMonth] = useState('');
  const [selectedDay, selectDay] = useState('');
  const [sortBy, setSortBy] = useState('Name');
  const [graphItems, setGraphItems] = useState({label: [], image: []});
  const [autoPlay, setAutoPlay] = useState(false);
  
  const refetchData = () => {
    setMonthsAndDays(null);
    request.get();
  }

  // select the first day after selecting a month
  const selectMonthHandler = (month) => {
    selectMonth(month);
    selectDay(monthsAndDays['months'][month][0]); 
  }

  // autoplay
  const toggleAutoPlay = () => {
    if( !autoPlayInterval ) {
      let currentMonth = Object.keys(monthsAndDays.months)[0];
      let currentMonthIndex = 0;
      let currentDayIndex = 0;
      selectMonthHandler(currentMonth);
      autoPlayInterval = window.setInterval(() => {
        try {
          currentDayIndex++;
          if( monthsAndDays['months'][currentMonth][currentDayIndex] === undefined ) {
            currentMonthIndex++;
            currentMonth = Object.keys(monthsAndDays['months'])[currentMonthIndex];
            currentDayIndex = 0;
            selectMonth(currentMonth);
          }
          selectDay(monthsAndDays['months'][currentMonth][currentDayIndex])
        } catch {
          window.clearInterval(autoPlayInterval);
          selectMonthHandler(Object.keys(monthsAndDays.months)[0]);
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
      data.map(data => {
        data.map(array => {
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
      selectMonth(firstMonth);
      selectDay(firstDay);
    }

    // graph items array
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
        selectedMonth={selectedMonth}
        selectedDay={selectedDay}
        selectMonthHandler={selectMonthHandler}
        selectDayHandler={selectDay}
        sortBy={sortBy}
        sortByHandler={setSortBy}
        refetchData={refetchData}
        autoPlay={autoPlay}
        toggleAutoPlay={toggleAutoPlay}
      />
      <Heading title={`${selectedMonth} ${selectedDay}`} subtitle="Poll Results For"/>
      <Graph graphItems={graphItems} selection={`${selectedDay}-${selectedMonth}`} sortBy={sortBy} data={data && data[0]}/>
    </div>
  );
}
