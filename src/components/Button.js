import React from 'react';
import './Button.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

export default function Button(props) {
    return (
        <div className="Button" onClick={props.refetchData}>
            <FontAwesomeIcon icon={props.icon} />
        </div>
    )
}