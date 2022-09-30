import React, { Component } from "react";
import { Card, CardTitle, CardBody, CardText } from "reactstrap";

// Container Component liên quan đến cách mọi thứ hoạt động
function Department(props) {
  // Dùng map() để lọc toàn bộ dữ liệu props trong MainComponent

  const DSPhongBan = props.phongB.map((department) => {
    return (
      <div className="col-12 col-md-6 col-lg-4 mt-2 mb-2">
        <RenderPhongBan
          phongB={department}
          staffNo={props.staffs.filter(
            (staff) => staff.department.name === department.name
          )}
        />
      </div>
    );
  });

  return (
    <div className="container">
      <div className="row shadow m-3">{DSPhongBan}</div>
    </div>
  );
}

// Presentational Component chịu trách nhiệm liên quan đến việc mọi thứ được hiển thị như thế nào
class RenderPhongBan extends Component {
  render() {
    return (
      <Card>
        <CardTitle className="m-2">{this.props.phongB.name}</CardTitle>
        <CardBody>
          <CardText>Số lượng nhân viên: {this.props.staffNo.length}</CardText>
        </CardBody>
      </Card>
    );
  }
}

export default Department;
