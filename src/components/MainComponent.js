import React, { useState } from "react";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import { Switch, Redirect, Route } from "react-router-dom";
import { DEPARTMENTS, STAFFS } from "../shared/staffs";
// Các trang trong web
import StaffList from "./StaffListComponent";
import ChiTietNV from "./ChiTietNhanVien";
import Department from "./PhongBan";
import Luong from "./Luong";

function Main() {
  // Màn hình danh sách nhân viên
  const [NhanVien] = useState({
    staffs: STAFFS,
    departments: DEPARTMENTS,
  });

  const StaffWithID = ({ match }) => {
    return (
      <ChiTietNV
        nv={
          NhanVien.staffs.filter(
            (nv) => nv.id === parseInt(match.params.nhanvienId, 10)
          )[0]
        }
      />
    );
  };

  // Cấu trúc điều hướng trong trang web
  return (
    <div>
      <Header />
      <Switch>
        <Route
          exact
          path={"/nhanvien"}
          component={() => <StaffList staffs={NhanVien.staffs} />}
        />
        <Route path="/nhanvien/:nhanvienId" component={StaffWithID} />
        <Route
          path="/phongban"
          component={() => <Department phongB={NhanVien.departments} />}
        />
        <Route
          path="/bangluong"
          component={() => <Luong Tluong={NhanVien.staffs} />}
        />
      </Switch>
      <Redirect to="/nhanvien" />
      <Footer />
    </div>
  );
}

export default Main;
