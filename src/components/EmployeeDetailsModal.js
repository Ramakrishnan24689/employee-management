import React, { useEffect, useState } from "react";
import { Modal, Form, Input } from "antd";
import "antd/dist/antd.css";
import { useSelector, useDispatch } from "react-redux";
import { setdata, editemployee } from "../actions";
import axios from "axios";

function EmployeeDetailsModal() {
  const employees = useSelector(state => state.employees);
  const employeeDetails = useSelector(state => state.employeeDetails);
  const dispatch = useDispatch();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    var copy = Object.assign({}, employeeDetails);
    console.log(copy);
    if (copy.employee.id == null) {
      console.log("inside");
      copy.employee = {
        employee_name: "",
        employee_age: "",
        employee_salary: "",
        profile_image: ""
      };
    }
    form.setFieldsValue({
      employee: copy.employee
    });
    setConfirmLoading(false);
  }, [employeeDetails]);

  const updateEmployees = data => {
    dispatch(setdata(data));
  };

  const createEmployee = async post_data => {
    post_data.id = Math.random();
    var copy = employees;
    copy.push(post_data);
    updateEmployees(Object.assign([], copy));
  };

  const updateEmployee = async (post_data, id) => {
    var copy = employees;
    for (var i = 0; i < copy.length; i++) {
      if (copy[i].id == id) {
        copy[i].employee_name = post_data.employee_name;
        copy[i].employee_age = post_data.employee_age;
        copy[i].employee_salary = post_data.employee_salary;
        copy[i].profile_image = post_data.profile_image;
        break;
      }
    }
    updateEmployees(Object.assign([], copy));
  };

  return (
    <div>
      <Modal
        title={
          employeeDetails.request_type == "EXPAND"
            ? "Employee Details"
            : employeeDetails.request_type == "EDIT"
            ? "Edit Employee Details"
            : "Create New Employee Record"
        }
        centered={true}
        visible={employeeDetails.visible}
        confirmLoading={confirmLoading}
        okText={
          employeeDetails.request_type == "EXPAND"
            ? "OK"
            : employeeDetails.request_type == "EDIT"
            ? "UPDATE"
            : "CREATE"
        }
        cancelText="CANCEL"
        onCancel={() => {
          dispatch(editemployee({}, "CREATE", false));
        }}
        onOk={() => {
          if (employeeDetails.request_type == "EXPAND") {
            dispatch(editemployee({}, "CREATE", false));
          } else {
            setConfirmLoading(true);
            form
              .validateFields()
              .then(values => {
                if (employeeDetails.request_type == "EDIT") {
                  updateEmployee(values.employee, employeeDetails.employee.id);
                  setConfirmLoading(false);
                  dispatch(editemployee({}, "CREATE", false));
                } else {
                  createEmployee(values.employee);
                  setConfirmLoading(false);
                  dispatch(editemployee({}, "CREATE", false));
                }
              })
              .catch(info => {
                console.log("Validate Failed:", info);
                setConfirmLoading(false);
                dispatch(editemployee({}, "CREATE", false));
              });
          }
        }}
        closable={false}
        maskClosable={false}
      >
        <Form form={form} layout="vertical" name="form_in_modal">
          <Form.Item
            name={["employee", "employee_name"]}
            label="Name"
            rules={[
              {
                required: true,
                message: "Please input the name of employee!"
              }
            ]}
          >
            <Input disabled={employeeDetails.request_type == "EXPAND"} />
          </Form.Item>
          <Form.Item
            name={["employee", "employee_age"]}
            label="Age"
            rules={[
              {
                required: true,
                message: "Age should be entered!"
              }
            ]}
          >
            <Input disabled={employeeDetails.request_type == "EXPAND"} />
          </Form.Item>
          <Form.Item
            name={["employee", "employee_salary"]}
            label="Salary"
            rules={[
              {
                required: true,
                message: "Please enter the salary for employee!"
              }
            ]}
          >
            <Input disabled={employeeDetails.request_type == "EXPAND"} />
          </Form.Item>
          <Form.Item
            name={["employee", "profile_image"]}
            label="Profile Picture"
            rules={[
              {
                type: "url",
                message:
                  "Please enter the URL of publicly accessible image for employee!"
              }
            ]}
          >
            <Input disabled={employeeDetails.request_type == "EXPAND"} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default EmployeeDetailsModal;
