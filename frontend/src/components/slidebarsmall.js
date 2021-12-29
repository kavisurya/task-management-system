
import { Component } from "react";
import Cookies from 'universal-cookie';
import { Link } from "react-router-dom";
import { ToastsContainer, ToastsStore } from 'react-toasts';

import "./slidestyle.css"
class SlideBarsmall extends Component {
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
            <div className="col-sm-1 text-center p-3 bg-white" style={{ minHeight: "700px", borderRight: "2px solid #333E47" }}>



                <div className="pt-5">
                    <Link to="/admin/alltask" className="btn text-dark s1 text-primary form-control" style={{ backgroundColor: this.props.color1 }}>A</Link><br></br>
                    <Link to="/admin/create" className="btn text-dark s1 text-primary form-control" style={{ backgroundColor: this.props.color2 }}>C</Link><br></br>
                    <Link to="/login" className="btn text-dark s1 text-primary form-control"
                        onClick={this.Logout}

                    >L</Link><br></br>

                </div>
            </div>
        )
    }
}

export default SlideBarsmall