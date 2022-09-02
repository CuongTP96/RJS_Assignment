import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardImgOverlay,
  CardText,
  CardBody,
  CardTitle,
} from "reactstrap";
import dateFormat from "dateformat";

// Tạo một component mới tên là StaffList trong file StaffListComponent.js
class StaffList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      TraCuuNhanSu: null,
      QuanLyHienThi: "col-12 col-md-6 co-lg-4 mt-3",
    };
  }

  TraCuuNhanSu(staff) {
    this.setState({
      TraCuuNhanSu: staff,
    });
  }

  QuanLyHienThi(col) {
    this.setState({
      QuanLyHienThi: col,
    });
  }

  DoiMauKhungTen = (i, e) => {
    this.setState({ cr_id: i });
  };

  renderStaff(staff) {
    if (staff != null) {
      return (
        <div className="col-12 col-md-5 m-1">
          <Card>
            <CardImg width="100%" src={staff.image} alt={staff.name} />
            <CardBody>
              <CardTitle>Họ và Tên: {staff.name}</CardTitle>
              <CardText>
                Ngày sinh: {dateFormat(staff.doB, "dd/mm/yyyy")}
              </CardText>
              <CardText>
                Ngày vào công ty: {dateFormat(staff.starDate, "dd/mm/yyyy")}
              </CardText>
              <CardText>Phòng ban: {staff.department.name}</CardText>
              <CardText>Số ngày nghỉ còn lại: {staff.annualLeave}</CardText>
              <CardText>Số ngày đã làm thêm: {staff.overTime}</CardText>
            </CardBody>
          </Card>
        </div>
      );
    } else {
      <div></div>;
    }
  }

  render() {
    let _C_value = this.state.cr_id;

    const StaffList = this.props.staffs.map((staff) => {
      return (
        <div
          className={this.state.QuanLyHienThi}
          style={{
            background: staff.id === _C_value ? "blue" : "",
          }}
          onClick={this.DoiMauKhungTen.bind(this, staff.id)}
        >
          <Card key={staff.id} onClick={() => this.TraCuuNhanSu(staff)}>
            <CardBody>
              <CardTitle>{staff.name}</CardTitle>
            </CardBody>
          </Card>
        </div>
      );
    });

    return (
      <div className="container">
        <div className="row m-3">
          <button
            onClick={() => this.QuanLyHienThi("col-md-6 mt-1")}
            className="btn btn-success mr-3"
          >
            2 cột
          </button>
          <button
            onClick={() => this.QuanLyHienThi("col-md-4 mt-1")}
            className="btn btn-success mr-3"
          >
            3 cột
          </button>
          <button
            onClick={() => this.QuanLyHienThi("col-md-2 mt-1")}
            className="btn btn-success mr-3"
          >
            6 cột
          </button>
        </div>
        <div className="row">{StaffList}</div>
        <div className="row mt-5">
          {this.renderStaff(this.state.TraCuuNhanSu)}
        </div>
      </div>
    );
  }
}

export default StaffList;
