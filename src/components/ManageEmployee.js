import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editemployee, setdata } from "../actions";
import { Table, Button } from "antd";
import { EditOutlined, UserAddOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import EmployeeDetailsModal from "./EmployeeDetailsModal";

function ManageEmployee() {
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
  };

  const cols = [
    {
      title: "Name",
      dataIndex: "employee_name"
    },
    {
      title: "Age",
      dataIndex: "employee_age",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.employee_age - b.employee_age
    },
    {
      title: "Salary",
      dataIndex: "employee_salary",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.employee_salary - b.employee_salary
    },
    {
      title: "",
      key: "action",
      render: (text, record) => (
        <span>
          <EditOutlined
            onClick={() => {
              dispatch(editemployee(record, "EDIT", true));
            }}
          ></EditOutlined>
        </span>
      )
    }
  ];

  return (
    <div>
      <br></br>
      <Button
        type="primary"
        icon={<UserAddOutlined />}
        onClick={() => {
          dispatch(editemployee({}, "CREATE", true));
        }}
      >
        Add an Employee Record
      </Button>
      <br></br>
      <br></br>
      <Table
        columns={cols}
        dataSource={employees}
        rowKey={record => {
          return "row_id_" + record.id;
        }}
      />
      <EmployeeDetailsModal />
    </div>
  );
}

export default ManageEmployee;
