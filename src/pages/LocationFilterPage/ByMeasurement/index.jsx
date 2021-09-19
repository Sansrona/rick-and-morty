import React, { useEffect } from 'react'

import BackArrowIcon from '../../../components/icons/BackArrowIcon';
import { useHistory } from 'react-router-dom';
import styles from './byMeasurement.module.scss';
import { useStore } from "../../../providers/store/StoreProvider";
import { observer } from 'mobx-react-lite';

import { Button } from '../../../components/ui/base';


const ByMeasurement = observer(() => {
    const history = useHistory();
    const { locationsStore } = useStore();
    const locationsMeasurementList = [];
    locationsStore.locationsList.map(location => location.measurements).forEach(measurement => locationsMeasurementList.indexOf(measurement) === -1 && locationsMeasurementList.push(measurement));
    useEffect(() => {
        locationsStore.fetchGetLocations(1, 13)
    }, [locationsStore]);
    const onGoBack = () => {
        history.goBack();
    };

    const onSetType = (e) => {
        locationsStore.getLocationMeasurement(e.target.outerText);
    }
    return (
        <div>
            <div className={styles.header}>
                <Button onClick={onGoBack}>
                    <BackArrowIcon />
                </Button>
                <p className='h4'>Выберите измерение</p>
            </div>
            <div className={styles.measurements}>
                <div className={styles.measurement}>
                    <p className='h6'>{locationsStore.measurement || 'Не выбрано'}</p>
                </div>
                <ul>
                    {locationsMeasurementList && locationsMeasurementList.map(measurement => (
                        <li key={measurement} className='h6' onClick={onSetType}>{measurement}</li>
                    ))}
                </ul>
            </div>
        </div>

    )
})

export default ByMeasurement
