import React from 'react';
import './Button.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

export default function Button(props) {
    return (
        <div className={`Button${!props.action ? ' disabled': ''}`} onClick={props.action}>
            <FontAwesomeIcon icon={props.icon} />
        </div>
    )
}