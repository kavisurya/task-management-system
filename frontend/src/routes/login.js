import { Component } from "react";
import { Link } from "react-router-dom"
import './login.css'
import axios from "axios"
import { ToastsContainer, ToastsStore } from 'react-toasts';
import jwt_decode from "jwt-decode";
import Cookies from 'universal-cookie';


class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: "",
            padd: ""
        }


    }

    componentDidMount() {
        this.resolution()
    }

    resolution = () => {

        if (window.screen.width < 400) {
            this.setState(
                {
                    padd: "3%"
                }
            )
        }
        else if (window.screen.width > 400 && window.screen.width < 800) {
            this.setState(
                {
                    padd: "15%"
                }
            )
        }
        else if (window.screen.width > 800) {
            this.setState(
                {
                    padd: "33%"
                }
            )
        }
    }

    SendData = () => {
        axios.post(`${this.props.ip}/login`, ({
            email: this.state.email,
            password: this.state.password
        })).then((res) => {
            if (res.data.error) {
                ToastsStore.error(res.data.error)
            }
            else {
                ToastsStore.success("Success")
                localStorage.setItem("token", res.data.token);

                let dec = jwt_decode(res.data.token)

                const cookies = new Cookies();
                cookies.set('id', dec.id, { path: '/' });
                cookies.set('role', dec.role, { path: '/' });
                cookies.set('email', dec.email, { path: '/' });
                cookies.set('name', dec.Name, { path: '/' });


                if (dec.role === "b7c8ff00ca7181a4d7ab986510bcc9db") {
                    window.location = "/usertask"
                    cookies.set('isadmin', "0", { path: '/' });
                }
                else if (dec.role === "80d78da6b546a45049777384315b3a6d") {
                    window.location = "/admin/alltask"
                    cookies.set('isadmin', "100", { path: '/' });
                }
                else {
                    ToastsStore.error("please try again !")

                }
                // console.log(cookies.get('myCat')); // Pacman

            }
        })
    }

    render() {
        return (
            <div >
                <ToastsContainer store={ToastsStore} />

                <div className="fst_half container-fluid"
                    style={{
                        background: "#FF9900"
                    }}
                >
                    {/* Navbar */}
                    <nav className="navbar container" style={{ display: "flex", justifyContent: "space-around", padding: "3% 0" }}>
                        <div>
                            <h2 className="navbar-brand bb"><strong>Kavin</strong>Groups </h2>
                        </div>


                        <div >
                            <div>
                                <Link to="/login" className="btn ll1" id='idll1'  >Login</Link>
                                <Link to="/signup" className="btn ll1" id='idll2' >Signup </Link>
                            </div>
                        </div>
                    </nav>
                </div>

                <div className="logg" style={{ margin: `7% ${this.state.padd}` }}>
                    <h2>Login</h2>
                    <p>Email :</p>
                    <input type="email" className="form-control"
                        onChange={(event) => {
                            this.setState(
                                {
                                    email: event.target.value
                                }
                            )
                        }} /><br></br>
                    <p>Password :</p>
                    <input type="password" className="form-control"
                        onChange={(event) => { this.setState({ password: event.target.value }) }} /><br></br>
                    <input type="button" value="Login" className="form-control btn"
                        onClick={this.SendData}
                        style={{ background: "#FF9900" }} /><br></br><br></br>
                    <Link to="/signup">New user ? </Link>

                </div>

            </div>
        )
    }
}

export default Login