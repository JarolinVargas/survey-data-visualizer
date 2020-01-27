import React from 'react';
import './Header.scss';
import Dropmenu from './Dropmenu.js';
import Button from './Button.js';
import {faSyncAlt, faPlay} from '@fortawesome/free-solid-svg-icons';

export default function Header() {
  return (
    <header className="Header">
      <div className="header-col-1">
        <Dropmenu defaultLabel="Month"></Dropmenu>
        <Dropmenu defaultLabel="Day"></Dropmenu>
        <Dropmenu defaultLabel="Sort"></Dropmenu>
      </div>
      <div className="header-col-2">
        <Button icon={faPlay}></Button>
        <Button icon={faSyncAlt}></Button>
      </div>
    </header>
  );
}
