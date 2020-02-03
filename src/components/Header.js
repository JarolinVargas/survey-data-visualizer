import React from 'react';
import './Header.scss';
import Dropmenu from './Dropmenu.js';
import Button from './Button.js';
import {faSyncAlt, faPlay, faPause} from '@fortawesome/free-solid-svg-icons';

export default function Header(props) {
  const months = props.selectOptions && Object.keys(props.selectOptions['months']);
  const days = props.selectOptions && props.selectOptions.months[props.selectedMonthAndDay.month];

  return (
    <header className="Header">
      <div className="header-col-1">
        <Dropmenu options={!props.selectOptions ? [] : months} selectedOption={props.selectedMonthAndDay.month} optionChanged={props.selectMonthHandler} disabled={props.autoPlay}></Dropmenu>
        <Dropmenu options={!days ? [] : days} selectedOption={props.selectedMonthAndDay.day} optionChanged={props.selectDayHandler} disabled={props.autoPlay}></Dropmenu>
        <Dropmenu options={['Name', 'Most popular', 'Least popular']} selectedOption={props.sortBy} optionChanged={props.sortByHandler}></Dropmenu>
      </div>
      <div className="header-col-2">
        <Button icon={!props.autoPlay ? faPlay : faPause} action={props.toggleAutoPlay}></Button>
        <Button icon={faSyncAlt} action={!props.autoPlay ? props.refetchData : undefined}></Button>
      </div>
    </header>
  );
}
