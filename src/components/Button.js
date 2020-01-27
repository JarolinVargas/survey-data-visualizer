import React from 'react';
import './Button.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

export default function Button(props) {
    return (
        <div className="Button">
            <FontAwesomeIcon icon={props.icon} />
        </div>
    )
}