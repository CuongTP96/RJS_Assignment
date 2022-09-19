import React, { Component } from "react";
import { Card, CardTitle, CardBody, CardText } from "reactstrap";

function Department(props) {
  // Dùng map() để lọc toàn bộ dữ liệu props trong MainComponent
  const DSPhongBan = props.phongB.map((department) => {
    return (
      <div className="col-12 col-md-6 col-lg-4 mt-2 mb-2">
        <RenderPhongBan phongB={department} />
      </div>
    );
  });
  return (
    <div className="container">
      <div className="row shadow m-3">{DSPhongBan}</div>
    </div>
  );
}

// Presentational Component
class RenderPhongBan extends Component {
  render() {
    return (
      <Card>
        <CardTitle className="m-2">{this.props.phongB.name}</CardTitle>
        <CardBody>
          <CardText>
            Số lượng nhân viên: {this.props.phongB.numberOfStaff}
          </CardText>
        </CardBody>
      </Card>
    );
  }
}

export default Department;
