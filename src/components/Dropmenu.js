import React from 'react';
import './Dropmenu.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSort} from '@fortawesome/free-solid-svg-icons';

export default function Dropmenu(props) {
    return (
        <div className="Dropmenu">
            <select value={props.selectedOption} onChange={(event) => props.optionChanged(event.target.value)} disabled={props.disabled}>
                {
                    props.options.map((o, i) => {
                        return <option key={i} value={o}>{o}</option>
                    })
                }
            </select>
            <FontAwesomeIcon icon={faSort} />
        </div>
    )
}