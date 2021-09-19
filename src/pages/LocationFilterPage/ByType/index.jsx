import React, { useEffect } from 'react'
import BackArrowIcon from '../../../components/icons/BackArrowIcon';
import { useHistory } from 'react-router-dom';
import styles from './byType.module.scss';
import { useStore } from "../../../providers/store/StoreProvider";
import { observer } from 'mobx-react-lite';
import { Button } from '../../../components/ui/base';


const ByType = observer(() => {
    const history = useHistory();
    const { locationsStore } = useStore();
    const locationsTypeList = [];
    locationsStore.locationsList?.map(location => location.type).forEach(type => locationsTypeList.indexOf(type) === -1 && locationsTypeList.push(type));

    const onGoBack = () => {
        history.goBack();
    };
    useEffect(() => {
        locationsStore.fetchGetLocations(1, 14)
    }, [locationsStore]);

    const onSetType = (e) => {
        locationsStore.getLocationType(e.target.outerText);
    }

    return (
        <div>
            <div className={styles.header}>
                <Button onClick={onGoBack}>
                    <BackArrowIcon />
                </Button>
                <p className='h4'>Выберите тип</p>
            </div>
            <div className={styles.types}>
                <div className={styles.type}>
                    <p className='h6'>{locationsStore.type || 'Не выбрано'}</p>
                </div>
                <ul>
                    {locationsTypeList && locationsTypeList.map(type => (
                        <li key={type} className='h6' onClick={onSetType}>{type}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
})

export default ByType
