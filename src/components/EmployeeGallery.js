import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editemployee, setdata } from "../actions";
import { Card, Avatar, Row, Col } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import EmployeeDetailsModal from "./EmployeeDetailsModal";

function EmployeeGallery() {
  const employees = useSelector(state => state.employees);
  const dispatch = useDispatch();

  useEffect(() => {
    if (employees.length == 0) {
      fetchEmployees();
    }
  }, []);

  const fetchEmployees = async () => {
    var emp_data_res = await fetch(
      "http://dummy.restapiexample.com/api/v1/employees"
    );
    var emp_data = await emp_data_res.json();
    dispatch(setdata(emp_data.data));
    arrangeCards();
  };

  const arrangeCards = () => {
    var arrangedCards = [];
    const col = 4;
    var counter = 0;
    while (counter < employees.length) {
      var rowitems = [];
      for (var i = 0; i < col && counter < employees.length; i = i + 1) {
        rowitems.push(employees[counter]);
        counter = counter + 1;
      }
      arrangedCards.push(rowitems);
    }
    return arrangedCards;
  };

  return (
    <div>
      {arrangeCards().map((row, index) => (
        <div key={"row_id_" + index} style={{ padding: 8 }}>
          <Row
            gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
            key={"emp_card_row" + index}
          >
            {row.map(employee => (
              <Col
                className="gutter-row"
                span={6}
                key={"emp_card_" + employee.id}
              >
                <div key={"emp_card_div" + employee.id}>
                  <Card
                    key={"emp_card_" + employee.id}
                    style={{ width: 300 }}
                    cover={
                      <img
                        alt="example"
                        src="https://cdn.dribbble.com/users/146798/screenshots/2484828/react_illo_800x600.png"
                      />
                    }
                    actions={[
                      <EllipsisOutlined
                        key={"more_" + employee.id}
                        onClick={() => {
                          dispatch(editemployee(employee, "EXPAND", true));
                        }}
                      />
                    ]}
                  >
                    <Card.Meta
                      avatar={
                        <Avatar
                          src={
                            employee.profile_image == null ||
                            employee.profile_image.trim() == ""
                              ? "https://clipartart.com/images/profile-image-icon-clipart-4.jpg"
                              : employee.profile_image.trim()
                          }
                        />
                      }
                      title={employee.employee_name}
                    />
                  </Card>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      ))}
      <div id="emp_det_modal">
        <EmployeeDetailsModal />
      </div>
    </div>
  );
}

export default EmployeeGallery;
