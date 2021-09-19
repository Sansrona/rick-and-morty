import React from 'react'

import styles from './themeService.module.scss';
import { Popup } from '../../base/';

const ThemeService = ({ handleTheme }) => {
  const theme = localStorage.getItem("theme");



  const setThemeDark = () => {
    document.documentElement.setAttribute('data-theme', 'dark')
    localStorage.setItem('theme', 'dark')
  }

  const setThemeLight = () => {
    document.documentElement.setAttribute('data-theme', 'light')
    localStorage.setItem('theme', 'light')
  }

  return (
    <div>
      <Popup className='themePopup'>
        <p className='h4'>Темная тема</p>
        <div className={styles.radios}>
          <label htmlFor="off"><input defaultChecked={theme === 'light'} type="radio" name='theme' id='off' onClick={setThemeLight} />Выключена</label>
          <label htmlFor="on"><input defaultChecked={theme === 'dark'} type="radio" name='theme' id='on' onChange={setThemeDark} />Включена</label>
          <label htmlFor="device"><input type="radio" name='theme' id='device' />Следовать настройкам системы</label>
          <label htmlFor="energy"><input type="radio" name='theme' id='energy' />В режиме энергосбережения</label>
        </div>
        <p className='episode' onClick={handleTheme}>Отмена</p>
      </Popup>
    </div>
  )
}

export default ThemeService
