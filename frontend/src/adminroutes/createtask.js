import { Component } from "react";
import SlideBarsmall from "../components/slidebarsmall";
import { ToastsContainer, ToastsStore } from 'react-toasts';
import axios from "axios"
import SlideBar from "../components/slidebar";

class CreateTask extends Component {
    constructor(props) {
        super(props)
        this.state = {
            toggleslide: true,
            copyresp_taskName : "",
            copyresp_fromdate : "",
            copyresp_todate : "",
            copyresp_email : "",
        }
    }

    Slidebar = () => {
        this.setState({ toggleslide: !this.state.toggleslide })
    }

    SendData =()=>
    {
        let config = {
            headers: {
                tokenkey: localStorage.getItem("token")
            }
        }
        axios.post(`${this.props.ip}/admin/createtask`, (
            {
                "taskname" : this.state.copyresp_taskName,
                "fromTask" : this.state.copyresp_fromdate, 
                "toTask": this.state.copyresp_todate, 
                "email": this.state.copyresp_email, 
            }
        ),config).then((res) => {
            if (res.data.error) {
                ToastsStore.error(res.data.error)
            }
            else{
                
                ToastsStore.success(res.data.success)
                this.setState({
                    copyresp_taskName : "",
                    copyresp_fromdate : "",
                    copyresp_todate : "",
                    copyresp_email : "",
                })

            }
        })
    }

    render() {
        return (
            <div className="container-justify">
                <div>
                    <input className="btn btn-primary slidebutt" type="button" onClick={this.Slidebar} value="slidebar"></input>
                </div>
                <ToastsContainer store={ToastsStore} />

                <div className="row">
                    {this.state.toggleslide ? <SlideBar color2="#FF9900" /> : <SlideBarsmall color2="#FF9900" />}

                    <div className="col-sm">
                        <div>
                            <h2>
                                Create Task !
                            </h2>

                            <div style={{margin:"10% 10%", backgroundColor:"#fff", padding:"20px", borderRadius:"10px"}}>
                                <p>Task Name : </p>
                                <input type="text" className="form-control" value={this.state.copyresp_taskName}
                                    onChange={(event) => { this.setState({ copyresp_taskName: event.target.value }) }} placeholder="Task Name"></input><br></br>


                                <p>From Date: </p>
                                <input type="text" className="form-control" placeholder="From Date"
                                    value={this.state.copyresp_fromdate}
                                    onChange={(event) => { this.setState({ copyresp_fromdate: event.target.value }) }}
                                ></input><br></br>

                                <p>End Date : </p>
                                <input type="text" className="form-control" placeholder="To Date"
                                    value={this.state.copyresp_todate}
                                    onChange={(event) => { this.setState({ copyresp_todate: event.target.value }) }}
                                ></input><br></br>


                                <p>User Email </p>
                                <input type="text" className="form-control" placeholder="Email"
                                    value={this.state.copyresp_email}
                                    onChange={(event) => { this.setState({ copyresp_email: event.target.value }) }}
                                ></input><br></br>

                                <input type="button" value="Create Task" className="bg-dark form-control btn text-white"
                                onClick={this.SendData}
                                >
                                </input>
                            
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default CreateTask