import React from 'react';
import ExpenseList from './pages/ExpenseList';
import PrivateRoute from './components/PrivateRoute';
import Authentication from './pages/Authentication';
import Index from './pages/IncomeList';
import MainPage from './pages/MainPage/index';
import {
  Redirect,
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import Chart from './pages/Chart/index.js';
import ChartPie from './pages/Chart/ChartPie'
import StackDataInsideOut from "./pages/Chart/StackDataInsideOut";
import StackData from "./pages/Chart/StackData";

function App() {
  return (
    <Router>
      <Switch>
        <PrivateRoute exact path="/">
          <MainPage />
        </PrivateRoute>
        <PrivateRoute exact path="/income/:cat">
          <Index />
        </PrivateRoute>
        <PrivateRoute exact path="/expense/:cat">
          <ExpenseList />
        </PrivateRoute>
        <Route exact path="/login">
          <Authentication mode={'login'} />
        </Route>
        <Route exact path="/registration">
          <Authentication mode={'registration'} />
        </Route>
        <PrivateRoute exact path="/chart">
          <Chart />
        </PrivateRoute>
        <PrivateRoute exact path="/chart/pie">
          <ChartPie />
        </PrivateRoute>
        <PrivateRoute exact path="/chart/stackdatainsideout">
          <StackDataInsideOut />
        </PrivateRoute>
        <PrivateRoute exact path="/chart/stackdata">
          <StackData />
        </PrivateRoute>
        <Route path="/">
          <Redirect to={'/login'} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
