import React, { Component } from "react";
import logo from "./logo.svg";
import { Navbar, NavbarBrand } from "reactstrap";
import Menu from "./components/MenuComponent";
import "./App.css";
// Sau khi tải file staffs.jsx về bạn import dữ liệu vào App và truyền STAFFS vào component StaffList;
import StaffList from "./components/StaffListComponent";
import { STAFFS } from "./shared/staffs";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      staffs: STAFFS,
    };
  }

  render() {
    return (
      <div>
        <Navbar dark color="primary">
          <div className="container">
            <NavbarBrand href="/">Ứng dụng quản lý nhân sự v1.0</NavbarBrand>
          </div>
        </Navbar>
        <StaffList staffs={this.state.staffs} />
      </div>
    );
  }
}

export default App;
