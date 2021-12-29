import { Component } from "react";
import axios from "axios"
import TableUser from "../components/tableuser";
import Cookies from 'universal-cookie';
import { Link } from "react-router-dom";
import { ToastsContainer, ToastsStore } from 'react-toasts';
import Unauth from "./unauth";
import jwt_decode from "jwt-decode";


class UserTask extends Component {
    constructor(props) {
        super(props)
        this.state = {
            resp: [],
            errormsg: ""
        }
    }

    Logout = () => {
        localStorage.clear()
        const cookies = new Cookies();
        cookies.remove('id',  { path: '/' });
        cookies.remove('role', { path: '/' });
        cookies.remove('email', { path: '/' });
        cookies.remove('name', { path: '/' });
        cookies.remove('isadmin', { path: '/' });
    }

    GetAlldata = () => {
        let config = {
            headers: {
                tokenkey: localStorage.getItem("token")
            }
        }
        axios.get(`${this.props.ip}/user`, config).then((res) => {
            this.setState({ resp: res.data })

            if (res.data.error) {
                this.setState({
                    errormsg: res.data.error,
                })
            }
        })
    }

    userCheck = () => {
        let token = localStorage.getItem("token")
        if (token == null) {
            window.location = "/login"

        }
        else {
            let dec = jwt_decode(token)

            if (dec.role === "b7c8ff00ca7181a4d7ab986510bcc9db") {
                ToastsStore.success("Loggedin !!")
            }
            else {
                ToastsStore.error("unauthorized access !!")
                window.location = "/login"
                
            }

        }
    }

    componentDidMount() {

        this.GetAlldata()
        this.userCheck()
    }

    sendUpdateyes = (index) => {
        let config = {
            headers: {
                tokenkey: localStorage.getItem("token")
            }
        }
        axios.post(`${this.props.ip}/user`, ({
            id: this.state.resp[index]._id,
            completed: "yes"
        }), config).then((res) => {
            if (res.data.error) {
                ToastsStore.error(res.data.error)
            }
            else {
                ToastsStore.success(res.data.success)
                this.GetAlldata()
            }

        })
    }

    sendUpdateno = (index) => {
        let config = {
            headers: {
                tokenkey: localStorage.getItem("token")
            }
        }
        axios.post(`${this.props.ip}/user`, ({
            id: this.state.resp[index]._id,
            completed: "no"
        }), config).then((res) => {
            if (res.data.error) {
                ToastsStore.error(res.data.error)
            }
            else {
                ToastsStore.success(res.data.success)
                this.GetAlldata()
            }

        })
    }

    showall = () => this.state.resp.map((val, index) =>

        <TableUser
            sno={index + 1}
            taskname={val.taskname}
            fromTask={val.fromTask}
            toTask={val.toTask}
            completed={val.completed}
            yes={() => { this.sendUpdateyes(index) }}
            no={() => { this.sendUpdateno(index) }}
            assignedBy={val.fromAssign.username}
        />
    )


    render() {
        const cookies = new Cookies();

        return (

            <div className="container">
                

                <ToastsContainer store={ToastsStore} />

                <div style={{ display: "flex", justifyContent: "space-between", padding: '10px' }} className="bg-dark container-fluid">
                    <h1 className="text-white">Hii {cookies.get('name')}</h1>
                    <Link to="/login" className="btn" onClick={this.Logout} style={{ backgroundColor: "#FF9900" }}>Logout</Link>
                </div>

                <div style={{ margin: "5% 8%", }}>
                    <div className="table bg-white table-responsive-md" style={{ borderRadius: "10px" }}>
                        <table className="table table-hover">
                            <thead className="thead-light text-center">
                                <th>S.NO</th>
                                <th>Taskname</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Completed</th>
                                <th>Assigned By</th>
                                <th>Submit</th>
                            </thead>

                            <tbody>
                                {this.showall()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserTask