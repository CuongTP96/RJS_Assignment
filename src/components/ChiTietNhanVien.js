import React from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import { Link } from "react-router-dom";
import dateFormat from "dateformat";

function RenderNhanVien({ staff }) {
  if (staff != null) {
    return (
      <div className="col-12">
        <div className="row">
          <div className="col-3">
            <CardImg width="100%" src={staff.image} alt={staff.name} />
          </div>
          <div className="col-9">
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
          </div>
        </div>
      </div>
    );
  } else {
    <div></div>;
  }
}

const ChiTietNhanVien = (props) => {
  if (props.nv != null) {
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/nhanvien">Nhân viên</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{props.nv.name}</BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div className="row mb-3">
          <RenderNhanVien staff={props.nv} />
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default ChiTietNhanVien;
