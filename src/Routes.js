import React from 'react'
import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom'

import Home from './pages/Home'
import Login from './pages/Login'
import Detail from './pages/Detail'
import Favorites from './pages/Favorites'
import Register from './pages/Register'
import Layout from './components/Layout'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Routes() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route>
          <Layout>
            <Switch>
              <Route exact path="/home" component={Home} />
              <Route exact path="/favorites" component={Favorites} />
              <Route exact path="/pokemon/:name" component={Detail} />
            </Switch>
          </Layout>
        </Route>
      </Switch>
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        />
        {/* Same as */}
      <ToastContainer />
    </BrowserRouter>
  )
}
