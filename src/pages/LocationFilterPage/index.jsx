import React, { useState, useEffect } from 'react'

import styles from './locationFilterPage.module.scss';
import { Link, useHistory } from 'react-router-dom';
import BackArrowIcon from '../../components/icons/BackArrowIcon';
import DeleteFilterIcon from '../../components/icons/DeleteFilterIcon';
import AscendanceIcon from '../../components/icons/AscendanceIcon';
import PresedanceIcon from '../../components/icons/PresedanceIcon';
import { useStore } from "../../providers/store/StoreProvider";
import { observer } from 'mobx-react-lite';
import cn from 'classnames';
import ArrowIcon from '../../components/icons/ArrowIcon';
import { Button } from '../../components/ui/base';


const LocationFilterPage = observer(() => {
    const history = useHistory();
    const [isChecked, setIsChecked] = useState(false);
    const { filterStore, locationsStore } = useStore();
    const isFromAtoZ = locationsStore.fromAtoZ;

    const onGoBack = () => {
        history.goBack();
    };

    const Desc = () => {
        locationsStore.makeFromAToZ();
        setIsChecked(false)
    }

    const Asc = () => {
        locationsStore.makeFromZToA();
        setIsChecked(true)
    }
    useEffect(() => {
        filterStore.fetchLocationFilter({ type: locationsStore.type, measurement: locationsStore.measurement })
        showResetFilterIcon();
    }, [locationsStore.type, locationsStore.measurement])

    useEffect(() => {
        if (!locationsStore.type && !locationsStore.measurement) {
            Desc()
        }
    }, [])
    const onReset = () => {
        locationsStore.getLocationType('')
        locationsStore.getLocationMeasurement('')
        setIsChecked(false);
        Desc();
    }
    const showResetFilterIcon = () => {
        if (locationsStore.type || locationsStore.measurement)
            setIsChecked(true);
        else {
            setIsChecked(false)
        }
    }

    return (
        <div>
            <div className={styles.header}>
                <Button onClick={onGoBack}>
                    <BackArrowIcon />
                </Button>
                <p className='h4'>Фильтры</p>
                {isChecked && <Button onClick={onReset}>
                    <DeleteFilterIcon />
                </Button>}
            </div>
            <div className={styles.wrapper}>
                <div className={styles.alphabetSort}>
                    <p className='subTitle1'>
                        Сортировать
                    </p>
                    <div>
                        <span>По алфавиту </span>
                        <span className={cn({ [styles.sortActive]: isFromAtoZ })}>
                            <Button onClick={Desc}>
                                <PresedanceIcon />
                            </Button>
                        </span>
                        <span className={cn({ [styles.sortActive]: !isFromAtoZ })}>
                            <Button onClick={Asc}>
                                <AscendanceIcon />
                            </Button>
                        </span>
                    </div>
                </div>
                <div className={styles.filters}>
                    <Link to='/filter-locations/byType'>
                        <div className={styles.grid}>
                            <div>
                                <p className='h6'>{locationsStore.type || 'Тип'}</p>
                                <p className='bodyOne'>Выберите тип локации</p>
                            </div>
                            <ArrowIcon />
                        </div>
                    </Link>
                    <Link to='/filter-locations/byMeasurement'>
                        <div className={styles.grid}>
                            <div>
                                <p className='h6'>{locationsStore.measurement || 'Измерение'}</p>
                                <p className='bodyOne'>Выберите измерения локации</p>
                            </div>
                            <ArrowIcon />
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}
)
export default LocationFilterPage;
