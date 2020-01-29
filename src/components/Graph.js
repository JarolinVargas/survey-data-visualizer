import React from 'react';
import './Graph.scss';
import Bar from './Bar.js';
import GridLines from './GridLines.js';
import bernie from '../assets/candidates-2020/bernie-sanders.jpg'

export default function Graph(props) {
    let selectionArray = [];
    if( props.data ) {
        props.data.map(arr => {
           if( arr.includes(props.selection) ) {
            selectionArray = arr;
           }
        });
    }

    return (
        <main className="Graph">
            {
                props.candidates.map((c, i) => {
                    return c !== 'all' && selectionArray[i] !== '' && <Bar label={c} value={selectionArray[i]} max={100} img={bernie} key={i}/>
                })
            }
            <GridLines min={0} max={100}/>
        </main>
    )
}