import React, {useState} from 'react';
import useFetch from 'use-http';
import './App.scss';
import Header from './components/Header.js';
import Graph from './components/Graph.js';
import Heading from './components/Heading.js';

const url = 'https://api.myjson.com/bins/bxobk';
const actualMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export default function App() {
  const [request, response] = useFetch(url);
  const {loading, error, data} = useFetch(url, []); // api request onMount
  const [monthsAndDays, setMonthsAndDays] = useState(null);
  const [selectedMonth, selectMonth] = useState('');
  const [selectedDay, selectDay] = useState('');
  const [candidates, setCandidates] = useState([]);
  
  const refetchData = () => {
    setMonthsAndDays(null);
    request.get();
  }

  // select the first day after selecting a month
  const selectMonthHandler = (month) => {
    selectMonth(month);
    selectDay(monthsAndDays['months'][month][0]); 
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

    // Candidates array
    if( !candidates.length ) {
      const candidatesArray = data[0][0];
      setCandidates(candidatesArray)
    }
  }

  return (
    <div className="App">
      <Header selectOptions={monthsAndDays} selectedMonth={selectedMonth} selectedDay={selectedDay} selectMonthHandler={selectMonthHandler} selectDayHandler={selectDay} refetchData={refetchData}/>
      <Heading title={`${selectedMonth} ${selectedDay}`} subtitle="Poll Results For"/>
      <Graph candidates={candidates} selection={`${selectedDay}-${selectedMonth}`} data={data && data[0]}/>
    </div>
  );
}
