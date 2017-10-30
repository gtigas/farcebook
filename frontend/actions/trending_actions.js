import { fetchTrending } from '../util/trending_api_util';

export const RECEIVE_TRENDS = 'RECEIVE_TRENDS'

const receiveTrends = trends => ({
  type: RECEIVE_TRENDS,
  trends
});

export const fetchTrends = source => dispatch => {
  return fetchTrending(source).then(
    trends => dispatch(receiveTrends(trends))
  )
}
