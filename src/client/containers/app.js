import React from 'react'
import { connect } from 'react-redux'
import { get_all } from '../../store/actions'
import Char from '../components/char'
import {
  Route,
  Link,
  withRouter,
  Redirect,
  Switch,
} from 'react-router-dom'

const Fake = () => (
  <div>Really is Nothing</div>
)
const Status = ({status, from, to, children}) => (
  <Route render={({staticContext}) => {
      if (staticContext) {
        staticContext.from = from
        staticContext.to = to
        staticContext.status = status
      }
      return children
    }
  } />
)

class App extends React.Component {
  componentDidMount() {
    if (this.props.charsIndexList.length === 0) {
      this.props.requestAll('http://localhost:4000/api')
    }
  }
  render() {
    const list = this.props.charsIndexList.map(v => (
      <li key={this.props.chars[v]['pron']}>
        <Char>{this.props.chars[v].pron}</Char>
      </li>
    ))
    return (
      <div>
        <Switch>
        <Route exact path='/' render={() => <div>{list}</div>} />
        <Route exact path='/char' component={Fake} />
        <Route exact path='/re' render={() => (
          <Redirect to='/char' />
        )} />
        <Status status={404}>
          <div>NOT FOUND</div>
        </Status>
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = state => (
  {
    chars: state.chars,
    charsIndexList: state.charsIndexList,
  }
)
const mapDispatchToProps = dispatch => (
  {
    requestAll: url => dispatch(get_all(url))
  }
)

// withRouter will inform redux to triger re-rendering when url changed
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App))
