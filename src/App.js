import './App.css';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import { AuthProvider } from './Auth2';
import { BrowserRouter as Router, Redirect, Route} from "react-router-dom"
import PrivateRoute from './PrivateRoute';

const App = () => {
  return (
    <div className="App">
      <AuthProvider>
          <Router>
            <PrivateRoute path='/' component={Home}/>
            <Route path='/login' component={Login}/>
            <Route path='/register' component={Register}/>
            <Route path="*" element={<Redirect to="/"/>}/>
          </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
