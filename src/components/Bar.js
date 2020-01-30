import React from 'react';
import './Bar.scss';

export default function Bar(props) {
    return (
        <div className="Bar">
            <div className="bar-img"><img src={props.img}/></div>
            <div className="bar-container">
                <label><strong>{props.value}%</strong> - {props.label}</label>
                <progress value={props.value} max={props.max}></progress>
            </div>
        </div>
    )
}