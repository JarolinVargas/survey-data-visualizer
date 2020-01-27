import React from 'react';
import './Graph.scss';
import Bar from './Bar.js';
import GridLines from './GridLines.js';
import bernie from '../assets/candidates-2020/bernie-sanders.jpg'

export default function Graph() {
    return (
        <main className="Graph">
            <Bar label="Bernie Sanders" value={26} max={100} img={bernie}/>
            <GridLines min={0} max={40}/>
        </main>
    )
}