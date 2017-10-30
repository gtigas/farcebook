import { RECEIVE_TRENDS } from '../actions/trending_actions';

const TrendingReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_TRENDS: {
      return action.trends.articles;
    }
      default: return state;
  }
}

export default TrendingReducer;
