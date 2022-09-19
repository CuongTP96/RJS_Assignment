import React from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import { Link } from "react-router-dom";

// Thông tin lương
const LuongCB = 3000000;
const LuongOT = 200000;

// Sử dụng function conponent để render dữ liệu
function RenderLuong({ luong }) {
  return (
    <Card>
      <CardTitle className="p-3 bg-white rounded m-2">{luong.name}</CardTitle>
      <CardBody>
        <CardText>Mã nhân viên: {luong.id}</CardText>
        <CardText>Hệ số lương: {luong.salaryScale}</CardText>
        <CardText>Số giờ làm thêm: {luong.overTime}</CardText>
        <hr />
        <CardText className="bg-muted p-2 shadow">
          Lương:{" "}
          {(luong.salaryScale * LuongCB + luong.overTime * LuongOT).toFixed(0)}
        </CardText>
      </CardBody>
    </Card>
  );
}

// Láy props từ main, và sắp xếp bằng map
const Luong = (props) => {
  const luong = props.Tluong.map((Rluong) => {
    return (
      <div className="col-12 col-md-6 col-lg-4 mt-2 mb-2">
        <RenderLuong luong={Rluong} />
      </div>
    );
  });

  // trang trí web bằng breadcrubm
  return (
    <div className="container">
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/nhanvien">Nhân viên</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>Bảng lương</BreadcrumbItem>
        </Breadcrumb>
      </div>

      <div className="row shadow mb-3">{luong}</div>
    </div>
  );
};

export default Luong;
