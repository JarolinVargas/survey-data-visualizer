import React from 'react';
import './Dropmenu.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSort} from '@fortawesome/free-solid-svg-icons';

export default function Dropmenu(props) {
    return (
        <div className="Dropmenu">
            <select>
                <option>{props.defaultLabel}</option>
                <option>September</option>
                <option>January</option>
                <option>January</option>
                <option>January</option>
                <option>January</option>
                <option>January</option>
                <option>January</option>
                <option>January</option>
                <option>January</option>
                <option>January</option>
                <option>January</option>
            </select>
            <FontAwesomeIcon icon={faSort} />
        </div>
    )
}