import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardBody,
  CardSubtitle,
  Button,
  Modal,
  Col,
  Input,
  ModalHeader,
  ModalBody,
  Row,
  Label,
  Form,
  FormFeedback,
} from "reactstrap";
import { Link } from "react-router-dom";

// Giao diện hiển thị của nhân viên
const RenderStaffs = ({ staff }) => {
  return (
    <Link to={`/nhanvien/${staff.id}`}>
      <Card>
        <CardImg width="100%" src={staff.image} alt={staff.name} />
        <CardBody>
          <CardSubtitle>{staff.name}</CardSubtitle>
        </CardBody>
      </Card>
    </Link>
  );
};

// Hiển thị giao diên trang
class StaffList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // quản lý dữ liệu input
      name: "",
      doB: "",
      salaryScale: 1,
      startDate: "",
      departmentId: "Sale",
      annualLeave: 0,
      overTime: 0,
      salary: 30000,
      image: "/assets/images/alberto.png",

      // khi click vào ô input
      touched: {
        name: false,
        doB: false,
        salaryScale: false,
        startDate: false,
        departmentId: false,
        annualLeave: false,
        overTime: false,
      },

      tenTim: "",
      modalOpen: false,
    };

    // Ràng buộc các hàm được khai báo
    this.timNhanvien = this.timNhanvien.bind(this);

    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  // Hàm tìm tên nhân vien
  timNhanvien(event) {
    event.preventDefault();
    const tenNhap = event.target.tenNhap.value;
    this.setState({ tenTim: tenNhap });
  }

  // Hàm trả touched về true, khi không có dữ liệu trong ô input
  handleBlur = (field) => (event) => {
    this.setState({
      touched: { ...this.state.touched, [field]: true },
    });
  };

  // Hàm thay đổi trạng thái dữ liệu khi có dữ liệu trong ô input
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  //  Hàm tạo 1 đối tượng sau khi nhấn nút submit
  handleSubmit = () => {
    const newStaff = {
      name: this.state.name,
      doB: this.state.doB,
      salaryScale: this.state.salaryScale,
      startDate: this.state.startDate,
      department: { name: this.state.departmentId },
      annualLeave: this.state.annualLeave,
      overTime: this.state.overTime,
      image: this.state.image,
    };

    this.props.onAdd(newStaff);
  };

  // Hàm báo lỗi
  validate(name, doB, salaryScale, startDate, annualLeave, overTime) {
    const errors = {
      name: "",
      doB: "",
      salaryScale: "",
      startDate: "",
      annualLeave: "",
      overTime: "",
    };

    // Điều kiện, thông báo lỗi
    if (this.state.touched.name && name.length < 2)
      errors.name = "Tên quá ngắn: >= 2";
    else if (this.state.touched.name && name.length > 30)
      errors.name = "Tên quá dài: <= 30";

    if (this.state.touched.doB && doB.length < 1) errors.doB = "Thiếu dữ liệu";
    if (this.state.touched.salaryScale && salaryScale.length < 1)
      errors.salaryScale = "Thiếu dữ liệu";
    if (this.state.touched.startDate && startDate.length < 1)
      errors.startDate = "Thiếu dữ liệu";
    if (this.state.touched.annualLeave && annualLeave.length < 1)
      errors.annualLeave = "Thiếu dữ liệu";
    if (this.state.touched.overTime && overTime.length < 1)
      errors.overTime = "Thiếu dữ liệu";

    return errors;
  }

  // Hàm bật tắt của sổ form nhập
  toggleModal() {
    this.setState({
      modalOpen: !this.state.modalOpen,
    });
  }

  render() {
    const errors = this.validate(
      this.state.name,
      this.state.doB,
      this.state.salaryScale,
      this.state.startDate,
      this.state.annualLeave,
      this.state.overTime
    );

    // //////////////////////////////////////////////////////////////////////////////////////
    // Tình huống 1: Tìm nhân viên
    const staffList = this.props.staffs
      .filter((val) => {
        if (this.state.tenTim === "") return val;
        else if (
          val.name.toLowerCase().includes(this.state.tenTim.toLowerCase())
        )
          return val;
        return 0;
      })
      .map((val) => {
        return (
          <div className="col-6 col-md-4 col-lg-2 mt-3 mb-3" key={val.id}>
            <RenderStaffs staff={val} />
          </div>
        );
      });

    // Các chức năng được bổ sung trong ASM_3
    return (
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-6 mt-3">
            <div className="row">
              <div className="col-10 col-md-10">
                <h2>Nhân Viên</h2>
              </div>
              <div className="col-2 col-auto">
                <Button outline onClick={this.toggleModal}>
                  <span className="fa fa-plus fa-lg"></span>
                </Button>
              </div>
            </div>
          </div>

          {/* Chức năng tìm kiếm nhân viên */}
          <div className="col-12 col-md-6 mt-3">
            <form onSubmit={this.timNhanvien} className="form-group row">
              <div className="col-8 col-md-8">
                <input
                  type="text"
                  name="tenNhap"
                  className="form-control"
                  placeholder="Tìm kiếm nhân viên ..."
                />
              </div>
              <div className="col-4 col-md-4">
                <button className="btn btn-success" type="submit">
                  Tìm
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="col-12">
          <hr />
        </div>

        {/*  // //////////////////////////////////////////////////////////////////////////////
    // Tình huống 2: Thêm nhân viên mới */}
        <Modal isOpen={this.state.modalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Thêm Nhân Viên</ModalHeader>
          <ModalBody>
            <Form onSubmit={(value) => this.handleSubmit(value)}>
              <Row className="control-group">
                <Label htmlFor=".name" md={4}>
                  Tên
                </Label>
                <Col md={8}>
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    className="form-control"
                    value={this.state.name}
                    valid={errors.name === ""}
                    invalid={errors.name !== ""}
                    onBlur={this.handleBlur("name")}
                    onChange={this.handleInputChange}
                  />
                  <FormFeedback>{errors.name}</FormFeedback>
                </Col>
              </Row>
              <Row className="control-group">
                <Label htmlFor="doB" md={4}>
                  Ngày sinh
                </Label>
                <Col md={8}>
                  <Input
                    type="date"
                    name="doB"
                    id="doB"
                    value={this.state.doB}
                    valid={errors.doB === ""}
                    invalid={errors.doB !== ""}
                    onBlur={this.handleBlur("doB")}
                    onChange={this.handleInputChange}
                  />
                  <FormFeedback>{errors.doB}</FormFeedback>
                </Col>
              </Row>
              <Row className="control-group">
                <Label htmlFor="startDate" md={4}>
                  Ngày vào công ty
                </Label>
                <Col md={8}>
                  <Input
                    type="date"
                    name="startDate"
                    id="startDate"
                    valid={errors.startDate === ""}
                    invalid={errors.startDate !== ""}
                    onBlur={this.handleBlur("startDate")}
                    onChange={this.handleInputChange}
                  />
                  <FormFeedback>{errors.startDate}</FormFeedback>
                </Col>
              </Row>
              <Row className="control-group">
                <Label htmlFor="department" md={4}>
                  Phòng ban
                </Label>
                <Col md={8}>
                  <Input
                    type="select"
                    id="departmentId"
                    name="departmentId"
                    className="form-control"
                    value={this.state.departmentId}
                    onBlur={this.handleBlur("departmentId")}
                    onChange={this.handleInputChange}
                  >
                    <option>Sale</option>
                    <option>HR</option>
                    <option>Marketing</option>
                    <option>IT</option>
                    <option>Finance</option>
                  </Input>
                </Col>
              </Row>
              <Row className="control-group">
                <Label htmlFor="salaryScale" md={4}>
                  Hệ số lương
                </Label>
                <Col md={8}>
                  <Input
                    type="text"
                    id="salaryScale"
                    name="salaryScale"
                    placeholder="1.0 -> 3.0"
                    className="form-control"
                    value={this.state.salaryScale}
                    valid={errors.salaryScale === ""}
                    invalid={errors.salaryScale !== ""}
                    onBlur={this.handleBlur("salaryScale")}
                    onChange={this.handleInputChange}
                  />
                  <FormFeedback>{errors.salaryScale}</FormFeedback>
                </Col>
              </Row>
              <Row className="control-group">
                <Label htmlFor="annualLeave" md={4}>
                  Số ngày nghỉ còn lại
                </Label>
                <Col md={8}>
                  <Input
                    type="text"
                    id="annualLeave"
                    name="annualLeave"
                    className="form-control"
                    value={this.state.annualLeave}
                    valid={errors.annualLeave === ""}
                    invalid={errors.annualLeave !== ""}
                    onBlur={this.handleBlur("annualLeave")}
                    onChange={this.handleInputChange}
                  />
                  <FormFeedback>{errors.annualLeave}</FormFeedback>
                </Col>
              </Row>
              <Row className="control-group">
                <Label htmlFor="overTime" md={4}>
                  Số ngày đã làm thêm
                </Label>
                <Col md={8}>
                  <Input
                    type="text"
                    id="overTime"
                    name="overTime"
                    className="form-control"
                    value={this.state.overTime}
                    valid={errors.overTime === ""}
                    invalid={errors.overTime !== ""}
                    onBlur={this.handleBlur("overTime")}
                    onChange={this.handleInputChange}
                  />
                  <FormFeedback>{errors.overTime}</FormFeedback>
                </Col>
              </Row>
              <Row className="control-group">
                <Col md={{ size: 10, offset: 2 }}>
                  <Button type="submit" color="success">
                    Thêm
                  </Button>
                </Col>
              </Row>
            </Form>
          </ModalBody>
        </Modal>

        {/* Hiện thị danh sách tất cả nhân viên */}
        <div className="row shadow mb-5 mt-5">{staffList}</div>
      </div>
    );
  }
}
export default StaffList;
