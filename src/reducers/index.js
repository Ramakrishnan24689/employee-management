import { combineReducers } from "redux";

const EmployeesReducer = (state = [], action) => {
  switch (action.type) {
    case "SETDATA":
      return action.employees;
    default:
      return state;
  }
};

const EditEmployeeReducer = (
  state = { employee: {}, request_type: "CREATE", visible: false },
  action
) => {
  switch (action.type) {
    case "EMPLOYEEDETAILS":
      return {
        employee: action.employee,
        request_type: action.request_type,
        visible: action.visible
      };
    default:
      return state;
  }
};

const AllReducers = combineReducers({
  employees: EmployeesReducer,
  employeeDetails: EditEmployeeReducer
});

export default AllReducers;
