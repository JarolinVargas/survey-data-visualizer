import React from 'react';
import './GridLines.scss';

export default function GridLines(props) {
    return (
        <div className="GridLines">
            <div className="grid-view">
                <div className="grid-line" data-value={0} style={{left: `${0}%`}}></div>
                <div className="grid-line" data-value={10} style={{left: `${10}%`}}></div>
                <div className="grid-line" data-value={20} style={{left: `${20}%`}}></div>
                <div className="grid-line" data-value={30} style={{left: `${30}%`}}></div>
                <div className="grid-line" data-value={40} style={{left: `${40}%`}}></div>
                <div className="grid-line" data-value={50} style={{left: `${50}%`}}></div>
                <div className="grid-line" data-value={60} style={{left: `${60}%`}}></div>
                <div className="grid-line" data-value={70} style={{left: `${70}%`}}></div>
                <div className="grid-line" data-value={80} style={{left: `${80}%`}}></div>
                <div className="grid-line" data-value={90} style={{left: `${90}%`}}></div>
                <div className="grid-line" data-value={100} style={{left: `${100}%`}}></div>
            </div>
        </div>
    )
}