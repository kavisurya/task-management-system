
import { Component } from "react";
import Cookies from 'universal-cookie';
import { Link } from "react-router-dom";
import { ToastsContainer, ToastsStore } from 'react-toasts';

import "./slidestyle.css"
class SlideBar extends Component {

    Logout = () => {
        localStorage.clear()
        const cookies = new Cookies();
        cookies.remove('id',  { path: '/' });
        cookies.remove('role', { path: '/' });
        cookies.remove('email', { path: '/' });
        cookies.remove('name', { path: '/' });
        cookies.remove('isadmin', { path: '/' });
    }

    render() {
        const cookie = new Cookies()
        return (
            <div className="col-sm-3 text-center p-3 bg-white" style={{ minHeight: "700px", borderRight: "2px solid #333E47" }}>
                <h3 style={{ backgroundColor: "#FF9900", padding: "20px", fontSize: "20px", fontFamily: "monospace" }}>KavinGroups</h3>

                <h6 className="pt-5"> Hi, Welcome back !</h6>

                <h4>
                    {cookie.get("name")}
                </h4>

                <div className="pt-5">
                    <Link to="/admin/alltask" style={{backgroundColor:this.props.color1}} className="btn text-dark s1 text-primary form-control">All Tasks</Link><br></br>
                    <Link to="/admin/create" style={{backgroundColor:this.props.color2}} className="btn text-dark s1 text-primary form-control">Create Tasks</Link><br></br>
                    <Link to="/login" className="btn text-dark s1 text-primary form-control"
                    onClick={this.Logout}
                    >Logout</Link><br></br>

                </div>
            </div>
        )
    }
}

export default SlideBar