import React, { useState } from "react";

import BackArrowIcon from "../../components/icons/BackArrowIcon";
import PaletteIcon from "../../components/icons/PaletteIcon";
import defaultPhoto from "../../assets/images/defaultPhoto.jpg";
import styles from "./settings.module.scss";
import { useHistory } from 'react-router-dom';
import { useStore } from '../../providers/store/StoreProvider';
import ArrowIcon from "../../components/icons/ArrowIcon";
import { observer } from "mobx-react-lite";
import { ThemeService } from "../../components/ui/layout";
import { Button } from "../../components/ui/base";

const Settings = observer(
  () => {
    const [isActive, setIsActive] = useState(false);
    const theme = localStorage.getItem("theme");
    const { authStore } = useStore()
    const { firstName, lastName, fullName } = authStore.user;
    const history = useHistory();
    const onGoBack = () => {
      history.goBack();
    }

    const handleProfile = () => {
      history.push('/profile');
    }

    const handleTheme = () => {
      setIsActive(!isActive);
    }


    const avatar = authStore.userAvatar;

    return (
      <div>
        {isActive && <ThemeService handleTheme={handleTheme} />}
        <div className={styles.header}>
          <Button onClick={onGoBack}>
            <BackArrowIcon />
          </Button>
          <p className='h4'>Настройки</p>
        </div>
        <div className={styles.wrapper}>
          <div className={styles.profile}>
            <div className={styles.userInfo}>
              <img src={avatar || defaultPhoto} className={styles.avatar} alt={fullName} />
              <div className={styles.fullName}>
                <p className='h5'>{firstName + ' ' + lastName}</p>
                <p className='bodyOne'>{localStorage.username}</p>
              </div>
            </div>
            <button className={styles.button} onClick={handleProfile}>Редактировать</button>
          </div>
          <div className={styles.themeInfo}>
            <p className='subTitle1'>Внешний вид</p>
            <div className={styles.palette} onClick={handleTheme}>
              <PaletteIcon />
              <div>
                <p>Темная тема</p>
                <p className='bodyOne'>{theme === 'dark' ? 'Включена' : 'Выключена'}</p>
              </div>
              <ArrowIcon />
            </div>
          </div>
          <div className={styles.about}>
            <p className='subTitle1'>О приложении</p>
            <p className='description'>Зигерионцы помещают Джерри и Рика в симуляцию, чтобы узнать секрет изготовления концен-трирован- ной темной материи.</p>
          </div>
          <div className={styles.version}>
            <p className='subTitle1'>О приложении</p>
            <p className='description'>Rick & Morty  v1.0.0</p>
          </div>
        </div>
      </div>
    )
  }
);

export default Settings;
