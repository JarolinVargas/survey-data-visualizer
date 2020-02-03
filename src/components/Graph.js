import React from 'react';
import './Graph.scss';
import Bar from './Bar.js';
import GridLines from './GridLines.js';

export default function Graph(props) {
    let [min, max] = [0, 100];
    
    let selectionArray = [];
    if( props.data ) {
        props.data.forEach(arr => {
           if( arr.includes(props.selection) ) {
            selectionArray = arr;
           }
        });

        // update the max number relative to the current selection
        let selectionNumbers = selectionArray.filter(num => { return num.length && num == +num });
        let selectionNumbersMax = Math.max(...selectionNumbers.map(Number));
        let maxRoundUp = Math.ceil(selectionNumbersMax / 5) * 5;
        max = maxRoundUp === selectionNumbersMax ? maxRoundUp + 5 : maxRoundUp;
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
        default:
            bars.sort((a, b) => {
                if (a.props.label < b.props.label) { return -1 }
                if (a.props.label > b.props.label) { return 1 }
                return 0;
            });
    }

    return (
        <main className="Graph">
            {bars}
            <GridLines min={min} max={max}/>
        </main>
    )
}