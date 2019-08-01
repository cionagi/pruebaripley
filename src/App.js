//dependency
import React, {Component} from 'react'
import {BrowserRouter, Switch, Route,} from 'react-router-dom'
import redux, {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

// Views
import Index from './screens/index'

//components

//assets
import './styles/App.css'
//helpers

class App extends Component {
    render() {
        return (
          <div>
              <BrowserRouter>
                  <Switch>
                  <Route path={'/'} component={Index} exact={true}/>
                  </Switch>
              </BrowserRouter>
          </div>
      )
    }
}

const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({}, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

