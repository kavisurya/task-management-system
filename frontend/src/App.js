import logo from './logo.svg';
import './App.css';
import { Component } from 'react';
import {
  BrowserRouter as Router, Routes, Route, Link
} from "react-router-dom";
import Login from './routes/login';
import Signup from "./routes/signup"
import EmailConfirm from './routes/emailconfirm';
import Alltask from './adminroutes/alltask';
import UserTask from './routes/usertask';
import CreateTask from './adminroutes/createtask';
import Unauth from './routes/unauth';
import NotFound from './routes/404';
const ip = "http://192.168.43.196:5555"

class App extends Component {

  render() {
    return (
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<Login ip={ip} />}></Route>

            <Route path="/login" element={<Login ip={ip} />}></Route>
            <Route path="/signup" element={<Signup ip={ip} />}></Route>
            <Route path="/confirmation" element={<EmailConfirm ip={ip} />}></Route>
            {/* User route */}
            <Route path="/usertask" element={<UserTask ip={ip} />}></Route>
            <Route path="/unauth" element={<Unauth />}></Route>

            {/* Admin Routes */}
            <Route path="/admin/alltask" element={<Alltask ip={ip} />}></Route>
            <Route path="/admin/create" element={<CreateTask ip={ip} />}></Route>
            <Route path="*" element={<NotFound />}></Route>

          </Routes>
        </Router>
      </div>
    )
  }
}

export default App;
