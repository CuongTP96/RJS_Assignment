import React from "react";
import { Card, CardImg, CardBody, CardTitle } from "reactstrap";
import { Link } from "react-router-dom";

function StaffList(props) {
  const DSNhanVien = props.staffs.map((nv) => {
    return (
      <div className="col-12 col-md-2 mt-1">
        <Card>
          <Link to={`/nhanvien/${nv.id}`}>
            <CardImg width="100%" src={nv.image} alt={nv.name} />
            <CardBody>
              <p>{nv.name}</p>
            </CardBody>
          </Link>
        </Card>
      </div>
    );
  });

  return (
    <div className="container">
      <div className="row">{DSNhanVien}</div>
    </div>
  );
}

export default StaffList;
