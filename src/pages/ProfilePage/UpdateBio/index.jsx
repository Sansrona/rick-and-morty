import React from 'react'

import BackArrowIcon from "../../../components/icons/BackArrowIcon";
import { useHistory } from 'react-router-dom';
import { Button } from '../../../components/ui/base/'
import styles from './updateBio.module.scss';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { UpdateBioSchema } from "../../../utils/schemes";
import { useStore } from '../../../providers/store/StoreProvider';
import { observer } from 'mobx-react-lite';

const UpdateBio = observer(() => {
    const { authStore } = useStore();
    const history = useHistory();
    const { firstName, lastName, patronymic } = authStore.user;

    const onGoBack = () => {
        history.goBack();
    }

    const onSubmit = (data) => {
        authStore.putProfileUpdate(data.firstName, data.lastName, data.patronymic);
        history.goBack();
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(UpdateBioSchema),
    });
    return (
        <div>
            <div className={styles.header}>
                <Button onClick={onGoBack}>
                    <BackArrowIcon />
                </Button>
                <p className='h4'>Изменить ФИО</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.inputField}>
                    <label className="bodyOne" htmlFor="firstName">
                        Имя
                    </label>
                    <div>
                        <input placeholder={firstName} {...register("firstName")} />
                    </div>
                    <p>{errors.firstName?.message}</p>
                </div>
                <div className={styles.inputField}>
                    <label className="bodyOne" htmlFor="lastName">
                        Фамилия
                    </label>
                    <div>
                        <input
                            type="text"
                            placeholder={lastName}
                            {...register("lastName")}
                        />
                    </div>
                    <p>{errors.lastName?.message}</p>
                </div>
                <div className={styles.inputField}>
                    <label className="bodyOne" htmlFor="patronymic">
                        Отчество
                    </label>
                    <div>
                        <input placeholder={patronymic} {...register("patronymic")} />
                    </div>
                    <p>{errors.patronymic?.message}</p>
                </div>
                <button type="submit" className={styles.submit}>
                    <span className="h5">Сохранить</span>
                </button>
            </form>
        </div>
    )
})

export default UpdateBio
