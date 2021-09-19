import React from 'react';

import styles from './pagination.module.scss';
import {NavLink} from 'react-router-dom';
import { observer } from 'mobx-react-lite';

const seasons = [
    { id: 1, name: "Сезон 1" },
    { id: 2, name: "Сезон 2" },
    { id: 3, name: "Сезон 3" },
    { id: 4, name: "Сезон 4" },
    { id: 5, name: "Сезон 5" },
  ];

const Pagination = observer(() => {
    return (
        <ul className={styles.seasons}>
            {seasons.map(season=>(
                <li key={season.id}>
                    <NavLink to={`/episodes/season/${season.id}`} className="episode" activeClassName={styles.selectedSeason}>
                        {season.name}
                    </NavLink>
                </li>
            ))}
        </ul>
    )


})

export default Pagination;