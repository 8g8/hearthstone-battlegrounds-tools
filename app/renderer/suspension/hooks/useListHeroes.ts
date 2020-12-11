import { useRequest } from 'ahooks';
import { ajax } from 'rxjs/ajax';
import { createModel } from 'hox';

export type ListHeroesResult = {
  hero_dbf_id: number;
  num_games_played: number;
  pick_rate: number;
  popularity: number;
  times_offered: number;
  times_chosen: number;
  avg_final_placement: number;
  final_placement_distribution: number[];
  confidence_interval: number;
}[];

async function getHeroes(): Promise<ListHeroesResult> {
  return ajax
    .getJSON<ListHeroesResult>(`https://hs.chenyueban.com/api/analysis/heroes`)
    .toPromise<ListHeroesResult>();
}

function useListHeroes() {
  return useRequest(getHeroes, {
    cacheKey: 'heroes',
    cacheTime: 30 * 60 * 1000,
  });
}

export default createModel(useListHeroes);
