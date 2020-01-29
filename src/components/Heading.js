import React from 'react';
import './Heading.scss';

export default function Heading(props) {
    return (
        <h1 className="Heading">
            <span>{props.subtitle}</span>
            {props.title}
        </h1>
    )
}
