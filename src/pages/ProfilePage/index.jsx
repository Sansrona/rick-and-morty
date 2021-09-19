import React from 'react'
import styles from './profilePage.module.scss';
import { Link, useHistory } from 'react-router-dom';
import defaultPhoto from "../../assets/images/defaultPhoto.jpg";
import { useStore } from '../../providers/store/StoreProvider';

import BackArrowIcon from "../../components/icons/BackArrowIcon";
import ArrowIcon from "../../components/icons/ArrowIcon";
import { observer } from 'mobx-react-lite';
import { Button } from '../../components/ui/base';


const ProfilePage = observer(() => {
    const history = useHistory();
    const { authStore } = useStore();
    const { firstName, lastName, fullName } = authStore.user;
    let avatar = authStore.userAvatar;
    React.useEffect(() => {
        authStore.fetchGetUser(authStore.username)
    }, [])
    const onGoBack = () => {
        history.goBack();
    }
    function encodeImageFileAsURL(e) {
        var file = e.target.files[0];
        var reader = new FileReader();
        reader.onloadend = function () {
            authStore.setUserAvatar(reader.result);
        }
        reader.readAsDataURL(file);
    }
    return (
        <div>
            <div className={styles.header}>
                <Button onClick={onGoBack}>
                    <BackArrowIcon />
                </Button>
                <p className='h4'>Редактировать профиль</p>
            </div>
            <div className={styles.photo}>
                <img src={avatar || defaultPhoto} className={styles.avatar} alt={fullName} />
                <label htmlFor="upload-photo" className='h5'>Изменить фото</label>
                <input type="file" name="photo" id="upload-photo" onChange={encodeImageFileAsURL} />
            </div>
            <div className={styles.profile}>
                <p className='subTitle1'>профиль</p>
                <Link to='/profile/update-bio'>
                    <div className={styles.userInfo}>
                        <div>
                            <p className='h6'>Изменить ФИО</p>
                            <p className='bodyOne'>{firstName + ' ' + lastName}</p>
                        </div>
                        <ArrowIcon />
                    </div>
                </Link>
                <Link to='/profile/update-login'>
                    <div className={styles.userInfo}>
                        <div >
                            <p className='h6'>Логин</p>
                            <p className='bodyOne'>{authStore.username}</p>
                        </div>
                        <ArrowIcon />
                    </div>
                </Link>
            </div>
        </div>
    )
})

export default ProfilePage
