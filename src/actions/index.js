export const SETDATA = "SETDATA";
export const EMPLOYEEDETAILS = "EMPLOYEEDETAILS";

export const setdata = employees => {
  return {
    type: SETDATA,
    employees: employees
  };
};

export const editemployee = (employee, request_type, visible) => {
  return {
    type: EMPLOYEEDETAILS,
    employee: employee,
    request_type: request_type,
    visible: visible
  };
};
