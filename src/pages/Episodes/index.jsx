import React, { useEffect, useMemo } from "react";

import { CardContainer, EpisodeCard } from "../../components/domain";
import { Search } from "../../components/ui/base/";
import { Pagination } from "../../components/ui/layout/";
import { useStore } from "../../providers/store/StoreProvider";
import { observer } from "mobx-react-lite";
import { Route, useRouteMatch, Redirect } from "react-router-dom";
import useDebounce from "../../utils/useDebounce";

const Episodes = observer(() => {
  let match = useRouteMatch("/episodes/season/:seasonNumber")
  const { episodesStore, filterStore } = useStore();
  const value = useDebounce(filterStore.inputValue, 200);
  const episodes = episodesStore.sortedEpisodes;
  let seasonNumber = useMemo(() => match ? match.params.seasonNumber : 1, [match]);

  useEffect(() => {
    filterStore.searchEpisodeByName(value);
  }, [value])


  useEffect(() => {
    episodesStore.fetchGetEpisodes({ pageNumber: 0, pageSize: 0, season: seasonNumber });

  }, [seasonNumber]);

  return (
    <>
      <Redirect exact from='/episodes' to={`/episodes/season/${seasonNumber}`} />
      <Search placeholder={"Найти эпизод"} episodes={true} />
      <Pagination />
      <CardContainer view={true}>
        <Route path={`/episodes/season/:seasonNumber`}>
          {episodes.length ? (
            episodes.map((episode) => (
              <EpisodeCard
                key={episode.id}
                id={episode.id}
                name={episode.name}
                series={episode.series}
                image={episode.imageName}
                premiere={episode.premiere}
              />
            ))
          ) : (
            <p className="center">Отсутствует</p>
          )}
        </Route>
      </CardContainer>
    </>
  );
});

export default Episodes;
