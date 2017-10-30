import React from 'react';
import { ScaleLoader } from 'react-spinners';

class RightSide extends React.Component {
  constructor(props){
    super(props)
    this.state = { loading: true }
  }


  componentDidMount(){
    this.props.fetchTrends();
  }

  componentWillReceiveProps(newProps){
    this.setState( { loading: newProps.loading } )
  }

  render(){
    const trendsList = this.props.trends.map( trend => {
      return (
        <article key={trend.publishedAt}>
          <a href={trend.url} target="_blank">
            <i className="fa fa-bolt" aria-hidden="true"></i>
            <h3>{trend.title}</h3>
          </a>
        </article>
      )
    })
    return (
      <div className='main-right'>
        {this.state.loading ?
          <div className='loading'>
            <ScaleLoader color='#93949b'  />
          </div>
          :
          <div>
            <h2>Trending</h2>
            <h3>Powered by <a href='https://newsapi.org/'>NewsAPI.org</a></h3>
            <h2>Buzzfeed</h2>
            {trendsList}
          </div>
        }
      </div>
    )
  }
}
export default RightSide;
