import React, { useState, useEffect, useRef } from 'react'


import BackArrowIcon from '../../components/icons/BackArrowIcon';
import DeleteFilterIcon from '../../components/icons/DeleteFilterIcon';
import AscendanceIcon from '../../components/icons/AscendanceIcon';
import PresedanceIcon from '../../components/icons/PresedanceIcon';
import styles from './characterFilterPage.module.scss';
import { useHistory } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useStore } from "../../providers/store/StoreProvider";
import cn from 'classnames';
import { Button } from '../../components/ui/base/';



const CharacterFilterPage = observer(() => {
    const [isChecked, setIsChecked] = useState(false);
    const { filterStore, charactersStore } = useStore();
    const [statusQuery, setStatusQuery] = useState([]);
    const [genderQuery, setGenderQuery] = useState([]);
    const inputRef = useRef();
    const isFromAtoZ = charactersStore.fromAtoZ
    const history = useHistory();

    const onGoBack = () => {
        history.goBack();
    };
    console.log(inputRef.current && inputRef.current[1].value)

    const makeFromAToZ = () => {
        charactersStore.makeFromAToZ();
        setIsChecked(false);
    }

    const makeFromZToA = () => {
        charactersStore.makeFromZToA();
        setIsChecked(true);
    }
    useEffect(() => {
        filterStore.fetchCharsFilter({ name: '', status: statusQuery.map(status => +status), gender: genderQuery.map(gender => +gender) });
        const showResetFilterIcon = () => {
            if (statusQuery.length > 0 || genderQuery.length > 0) {
                setIsChecked(true);
            } else {
                setIsChecked(false)
            }
        }
        showResetFilterIcon();
    }, [statusQuery, genderQuery]);

    useEffect(() => {
        makeFromAToZ()
    }, [])



    const onReset = (e) => {
        const inputs = document.getElementsByTagName('input');
        [...inputs].map(input => input.checked = false);
        charactersStore.fetchGetCharacters(1, 50);
        setIsChecked(false);
        makeFromAToZ();
    }

    const getStatus = (e) => {
        const queryArr = [...statusQuery.flat()];
        if (e.target.checked) {
            queryArr.push(e.target.value)
            setStatusQuery(queryArr);
        }
        else if (!e.target.checked) {
            let statuses = queryArr.filter(stat => stat !== e.target.value)
            setStatusQuery(statuses);
        }
    }

    const getGender = (e) => {
        const queryArr = [...genderQuery.flat()];
        if (e.target.checked) {
            queryArr.push(e.target.value)
            setGenderQuery(queryArr);
        }
        else if (!e.target.checked) {
            let genders = queryArr.filter(gender => gender !== e.target.value)
            setGenderQuery(genders);
        }
    }

    return (
        <div>
            <div className={styles.header}>
                <Button onClick={onGoBack}>
                    <BackArrowIcon />
                </Button>
                <p className='h4'>Фильтры</p>
                {isChecked &&
                    <Button onClick={onReset}>
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
                            <Button onClick={makeFromAToZ}>
                                <PresedanceIcon />
                            </Button>
                        </span>
                        <span className={cn({ [styles.sortActive]: !isFromAtoZ })}>
                            <Button onClick={makeFromZToA}>
                                <AscendanceIcon />
                            </Button>
                        </span>
                    </div>
                </div>
                <div className={styles.statusBlock}>
                    <p className='subTitle1'>Статус</p>
                    <p>
                        <label htmlFor="status-0">
                            <input onChange={getStatus} type="checkbox" className={styles.checkbox} id='status-0' value='0' />
                            Живой
                        </label>
                    </p>
                    <p>
                        <label htmlFor="status-1">
                            <input onChange={getStatus} type="checkbox" className={styles.checkbox} id='status-1' value='1' />
                            Мертвый
                        </label>
                    </p>
                    <p>
                        <label htmlFor="status-2">
                            <input onChange={getStatus} type="checkbox" className={styles.checkbox} id='status-2' value='2' />
                            Неизвестно
                        </label>
                    </p>
                </div>
                <div className={styles.gender}>
                    <p className='subTitle1'>Пол</p>
                    <div>
                        <p>
                            <label htmlFor="gender-0">
                                <input onChange={getGender} type="checkbox" className={styles.checkbox} id='gender-0' name="gender" value='0' />
                                Мужской
                            </label>
                        </p>
                        <p>
                            <label htmlFor="gender-1">
                                <input onChange={getGender} type="checkbox" className={styles.checkbox} id='gender-1' name="gender" value='1' />
                                Женский
                            </label>
                        </p>
                        <p>
                            <label htmlFor="gender-2">
                                <input onChange={getGender} type="checkbox" className={styles.checkbox} id='gender-2' name="gender" value='2' />
                                Бесполый
                            </label>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
})

export default CharacterFilterPage
