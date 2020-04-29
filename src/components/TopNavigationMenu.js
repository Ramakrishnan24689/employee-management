import React, { Component } from "react";
import { Menu, Row, Col } from "antd";
import { Link } from "react-router-dom";
import "antd/dist/antd.css";

class TopNavigationMenu extends Component {
  render() {
    return (
      <div>
        <Menu theme="dark" mode="horizontal">
          <Menu.Item style={{ width: "50%", textAlign: "center" }}>
            <Link to="/EmployeeGallery">Employee Directory</Link>
          </Menu.Item>
          <Menu.Item style={{ width: "50%", textAlign: "center" }}>
            <Link to="/ManageEmployee">Manage Employees</Link>
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

export default TopNavigationMenu;
