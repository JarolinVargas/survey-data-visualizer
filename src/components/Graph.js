import React from 'react';
import './Graph.scss';
import Bar from './Bar.js';
import GridLines from './GridLines.js';

export default function Graph(props) {
    const [min, max] = [0, 40];
    
    let selectionArray = [];
    if( props.data ) {
        props.data.map(arr => {
           if( arr.includes(props.selection) ) {
            selectionArray = arr;
           }
        });
    }

    const bars = props.graphItems['label'].map((c, i) => {
        return c !== 'all' && <Bar label={c} value={!selectionArray[i] ? 0 : selectionArray[i]} max={max} img={props.graphItems['image'][i]} hide={selectionArray[i] === '' ? true : false} key={i}/>
    }).filter(a => a !== false);

    // sort based on user selection
    switch (props.sortBy) {
        case 'Most popular': 
            bars.sort((a, b) => b.props.value - a.props.value);
            break;
        case 'Least popular':
            bars.sort((a, b) => a.props.value - b.props.value);
            break;
    }

    return (
        <main className="Graph">
            {bars}
            <GridLines min={min} max={max}/>
        </main>
    )
}