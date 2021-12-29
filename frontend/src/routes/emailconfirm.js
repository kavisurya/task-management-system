import React, { Component } from "react";
import { Link } from "react-router-dom"
import './login.css'
import axios from "axios"
import * as qs from 'query-string';


class EmailConfirm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            stat : "",
            text : "",
            padd: ""
        }


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
        const parsed = qs.parse(window.location.search);

        axios.get(`${this.props.ip}/confirmation/${parsed.uuid}&&${parsed.hash}`).then((res)=>
        {
            console.log(res.data)
            if(res.data.success)
            {
                this.setState(
                    {
                        stat : res.data.success,
                        text : "Hi user, your email has been successfully verified. Please login to your account."
                    }
                )
            }
            else if(res.data.error == "Already the email verified")
            {
                this.setState(
                    {
                        stat : res.data.error,
                        text : "Hi user, the email was already verified. Please login to your account."
                    }
                )
            }
            else
            {
                this.setState(
                    {
                        stat : res.data.error,
                        text : "Hi user, the email is not verified. Please try again."
                    }
                )
            }
        })
    }
    componentDidMount() {
        this.SendData()
        this.resolution()
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


                        <div >
                            <div>
                                <Link to="/login" className="btn ll1" id='idll1'  >Login</Link>
                                <Link to="/signup" className="btn ll1" id='idll2' >Signup </Link>
                            </div>
                        </div>
                    </nav>
                </div>

                <div className="logg" style={{ margin: `7% ${this.state.padd}` }}>
                    <h4 className="text-center"> {this.state.stat} </h4><br></br>
                    <p style={{ padding: "0 10px" }}>
                        {this.state.text}
                    </p>

                    <Link to="/login" className="form-control btn" style={{ background: "#FF9900" }} >Login</Link><br></br><br></br>
                </div>
            </div>
        )
    }
}

export default EmailConfirm