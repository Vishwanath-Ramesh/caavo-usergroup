import React, { lazy, Suspense } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

const PageNotFound = lazy(() => import('../pages/PageNotFound/PageNotFound'))
const UserGroupLists = lazy(() =>
  import('../pages/UserGroupLists/UserGroupLists')
)

const Routes = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/" component={UserGroupLists} />
          <Route path="/404" component={PageNotFound} />
          <Redirect to="/404" />
        </Switch>
      </Suspense>
    </Router>
  )
}

export default Routes
