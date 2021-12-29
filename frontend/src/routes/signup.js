import { Component } from "react";
import { Link } from "react-router-dom"
import './login.css'
import axios from "axios"
import { ToastsContainer, ToastsStore } from 'react-toasts';

class Signup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: "",
            username: "",
            padd: ""
        }

    }


    componentDidMount()
    {
        this.resolution()
    }
    resolution = () => {
        console.log(window.screen.width)

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
        axios.post(`${this.props.ip}/signup`, ({
            email: this.state.email,
            password: this.state.password,
            username: this.state.username
        })).then((res) => {
            if (res.data.error) {
                ToastsStore.error(res.data.error)
            }
            else {
                ToastsStore.success(res.data.success)
            }
        })
    }

    render() {
        return (
            <div >
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

                        <ToastsContainer store={ToastsStore} />

                        <div >
                            <div>
                                <Link to="/login" className="btn ll1" id='idll1'  >Login</Link>
                                <Link to="/signup" className="btn ll1" id='idll2' >Signup </Link>
                            </div>
                        </div>
                    </nav>
                </div>

                <div className="logg" style={{ margin: `7% ${this.state.padd}` }}>
                    <h2>Signup</h2><br></br>
                    <p>Name :</p>
                    <input type="text" className="form-control"
                        onChange={(event) => {
                            this.setState(
                                {
                                    username: event.target.value
                                }
                            )
                        }} /><br></br>
                    <p>Email :</p>
                    <input type="text" className="form-control"
                        onChange={(event) => {
                            this.setState(
                                {
                                    email: event.target.value
                                }
                            )
                        }} /><br></br>
                    <p>Password :</p>
                    <input type="password" className="form-control"
                        onChange={(event) => { this.setState({ password: event.target.value }) }}
                    /><br></br>
                    <input type="button" value="Signup" className="form-control btn" style={{ background: "#FF9900" }} onClick={this.SendData} /><br></br><br></br>
                    <Link to="/login">Already have an account? </Link>
                </div>
            </div>
        )
    }
}

export default Signup