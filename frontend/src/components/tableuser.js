import { Component } from "react";

class TableUser extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (<tr style={{ fontSize: "14px",textAlign:"center" }}>
            <td>
                {this.props.sno ? this.props.sno : null}
            </td>
            <td>
                {this.props.taskname ? this.props.taskname : null}

            </td>
            <td>
                {this.props.fromTask ? this.props.fromTask : null}

            </td>
            <td>
                {this.props.toTask ? this.props.toTask : null}

            </td>
            <td>
                {this.props.completed ? this.props.completed : null}

            </td>
            <td>
                {this.props.assignedBy ? this.props.assignedBy : null}

            </td>
            <td>
                <input className="btn" onClick={this.props.yes} style={{ backgroundColor: "#FF9900", marginRight: "5px" }} type="button" value="yes"></input>
                <input className="btn bg-dark text-white" onClick={this.props.no} type="button" value="no"></input>

            </td>
        </tr>)
    }
}

export default TableUser