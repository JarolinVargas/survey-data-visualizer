import React from 'react';
import './Header.scss';
import Dropmenu from './Dropmenu.js';
import Button from './Button.js';
import {faSyncAlt, faPlay} from '@fortawesome/free-solid-svg-icons';

export default function Header(props) {
  const months = props.selectOptions && Object.keys(props.selectOptions['months']);

  return (
    <header className="Header">
      <div className="header-col-1">
        <Dropmenu options={!props.selectOptions ? [] : months}></Dropmenu>
        <Dropmenu options={[]}></Dropmenu>
        <Dropmenu options={['Most popular', 'Least popular', 'Name']}></Dropmenu>
      </div>
      <div className="header-col-2">
        <Button icon={faPlay}></Button>
        <Button icon={faSyncAlt} refetchData={props.refetchData}></Button>
      </div>
    </header>
  );
}
