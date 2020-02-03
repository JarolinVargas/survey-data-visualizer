import React from 'react';
import './GridLines.scss';
import {motion} from 'framer-motion';

export default function GridLines(props) {
    const [increments, spacingIncrements] = [[], []];
    for( let i = 0; i <= props.max; i += 5 ) {
        increments.push(i);
    }
    const spacing = 100 / (increments.length - 1);
    for( let i = 0; i < increments.length; i++ ) {
        spacingIncrements.push(spacing * i);
    }

    return (
        <div className="GridLines">
            <div className="grid-view">
                {
                    increments.map((x, i) => {
                        return <motion.div className="grid-line" data-value={increments[i]} style={{left: `${spacingIncrements[i]}%`}} key={i} positionTransition={{duration: .50, ease: 'easeOut'}}></motion.div>;
                    })
                }
            </div>
        </div>
    )
}