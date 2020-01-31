import React from 'react';
import './Header.scss';
import Dropmenu from './Dropmenu.js';
import Button from './Button.js';
import {faSyncAlt, faPlay} from '@fortawesome/free-solid-svg-icons';

export default function Header(props) {
  const months = props.selectOptions && Object.keys(props.selectOptions['months']);
  const days = props.selectOptions && props.selectOptions.months[props.selectedMonth];

  return (
    <header className="Header">
      <div className="header-col-1">
        <Dropmenu options={!props.selectOptions ? [] : months} selectedOption={props.selectedMonth} optionChanged={props.selectMonthHandler}></Dropmenu>
        <Dropmenu options={!days ? [] : days} selectedOption={props.selectedDay} optionChanged={props.selectDayHandler}></Dropmenu>
        <Dropmenu options={['Name', 'Most popular', 'Least popular']} selectedOption={props.sortBy} optionChanged={props.sortByHandler}></Dropmenu>
      </div>
      <div className="header-col-2">
        <Button icon={faPlay}></Button>
        <Button icon={faSyncAlt} refetchData={props.refetchData}></Button>
      </div>
    </header>
  );
}
