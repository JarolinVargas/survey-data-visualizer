import React, {useState, useEffect} from 'react';
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
  
  const refetchData = () => {
    setMonthsAndDays(null);
    request.get();
  }

  // Create object structured to store months and days
  if( data && monthsAndDays === null ) {
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
  }

  return (
    <div className="App">
      <Header selectOptions={monthsAndDays} refetchData={refetchData}/>
      <Heading/>
      <Graph/>
    </div>
  );
}
