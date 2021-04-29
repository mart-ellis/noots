import React from 'react';
import { AuthProvider } from '../context/AuthContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LogIn from './LogIn';
import Dashboard from './Dashboard';
import PrivateRoute from '../routes/PrivateRoute';
import SignUp from './SignUp';
import { NotesProvider } from '../context/NotesContext';

const App = () => {

  return (
    <div className="text-white font-body">
    <AuthProvider>
      <NotesProvider>
        <Router>
          <Switch>
            <Route path="/login" component={LogIn} />
            <Route path="/signup" component={SignUp} />
            <PrivateRoute exact path="/" component={Dashboard} />
          </Switch>
        </Router>
      </NotesProvider>
    </AuthProvider>
    </div>
  )

}

export default App;