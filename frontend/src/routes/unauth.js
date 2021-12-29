import { Component } from "react";
import { Link } from "react-router-dom"

class Unauth extends Component{

    constructor(props) {
        super(props)
        this.state = {
            padd: ""
        }


    }

    componentDidMount()
    {
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
                    <h4 className="text-center"> Unauthorized Access </h4><br></br>
                    <p style={{ padding: "0 10px" }}>
                        Hi, this is protected route. you don't have a permission access to this page.
                        please login.
                    </p>

                    <Link to="/login" className="form-control btn" style={{ background: "#FF9900" }} >Login</Link><br></br><br></br>
                </div>
            </div>
        )
    }
}

export default Unauth