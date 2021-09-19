import React, { useEffect, useMemo } from 'react'
import { useParams, useHistory } from 'react-router';
import { useStore } from '../../../providers/store/StoreProvider'

import BackArrowIcon from "../../../components/icons/BackArrowIcon";
import PlayIcon from "../../../components/icons/PlayIcon";
import { Button} from '../../../components/ui/base/';   

import { observer } from 'mobx-react-lite'
import styles from './episode.module.scss';
import CharacterCard from "../../../components/domain/CharCard";

import dayjs from "dayjs";


const EpisodePage = observer(() => {
    const { episodeId } = useParams();
    const history = useHistory();
    const { episodesStore } = useStore();
    const {
        name,
        series,
        plot,
        premiere,
        imageName,
        characters } = episodesStore.episode;
    const date = dayjs(premiere).locale('ru').format('D MMMM YYYY')


    const headerStyle = useMemo(() => ({
        backgroundImage: ` linear-gradient(180deg, rgba(0, 0, 0, 0.65) 0%, rgba(11, 30, 45, 0) 37.29%, rgba(11, 30, 45, 0) 68.93%), linear-gradient(180deg, rgba(11, 30, 45, 0) 68.93%, rgba(0, 0, 0, 0.65) 100%), url(${imageName})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "50% 30%",
        backgroundSize: "cover",
        height: "200px",
    }), [imageName]);

    const onGoBack = () => {
        history.goBack();
    }

    useEffect(() => {
        episodesStore.fetchGetEpisodeById(episodeId);
        return () => {
            episodesStore.unFetchGetEpisodeById();
        }
    }, [episodesStore, episodeId]);

    return (
        <div>
            <div className={styles.header} style={headerStyle}>
                <Button onClick={onGoBack}>
                    <BackArrowIcon />
                </Button>
            </div>
            <PlayIcon className={styles.playIcon} />
            <div className={styles.container}>
                <div className={styles.wrapper}>
                    <div className={styles.title}>
                        <p className="h3">{name}</p>
                        <p className='subTitle1'>Серия {series}</p>
                    </div>
                    <p className='description'>{plot}</p>
                    <div className={styles.premiere}>
                        <p className='subTitle2'>Премьера</p>
                        <p className='bodyOne'>{date}</p>
                    </div>
                </div>
                <div className={styles.characters}>
                    <p className='h4'>Персонажи</p>
                    {characters &&
                        characters.map((char) => (
                            <CharacterCard
                                key={char.id}
                                id={char.id}
                                fullName={char.fullName}
                                gender={char.gender}
                                race={char.race}
                                image={char.imageName}
                                status={char.status}
                                view={true}
                            />
                        ))}
                </div>
            </div>

        </div>
    )
}
)

export default EpisodePage