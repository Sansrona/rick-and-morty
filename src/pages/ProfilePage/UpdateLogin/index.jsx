import React from 'react'

import BackArrowIcon from "../../../components/icons/BackArrowIcon";
import { useHistory } from 'react-router-dom';
import styles from './updateLogin.module.scss';
import { Button } from '../../../components/ui/base/';

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { UpdateLoginSchema } from "../../../utils/schemes";
const UpdateLogin = () => {
    const history = useHistory();

    const onGoBack = () => {
        history.goBack();
    }
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(UpdateLoginSchema),
    });
    return (
        <div>
            <div className={styles.header}>
                <Button onClick={onGoBack}>
                    <BackArrowIcon />
                </Button>
                <p className='h4'>Изменить логин</p>
            </div>
        </div>
    )
}

export default UpdateLogin
