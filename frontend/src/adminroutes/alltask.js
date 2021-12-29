
import SlideBar from "../components/slidebar";
import { Component } from "react";
import axios from "axios"
import TableUser from "../components/tableuser";
import Cookies from 'universal-cookie';
import { Link } from "react-router-dom";
import { ToastsContainer, ToastsStore } from 'react-toasts';
import jwt_decode from "jwt-decode";
import TableUserAdmin from "../components/tableuseradmin";
import { Button, Modal } from 'react-bootstrap';
import "./alltask.css"
import SlideBarsmall from "../components/slidebarsmall";

class Alltask extends Component {
    constructor(props) {
        super(props)
        this.state = {
            resp: [],
            errormsg: "",
            toggle: false,
            toggleslide: true,
            copyresp_taskName : "",
            copyresp_ID : "",
            copyresp_fromdate : "",
            copyresp_todate : "",
            copyresp_email : "",
            copyresp_completed : "",
        }
    }


    userCheck = () => {
        let token = localStorage.getItem("token")
        if (token == null) {
            window.location = "/unauth"

        }
        else {
            let dec = jwt_decode(token)
            const cookies = new Cookies()
            if (dec.role === "80d78da6b546a45049777384315b3a6d" && cookies.get('role') === "80d78da6b546a45049777384315b3a6d"&& cookies.get('isadmin') === "100") {
                ToastsStore.success("Loggedin !!")
            }
            else if(dec.role === "b7c8ff00ca7181a4d7ab986510bcc9db")
            {
                window.location ="/unauth"
            }
            else {
                ToastsStore.error("unauthorized access !!")
                window.location = "/unauth"
            }

        }
    }

    GetAlldata = () => {
        let config = {
            headers: {
                tokenkey: localStorage.getItem("token")
            }
        }
        axios.get(`${this.props.ip}/admin/alltask`, config).then((res) => {
            this.setState({ resp: res.data })

            console.log(res.data)
            if (res.data.error) {
                this.setState({
                    errormsg: res.data.error,
                })
            }
        })
    }

    componentDidMount() {
        this.userCheck()
        this.GetAlldata()
    }

    sendUpdateyes = (index) => {
        let config = {
            headers: {
                tokenkey: localStorage.getItem("token")
            }
        }

        this.setState({ toggle: !this.state.toggle })
        var copyvals = this.state.resp
        var click = copyvals[index]
        this.setState({
            copyresp_taskName : click.taskname,
            copyresp_ID : click._id,
            copyresp_fromdate : click.fromTask,
            copyresp_todate : click.toTask,
            copyresp_email : click.toAssignEMAIL.email,
            copyresp_completed : click.completed
        })
    }

    showall = () => this.state.resp.map((val, index) =>

        <TableUserAdmin
            sno={index + 1}
            taskname={val.taskname}
            fromTask={val.fromTask}
            toTask={val.toTask}
            completed={val.completed}
            assignedTo={val.toAssignEMAIL.username ? val.toAssignEMAIL.username : null}
            yes={() => { this.sendUpdateyes(index) }}
            assignedBy={val.fromAssign.username}
        />
    )

    Slidebar = () => {
        this.setState({ toggleslide: !this.state.toggleslide })
    }

    SendUpdate = ()=>
    {
        this.setState({ toggle: false })
        let config = {
            headers: {
                tokenkey: localStorage.getItem("token")
            }
        }
        axios.post(`${this.props.ip}/admin/edit`, (
            {
                "id" : this.state.copyresp_ID,
                "taskname" : this.state.copyresp_taskName,
                "fromTask" : this.state.copyresp_fromdate, 
                "toTask": this.state.copyresp_todate, 
                "email": this.state.copyresp_email, 
                "completed": this.state.copyresp_completed, 
            }
        ),config).then((res) => {
            this.GetAlldata()
            console.log(res.data)
            if (res.data.error) {
                ToastsStore.error(res.data.error)
            }
            else{
                
                ToastsStore.success(res.data.success)

            }
        })
        
    }

    Senddel = ()=>
    {
        this.setState({ toggle: false })
        let config = {
            headers: {
                tokenkey: localStorage.getItem("token")
            }
        }
        axios.post(`${this.props.ip}/admin/delete`, (
            {
                "id" : this.state.copyresp_ID,
            }
        ),config).then((res) => {

            this.GetAlldata()
            if (res.data.error) {
                ToastsStore.error(res.data.error)
            }
            else{
                
                ToastsStore.success(res.data.success)
            }
        })
    }
    render() {
        return (
            <div >
                <ToastsContainer store={ToastsStore} />

                {this.state.toggle ?


                    <Modal
                        backdrop="static"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                        show={this.state.toggle}>
                        <Modal.Header className="header_">
                            <Modal.Title style={{ textAlign: "center", fontWeight: "800" }}>Edit</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <p>Task Name : </p>
                            <input type="text" className="form-control" value={this.state.copyresp_taskName} 
                            onChange={(event)=>{this.setState({copyresp_taskName : event.target.value})}} placeholder="Task Name"></input><br></br>
                            
                            
                            <p>From Date: </p>
                            <input type="text" className="form-control" placeholder="From Date"
                             value={this.state.copyresp_fromdate} 
                             onChange={(event)=>{this.setState({copyresp_fromdate : event.target.value})}}
                            ></input><br></br>

                            <p>End Date : </p>
                            <input type="text" className="form-control" placeholder="To Date"
                            value={this.state.copyresp_todate} 
                            onChange={(event)=>{this.setState({copyresp_todate : event.target.value})}}
                            ></input><br></br>


                            <p>Email </p>
                            <input type="text" className="form-control" placeholder="Email"
                            value={this.state.copyresp_email} 
                            onChange={(event)=>{this.setState({copyresp_email : event.target.value})}}
                            ></input><br></br>


                            <p>Completed : </p>
                            <input type="text" className="form-control" placeholder="completed ?"
                            value={this.state.copyresp_completed} 
                            onChange={(event)=>{this.setState({copyresp_completed : event.target.value})}}
                            ></input><br></br>
                        </Modal.Body>

                        <Modal.Footer>
                            <input type="button" className="btn btn-success" onClick={this.SendUpdate} value="Update" />
                            <input type="button" className="btn btn-warning"  onClick={this.Senddel} value="Delete" />

                            <input type="button" className="btn btn-danger" onClick={() => { this.setState({ toggle: false }) }} value="Close" />
                        </Modal.Footer>
                    </Modal> : null}

                <div>
                    <input className="btn btn-primary slidebutt" type="button" onClick={this.Slidebar} value="slidebar"></input>
                </div>
                <div className="row">

                {this.state.toggleslide ? <SlideBar color1="#FF9900"  /> : <SlideBarsmall color1="#FF9900" />}


                    <div className="col-sm ">
                        <div style={{ margin: "5% 8%", }}>
                            <div className="table bg-white table-responsive" style={{ borderRadius: "10px" }}>
                                <table className="table table-hover">
                                    <thead className="thead-light text-center">
                                        <tr>
                                            <th className="ss">S.NO</th>
                                            <th>Taskname</th>
                                            <th>Start Date</th>
                                            <th>End Date</th>
                                            <th>Completed</th>
                                            <th>Assigned By</th>
                                            <th>Assigned To</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {this.showall()}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Alltask