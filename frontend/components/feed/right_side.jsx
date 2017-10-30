import React from 'react';
import { ScaleLoader } from 'react-spinners';
import _ from 'lodash';

const SOURCES = {
   "new-york-magazine": "New York Magazine",
   "espn": "ESPN",
   "usa-today": "USA Today",
   "buzzfeed": "Buzzfeed"

}

class RightSide extends React.Component {
  constructor(props){
    super(props)
    this.state = { source: 'usa-today', loading: true };
    this.handleClick = this.handleClick.bind(this);
  }


  componentDidMount(){
    this.props.fetchTrends(this.state.source);
  }

  componentWillReceiveProps(newProps){
    this.setState( { loading: newProps.loading } )
  }

  handleClick(source){
    return () => {
      this.setState( { source, loading: true })
      this.props.fetchTrends(source);
    }
  }

  render(){
    const { source } = this.state;
    const trendsList = this.props.trends.map( (trend,idx) => {
      return (
        <article key={idx}>
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
            <span>
              <h2>Trending</h2>
              <ul>
                <i onClick={this.handleClick("usa-today")}
                   className="fa fa-newspaper-o"
                   style={source === "usa-today" ? {color: "#5086fb"} : {}}
                   aria-hidden="true"></i>
                <i onClick={this.handleClick("buzzfeed")}
                   className="fa fa-level-up"
                   style={source === "buzzfeed" ? {color: "#5086fb"} : {}}
                   aria-hidden="true"></i>
                <i onClick={this.handleClick("espn")}
                   className="fa fa-futbol-o"
                   style={source === "espn" ? {color: "#5086fb"} : {}}
                   aria-hidden="true"></i>
                <i onClick={this.handleClick("new-york-magazine")}
                   className="fa fa-home"
                   style={source === "new-york-magazine" ? {color: "#5086fb"} : {}}
                   aria-hidden="true"></i>
              </ul>
            </span>

            <h3>Powered by <a href='https://newsapi.org/'>NewsAPI.org</a></h3>
            <h2>{SOURCES[this.state.source]}</h2>
            {trendsList}
          </div>
        }
      </div>
    )
  }
}

export default RightSide;
