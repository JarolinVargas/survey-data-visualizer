import React from 'react';
import {motion} from 'framer-motion';
import './Bar.scss';

export default function Bar(props) {
    const transitionSettings = {
        duration: .50,
        ease: 'easeOut'
    }

    const initial = {
        height: 0,
        marginBottom: 0
    }

    const show = {
        height: 50,
        marginBottom: 15
    }

    const hide = {
        height: 0,
        marginBottom: 0
    }

    return (
        <motion.div className="Bar" initial={initial} animate={props.hide ? hide : show} transition={transitionSettings} positionTransition={transitionSettings}>
            <div className="bar-img"><img src={props.img} alt={props.label}/></div>
            <div className="bar-container">
                <label><strong>{props.value}%</strong> - {props.label}</label>
                <progress value={props.value} max={props.max}></progress>
            </div>
        </motion.div>
    )
}