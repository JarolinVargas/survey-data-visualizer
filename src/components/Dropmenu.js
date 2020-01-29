import React from 'react';
import './Dropmenu.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSort} from '@fortawesome/free-solid-svg-icons';

export default function Dropmenu(props) {
    return (
        <div className="Dropmenu">
            <select>
                {
                    props.options.map((M, i) => {
                        return <option key={i} value={M}>{M}</option>
                    })
                }
            </select>
            <FontAwesomeIcon icon={faSort} />
        </div>
    )
}