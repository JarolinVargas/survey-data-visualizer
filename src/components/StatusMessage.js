import React from 'react';
import './StatusMessage.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSpinner, faTimes} from '@fortawesome/free-solid-svg-icons';

export default function StatusMessage(props) {
    return (
        <div className="StatusMessage">
            <FontAwesomeIcon icon={props.icon === 'loading' ? faSpinner : faTimes} spin={props.icon === 'loading'}/>
            <span>{props.message}</span>
        </div>
    )
}