import React, { useState, Component } from "react";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import { Switch, Redirect, Route } from "react-router-dom";
import { DEPARTMENTS, STAFFS } from "../shared/staffs";
// Các trang trong web
import StaffList from "./StaffListComponent";
import ChiTietNV from "./ChiTietNhanVien";
import Department from "./PhongBan";
import Luong from "./Luong";

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      staffs: STAFFS,
      departments: DEPARTMENTS,
    };

    this.addStaff = this.addStaff.bind(this);
  }

  // Tạo 1 id ngẫu nhiên cho nhân viên mới
  addStaff = (staff) => {
    const id = Math.floor(Math.random() * 10000 + 1);
    const newStaff = { id, ...staff };
    this.setState({
      staffs: [...this.state.staffs, newStaff],
    });
    console.log(newStaff);
    console.log(this.state.staffs);
  };

  render() {
    const StaffWithID = ({ match }) => {
      return (
        <ChiTietNV
          nv={
            this.state.staffs.filter(
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
            component={() => (
              <StaffList onAdd={this.addStaff} staffs={this.state.staffs} />
            )}
          />
          <Route path="/nhanvien/:nhanvienId" component={StaffWithID} />
          <Route
            path="/phongban"
            component={() => (
              <Department
                Department
                phongB={this.state.departments}
                staffs={this.state.staffs}
              />
            )}
          />
          <Route
            path="/bangluong"
            component={() => <Luong Tluong={this.state.staffs} />}
          />
        </Switch>
        <Redirect to="/nhanvien" />
        <Footer />
      </div>
    );
  }
}
export default Main;
