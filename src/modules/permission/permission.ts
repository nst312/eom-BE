import { PERMISSION } from '../../shared/constants/permission.constants';

export const SUPER_ADMIN_PERMISSION = [
  //Auth
  {
    module: 'Auth',
    label: 'Register',
    role: 'SUPER_ADMIN',
    permission: PERMISSION.CAN_REGISTER,
    isPermission: true,
  },
  {
    module: 'Auth',
    label: 'Login',
    role: 'SUPER_ADMIN',
    permission: PERMISSION.CAN_LOGIN,
    isPermission: true,
  },
  {
    module: 'Auth',
    label: 'Forgot Password',
    role: 'SUPER_ADMIN',
    permission: PERMISSION.CAN_FORGOT_PASSWORD,
    isPermission: true,
  },
  {
    module: 'Auth',
    label: 'Update Password',
    role: 'SUPER_ADMIN',
    permission: PERMISSION.CAN_UPDATE_FORGOT_TOKEN,
    isPermission: true,
  },

  //User
  {
    module: 'User',
    label: 'User List',
    role: 'SUPER_ADMIN',
    permission: PERMISSION.CAN_USER_LIST,
    isPermission: true,
  },
  {
    module: 'User',
    label: 'User Profile',
    role: 'SUPER_ADMIN',
    permission: PERMISSION.CAN_USER_PROFILE,
    isPermission: true,
  },
  {
    module: 'User',
    label: 'User Update Profile',
    role: 'SUPER_ADMIN',
    permission: PERMISSION.CAN_USER_UPDATE_PROFILE,
    isPermission: true,
  },
  {
    module: 'User',
    label: 'User Delete',
    role: 'SUPER_ADMIN',
    permission: PERMISSION.CAN_USER_DELETE,
    isPermission: true,
  },
  {
    module: 'User',
    label: 'User List Dashboard',
    role: 'SUPER_ADMIN',
    permission: PERMISSION.CAN_USER_LIST_DASHBOARD,
    isPermission: true,
  },
  {
    module: 'User',
    label: 'User List Role',
    role: 'SUPER_ADMIN',
    permission: PERMISSION.CAN_USER_LIST_ROLE,
    isPermission: true,
  },
  {
    module: 'User',
    label: 'User',
    role: 'SUPER_ADMIN',
    permission: PERMISSION.CAN_USER,
    isPermission: true,
  },
  {
    module: 'User',
    label: 'User Update Password',
    role: 'SUPER_ADMIN',
    permission: PERMISSION.CAN_USER_UPDATE_PASSWORD,
    isPermission: true,
  },
  {
    module: 'User',
    label: 'User Update Role',
    role: 'SUPER_ADMIN',
    permission: PERMISSION.CAN_USER_UPDATE_ROLE,
    isPermission: true,
  },

  // Employee
  {
    module: 'Employee',
    label: 'Employee List',
    role: 'SUPER_ADMIN',
    permission: PERMISSION.CAN_EMPLOYEE_LIST,
    isPermission: true,
  },
  {
    module: 'Employee',
    label: 'Employee',
    role: 'SUPER_ADMIN',
    permission: PERMISSION.CAN_EMPLOYEE,
    isPermission: true,
  },
  {
    module: 'Employee',
    label: 'Employee Delete',
    role: 'SUPER_ADMIN',
    permission: PERMISSION.CAN_EMPLOYEE_DELETE,
    isPermission: true,
  },
  {
    module: 'Employee',
    label: 'Employee Update',
    role: 'SUPER_ADMIN',
    permission: PERMISSION.CAN_EMPLOYEE_UPDATE,
    isPermission: true,
  },

  // Companies
  {
    module: 'Companies',
    label: 'Companies List',
    role: 'SUPER_ADMIN',
    permission: PERMISSION.CAN_COMPANY_LIST,
    isPermission: true,
  },
  {
    module: 'Companies',
    label: 'Companies Update',
    role: 'SUPER_ADMIN',
    permission: PERMISSION.CAN_COMPANY_UPDATE,
    isPermission: true,
  },
  {
    module: 'Companies',
    label: 'Companies Delete',
    role: 'SUPER_ADMIN',
    permission: PERMISSION.CAN_COMPANY_DELETE,
    isPermission: true,
  },
  {
    module: 'Companies',
    label: 'Companies Department list',
    role: 'SUPER_ADMIN',
    permission: PERMISSION.CAN_COMPANY_DEPARTMENT_LIST,
    isPermission: true,
  },
  {
    module: 'Companies',
    label: 'Companies Department ',
    role: 'SUPER_ADMIN',
    permission: PERMISSION.CAN_COMPANY_DEPARTMENT,
    isPermission: true,
  },
  {
    module: 'Companies',
    label: 'Companies Department Add ',
    role: 'SUPER_ADMIN',
    permission: PERMISSION.CAN_COMPANY_DEPARTMENT_ADD,
    isPermission: true,
  },
  {
    module: 'Companies',
    label: 'Companies Department Update ',
    role: 'SUPER_ADMIN',
    permission: PERMISSION.CAN_COMPANY_DEPARTMENT_UPDATE,
    isPermission: true,
  },
  {
    module: 'Companies',
    label: 'Companies Department Delete ',
    role: 'SUPER_ADMIN',
    permission: PERMISSION.CAN_COMPANY_DEPARTMENT_DELETE,
    isPermission: true,
  },

  //Client
  {
    module: 'Client',
    label: 'Client Add ',
    role: 'SUPER_ADMIN',
    permission: PERMISSION.CAN_CLIENT_ADD,
    isPermission: true,
  },
  {
    module: 'Client',
    label: 'Client Delete ',
    role: 'SUPER_ADMIN',
    permission: PERMISSION.CAN_CLIENT_DELETE,
    isPermission: true,
  },
  {
    module: 'Client',
    label: 'Client List ',
    role: 'SUPER_ADMIN',
    permission: PERMISSION.CAN_CLIENT_LIST,
    isPermission: true,
  },
  {
    module: 'Client',
    label: 'Client Update ',
    role: 'SUPER_ADMIN',
    permission: PERMISSION.CAN_CLIENT_UPDATE,
    isPermission: true,
  },
  {
    module: 'Client',
    label: 'Client ',
    role: 'SUPER_ADMIN',
    permission: PERMISSION.CAN_CLIENT,
    isPermission: true,
  },

  // User Address
  {
    module: 'User Address',
    label: 'User Address',
    role: 'SUPER_ADMIN',
    permission: PERMISSION.CAN_ADDRESS,
    isPermission: true,
  },

  // Company Address
  {
    module: 'Company_Address',
    label: 'Company Address',
    role: 'SUPER_ADMIN',
    permission: PERMISSION.CAN_COMPANY_ADDRESS,
    isPermission: true,
  },

  // Bank
  {
    module: 'Bank',
    label: 'Bank detail Add',
    role: 'SUPER_ADMIN',
    permission: PERMISSION.CAN_BANK_ADD,
    isPermission: true,
  },
  {
    module: 'Bank',
    label: 'Bank detail Update',
    role: 'SUPER_ADMIN',
    permission: PERMISSION.CAN_BANK_UPDATE,
    isPermission: true,
  },

  // course certificate
  {
    module: 'Course Certificate',
    label: 'Course Verified',
    role: 'SUPER_ADMIN',
    permission: PERMISSION.CAN_BANK_UPDATE,
    isPermission: true,
  },

  // document
  {
    module: 'Document',
    label: 'Document Verified',
    role: 'SUPER_ADMIN',
    permission: PERMISSION.CAN_DOC_VERIFIED,
    isPermission: true,
  },

  // invitation
  {
    module: 'Invitation',
    label: 'Invitation List',
    role: 'SUPER_ADMIN',
    permission: PERMISSION.CAN_INVITATION_LIST,
    isPermission: true,
  },
  {
    module: 'Invitation',
    label: 'Invitation Add',
    role: 'SUPER_ADMIN',
    permission: PERMISSION.CAN_INVITATION_ADD,
    isPermission: true,
  },
  {
    module: 'Invitation',
    label: 'Invitation Resend',
    role: 'SUPER_ADMIN',
    permission: PERMISSION.CAN_INVITATION_RESEND,
    isPermission: true,
  },
  {
    module: 'Invitation',
    label: 'Invitation Delete',
    role: 'SUPER_ADMIN',
    permission: PERMISSION.CAN_INVITATION_DELETE,
    isPermission: true,
  },
  {
    module: 'Invitation',
    label: 'Invitation Bulk Send',
    role: 'SUPER_ADMIN',
    permission: PERMISSION.CAN_INVITATION_BULK_SEND,
    isPermission: true,
  },
  {
    module: 'Invitation',
    label: 'Invitation Bulk Send',
    role: 'SUPER_ADMIN',
    permission: PERMISSION.CAN_INVITATION_BULK_SEND,
    isPermission: true,
  },
  {
    module: 'Invitation',
    label: 'Invitation Multiple Send',
    role: 'SUPER_ADMIN',
    permission: PERMISSION.CAN_INVITATION_MUL_SEND,
    isPermission: true,
  },

  //Department
  {
    module: 'Department',
    label: 'Department Add',
    role: 'SUPER_ADMIN',
    permission: PERMISSION.CAN_DEPARTMENT_ADD,
    isPermission: true,
  },
  {
    module: 'Department',
    label: 'Department Update',
    role: 'SUPER_ADMIN',
    permission: PERMISSION.CAN_DEPARTMENT_UPDATE,
    isPermission: true,
  },
  {
    module: 'Department',
    label: 'Department Delete',
    role: 'SUPER_ADMIN',
    permission: PERMISSION.CAN_DEPARTMENT_DELETE,
    isPermission: true,
  },

  //Job-position
  {
    module: 'Job Position',
    label: 'Job Position Add',
    role: 'SUPER_ADMIN',
    permission: PERMISSION.CAN_JOB_POSITION_ADD,
    isPermission: true,
  },
  {
    module: 'Job Position',
    label: 'Job Position List',
    role: 'SUPER_ADMIN',
    permission: PERMISSION.CAN_JOB_POSITION_LIST,
    isPermission: true,
  },
  {
    module: 'Job Position',
    label: 'Job Position Update',
    role: 'SUPER_ADMIN',
    permission: PERMISSION.CAN_JOB_POSITION_UPDATE,
    isPermission: true,
  },
  {
    module: 'Job Position',
    label: 'Job Position Delete',
    role: 'SUPER_ADMIN',
    permission: PERMISSION.CAN_JOB_POSITION_DELETE,
    isPermission: true,
  },
  {
    module: 'Job Position',
    label: 'Job Position',
    role: 'SUPER_ADMIN',
    permission: PERMISSION.CAN_JOB_POSITION,
    isPermission: true,
  },

  //Leave-rule
  {
    module: 'Leave Rule',
    label: 'Leave Rule Add',
    role: 'SUPER_ADMIN',
    permission: PERMISSION.CAN_LEAVE_RULE_ADD,
    isPermission: true,
  },
  {
    module: 'Leave Rule',
    label: 'Leave Rule Update',
    role: 'SUPER_ADMIN',
    permission: PERMISSION.CAN_LEAVE_RULE_UPDATE,
    isPermission: true,
  },
  {
    module: 'Leave Rule',
    label: 'Leave Rule Delete',
    role: 'SUPER_ADMIN',
    permission: PERMISSION.CAN_LEAVE_RULE_DELETE,
    isPermission: true,
  },
  {
    module: 'Leave Rule',
    label: 'Employee By Company',
    role: 'SUPER_ADMIN',
    permission: PERMISSION.CAN_EMPLOYEE_BY_COMPANY_LIST,
    isPermission: true,
  },
  {
    module: 'Leave Rule',
    label: 'Assign Leave Rule',
    role: 'SUPER_ADMIN',
    permission: PERMISSION.CAN_ASSIGN_LEAVE_RULE,
    isPermission: true,
  },
  {
    module: 'Leave Rule',
    label: 'Assign Leave Rule Delete',
    role: 'SUPER_ADMIN',
    permission: PERMISSION.CAN_ASSIGN_LEAVE_RULE_DELETE,
    isPermission: true,
  },

  //leaves-master
  {
    module: 'Leaves Master',
    label: 'Leave Request Mail',
    role: 'SUPER_ADMIN',
    permission: PERMISSION.CAN_LEAVE_REQUEST_MAIL,
    isPermission: true,
  },
  {
    module: 'Leaves Master',
    label: 'Leave Update',
    role: 'SUPER_ADMIN',
    permission: PERMISSION.CAN_LEAVE_UPDATE,
    isPermission: true,
  },
  {
    module: 'Leaves Master',
    label: 'Leave List',
    role: 'SUPER_ADMIN',
    permission: PERMISSION.CAN_LEAVE_LIST,
    isPermission: true,
  },

  //works
  {
    module: 'Works',
    label: 'Works Download',
    role: 'SUPER_ADMIN',
    permission: PERMISSION.CAN_WORKS_DOWNLOAD,
    isPermission: true,
  },

  //salary
  {
    module: 'Salary',
    label: 'Salary ',
    role: 'SUPER_ADMIN',
    permission: PERMISSION.CAN_SALARY,
    isPermission: true,
  },
  {
    module: 'Salary',
    label: 'Salary List',
    role: 'SUPER_ADMIN',
    permission: PERMISSION.CAN_SALARY_LIST,
    isPermission: true,
  },
  {
    module: 'Salary',
    label: 'Salary Send',
    role: 'SUPER_ADMIN',
    permission: PERMISSION.CAN_SALARY_SEND,
    isPermission: true,
  },
  {
    module: 'Salary',
    label: 'Salary Add',
    role: 'SUPER_ADMIN',
    permission: PERMISSION.CAN_SALARY_ADD,
    isPermission: true,
  },
  {
    module: 'Salary',
    label: 'Salary Update',
    role: 'SUPER_ADMIN',
    permission: PERMISSION.CAN_SALARY_UPDATE,
    isPermission: true,
  },
  {
    module: 'Salary',
    label: 'Salary Download',
    permission: PERMISSION.CAN_SALARY_DOWNLOAD,
    role: 'SUPER_ADMIN',
    isPermission: true,
  },
  {
    module: 'Salary',
    label: 'Salary History',
    permission: PERMISSION.CAN_SALARY_HISTORY,
    role: 'SUPER_ADMIN',
    isPermission: true,
  },
  {
    module: 'Salary',
    label: 'Salary History Download',
    permission: PERMISSION.CAN_SALARY_HISTORY_DOWNLOAD,
    role: 'SUPER_ADMIN',
    isPermission: true,
  },

  //Announcement
  {
    module: 'Announcement',
    label: 'Announcement',
    role: 'SUPER_ADMIN',
    permission: PERMISSION.CAN_ANNOUNCEMENT,
    isPermission: true,
  },
  {
    module: 'Announcement',
    label: 'Announcement List',
    role: 'SUPER_ADMIN',
    permission: PERMISSION.CAN_ANNOUNCEMENT_LIST,
    isPermission: true,
  },
  {
    module: 'Announcement',
    label: 'Announcement Add',
    role: 'SUPER_ADMIN',
    permission: PERMISSION.CAN_ANNOUNCEMENT_ADD,
    isPermission: true,
  },
  {
    module: 'Announcement',
    label: 'Announcement Update',
    role: 'SUPER_ADMIN',
    permission: PERMISSION.CAN_ANNOUNCEMENT_UPDATE,
    isPermission: true,
  },
  {
    module: 'Announcement',
    label: 'Announcement Delete',
    role: 'SUPER_ADMIN',
    permission: PERMISSION.CAN_ANNOUNCEMENT_DELETE,
    isPermission: true,
  },

  //company-policy
  {
    module: 'Company Policy',
    label: 'Company Policy Add',
    role: 'SUPER_ADMIN',
    permission: PERMISSION.CAN_COMPANY_POLICY_ADD,
    isPermission: true,
  },
  {
    module: 'Company Policy',
    label: 'Company Policy Update',
    role: 'SUPER_ADMIN',
    permission: PERMISSION.CAN_COMPANY_POLICY_UPDATE,
    isPermission: true,
  },

  //Expense
  {
    module: 'Expense',
    label: 'Expense Add',
    role: 'SUPER_ADMIN',
    permission: PERMISSION.CAN_EXPENSE_ADD,
    isPermission: false,
  },
  {
    module: 'Expense',
    label: 'Expense Update',
    role: 'SUPER_ADMIN',
    permission: PERMISSION.CAN_EXPENSE_UPDATE,
    isPermission: false,
  },
  {
    module: 'Expense',
    label: 'Expense Delete',
    role: 'SUPER_ADMIN',
    permission: PERMISSION.CAN_EXPENSE_DELETE,
    isPermission: false,
  },
  {
    module: 'Expense',
    label: 'Expense List',
    role: 'SUPER_ADMIN',
    permission: PERMISSION.CAN_EXPENSE_LIST,
    isPermission: false,
  },
  {
    module: 'Expense',
    label: 'Expense Approved',
    role: 'SUPER_ADMIN',
    permission: PERMISSION.CAN_EXPENSE_APPROVED,
    isPermission: true,
  },
  {
    module: 'Expense',
    label: 'Expense Rejected',
    role: 'SUPER_ADMIN',
    permission: PERMISSION.CAN_EXPENSE_REJECTED,
    isPermission: true,
  },
  {
    module: 'Expense',
    label: 'Expense Paid',
    role: 'SUPER_ADMIN',
    permission: PERMISSION.CAN_EXPENSE_PAID,
    isPermission: true,
  },

  // Expense Category
  {
    module: 'Expense Category',
    label: 'Expense Category Add',
    role: 'SUPER_ADMIN',
    permission: PERMISSION.CAN_EXPENSE_CATEGORY_ADD,
    isPermission: true,
  },
  {
    module: 'Expense Category',
    label: 'Expense Category Update',
    role: 'SUPER_ADMIN',
    permission: PERMISSION.CAN_EXPENSE_CATEGORY_UPDATE,
    isPermission: true,
  },
  {
    module: 'Expense Category',
    label: 'Expense Category List',
    role: 'SUPER_ADMIN',
    permission: PERMISSION.CAN_EXPENSE_CATEGORY_LIST,
    isPermission: true,
  },
  {
    module: 'Expense Category',
    label: 'Expense Category Delete',
    role: 'SUPER_ADMIN',
    permission: PERMISSION.CAN_EXPENSE_CATEGORY_DELETE,
    isPermission: true,
  },

  //attendance-shift
  {
    module: 'Attendance Shift',
    label: 'Attendance Shift Add',
    role: 'SUPER_ADMIN',
    permission: PERMISSION.CAN_ATTENDANCE_RULES_ADD,
    isPermission: true,
  },
  {
    module: 'Attendance Shift',
    label: 'Attendance Shift Update',
    role: 'SUPER_ADMIN',
    permission: PERMISSION.CAN_ATTENDANCE_RULES_UPDATE,
    isPermission: true,
  },
  {
    module: 'Attendance Shift',
    label: 'Attendance Shift LIST',
    role: 'SUPER_ADMIN',
    permission: PERMISSION.CAN_ATTENDANCE_RULES_LIST,
    isPermission: true,
  },
  {
    module: 'Attendance Shift',
    label: 'Attendance Shift Delete',
    role: 'SUPER_ADMIN',
    permission: PERMISSION.CAN_ATTENDANCE_RULES_DELETE,
    isPermission: true,
  },
  {
    module: 'Attendance Shift',
    label: 'Attendance Shift Assign',
    role: 'SUPER_ADMIN',
    permission: PERMISSION.CAN_ATTENDANCE_SHIFT_ASSIGN,
    isPermission: true,
  },
  {
    module: 'Attendance Shift',
    label: 'Attendance Shift Delete',
    role: 'SUPER_ADMIN',
    permission: PERMISSION.CAN_ATTENDANCE_SHIFT_DELETE,
    isPermission: true,
  },

  //resume-master
  {
    module: 'Resume Master',
    label: 'Resume Master Preview',
    role: 'SUPER_ADMIN',
    permission: PERMISSION.CAN_RESUME_PREVIEW,
    isPermission: true,
  },
  {
    module: 'Resume Master',
    label: 'Resume Master List',
    role: 'SUPER_ADMIN',
    permission: PERMISSION.CAN_RESUME_LIST,
    isPermission: true,
  },
  {
    module: 'Resume Master',
    label: 'Resume Master Add',
    role: 'SUPER_ADMIN',
    permission: PERMISSION.CAN_RESUME_ADD,
    isPermission: true,
  },

  //invoice
  {
    module: 'Invoice',
    label: 'Invoice Add',
    role: 'SUPER_ADMIN',
    permission: PERMISSION.CAN_INVOICE_ADD,
    isPermission: true,
  },
  {
    module: 'Invoice',
    label: 'Invoice List',
    role: 'SUPER_ADMIN',
    permission: PERMISSION.CAN_INVOICE_LIST,
    isPermission: true,
  },
  {
    module: 'Invoice',
    label: 'Invoice Update',
    role: 'SUPER_ADMIN',
    permission: PERMISSION.CAN_INVOICE_UPDATE,
    isPermission: true,
  },
  {
    module: 'Invoice',
    label: 'Invoice Delete',
    role: 'SUPER_ADMIN',
    permission: PERMISSION.CAN_INVOICE_DELETE,
    isPermission: true,
  },

  //permission
  {
    module: 'Permission',
    label: 'Permission List',
    role: 'SUPER_ADMIN',
    permission: PERMISSION.CAN_PERMISSION_LIST,
    isPermission: true,
  },

  //employeeManager
  {
    module: 'EmployeeManager',
    label: 'EmployeeManager Add',
    role: 'SUPER_ADMIN',
    permission: PERMISSION.CAN_EMPLOYEE_MANAGER_ADD,
    isPermission: true,
  },
  {
    module: 'EmployeeManager',
    label: 'EmployeeManager List',
    role: 'SUPER_ADMIN',
    permission: PERMISSION.CAN_EMPLOYEE_MANAGER_BY_COMPANY_LIST,
    isPermission: true,
  },
  {
    module: 'EmployeeManager',
    label: 'Manager Of Employee List',
    role: 'SUPER_ADMIN',
    permission: PERMISSION.CAN_MANAGER_OF_EMPLOYEE_LIST,
    isPermission: true,
  },
  {
    module: 'EmployeeManager',
    label: 'Employees Of Manager List',
    role: 'SUPER_ADMIN',
    permission: PERMISSION.CAN_EMPLOYEES_OF_MANAGER_LIST,
    isPermission: true,
  },
  {
    module: 'EmployeeManager',
    label: 'EmployeeManager Update',
    role: 'SUPER_ADMIN',
    permission: PERMISSION.CAN_EMPLOYEE_MANAGER_UPDATE,
    isPermission: true,
  },
];

export const CEO_PERMISSION = [
  //Auth
  {
    module: 'Auth',
    label: 'Register',
    role: 'CEO',
    permission: PERMISSION.CAN_REGISTER,
    isPermission: true,
  },
  {
    module: 'Auth',
    label: 'Login',
    role: 'CEO',
    permission: PERMISSION.CAN_LOGIN,
    isPermission: true,
  },
  {
    module: 'Auth',
    label: 'Forgot Password',
    role: 'CEO',
    permission: PERMISSION.CAN_FORGOT_PASSWORD,
    isPermission: true,
  },
  {
    module: 'Auth',
    label: 'Update Password',
    role: 'CEO',
    permission: PERMISSION.CAN_UPDATE_FORGOT_TOKEN,
    isPermission: true,
  },

  //User
  {
    module: 'User',
    label: 'User List',
    role: 'CEO',
    permission: PERMISSION.CAN_USER_LIST,
    isPermission: true,
  },
  {
    module: 'User',
    label: 'User Profile',
    role: 'CEO',
    permission: PERMISSION.CAN_USER_PROFILE,
    isPermission: true,
  },
  {
    module: 'User',
    label: 'User Update Profile',
    role: 'CEO',
    permission: PERMISSION.CAN_USER_UPDATE_PROFILE,
    isPermission: true,
  },
  {
    module: 'User',
    label: 'User Delete',
    role: 'CEO',
    permission: PERMISSION.CAN_USER_DELETE,
    isPermission: true,
  },
  {
    module: 'User',
    label: 'User List Dashboard',
    role: 'CEO',
    permission: PERMISSION.CAN_USER_LIST_DASHBOARD,
    isPermission: true,
  },
  {
    module: 'User',
    label: 'User List Role',
    role: 'CEO',
    permission: PERMISSION.CAN_USER_LIST_ROLE,
    isPermission: true,
  },
  {
    module: 'User',
    label: 'User',
    role: 'CEO',
    permission: PERMISSION.CAN_USER,
    isPermission: true,
  },
  {
    module: 'User',
    label: 'User Update Password',
    role: 'CEO',
    permission: PERMISSION.CAN_USER_UPDATE_PASSWORD,
    isPermission: true,
  },
  {
    module: 'User',
    label: 'User Update Role',
    role: 'CEO',
    permission: PERMISSION.CAN_USER_UPDATE_ROLE,
    isPermission: true,
  },

  // Employee
  {
    module: 'Employee',
    label: 'Employee List',
    role: 'CEO',
    permission: PERMISSION.CAN_EMPLOYEE_LIST,
    isPermission: true,
  },
  {
    module: 'Employee',
    label: 'Employee',
    role: 'CEO',
    permission: PERMISSION.CAN_EMPLOYEE,
    isPermission: true,
  },
  {
    module: 'Employee',
    label: 'Employee Delete',
    role: 'CEO',
    permission: PERMISSION.CAN_EMPLOYEE_DELETE,
    isPermission: true,
  },
  {
    module: 'Employee',
    label: 'Employee Update',
    role: 'CEO',
    permission: PERMISSION.CAN_EMPLOYEE_UPDATE,
    isPermission: true,
  },

  // Companies
  {
    module: 'Companies',
    label: 'Companies List',
    role: 'CEO',
    permission: PERMISSION.CAN_COMPANY_LIST,
    isPermission: false,
  },
  {
    module: 'Companies',
    label: 'Companies Update',
    role: 'CEO',
    permission: PERMISSION.CAN_COMPANY_UPDATE,
    isPermission: false,
  },
  {
    module: 'Companies',
    label: 'Companies Delete',
    role: 'CEO',
    permission: PERMISSION.CAN_COMPANY_DELETE,
    isPermission: false,
  },
  {
    module: 'Companies',
    label: 'Companies Department list',
    role: 'CEO',
    permission: PERMISSION.CAN_COMPANY_DEPARTMENT_LIST,
    isPermission: true,
  },
  {
    module: 'Companies',
    label: 'Companies Department ',
    role: 'CEO',
    permission: PERMISSION.CAN_COMPANY_DEPARTMENT,
    isPermission: true,
  },
  {
    module: 'Companies',
    label: 'Companies Department Add ',
    role: 'CEO',
    permission: PERMISSION.CAN_COMPANY_DEPARTMENT_ADD,
    isPermission: true,
  },
  {
    module: 'Companies',
    label: 'Companies Department Update ',
    role: 'CEO',
    permission: PERMISSION.CAN_COMPANY_DEPARTMENT_UPDATE,
    isPermission: true,
  },
  {
    module: 'Companies',
    label: 'Companies Department Delete ',
    role: 'CEO',
    permission: PERMISSION.CAN_COMPANY_DEPARTMENT_DELETE,
    isPermission: true,
  },

  //Client
  {
    module: 'Client',
    label: 'Client Add ',
    role: 'CEO',
    permission: PERMISSION.CAN_CLIENT_ADD,
    isPermission: true,
  },
  {
    module: 'Client',
    label: 'Client Delete ',
    role: 'CEO',
    permission: PERMISSION.CAN_CLIENT_DELETE,
    isPermission: true,
  },
  {
    module: 'Client',
    label: 'Client List ',
    role: 'CEO',
    permission: PERMISSION.CAN_CLIENT_LIST,
    isPermission: true,
  },
  {
    module: 'Client',
    label: 'Client Update ',
    role: 'CEO',
    permission: PERMISSION.CAN_CLIENT_UPDATE,
    isPermission: true,
  },
  {
    module: 'Client',
    label: 'Client ',
    role: 'CEO',
    permission: PERMISSION.CAN_CLIENT,
    isPermission: true,
  },

  // User Address
  {
    module: 'User Address',
    label: 'User Address',
    role: 'CEO',
    permission: PERMISSION.CAN_ADDRESS,
    isPermission: true,
  },

  // Company Address
  {
    module: 'Company_Address',
    label: 'Company Address',
    role: 'CEO',
    permission: PERMISSION.CAN_COMPANY_ADDRESS,
    isPermission: true,
  },

  // Bank
  {
    module: 'Bank',
    label: 'Bank detail Add',
    role: 'CEO',
    permission: PERMISSION.CAN_BANK_ADD,
    isPermission: true,
  },
  {
    module: 'Bank',
    label: 'Bank detail Update',
    role: 'CEO',
    permission: PERMISSION.CAN_BANK_UPDATE,
    isPermission: true,
  },

  // course certificate
  {
    module: 'Course Certificate',
    label: 'Course Verified',
    role: 'CEO',
    permission: PERMISSION.CAN_COURSE_VERIFIED,
    isPermission: true,
  },

  // document
  {
    module: 'Document',
    label: 'Document Verified',
    role: 'CEO',
    permission: PERMISSION.CAN_DOC_VERIFIED,
    isPermission: true,
  },

  // invitation
  {
    module: 'Invitation',
    label: 'Invitation List',
    role: 'CEO',
    permission: PERMISSION.CAN_INVITATION_LIST,
    isPermission: true,
  },
  {
    module: 'Invitation',
    label: 'Invitation Add',
    role: 'CEO',
    permission: PERMISSION.CAN_INVITATION_ADD,
    isPermission: true,
  },
  {
    module: 'Invitation',
    label: 'Invitation Resend',
    role: 'CEO',
    permission: PERMISSION.CAN_INVITATION_RESEND,
    isPermission: true,
  },
  {
    module: 'Invitation',
    label: 'Invitation Delete',
    role: 'CEO',
    permission: PERMISSION.CAN_INVITATION_DELETE,
    isPermission: true,
  },
  {
    module: 'Invitation',
    label: 'Invitation Bulk Send',
    role: 'CEO',
    permission: PERMISSION.CAN_INVITATION_BULK_SEND,
    isPermission: true,
  },
  {
    module: 'Invitation',
    label: 'Invitation Bulk Send',
    role: 'CEO',
    permission: PERMISSION.CAN_INVITATION_BULK_SEND,
    isPermission: true,
  },
  {
    module: 'Invitation',
    label: 'Invitation Multiple Send',
    role: 'CEO',
    permission: PERMISSION.CAN_INVITATION_MUL_SEND,
    isPermission: true,
  },

  //Department
  {
    module: 'Department',
    label: 'Department Add',
    role: 'CEO',
    permission: PERMISSION.CAN_DEPARTMENT_ADD,
    isPermission: true,
  },
  {
    module: 'Department',
    label: 'Department Update',
    role: 'CEO',
    permission: PERMISSION.CAN_DEPARTMENT_UPDATE,
    isPermission: true,
  },
  {
    module: 'Department',
    label: 'Department Delete',
    role: 'CEO',
    permission: PERMISSION.CAN_DEPARTMENT_DELETE,
    isPermission: true,
  },

  //Job-position
  {
    module: 'Job Position',
    label: 'Job Position Add',
    role: 'CEO',
    permission: PERMISSION.CAN_JOB_POSITION_ADD,
    isPermission: true,
  },
  {
    module: 'Job Position',
    label: 'Job Position List',
    role: 'CEO',
    permission: PERMISSION.CAN_JOB_POSITION_LIST,
    isPermission: true,
  },
  {
    module: 'Job Position',
    label: 'Job Position Update',
    role: 'CEO',
    permission: PERMISSION.CAN_JOB_POSITION_UPDATE,
    isPermission: true,
  },
  {
    module: 'Job Position',
    label: 'Job Position Delete',
    role: 'CEO',
    permission: PERMISSION.CAN_JOB_POSITION_DELETE,
    isPermission: true,
  },
  {
    module: 'Job Position',
    label: 'Job Position',
    role: 'CEO',
    permission: PERMISSION.CAN_JOB_POSITION,
    isPermission: true,
  },

  //Leave-rule
  {
    module: 'Leave Rule',
    label: 'Leave Rule Add',
    role: 'CEO',
    permission: PERMISSION.CAN_LEAVE_RULE_ADD,
    isPermission: true,
  },
  {
    module: 'Leave Rule',
    label: 'Leave Rule Update',
    role: 'CEO',
    permission: PERMISSION.CAN_LEAVE_RULE_UPDATE,
    isPermission: true,
  },
  {
    module: 'Leave Rule',
    label: 'Leave Rule Delete',
    role: 'CEO',
    permission: PERMISSION.CAN_LEAVE_RULE_DELETE,
    isPermission: true,
  },
  {
    module: 'Leave Rule',
    label: 'Employee By Company',
    role: 'CEO',
    permission: PERMISSION.CAN_EMPLOYEE_BY_COMPANY_LIST,
    isPermission: true,
  },
  {
    module: 'Leave Rule',
    label: 'Assign Leave Rule',
    role: 'CEO',
    permission: PERMISSION.CAN_ASSIGN_LEAVE_RULE,
    isPermission: true,
  },
  {
    module: 'Leave Rule',
    label: 'Assign Leave Rule Delete',
    role: 'CEO',
    permission: PERMISSION.CAN_ASSIGN_LEAVE_RULE_DELETE,
    isPermission: true,
  },

  //leaves-master
  {
    module: 'Leaves Master',
    label: 'Leave Request Mail',
    role: 'CEO',
    permission: PERMISSION.CAN_LEAVE_REQUEST_MAIL,
    isPermission: false,
  },
  {
    module: 'Leaves Master',
    label: 'Leave Update',
    role: 'CEO',
    permission: PERMISSION.CAN_LEAVE_UPDATE,
    isPermission: true,
  },
  {
    module: 'Leaves Master',
    label: 'Leave List',
    role: 'CEO',
    permission: PERMISSION.CAN_LEAVE_LIST,
    isPermission: true,
  },

  //works
  {
    module: 'Works',
    label: 'Works Download',
    role: 'CEO',
    permission: PERMISSION.CAN_WORKS_DOWNLOAD,
    isPermission: true,
  },

  //salary
  {
    module: 'Salary',
    label: 'Salary ',
    role: 'CEO',
    permission: PERMISSION.CAN_SALARY,
    isPermission: true,
  },
  {
    module: 'Salary',
    label: 'Salary List',
    role: 'CEO',
    permission: PERMISSION.CAN_SALARY_LIST,
    isPermission: false,
  },
  {
    module: 'Salary',
    label: 'Salary Send',
    role: 'CEO',
    permission: PERMISSION.CAN_SALARY_SEND,
    isPermission: true,
  },
  {
    module: 'Salary',
    label: 'Salary Add',
    role: 'CEO',
    permission: PERMISSION.CAN_SALARY_ADD,
    isPermission: true,
  },
  {
    module: 'Salary',
    label: 'Salary Update',
    role: 'CEO',
    permission: PERMISSION.CAN_SALARY_UPDATE,
    isPermission: true,
  },
  {
    module: 'Salary',
    label: 'Salary Download',
    permission: PERMISSION.CAN_SALARY_DOWNLOAD,
    role: 'CEO',
    isPermission: true,
  },
  {
    module: 'Salary',
    label: 'Salary History',
    permission: PERMISSION.CAN_SALARY_HISTORY,
    role: 'CEO',
    isPermission: true,
  },
  {
    module: 'Salary',
    label: 'Salary History Download',
    permission: PERMISSION.CAN_SALARY_HISTORY_DOWNLOAD,
    role: 'CEO',
    isPermission: true,
  },

  //Announcement
  {
    module: 'Announcement',
    label: 'Announcement',
    role: 'CEO',
    permission: PERMISSION.CAN_ANNOUNCEMENT,
    isPermission: true,
  },
  {
    module: 'Announcement',
    label: 'Announcement List',
    role: 'CEO',
    permission: PERMISSION.CAN_ANNOUNCEMENT_LIST,
    isPermission: true,
  },
  {
    module: 'Announcement',
    label: 'Announcement Add',
    role: 'CEO',
    permission: PERMISSION.CAN_ANNOUNCEMENT_ADD,
    isPermission: true,
  },
  {
    module: 'Announcement',
    label: 'Announcement Update',
    role: 'CEO',
    permission: PERMISSION.CAN_ANNOUNCEMENT_UPDATE,
    isPermission: true,
  },
  {
    module: 'Announcement',
    label: 'Announcement Delete',
    role: 'CEO',
    permission: PERMISSION.CAN_ANNOUNCEMENT_DELETE,
    isPermission: true,
  },

  //company-policy
  {
    module: 'Company Policy',
    label: 'Company Policy Add',
    role: 'CEO',
    permission: PERMISSION.CAN_COMPANY_POLICY_ADD,
    isPermission: true,
  },
  {
    module: 'Company Policy',
    label: 'Company Policy Update',
    role: 'CEO',
    permission: PERMISSION.CAN_COMPANY_POLICY_UPDATE,
    isPermission: true,
  },

  //Expense
  {
    module: 'Expense',
    label: 'Expense Add',
    role: 'CEO',
    permission: PERMISSION.CAN_EXPENSE_ADD,
    isPermission: true,
  },
  {
    module: 'Expense',
    label: 'Expense Update',
    role: 'CEO',
    permission: PERMISSION.CAN_EXPENSE_UPDATE,
    isPermission: false,
  },
  {
    module: 'Expense',
    label: 'Expense Delete',
    role: 'CEO',
    permission: PERMISSION.CAN_EXPENSE_DELETE,
    isPermission: true,
  },
  {
    module: 'Expense',
    label: 'Expense List',
    role: 'CEO',
    permission: PERMISSION.CAN_EXPENSE_LIST,
    isPermission: true,
  },
  {
    module: 'Expense',
    label: 'Expense Approved',
    role: 'CEO',
    permission: PERMISSION.CAN_EXPENSE_APPROVED,
    isPermission: true,
  },
  {
    module: 'Expense',
    label: 'Expense Rejected',
    role: 'CEO',
    permission: PERMISSION.CAN_EXPENSE_REJECTED,
    isPermission: true,
  },
  {
    module: 'Expense',
    label: 'Expense Paid',
    role: 'CEO',
    permission: PERMISSION.CAN_EXPENSE_PAID,
    isPermission: true,
  },

  // Expense Category
  {
    module: 'Expense Category',
    label: 'Expense Category Add',
    role: 'CEO',
    permission: PERMISSION.CAN_EXPENSE_CATEGORY_ADD,
    isPermission: true,
  },
  {
    module: 'Expense Category',
    label: 'Expense Category Update',
    role: 'CEO',
    permission: PERMISSION.CAN_EXPENSE_CATEGORY_UPDATE,
    isPermission: true,
  },
  {
    module: 'Expense Category',
    label: 'Expense Category List',
    role: 'CEO',
    permission: PERMISSION.CAN_EXPENSE_CATEGORY_LIST,
    isPermission: true,
  },
  {
    module: 'Expense Category',
    label: 'Expense Category Delete',
    role: 'CEO',
    permission: PERMISSION.CAN_EXPENSE_CATEGORY_DELETE,
    isPermission: true,
  },

  //attendance-shift
  {
    module: 'Attendance Shift',
    label: 'Attendance Shift Add',
    role: 'CEO',
    permission: PERMISSION.CAN_ATTENDANCE_RULES_ADD,
    isPermission: true,
  },
  {
    module: 'Attendance Shift',
    label: 'Attendance Shift Update',
    role: 'CEO',
    permission: PERMISSION.CAN_ATTENDANCE_RULES_UPDATE,
    isPermission: true,
  },
  {
    module: 'Attendance Shift',
    label: 'Attendance Shift LIST',
    role: 'CEO',
    permission: PERMISSION.CAN_ATTENDANCE_RULES_LIST,
    isPermission: true,
  },
  {
    module: 'Attendance Shift',
    label: 'Attendance Shift Delete',
    role: 'CEO',
    permission: PERMISSION.CAN_ATTENDANCE_RULES_DELETE,
    isPermission: true,
  },
  {
    module: 'Attendance Shift',
    label: 'Attendance Shift Assign',
    role: 'CEO',
    permission: PERMISSION.CAN_ATTENDANCE_SHIFT_ASSIGN,
    isPermission: true,
  },
  {
    module: 'Attendance Shift',
    label: 'Attendance Shift Delete',
    role: 'CEO',
    permission: PERMISSION.CAN_ATTENDANCE_SHIFT_DELETE,
    isPermission: true,
  },

  //resume-master
  {
    module: 'Resume Master',
    label: 'Resume Master Preview',
    role: 'CEO',
    permission: PERMISSION.CAN_RESUME_PREVIEW,
    isPermission: true,
  },
  {
    module: 'Resume Master',
    label: 'Resume Master List',
    role: 'CEO',
    permission: PERMISSION.CAN_RESUME_LIST,
    isPermission: true,
  },
  {
    module: 'Resume Master',
    label: 'Resume Master Add',
    role: 'CEO',
    permission: PERMISSION.CAN_RESUME_ADD,
    isPermission: true,
  },

  //invoice
  {
    module: 'Invoice',
    label: 'Invoice Add',
    role: 'CEO',
    permission: PERMISSION.CAN_INVOICE_ADD,
    isPermission: true,
  },
  {
    module: 'Invoice',
    label: 'Invoice List',
    role: 'CEO',
    permission: PERMISSION.CAN_INVOICE_LIST,
    isPermission: true,
  },
  {
    module: 'Invoice',
    label: 'Invoice Update',
    role: 'CEO',
    permission: PERMISSION.CAN_INVOICE_UPDATE,
    isPermission: true,
  },
  {
    module: 'Invoice',
    label: 'Invoice Delete',
    role: 'CEO',
    permission: PERMISSION.CAN_INVOICE_DELETE,
    isPermission: true,
  },

  //permission
  {
    module: 'Permission',
    label: 'Permission List',
    role: 'CEO',
    permission: PERMISSION.CAN_PERMISSION_LIST,
    isPermission: true,
  },
  //employeeManager
  {
    module: 'EmployeeManager',
    label: 'EmployeeManager Add',
    role: 'CEO',
    permission: PERMISSION.CAN_EMPLOYEE_MANAGER_ADD,
    isPermission: true,
  },
  {
    module: 'EmployeeManager',
    label: 'EmployeeManager List',
    role: 'CEO',
    permission: PERMISSION.CAN_EMPLOYEE_MANAGER_BY_COMPANY_LIST,
    isPermission: true,
  },
  {
    module: 'EmployeeManager',
    label: 'Manager Of Employee List',
    role: 'CEO',
    permission: PERMISSION.CAN_MANAGER_OF_EMPLOYEE_LIST,
    isPermission: true,
  },
  {
    module: 'EmployeeManager',
    label: 'Employees Of Manager List',
    role: 'CEO',
    permission: PERMISSION.CAN_EMPLOYEES_OF_MANAGER_LIST,
    isPermission: true,
  },
  {
    module: 'EmployeeManager',
    label: 'EmployeeManager Update',
    role: 'CEO',
    permission: PERMISSION.CAN_EMPLOYEE_MANAGER_UPDATE,
    isPermission: true,
  },
];

export const EMPLOYEE_PERMISSION = [
  //Auth
  {
    module: 'Auth',
    label: 'Register',
    role: 'EMPLOYEE',
    permission: PERMISSION.CAN_REGISTER,
    isPermission: false,
  },
  {
    module: 'Auth',
    label: 'Login',
    role: 'EMPLOYEE',
    permission: PERMISSION.CAN_LOGIN,
    isPermission: true,
  },
  {
    module: 'Auth',
    label: 'Forgot Password',
    role: 'EMPLOYEE',
    permission: PERMISSION.CAN_FORGOT_PASSWORD,
    isPermission: true,
  },
  {
    module: 'Auth',
    label: 'Update Password',
    role: 'EMPLOYEE',
    permission: PERMISSION.CAN_UPDATE_FORGOT_TOKEN,
    isPermission: true,
  },

  //User
  {
    module: 'User',
    label: 'User List',
    role: 'EMPLOYEE',
    permission: PERMISSION.CAN_USER_LIST,
    isPermission: false,
  },
  {
    module: 'User',
    label: 'User Profile',
    role: 'EMPLOYEE',
    permission: PERMISSION.CAN_USER_PROFILE,
    isPermission: true,
  },
  {
    module: 'User',
    label: 'User Update Profile',
    role: 'EMPLOYEE',
    permission: PERMISSION.CAN_USER_UPDATE_PROFILE,
    isPermission: true,
  },
  {
    module: 'User',
    label: 'User Delete',
    role: 'EMPLOYEE',
    permission: PERMISSION.CAN_USER_DELETE,
    isPermission: false,
  },
  {
    module: 'User',
    label: 'User List Dashboard',
    role: 'EMPLOYEE',
    permission: PERMISSION.CAN_USER_LIST_DASHBOARD,
    isPermission: false,
  },
  {
    module: 'User',
    label: 'User List Role',
    role: 'EMPLOYEE',
    permission: PERMISSION.CAN_USER_LIST_ROLE,
    isPermission: false,
  },
  {
    module: 'User',
    label: 'User',
    role: 'EMPLOYEE',
    permission: PERMISSION.CAN_USER,
    isPermission: true,
  },
  {
    module: 'User',
    label: 'User Update Password',
    role: 'EMPLOYEE',
    permission: PERMISSION.CAN_USER_UPDATE_PASSWORD,
    isPermission: true,
  },
  {
    module: 'User',
    label: 'User Update Role',
    role: 'EMPLOYEE',
    permission: PERMISSION.CAN_USER_UPDATE_ROLE,
    isPermission: false,
  },

  // Employee
  {
    module: 'Employee',
    label: 'Employee List',
    role: 'EMPLOYEE',
    permission: PERMISSION.CAN_EMPLOYEE_LIST,
    isPermission: false,
  },
  {
    module: 'Employee',
    label: 'Employee',
    role: 'EMPLOYEE',
    permission: PERMISSION.CAN_EMPLOYEE,
    isPermission: false,
  },
  {
    module: 'Employee',
    label: 'Employee Delete',
    role: 'EMPLOYEE',
    permission: PERMISSION.CAN_EMPLOYEE_DELETE,
    isPermission: false,
  },
  {
    module: 'Employee',
    label: 'Employee Update',
    role: 'EMPLOYEE',
    permission: PERMISSION.CAN_EMPLOYEE_UPDATE,
    isPermission: false,
  },

  // Companies
  {
    module: 'Companies',
    label: 'Companies List',
    role: 'EMPLOYEE',
    permission: PERMISSION.CAN_COMPANY_LIST,
    isPermission: false,
  },
  {
    module: 'Companies',
    label: 'Companies Update',
    role: 'EMPLOYEE',
    permission: PERMISSION.CAN_COMPANY_UPDATE,
    isPermission: false,
  },
  {
    module: 'Companies',
    label: 'Companies Delete',
    role: 'EMPLOYEE',
    permission: PERMISSION.CAN_COMPANY_DELETE,
    isPermission: false,
  },
  {
    module: 'Companies',
    label: 'Companies Department list',
    role: 'EMPLOYEE',
    permission: PERMISSION.CAN_COMPANY_DEPARTMENT_LIST,
    isPermission: false,
  },
  {
    module: 'Companies',
    label: 'Companies Department ',
    role: 'EMPLOYEE',
    permission: PERMISSION.CAN_COMPANY_DEPARTMENT,
    isPermission: false,
  },
  {
    module: 'Companies',
    label: 'Companies Department Add ',
    role: 'EMPLOYEE',
    permission: PERMISSION.CAN_COMPANY_DEPARTMENT_ADD,
    isPermission: false,
  },
  {
    module: 'Companies',
    label: 'Companies Department Update ',
    role: 'EMPLOYEE',
    permission: PERMISSION.CAN_COMPANY_DEPARTMENT_UPDATE,
    isPermission: false,
  },
  {
    module: 'Companies',
    label: 'Companies Department Delete ',
    role: 'EMPLOYEE',
    permission: PERMISSION.CAN_COMPANY_DEPARTMENT_DELETE,
    isPermission: false,
  },

  //Client
  {
    module: 'Client',
    label: 'Client Add ',
    role: 'EMPLOYEE',
    permission: PERMISSION.CAN_CLIENT_ADD,
    isPermission: false,
  },
  {
    module: 'Client',
    label: 'Client Delete ',
    role: 'EMPLOYEE',
    permission: PERMISSION.CAN_CLIENT_DELETE,
    isPermission: false,
  },
  {
    module: 'Client',
    label: 'Client List ',
    role: 'EMPLOYEE',
    permission: PERMISSION.CAN_CLIENT_LIST,
    isPermission: false,
  },
  {
    module: 'Client',
    label: 'Client Update ',
    role: 'EMPLOYEE',
    permission: PERMISSION.CAN_CLIENT_UPDATE,
    isPermission: false,
  },
  {
    module: 'Client',
    label: 'Client ',
    role: 'EMPLOYEE',
    permission: PERMISSION.CAN_CLIENT,
    isPermission: false,
  },

  // User Address
  {
    module: 'User Address',
    label: 'User Address',
    role: 'EMPLOYEE',
    permission: PERMISSION.CAN_ADDRESS,
    isPermission: true,
  },

  // Company Address
  {
    module: 'Company_Address',
    label: 'Company Address',
    role: 'EMPLOYEE',
    permission: PERMISSION.CAN_COMPANY_ADDRESS,
    isPermission: true,
  },

  // Bank
  {
    module: 'Bank',
    label: 'Bank detail Add',
    role: 'EMPLOYEE',
    permission: PERMISSION.CAN_BANK_ADD,
    isPermission: true,
  },
  {
    module: 'Bank',
    label: 'Bank detail Update',
    role: 'EMPLOYEE',
    permission: PERMISSION.CAN_BANK_UPDATE,
    isPermission: true,
  },

  // course certificate
  {
    module: 'Course Certificate',
    label: 'Course Verified',
    role: 'EMPLOYEE',
    permission: PERMISSION.CAN_BANK_UPDATE,
    isPermission: false,
  },

  // document
  {
    module: 'Document',
    label: 'Document Verified',
    role: 'EMPLOYEE',
    permission: PERMISSION.CAN_DOC_VERIFIED,
    isPermission: false,
  },

  // invitation
  {
    module: 'Invitation',
    label: 'Invitation List',
    role: 'EMPLOYEE',
    permission: PERMISSION.CAN_INVITATION_LIST,
    isPermission: false,
  },
  {
    module: 'Invitation',
    label: 'Invitation Add',
    role: 'EMPLOYEE',
    permission: PERMISSION.CAN_INVITATION_ADD,
    isPermission: false,
  },
  {
    module: 'Invitation',
    label: 'Invitation Resend',
    role: 'EMPLOYEE',
    permission: PERMISSION.CAN_INVITATION_RESEND,
    isPermission: false,
  },
  {
    module: 'Invitation',
    label: 'Invitation Delete',
    role: 'EMPLOYEE',
    permission: PERMISSION.CAN_INVITATION_DELETE,
    isPermission: false,
  },
  {
    module: 'Invitation',
    label: 'Invitation Bulk Send',
    role: 'EMPLOYEE',
    permission: PERMISSION.CAN_INVITATION_BULK_SEND,
    isPermission: false,
  },
  {
    module: 'Invitation',
    label: 'Invitation Bulk Send',
    role: 'EMPLOYEE',
    permission: PERMISSION.CAN_INVITATION_BULK_SEND,
    isPermission: false,
  },
  {
    module: 'Invitation',
    label: 'Invitation Multiple Send',
    role: 'EMPLOYEE',
    permission: PERMISSION.CAN_INVITATION_MUL_SEND,
    isPermission: false,
  },

  //Department
  {
    module: 'Department',
    label: 'Department Add',
    role: 'EMPLOYEE',
    permission: PERMISSION.CAN_DEPARTMENT_ADD,
    isPermission: false,
  },
  {
    module: 'Department',
    label: 'Department Update',
    role: 'EMPLOYEE',
    permission: PERMISSION.CAN_DEPARTMENT_UPDATE,
    isPermission: false,
  },
  {
    module: 'Department',
    label: 'Department Delete',
    role: 'EMPLOYEE',
    permission: PERMISSION.CAN_DEPARTMENT_DELETE,
    isPermission: false,
  },

  //Job-position
  {
    module: 'Job Position',
    label: 'Job Position Add',
    role: 'EMPLOYEE',
    permission: PERMISSION.CAN_JOB_POSITION_ADD,
    isPermission: false,
  },
  {
    module: 'Job Position',
    label: 'Job Position List',
    role: 'EMPLOYEE',
    permission: PERMISSION.CAN_JOB_POSITION_LIST,
    isPermission: false,
  },
  {
    module: 'Job Position',
    label: 'Job Position Update',
    role: 'EMPLOYEE',
    permission: PERMISSION.CAN_JOB_POSITION_UPDATE,
    isPermission: false,
  },
  {
    module: 'Job Position',
    label: 'Job Position Delete',
    role: 'EMPLOYEE',
    permission: PERMISSION.CAN_JOB_POSITION_DELETE,
    isPermission: false,
  },
  {
    module: 'Job Position',
    label: 'Job Position',
    role: 'EMPLOYEE',
    permission: PERMISSION.CAN_JOB_POSITION,
    isPermission: false,
  },

  //Leave-rule
  {
    module: 'Leave Rule',
    label: 'Leave Rule Add',
    role: 'EMPLOYEE',
    permission: PERMISSION.CAN_LEAVE_RULE_ADD,
    isPermission: false,
  },
  {
    module: 'Leave Rule',
    label: 'Leave Rule Update',
    role: 'EMPLOYEE',
    permission: PERMISSION.CAN_LEAVE_RULE_UPDATE,
    isPermission: false,
  },
  {
    module: 'Leave Rule',
    label: 'Leave Rule Delete',
    role: 'EMPLOYEE',
    permission: PERMISSION.CAN_LEAVE_RULE_DELETE,
    isPermission: false,
  },
  {
    module: 'Leave Rule',
    label: 'Employee By Company',
    role: 'EMPLOYEE',
    permission: PERMISSION.CAN_EMPLOYEE_BY_COMPANY_LIST,
    isPermission: true,
  },
  {
    module: 'Leave Rule',
    label: 'Assign Leave Rule',
    role: 'EMPLOYEE',
    permission: PERMISSION.CAN_ASSIGN_LEAVE_RULE,
    isPermission: true,
  },
  {
    module: 'Leave Rule',
    label: 'Assign Leave Rule Delete',
    role: 'EMPLOYEE',
    permission: PERMISSION.CAN_ASSIGN_LEAVE_RULE_DELETE,
    isPermission: true,
  },

  //leaves-master
  {
    module: 'Leaves Master',
    label: 'Leave Request Mail',
    role: 'EMPLOYEE',
    permission: PERMISSION.CAN_LEAVE_REQUEST_MAIL,
    isPermission: true,
  },
  {
    module: 'Leaves Master',
    label: 'Leave Update',
    role: 'EMPLOYEE',
    permission: PERMISSION.CAN_LEAVE_UPDATE,
    isPermission: true,
  },
  {
    module: 'Leaves Master',
    label: 'Leave List',
    role: 'EMPLOYEE',
    permission: PERMISSION.CAN_LEAVE_LIST,
    isPermission: true,
  },

  //works
  {
    module: 'Works',
    label: 'Works Download',
    role: 'EMPLOYEE',
    permission: PERMISSION.CAN_WORKS_DOWNLOAD,
    isPermission: false,
  },

  //salary
  {
    module: 'Salary',
    label: 'Salary ',
    role: 'EMPLOYEE',
    permission: PERMISSION.CAN_SALARY,
    isPermission: true,
  },
  {
    module: 'Salary',
    label: 'Salary List',
    role: 'EMPLOYEE',
    permission: PERMISSION.CAN_SALARY_LIST,
    isPermission: true,
  },
  {
    module: 'Salary',
    label: 'Salary Send',
    role: 'EMPLOYEE',
    permission: PERMISSION.CAN_SALARY_SEND,
    isPermission: false,
  },
  {
    module: 'Salary',
    label: 'Salary Add',
    role: 'EMPLOYEE',
    permission: PERMISSION.CAN_SALARY_ADD,
    isPermission: false,
  },
  {
    module: 'Salary',
    label: 'Salary Update',
    role: 'EMPLOYEE',
    permission: PERMISSION.CAN_SALARY_UPDATE,
    isPermission: false,
  },
  {
    module: 'Salary',
    label: 'Salary Download',
    permission: PERMISSION.CAN_SALARY_DOWNLOAD,
    role: 'EMPLOYEE',
    isPermission: true,
  },
  {
    module: 'Salary',
    label: 'Salary History',
    permission: PERMISSION.CAN_SALARY_HISTORY,
    role: 'EMPLOYEE',
    isPermission: true,
  },
  {
    module: 'Salary',
    label: 'Salary History Download',
    permission: PERMISSION.CAN_SALARY_HISTORY_DOWNLOAD,
    role: 'EMPLOYEE',
    isPermission: true,
  },

  //Announcement
  {
    module: 'Announcement',
    label: 'Announcement',
    role: 'EMPLOYEE',
    permission: PERMISSION.CAN_ANNOUNCEMENT,
    isPermission: false,
  },
  {
    module: 'Announcement',
    label: 'Announcement List',
    role: 'EMPLOYEE',
    permission: PERMISSION.CAN_ANNOUNCEMENT_LIST,
    isPermission: true,
  },
  {
    module: 'Announcement',
    label: 'Announcement Add',
    role: 'EMPLOYEE',
    permission: PERMISSION.CAN_ANNOUNCEMENT_ADD,
    isPermission: false,
  },
  {
    module: 'Announcement',
    label: 'Announcement Update',
    role: 'EMPLOYEE',
    permission: PERMISSION.CAN_ANNOUNCEMENT_UPDATE,
    isPermission: false,
  },
  {
    module: 'Announcement',
    label: 'Announcement Delete',
    role: 'EMPLOYEE',
    permission: PERMISSION.CAN_ANNOUNCEMENT_DELETE,
    isPermission: false,
  },

  //company-policy
  {
    module: 'Company Policy',
    label: 'Company Policy Add',
    role: 'EMPLOYEE',
    permission: PERMISSION.CAN_COMPANY_POLICY_ADD,
    isPermission: false,
  },
  {
    module: 'Company Policy',
    label: 'Company Policy Update',
    role: 'EMPLOYEE',
    permission: PERMISSION.CAN_COMPANY_POLICY_UPDATE,
    isPermission: false,
  },

  //Expense
  {
    module: 'Expense',
    label: 'Expense Add',
    role: 'EMPLOYEE',
    permission: PERMISSION.CAN_EXPENSE_ADD,
    isPermission: true,
  },
  {
    module: 'Expense',
    label: 'Expense Update',
    role: 'EMPLOYEE',
    permission: PERMISSION.CAN_EXPENSE_UPDATE,
    isPermission: false,
  },
  {
    module: 'Expense',
    label: 'Expense Delete',
    role: 'EMPLOYEE',
    permission: PERMISSION.CAN_EXPENSE_DELETE,
    isPermission: true,
  },
  {
    module: 'Expense',
    label: 'Expense List',
    role: 'EMPLOYEE',
    permission: PERMISSION.CAN_EXPENSE_LIST,
    isPermission: true,
  },
  {
    module: 'Expense',
    label: 'Expense Approved',
    role: 'EMPLOYEE',
    permission: PERMISSION.CAN_EXPENSE_APPROVED,
    isPermission: false,
  },
  {
    module: 'Expense',
    label: 'Expense Rejected',
    role: 'EMPLOYEE',
    permission: PERMISSION.CAN_EXPENSE_REJECTED,
    isPermission: false,
  },
  {
    module: 'Expense',
    label: 'Expense Paid',
    role: 'EMPLOYEE',
    permission: PERMISSION.CAN_EXPENSE_PAID,
    isPermission: false,
  },

  // Expense Category
  {
    module: 'Expense Category',
    label: 'Expense Category Add',
    role: 'EMPLOYEE',
    permission: PERMISSION.CAN_EXPENSE_CATEGORY_ADD,
    isPermission: false,
  },
  {
    module: 'Expense Category',
    label: 'Expense Category Update',
    role: 'EMPLOYEE',
    permission: PERMISSION.CAN_EXPENSE_CATEGORY_UPDATE,
    isPermission: false,
  },
  {
    module: 'Expense Category',
    label: 'Expense Category List',
    role: 'EMPLOYEE',
    permission: PERMISSION.CAN_EXPENSE_CATEGORY_LIST,
    isPermission: false,
  },
  {
    module: 'Expense Category',
    label: 'Expense Category Delete',
    role: 'EMPLOYEE',
    permission: PERMISSION.CAN_EXPENSE_CATEGORY_DELETE,
    isPermission: false,
  },

  //attendance-shift
  {
    module: 'Attendance Shift',
    label: 'Attendance Shift Add',
    role: 'EMPLOYEE',
    permission: PERMISSION.CAN_ATTENDANCE_RULES_ADD,
    isPermission: false,
  },
  {
    module: 'Attendance Shift',
    label: 'Attendance Shift Update',
    role: 'EMPLOYEE',
    permission: PERMISSION.CAN_ATTENDANCE_RULES_UPDATE,
    isPermission: false,
  },
  {
    module: 'Attendance Shift',
    label: 'Attendance Shift LIST',
    role: 'EMPLOYEE',
    permission: PERMISSION.CAN_ATTENDANCE_RULES_LIST,
    isPermission: false,
  },
  {
    module: 'Attendance Shift',
    label: 'Attendance Shift Delete',
    role: 'EMPLOYEE',
    permission: PERMISSION.CAN_ATTENDANCE_RULES_DELETE,
    isPermission: false,
  },
  {
    module: 'Attendance Shift',
    label: 'Attendance Shift Assign',
    role: 'EMPLOYEE',
    permission: PERMISSION.CAN_ATTENDANCE_SHIFT_ASSIGN,
    isPermission: false,
  },
  {
    module: 'Attendance Shift',
    label: 'Attendance Shift Delete',
    role: 'EMPLOYEE',
    permission: PERMISSION.CAN_ATTENDANCE_SHIFT_DELETE,
    isPermission: false,
  },

  //resume-master
  {
    module: 'Resume Master',
    label: 'Resume Master Preview',
    role: 'EMPLOYEE',
    permission: PERMISSION.CAN_RESUME_PREVIEW,
    isPermission: true,
  },
  {
    module: 'Resume Master',
    label: 'Resume Master List',
    role: 'EMPLOYEE',
    permission: PERMISSION.CAN_RESUME_LIST,
    isPermission: true,
  },
  {
    module: 'Resume Master',
    label: 'Resume Master Add',
    role: 'EMPLOYEE',
    permission: PERMISSION.CAN_RESUME_ADD,
    isPermission: true,
  },

  //invoice
  {
    module: 'Invoice',
    label: 'Invoice Add',
    role: 'EMPLOYEE',
    permission: PERMISSION.CAN_INVOICE_ADD,
    isPermission: false,
  },
  {
    module: 'Invoice',
    label: 'Invoice List',
    role: 'EMPLOYEE',
    permission: PERMISSION.CAN_INVOICE_LIST,
    isPermission: false,
  },
  {
    module: 'Invoice',
    label: 'Invoice Update',
    role: 'EMPLOYEE',
    permission: PERMISSION.CAN_INVOICE_UPDATE,
    isPermission: false,
  },
  {
    module: 'Invoice',
    label: 'Invoice Delete',
    role: 'EMPLOYEE',
    permission: PERMISSION.CAN_INVOICE_DELETE,
    isPermission: false,
  },

  //permission
  {
    module: 'Permission',
    label: 'Permission List',
    role: 'EMPLOYEE',
    permission: PERMISSION.CAN_PERMISSION_LIST,
    isPermission: false,
  },
  //employeeManager
  {
    module: 'EmployeeManager',
    label: 'EmployeeManager Add',
    role: 'EMPLOYEE',
    permission: PERMISSION.CAN_EMPLOYEE_MANAGER_ADD,
    isPermission: true,
  },
  {
    module: 'EmployeeManager',
    label: 'EmployeeManager List',
    role: 'EMPLOYEE',
    permission: PERMISSION.CAN_EMPLOYEE_MANAGER_BY_COMPANY_LIST,
    isPermission: true,
  },
  {
    module: 'EmployeeManager',
    label: 'Manager Of Employee List',
    role: 'EMPLOYEE',
    permission: PERMISSION.CAN_MANAGER_OF_EMPLOYEE_LIST,
    isPermission: true,
  },
  {
    module: 'EmployeeManager',
    label: 'Employees Of Manager List',
    role: 'EMPLOYEE',
    permission: PERMISSION.CAN_EMPLOYEES_OF_MANAGER_LIST,
    isPermission: true,
  },
  {
    module: 'EmployeeManager',
    label: 'EmployeeManager Update',
    role: 'EMPLOYEE',
    permission: PERMISSION.CAN_EMPLOYEE_MANAGER_UPDATE,
    isPermission: true,
  },
];

export const HR_ADMIN_PERMISSION = [
  //Auth
  {
    module: 'Auth',
    label: 'Register',
    role: 'HR_ADMIN',
    permission: PERMISSION.CAN_REGISTER,
    isPermission: true,
  },
  {
    module: 'Auth',
    label: 'Login',
    role: 'HR_ADMIN',
    permission: PERMISSION.CAN_LOGIN,
    isPermission: true,
  },
  {
    module: 'Auth',
    label: 'Forgot Password',
    role: 'HR_ADMIN',
    permission: PERMISSION.CAN_FORGOT_PASSWORD,
    isPermission: true,
  },
  {
    module: 'Auth',
    label: 'Update Password',
    role: 'HR_ADMIN',
    permission: PERMISSION.CAN_UPDATE_FORGOT_TOKEN,
    isPermission: true,
  },

  //User
  {
    module: 'User',
    label: 'User List',
    role: 'HR_ADMIN',
    permission: PERMISSION.CAN_USER_LIST,
    isPermission: true,
  },
  {
    module: 'User',
    label: 'User Profile',
    role: 'HR_ADMIN',
    permission: PERMISSION.CAN_USER_PROFILE,
    isPermission: true,
  },
  {
    module: 'User',
    label: 'User Update Profile',
    role: 'HR_ADMIN',
    permission: PERMISSION.CAN_USER_UPDATE_PROFILE,
    isPermission: true,
  },
  {
    module: 'User',
    label: 'User Delete',
    role: 'HR_ADMIN',
    permission: PERMISSION.CAN_USER_DELETE,
    isPermission: true,
  },
  {
    module: 'User',
    label: 'User List Dashboard',
    role: 'HR_ADMIN',
    permission: PERMISSION.CAN_USER_LIST_DASHBOARD,
    isPermission: true,
  },
  {
    module: 'User',
    label: 'User List Role',
    role: 'HR_ADMIN',
    permission: PERMISSION.CAN_USER_LIST_ROLE,
    isPermission: true,
  },
  {
    module: 'User',
    label: 'User',
    role: 'HR_ADMIN',
    permission: PERMISSION.CAN_USER,
    isPermission: true,
  },
  {
    module: 'User',
    label: 'User Update Password',
    role: 'HR_ADMIN',
    permission: PERMISSION.CAN_USER_UPDATE_PASSWORD,
    isPermission: true,
  },
  {
    module: 'User',
    label: 'User Update Role',
    role: 'HR_ADMIN',
    permission: PERMISSION.CAN_USER_UPDATE_ROLE,
    isPermission: true,
  },

  // Employee
  {
    module: 'Employee',
    label: 'Employee List',
    role: 'HR_ADMIN',
    permission: PERMISSION.CAN_EMPLOYEE_LIST,
    isPermission: true,
  },
  {
    module: 'Employee',
    label: 'Employee',
    role: 'HR_ADMIN',
    permission: PERMISSION.CAN_EMPLOYEE,
    isPermission: true,
  },
  {
    module: 'Employee',
    label: 'Employee Delete',
    role: 'HR_ADMIN',
    permission: PERMISSION.CAN_EMPLOYEE_DELETE,
    isPermission: true,
  },
  {
    module: 'Employee',
    label: 'Employee Update',
    role: 'HR_ADMIN',
    permission: PERMISSION.CAN_EMPLOYEE_UPDATE,
    isPermission: true,
  },

  // Companies
  {
    module: 'Companies',
    label: 'Companies List',
    role: 'HR_ADMIN',
    permission: PERMISSION.CAN_COMPANY_LIST,
    isPermission: true,
  },
  {
    module: 'Companies',
    label: 'Companies Update',
    role: 'HR_ADMIN',
    permission: PERMISSION.CAN_COMPANY_UPDATE,
    isPermission: true,
  },
  {
    module: 'Companies',
    label: 'Companies Delete',
    role: 'HR_ADMIN',
    permission: PERMISSION.CAN_COMPANY_DELETE,
    isPermission: true,
  },
  {
    module: 'Companies',
    label: 'Companies Department list',
    role: 'HR_ADMIN',
    permission: PERMISSION.CAN_COMPANY_DEPARTMENT_LIST,
    isPermission: true,
  },
  {
    module: 'Companies',
    label: 'Companies Department ',
    role: 'HR_ADMIN',
    permission: PERMISSION.CAN_COMPANY_DEPARTMENT,
    isPermission: true,
  },
  {
    module: 'Companies',
    label: 'Companies Department Add ',
    role: 'HR_ADMIN',
    permission: PERMISSION.CAN_COMPANY_DEPARTMENT_ADD,
    isPermission: true,
  },
  {
    module: 'Companies',
    label: 'Companies Department Update ',
    role: 'HR_ADMIN',
    permission: PERMISSION.CAN_COMPANY_DEPARTMENT_UPDATE,
    isPermission: true,
  },
  {
    module: 'Companies',
    label: 'Companies Department Delete ',
    role: 'HR_ADMIN',
    permission: PERMISSION.CAN_COMPANY_DEPARTMENT_DELETE,
    isPermission: true,
  },

  //Client
  {
    module: 'Client',
    label: 'Client Add ',
    role: 'HR_ADMIN',
    permission: PERMISSION.CAN_CLIENT_ADD,
    isPermission: true,
  },
  {
    module: 'Client',
    label: 'Client Delete ',
    role: 'HR_ADMIN',
    permission: PERMISSION.CAN_CLIENT_DELETE,
    isPermission: true,
  },
  {
    module: 'Client',
    label: 'Client List ',
    role: 'HR_ADMIN',
    permission: PERMISSION.CAN_CLIENT_LIST,
    isPermission: true,
  },
  {
    module: 'Client',
    label: 'Client Update ',
    role: 'HR_ADMIN',
    permission: PERMISSION.CAN_CLIENT_UPDATE,
    isPermission: true,
  },
  {
    module: 'Client',
    label: 'Client ',
    role: 'HR_ADMIN',
    permission: PERMISSION.CAN_CLIENT,
    isPermission: true,
  },

  // User Address
  {
    module: 'User Address',
    label: 'User Address',
    role: 'HR_ADMIN',
    permission: PERMISSION.CAN_ADDRESS,
    isPermission: true,
  },

  // Company Address
  {
    module: 'Company_Address',
    label: 'Company Address',
    role: 'HR_ADMIN',
    permission: PERMISSION.CAN_COMPANY_ADDRESS,
    isPermission: true,
  },

  // Bank
  {
    module: 'Bank',
    label: 'Bank detail Add',
    role: 'HR_ADMIN',
    permission: PERMISSION.CAN_BANK_ADD,
    isPermission: true,
  },
  {
    module: 'Bank',
    label: 'Bank detail Update',
    role: 'HR_ADMIN',
    permission: PERMISSION.CAN_BANK_UPDATE,
    isPermission: true,
  },

  // course certificate
  {
    module: 'Course Certificate',
    label: 'Course Verified',
    role: 'HR_ADMIN',
    permission: PERMISSION.CAN_BANK_UPDATE,
    isPermission: true,
  },

  // document
  {
    module: 'Document',
    label: 'Document Verified',
    role: 'HR_ADMIN',
    permission: PERMISSION.CAN_DOC_VERIFIED,
    isPermission: true,
  },

  // invitation
  {
    module: 'Invitation',
    label: 'Invitation List',
    role: 'HR_ADMIN',
    permission: PERMISSION.CAN_INVITATION_LIST,
    isPermission: true,
  },
  {
    module: 'Invitation',
    label: 'Invitation Add',
    role: 'HR_ADMIN',
    permission: PERMISSION.CAN_INVITATION_ADD,
    isPermission: true,
  },
  {
    module: 'Invitation',
    label: 'Invitation Resend',
    role: 'HR_ADMIN',
    permission: PERMISSION.CAN_INVITATION_RESEND,
    isPermission: true,
  },
  {
    module: 'Invitation',
    label: 'Invitation Delete',
    role: 'HR_ADMIN',
    permission: PERMISSION.CAN_INVITATION_DELETE,
    isPermission: true,
  },
  {
    module: 'Invitation',
    label: 'Invitation Bulk Send',
    role: 'HR_ADMIN',
    permission: PERMISSION.CAN_INVITATION_BULK_SEND,
    isPermission: true,
  },
  {
    module: 'Invitation',
    label: 'Invitation Bulk Send',
    role: 'HR_ADMIN',
    permission: PERMISSION.CAN_INVITATION_BULK_SEND,
    isPermission: true,
  },
  {
    module: 'Invitation',
    label: 'Invitation Multiple Send',
    role: 'HR_ADMIN',
    permission: PERMISSION.CAN_INVITATION_MUL_SEND,
    isPermission: true,
  },

  //Department
  {
    module: 'Department',
    label: 'Department Add',
    role: 'HR_ADMIN',
    permission: PERMISSION.CAN_DEPARTMENT_ADD,
    isPermission: true,
  },
  {
    module: 'Department',
    label: 'Department Update',
    role: 'HR_ADMIN',
    permission: PERMISSION.CAN_DEPARTMENT_UPDATE,
    isPermission: true,
  },
  {
    module: 'Department',
    label: 'Department Delete',
    role: 'HR_ADMIN',
    permission: PERMISSION.CAN_DEPARTMENT_DELETE,
    isPermission: true,
  },

  //Job-position
  {
    module: 'Job Position',
    label: 'Job Position Add',
    role: 'HR_ADMIN',
    permission: PERMISSION.CAN_JOB_POSITION_ADD,
    isPermission: true,
  },
  {
    module: 'Job Position',
    label: 'Job Position List',
    role: 'HR_ADMIN',
    permission: PERMISSION.CAN_JOB_POSITION_LIST,
    isPermission: true,
  },
  {
    module: 'Job Position',
    label: 'Job Position Update',
    role: 'HR_ADMIN',
    permission: PERMISSION.CAN_JOB_POSITION_UPDATE,
    isPermission: true,
  },
  {
    module: 'Job Position',
    label: 'Job Position Delete',
    role: 'HR_ADMIN',
    permission: PERMISSION.CAN_JOB_POSITION_DELETE,
    isPermission: true,
  },
  {
    module: 'Job Position',
    label: 'Job Position',
    role: 'HR_ADMIN',
    permission: PERMISSION.CAN_JOB_POSITION,
    isPermission: true,
  },

  //Leave-rule
  {
    module: 'Leave Rule',
    label: 'Leave Rule Add',
    role: 'HR_ADMIN',
    permission: PERMISSION.CAN_LEAVE_RULE_ADD,
    isPermission: true,
  },
  {
    module: 'Leave Rule',
    label: 'Leave Rule Update',
    role: 'HR_ADMIN',
    permission: PERMISSION.CAN_LEAVE_RULE_UPDATE,
    isPermission: true,
  },
  {
    module: 'Leave Rule',
    label: 'Leave Rule Delete',
    role: 'HR_ADMIN',
    permission: PERMISSION.CAN_LEAVE_RULE_DELETE,
    isPermission: true,
  },
  {
    module: 'Leave Rule',
    label: 'Employee By Company',
    role: 'HR_ADMIN',
    permission: PERMISSION.CAN_EMPLOYEE_BY_COMPANY_LIST,
    isPermission: true,
  },
  {
    module: 'Leave Rule',
    label: 'Assign Leave Rule',
    role: 'HR_ADMIN',
    permission: PERMISSION.CAN_ASSIGN_LEAVE_RULE,
    isPermission: true,
  },
  {
    module: 'Leave Rule',
    label: 'Assign Leave Rule Delete',
    role: 'HR_ADMIN',
    permission: PERMISSION.CAN_ASSIGN_LEAVE_RULE_DELETE,
    isPermission: true,
  },

  //leaves-master
  {
    module: 'Leaves Master',
    label: 'Leave Request Mail',
    role: 'HR_ADMIN',
    permission: PERMISSION.CAN_LEAVE_REQUEST_MAIL,
    isPermission: true,
  },
  {
    module: 'Leaves Master',
    label: 'Leave Update',
    role: 'HR_ADMIN',
    permission: PERMISSION.CAN_LEAVE_UPDATE,
    isPermission: true,
  },
  {
    module: 'Leaves Master',
    label: 'Leave List',
    role: 'HR_ADMIN',
    permission: PERMISSION.CAN_LEAVE_LIST,
    isPermission: true,
  },

  //works
  {
    module: 'Works',
    label: 'Works Download',
    role: 'HR_ADMIN',
    permission: PERMISSION.CAN_WORKS_DOWNLOAD,
    isPermission: true,
  },

  //salary
  {
    module: 'Salary',
    label: 'Salary ',
    role: 'HR_ADMIN',
    permission: PERMISSION.CAN_SALARY,
    isPermission: true,
  },
  {
    module: 'Salary',
    label: 'Salary List',
    role: 'HR_ADMIN',
    permission: PERMISSION.CAN_SALARY_LIST,
    isPermission: true,
  },
  {
    module: 'Salary',
    label: 'Salary Send',
    role: 'HR_ADMIN',
    permission: PERMISSION.CAN_SALARY_SEND,
    isPermission: true,
  },
  {
    module: 'Salary',
    label: 'Salary Add',
    role: 'HR_ADMIN',
    permission: PERMISSION.CAN_SALARY_ADD,
    isPermission: true,
  },
  {
    module: 'Salary',
    label: 'Salary Update',
    role: 'HR_ADMIN',
    permission: PERMISSION.CAN_SALARY_UPDATE,
    isPermission: true,
  },
  {
    module: 'Salary',
    label: 'Salary Download',
    permission: PERMISSION.CAN_SALARY_DOWNLOAD,
    role: 'HR_ADMIN',
    isPermission: true,
  },
  {
    module: 'Salary',
    label: 'Salary History',
    permission: PERMISSION.CAN_SALARY_HISTORY,
    role: 'HR_ADMIN',
    isPermission: true,
  },
  {
    module: 'Salary',
    label: 'Salary History Download',
    permission: PERMISSION.CAN_SALARY_HISTORY_DOWNLOAD,
    role: 'HR_ADMIN',
    isPermission: true,
  },

  //Announcement
  {
    module: 'Announcement',
    label: 'Announcement',
    role: 'HR_ADMIN',
    permission: PERMISSION.CAN_ANNOUNCEMENT,
    isPermission: true,
  },
  {
    module: 'Announcement',
    label: 'Announcement List',
    role: 'HR_ADMIN',
    permission: PERMISSION.CAN_ANNOUNCEMENT_LIST,
    isPermission: true,
  },
  {
    module: 'Announcement',
    label: 'Announcement Add',
    role: 'HR_ADMIN',
    permission: PERMISSION.CAN_ANNOUNCEMENT_ADD,
    isPermission: true,
  },
  {
    module: 'Announcement',
    label: 'Announcement Update',
    role: 'HR_ADMIN',
    permission: PERMISSION.CAN_ANNOUNCEMENT_UPDATE,
    isPermission: true,
  },
  {
    module: 'Announcement',
    label: 'Announcement Delete',
    role: 'HR_ADMIN',
    permission: PERMISSION.CAN_ANNOUNCEMENT_DELETE,
    isPermission: true,
  },

  //company-policy
  {
    module: 'Company Policy',
    label: 'Company Policy Add',
    role: 'HR_ADMIN',
    permission: PERMISSION.CAN_COMPANY_POLICY_ADD,
    isPermission: true,
  },
  {
    module: 'Company Policy',
    label: 'Company Policy Update',
    role: 'HR_ADMIN',
    permission: PERMISSION.CAN_COMPANY_POLICY_UPDATE,
    isPermission: true,
  },

  //Expense
  {
    module: 'Expense',
    label: 'Expense Add',
    role: 'HR_ADMIN',
    permission: PERMISSION.CAN_EXPENSE_ADD,
    isPermission: false,
  },
  {
    module: 'Expense',
    label: 'Expense Update',
    role: 'HR_ADMIN',
    permission: PERMISSION.CAN_EXPENSE_UPDATE,
    isPermission: false,
  },
  {
    module: 'Expense',
    label: 'Expense Delete',
    role: 'HR_ADMIN',
    permission: PERMISSION.CAN_EXPENSE_DELETE,
    isPermission: false,
  },
  {
    module: 'Expense',
    label: 'Expense List',
    role: 'HR_ADMIN',
    permission: PERMISSION.CAN_EXPENSE_LIST,
    isPermission: false,
  },
  {
    module: 'Expense',
    label: 'Expense Approved',
    role: 'HR_ADMIN',
    permission: PERMISSION.CAN_EXPENSE_APPROVED,
    isPermission: true,
  },
  {
    module: 'Expense',
    label: 'Expense Rejected',
    role: 'HR_ADMIN',
    permission: PERMISSION.CAN_EXPENSE_REJECTED,
    isPermission: true,
  },
  {
    module: 'Expense',
    label: 'Expense Paid',
    role: 'HR_ADMIN',
    permission: PERMISSION.CAN_EXPENSE_PAID,
    isPermission: true,
  },

  // Expense Category
  {
    module: 'Expense Category',
    label: 'Expense Category Add',
    role: 'HR_ADMIN',
    permission: PERMISSION.CAN_EXPENSE_CATEGORY_ADD,
    isPermission: true,
  },
  {
    module: 'Expense Category',
    label: 'Expense Category Update',
    role: 'HR_ADMIN',
    permission: PERMISSION.CAN_EXPENSE_CATEGORY_UPDATE,
    isPermission: true,
  },
  {
    module: 'Expense Category',
    label: 'Expense Category List',
    role: 'HR_ADMIN',
    permission: PERMISSION.CAN_EXPENSE_CATEGORY_LIST,
    isPermission: true,
  },
  {
    module: 'Expense Category',
    label: 'Expense Category Delete',
    role: 'HR_ADMIN',
    permission: PERMISSION.CAN_EXPENSE_CATEGORY_DELETE,
    isPermission: true,
  },

  //attendance-shift
  {
    module: 'Attendance Shift',
    label: 'Attendance Shift Add',
    role: 'HR_ADMIN',
    permission: PERMISSION.CAN_ATTENDANCE_RULES_ADD,
    isPermission: true,
  },
  {
    module: 'Attendance Shift',
    label: 'Attendance Shift Update',
    role: 'HR_ADMIN',
    permission: PERMISSION.CAN_ATTENDANCE_RULES_UPDATE,
    isPermission: true,
  },
  {
    module: 'Attendance Shift',
    label: 'Attendance Shift LIST',
    role: 'HR_ADMIN',
    permission: PERMISSION.CAN_ATTENDANCE_RULES_LIST,
    isPermission: true,
  },
  {
    module: 'Attendance Shift',
    label: 'Attendance Shift Delete',
    role: 'HR_ADMIN',
    permission: PERMISSION.CAN_ATTENDANCE_RULES_DELETE,
    isPermission: true,
  },
  {
    module: 'Attendance Shift',
    label: 'Attendance Shift Assign',
    role: 'HR_ADMIN',
    permission: PERMISSION.CAN_ATTENDANCE_SHIFT_ASSIGN,
    isPermission: true,
  },
  {
    module: 'Attendance Shift',
    label: 'Attendance Shift Delete',
    role: 'HR_ADMIN',
    permission: PERMISSION.CAN_ATTENDANCE_SHIFT_DELETE,
    isPermission: true,
  },

  //resume-master
  {
    module: 'Resume Master',
    label: 'Resume Master Preview',
    role: 'HR_ADMIN',
    permission: PERMISSION.CAN_RESUME_PREVIEW,
    isPermission: true,
  },
  {
    module: 'Resume Master',
    label: 'Resume Master List',
    role: 'HR_ADMIN',
    permission: PERMISSION.CAN_RESUME_LIST,
    isPermission: true,
  },
  {
    module: 'Resume Master',
    label: 'Resume Master Add',
    role: 'HR_ADMIN',
    permission: PERMISSION.CAN_RESUME_ADD,
    isPermission: true,
  },

  //invoice
  {
    module: 'Invoice',
    label: 'Invoice Add',
    role: 'HR_ADMIN',
    permission: PERMISSION.CAN_INVOICE_ADD,
    isPermission: true,
  },
  {
    module: 'Invoice',
    label: 'Invoice List',
    role: 'HR_ADMIN',
    permission: PERMISSION.CAN_INVOICE_LIST,
    isPermission: true,
  },
  {
    module: 'Invoice',
    label: 'Invoice Update',
    role: 'HR_ADMIN',
    permission: PERMISSION.CAN_INVOICE_UPDATE,
    isPermission: true,
  },
  {
    module: 'Invoice',
    label: 'Invoice Delete',
    role: 'HR_ADMIN',
    permission: PERMISSION.CAN_INVOICE_DELETE,
    isPermission: true,
  },

  //permission
  {
    module: 'Permission',
    label: 'Permission List',
    role: 'HR_ADMIN',
    permission: PERMISSION.CAN_PERMISSION_LIST,
    isPermission: true,
  },

  //employeeManager
  {
    module: 'EmployeeManager',
    label: 'EmployeeManager Add',
    role: 'HR_ADMIN',
    permission: PERMISSION.CAN_EMPLOYEE_MANAGER_ADD,
    isPermission: true,
  },
  {
    module: 'EmployeeManager',
    label: 'EmployeeManager List',
    role: 'HR_ADMIN',
    permission: PERMISSION.CAN_EMPLOYEE_MANAGER_BY_COMPANY_LIST,
    isPermission: true,
  },
  {
    module: 'EmployeeManager',
    label: 'Manager Of Employee List',
    role: 'HR_ADMIN',
    permission: PERMISSION.CAN_MANAGER_OF_EMPLOYEE_LIST,
    isPermission: true,
  },
  {
    module: 'EmployeeManager',
    label: 'Employees Of Manager List',
    role: 'HR_ADMIN',
    permission: PERMISSION.CAN_EMPLOYEES_OF_MANAGER_LIST,
    isPermission: true,
  },
  {
    module: 'EmployeeManager',
    label: 'EmployeeManager Update',
    role: 'HR_ADMIN',
    permission: PERMISSION.CAN_EMPLOYEE_MANAGER_UPDATE,
    isPermission: true,
  },
];

export const FINANCE_ADMIN_PERMISSION = [
  //Auth
  {
    module: 'Auth',
    label: 'Register',
    role: 'FINANCE_ADMIN',
    permission: PERMISSION.CAN_REGISTER,
    isPermission: true,
  },
  {
    module: 'Auth',
    label: 'Login',
    role: 'FINANCE_ADMIN',
    permission: PERMISSION.CAN_LOGIN,
    isPermission: true,
  },
  {
    module: 'Auth',
    label: 'Forgot Password',
    role: 'FINANCE_ADMIN',
    permission: PERMISSION.CAN_FORGOT_PASSWORD,
    isPermission: true,
  },
  {
    module: 'Auth',
    label: 'Update Password',
    role: 'FINANCE_ADMIN',
    permission: PERMISSION.CAN_UPDATE_FORGOT_TOKEN,
    isPermission: true,
  },

  //User
  {
    module: 'User',
    label: 'User List',
    role: 'FINANCE_ADMIN',
    permission: PERMISSION.CAN_USER_LIST,
    isPermission: true,
  },
  {
    module: 'User',
    label: 'User Profile',
    role: 'FINANCE_ADMIN',
    permission: PERMISSION.CAN_USER_PROFILE,
    isPermission: true,
  },
  {
    module: 'User',
    label: 'User Update Profile',
    role: 'FINANCE_ADMIN',
    permission: PERMISSION.CAN_USER_UPDATE_PROFILE,
    isPermission: true,
  },
  {
    module: 'User',
    label: 'User Delete',
    role: 'FINANCE_ADMIN',
    permission: PERMISSION.CAN_USER_DELETE,
    isPermission: true,
  },
  {
    module: 'User',
    label: 'User List Dashboard',
    role: 'FINANCE_ADMIN',
    permission: PERMISSION.CAN_USER_LIST_DASHBOARD,
    isPermission: true,
  },
  {
    module: 'User',
    label: 'User List Role',
    role: 'FINANCE_ADMIN',
    permission: PERMISSION.CAN_USER_LIST_ROLE,
    isPermission: true,
  },
  {
    module: 'User',
    label: 'User',
    role: 'FINANCE_ADMIN',
    permission: PERMISSION.CAN_USER,
    isPermission: true,
  },
  {
    module: 'User',
    label: 'User Update Password',
    role: 'FINANCE_ADMIN',
    permission: PERMISSION.CAN_USER_UPDATE_PASSWORD,
    isPermission: true,
  },
  {
    module: 'User',
    label: 'User Update Role',
    role: 'FINANCE_ADMIN',
    permission: PERMISSION.CAN_USER_UPDATE_ROLE,
    isPermission: true,
  },

  // Employee
  {
    module: 'Employee',
    label: 'Employee List',
    role: 'FINANCE_ADMIN',
    permission: PERMISSION.CAN_EMPLOYEE_LIST,
    isPermission: true,
  },
  {
    module: 'Employee',
    label: 'Employee',
    role: 'FINANCE_ADMIN',
    permission: PERMISSION.CAN_EMPLOYEE,
    isPermission: true,
  },
  {
    module: 'Employee',
    label: 'Employee Delete',
    role: 'FINANCE_ADMIN',
    permission: PERMISSION.CAN_EMPLOYEE_DELETE,
    isPermission: true,
  },
  {
    module: 'Employee',
    label: 'Employee Update',
    role: 'FINANCE_ADMIN',
    permission: PERMISSION.CAN_EMPLOYEE_UPDATE,
    isPermission: true,
  },

  // Companies
  {
    module: 'Companies',
    label: 'Companies List',
    role: 'FINANCE_ADMIN',
    permission: PERMISSION.CAN_COMPANY_LIST,
    isPermission: true,
  },
  {
    module: 'Companies',
    label: 'Companies Update',
    role: 'FINANCE_ADMIN',
    permission: PERMISSION.CAN_COMPANY_UPDATE,
    isPermission: true,
  },
  {
    module: 'Companies',
    label: 'Companies Delete',
    role: 'FINANCE_ADMIN',
    permission: PERMISSION.CAN_COMPANY_DELETE,
    isPermission: true,
  },
  {
    module: 'Companies',
    label: 'Companies Department list',
    role: 'FINANCE_ADMIN',
    permission: PERMISSION.CAN_COMPANY_DEPARTMENT_LIST,
    isPermission: true,
  },
  {
    module: 'Companies',
    label: 'Companies Department ',
    role: 'FINANCE_ADMIN',
    permission: PERMISSION.CAN_COMPANY_DEPARTMENT,
    isPermission: true,
  },
  {
    module: 'Companies',
    label: 'Companies Department Add ',
    role: 'FINANCE_ADMIN',
    permission: PERMISSION.CAN_COMPANY_DEPARTMENT_ADD,
    isPermission: true,
  },
  {
    module: 'Companies',
    label: 'Companies Department Update ',
    role: 'FINANCE_ADMIN',
    permission: PERMISSION.CAN_COMPANY_DEPARTMENT_UPDATE,
    isPermission: true,
  },
  {
    module: 'Companies',
    label: 'Companies Department Delete ',
    role: 'FINANCE_ADMIN',
    permission: PERMISSION.CAN_COMPANY_DEPARTMENT_DELETE,
    isPermission: true,
  },

  //Client
  {
    module: 'Client',
    label: 'Client Add ',
    role: 'FINANCE_ADMIN',
    permission: PERMISSION.CAN_CLIENT_ADD,
    isPermission: true,
  },
  {
    module: 'Client',
    label: 'Client Delete ',
    role: 'FINANCE_ADMIN',
    permission: PERMISSION.CAN_CLIENT_DELETE,
    isPermission: true,
  },
  {
    module: 'Client',
    label: 'Client List ',
    role: 'FINANCE_ADMIN',
    permission: PERMISSION.CAN_CLIENT_LIST,
    isPermission: true,
  },
  {
    module: 'Client',
    label: 'Client Update ',
    role: 'FINANCE_ADMIN',
    permission: PERMISSION.CAN_CLIENT_UPDATE,
    isPermission: true,
  },
  {
    module: 'Client',
    label: 'Client ',
    role: 'FINANCE_ADMIN',
    permission: PERMISSION.CAN_CLIENT,
    isPermission: true,
  },

  // User Address
  {
    module: 'User Address',
    label: 'User Address',
    role: 'FINANCE_ADMIN',
    permission: PERMISSION.CAN_ADDRESS,
    isPermission: true,
  },

  // Company Address
  {
    module: 'Company_Address',
    label: 'Company Address',
    role: 'FINANCE_ADMIN',
    permission: PERMISSION.CAN_COMPANY_ADDRESS,
    isPermission: true,
  },

  // Bank
  {
    module: 'Bank',
    label: 'Bank detail Add',
    role: 'FINANCE_ADMIN',
    permission: PERMISSION.CAN_BANK_ADD,
    isPermission: true,
  },
  {
    module: 'Bank',
    label: 'Bank detail Update',
    role: 'FINANCE_ADMIN',
    permission: PERMISSION.CAN_BANK_UPDATE,
    isPermission: true,
  },

  // course certificate
  {
    module: 'Course Certificate',
    label: 'Course Verified',
    role: 'FINANCE_ADMIN',
    permission: PERMISSION.CAN_BANK_UPDATE,
    isPermission: true,
  },

  // document
  {
    module: 'Document',
    label: 'Document Verified',
    role: 'FINANCE_ADMIN',
    permission: PERMISSION.CAN_DOC_VERIFIED,
    isPermission: true,
  },

  // invitation
  {
    module: 'Invitation',
    label: 'Invitation List',
    role: 'FINANCE_ADMIN',
    permission: PERMISSION.CAN_INVITATION_LIST,
    isPermission: true,
  },
  {
    module: 'Invitation',
    label: 'Invitation Add',
    role: 'FINANCE_ADMIN',
    permission: PERMISSION.CAN_INVITATION_ADD,
    isPermission: true,
  },
  {
    module: 'Invitation',
    label: 'Invitation Resend',
    role: 'FINANCE_ADMIN',
    permission: PERMISSION.CAN_INVITATION_RESEND,
    isPermission: true,
  },
  {
    module: 'Invitation',
    label: 'Invitation Delete',
    role: 'FINANCE_ADMIN',
    permission: PERMISSION.CAN_INVITATION_DELETE,
    isPermission: true,
  },
  {
    module: 'Invitation',
    label: 'Invitation Bulk Send',
    role: 'FINANCE_ADMIN',
    permission: PERMISSION.CAN_INVITATION_BULK_SEND,
    isPermission: true,
  },
  {
    module: 'Invitation',
    label: 'Invitation Bulk Send',
    role: 'FINANCE_ADMIN',
    permission: PERMISSION.CAN_INVITATION_BULK_SEND,
    isPermission: true,
  },
  {
    module: 'Invitation',
    label: 'Invitation Multiple Send',
    role: 'FINANCE_ADMIN',
    permission: PERMISSION.CAN_INVITATION_MUL_SEND,
    isPermission: true,
  },

  //Department
  {
    module: 'Department',
    label: 'Department Add',
    role: 'FINANCE_ADMIN',
    permission: PERMISSION.CAN_DEPARTMENT_ADD,
    isPermission: true,
  },
  {
    module: 'Department',
    label: 'Department Update',
    role: 'FINANCE_ADMIN',
    permission: PERMISSION.CAN_DEPARTMENT_UPDATE,
    isPermission: true,
  },
  {
    module: 'Department',
    label: 'Department Delete',
    role: 'FINANCE_ADMIN',
    permission: PERMISSION.CAN_DEPARTMENT_DELETE,
    isPermission: true,
  },

  //Job-position
  {
    module: 'Job Position',
    label: 'Job Position Add',
    role: 'FINANCE_ADMIN',
    permission: PERMISSION.CAN_JOB_POSITION_ADD,
    isPermission: true,
  },
  {
    module: 'Job Position',
    label: 'Job Position List',
    role: 'FINANCE_ADMIN',
    permission: PERMISSION.CAN_JOB_POSITION_LIST,
    isPermission: true,
  },
  {
    module: 'Job Position',
    label: 'Job Position Update',
    role: 'FINANCE_ADMIN',
    permission: PERMISSION.CAN_JOB_POSITION_UPDATE,
    isPermission: true,
  },
  {
    module: 'Job Position',
    label: 'Job Position Delete',
    role: 'FINANCE_ADMIN',
    permission: PERMISSION.CAN_JOB_POSITION_DELETE,
    isPermission: true,
  },
  {
    module: 'Job Position',
    label: 'Job Position',
    role: 'FINANCE_ADMIN',
    permission: PERMISSION.CAN_JOB_POSITION,
    isPermission: true,
  },

  //Leave-rule
  {
    module: 'Leave Rule',
    label: 'Leave Rule Add',
    role: 'FINANCE_ADMIN',
    permission: PERMISSION.CAN_LEAVE_RULE_ADD,
    isPermission: true,
  },
  {
    module: 'Leave Rule',
    label: 'Leave Rule Update',
    role: 'FINANCE_ADMIN',
    permission: PERMISSION.CAN_LEAVE_RULE_UPDATE,
    isPermission: true,
  },
  {
    module: 'Leave Rule',
    label: 'Leave Rule Delete',
    role: 'FINANCE_ADMIN',
    permission: PERMISSION.CAN_LEAVE_RULE_DELETE,
    isPermission: true,
  },
  {
    module: 'Leave Rule',
    label: 'Employee By Company',
    role: 'FINANCE_ADMIN',
    permission: PERMISSION.CAN_EMPLOYEE_BY_COMPANY_LIST,
    isPermission: true,
  },
  {
    module: 'Leave Rule',
    label: 'Assign Leave Rule',
    role: 'FINANCE_ADMIN',
    permission: PERMISSION.CAN_ASSIGN_LEAVE_RULE,
    isPermission: true,
  },
  {
    module: 'Leave Rule',
    label: 'Assign Leave Rule Delete',
    role: 'FINANCE_ADMIN',
    permission: PERMISSION.CAN_ASSIGN_LEAVE_RULE_DELETE,
    isPermission: true,
  },

  //leaves-master
  {
    module: 'Leaves Master',
    label: 'Leave Request Mail',
    role: 'FINANCE_ADMIN',
    permission: PERMISSION.CAN_LEAVE_REQUEST_MAIL,
    isPermission: true,
  },
  {
    module: 'Leaves Master',
    label: 'Leave Update',
    role: 'FINANCE_ADMIN',
    permission: PERMISSION.CAN_LEAVE_UPDATE,
    isPermission: true,
  },
  {
    module: 'Leaves Master',
    label: 'Leave List',
    role: 'FINANCE_ADMIN',
    permission: PERMISSION.CAN_LEAVE_LIST,
    isPermission: true,
  },

  //works
  {
    module: 'Works',
    label: 'Works Download',
    role: 'FINANCE_ADMIN',
    permission: PERMISSION.CAN_WORKS_DOWNLOAD,
    isPermission: true,
  },

  //salary
  {
    module: 'Salary',
    label: 'Salary ',
    role: 'FINANCE_ADMIN',
    permission: PERMISSION.CAN_SALARY,
    isPermission: true,
  },
  {
    module: 'Salary',
    label: 'Salary List',
    role: 'FINANCE_ADMIN',
    permission: PERMISSION.CAN_SALARY_LIST,
    isPermission: true,
  },
  {
    module: 'Salary',
    label: 'Salary Send',
    role: 'FINANCE_ADMIN',
    permission: PERMISSION.CAN_SALARY_SEND,
    isPermission: true,
  },
  {
    module: 'Salary',
    label: 'Salary Add',
    role: 'FINANCE_ADMIN',
    permission: PERMISSION.CAN_SALARY_ADD,
    isPermission: true,
  },
  {
    module: 'Salary',
    label: 'Salary Update',
    role: 'FINANCE_ADMIN',
    permission: PERMISSION.CAN_SALARY_UPDATE,
    isPermission: true,
  },
  {
    module: 'Salary',
    label: 'Salary Download',
    permission: PERMISSION.CAN_SALARY_DOWNLOAD,
    role: 'FINANCE_ADMIN',
    isPermission: true,
  },
  {
    module: 'Salary',
    label: 'Salary History',
    permission: PERMISSION.CAN_SALARY_HISTORY,
    role: 'FINANCE_ADMIN',
    isPermission: true,
  },
  {
    module: 'Salary',
    label: 'Salary History Download',
    permission: PERMISSION.CAN_SALARY_HISTORY_DOWNLOAD,
    role: 'FINANCE_ADMIN',
    isPermission: true,
  },

  //Announcement
  {
    module: 'Announcement',
    label: 'Announcement',
    role: 'FINANCE_ADMIN',
    permission: PERMISSION.CAN_ANNOUNCEMENT,
    isPermission: true,
  },
  {
    module: 'Announcement',
    label: 'Announcement List',
    role: 'FINANCE_ADMIN',
    permission: PERMISSION.CAN_ANNOUNCEMENT_LIST,
    isPermission: true,
  },
  {
    module: 'Announcement',
    label: 'Announcement Add',
    role: 'FINANCE_ADMIN',
    permission: PERMISSION.CAN_ANNOUNCEMENT_ADD,
    isPermission: true,
  },
  {
    module: 'Announcement',
    label: 'Announcement Update',
    role: 'FINANCE_ADMIN',
    permission: PERMISSION.CAN_ANNOUNCEMENT_UPDATE,
    isPermission: true,
  },
  {
    module: 'Announcement',
    label: 'Announcement Delete',
    role: 'FINANCE_ADMIN',
    permission: PERMISSION.CAN_ANNOUNCEMENT_DELETE,
    isPermission: true,
  },

  //company-policy
  {
    module: 'Company Policy',
    label: 'Company Policy Add',
    role: 'FINANCE_ADMIN',
    permission: PERMISSION.CAN_COMPANY_POLICY_ADD,
    isPermission: true,
  },
  {
    module: 'Company Policy',
    label: 'Company Policy Update',
    role: 'FINANCE_ADMIN',
    permission: PERMISSION.CAN_COMPANY_POLICY_UPDATE,
    isPermission: true,
  },

  //Expense
  {
    module: 'Expense',
    label: 'Expense Add',
    role: 'FINANCE_ADMIN',
    permission: PERMISSION.CAN_EXPENSE_ADD,
    isPermission: false,
  },
  {
    module: 'Expense',
    label: 'Expense Update',
    role: 'FINANCE_ADMIN',
    permission: PERMISSION.CAN_EXPENSE_UPDATE,
    isPermission: false,
  },
  {
    module: 'Expense',
    label: 'Expense Delete',
    role: 'FINANCE_ADMIN',
    permission: PERMISSION.CAN_EXPENSE_DELETE,
    isPermission: false,
  },
  {
    module: 'Expense',
    label: 'Expense List',
    role: 'FINANCE_ADMIN',
    permission: PERMISSION.CAN_EXPENSE_LIST,
    isPermission: false,
  },
  {
    module: 'Expense',
    label: 'Expense Approved',
    role: 'FINANCE_ADMIN',
    permission: PERMISSION.CAN_EXPENSE_APPROVED,
    isPermission: true,
  },
  {
    module: 'Expense',
    label: 'Expense Rejected',
    role: 'FINANCE_ADMIN',
    permission: PERMISSION.CAN_EXPENSE_REJECTED,
    isPermission: true,
  },
  {
    module: 'Expense',
    label: 'Expense Paid',
    role: 'FINANCE_ADMIN',
    permission: PERMISSION.CAN_EXPENSE_PAID,
    isPermission: true,
  },

  // Expense Category
  {
    module: 'Expense Category',
    label: 'Expense Category Add',
    role: 'FINANCE_ADMIN',
    permission: PERMISSION.CAN_EXPENSE_CATEGORY_ADD,
    isPermission: true,
  },
  {
    module: 'Expense Category',
    label: 'Expense Category Update',
    role: 'FINANCE_ADMIN',
    permission: PERMISSION.CAN_EXPENSE_CATEGORY_UPDATE,
    isPermission: true,
  },
  {
    module: 'Expense Category',
    label: 'Expense Category List',
    role: 'FINANCE_ADMIN',
    permission: PERMISSION.CAN_EXPENSE_CATEGORY_LIST,
    isPermission: true,
  },
  {
    module: 'Expense Category',
    label: 'Expense Category Delete',
    role: 'FINANCE_ADMIN',
    permission: PERMISSION.CAN_EXPENSE_CATEGORY_DELETE,
    isPermission: true,
  },

  //attendance-shift
  {
    module: 'Attendance Shift',
    label: 'Attendance Shift Add',
    role: 'FINANCE_ADMIN',
    permission: PERMISSION.CAN_ATTENDANCE_RULES_ADD,
    isPermission: true,
  },
  {
    module: 'Attendance Shift',
    label: 'Attendance Shift Update',
    role: 'FINANCE_ADMIN',
    permission: PERMISSION.CAN_ATTENDANCE_RULES_UPDATE,
    isPermission: true,
  },
  {
    module: 'Attendance Shift',
    label: 'Attendance Shift LIST',
    role: 'FINANCE_ADMIN',
    permission: PERMISSION.CAN_ATTENDANCE_RULES_LIST,
    isPermission: true,
  },
  {
    module: 'Attendance Shift',
    label: 'Attendance Shift Delete',
    role: 'FINANCE_ADMIN',
    permission: PERMISSION.CAN_ATTENDANCE_RULES_DELETE,
    isPermission: true,
  },
  {
    module: 'Attendance Shift',
    label: 'Attendance Shift Assign',
    role: 'FINANCE_ADMIN',
    permission: PERMISSION.CAN_ATTENDANCE_SHIFT_ASSIGN,
    isPermission: true,
  },
  {
    module: 'Attendance Shift',
    label: 'Attendance Shift Delete',
    role: 'FINANCE_ADMIN',
    permission: PERMISSION.CAN_ATTENDANCE_SHIFT_DELETE,
    isPermission: true,
  },

  //resume-master
  {
    module: 'Resume Master',
    label: 'Resume Master Preview',
    role: 'FINANCE_ADMIN',
    permission: PERMISSION.CAN_RESUME_PREVIEW,
    isPermission: true,
  },
  {
    module: 'Resume Master',
    label: 'Resume Master List',
    role: 'FINANCE_ADMIN',
    permission: PERMISSION.CAN_RESUME_LIST,
    isPermission: true,
  },
  {
    module: 'Resume Master',
    label: 'Resume Master Add',
    role: 'FINANCE_ADMIN',
    permission: PERMISSION.CAN_RESUME_ADD,
    isPermission: true,
  },

  //invoice
  {
    module: 'Invoice',
    label: 'Invoice Add',
    role: 'FINANCE_ADMIN',
    permission: PERMISSION.CAN_INVOICE_ADD,
    isPermission: true,
  },
  {
    module: 'Invoice',
    label: 'Invoice List',
    role: 'FINANCE_ADMIN',
    permission: PERMISSION.CAN_INVOICE_LIST,
    isPermission: true,
  },
  {
    module: 'Invoice',
    label: 'Invoice Update',
    role: 'FINANCE_ADMIN',
    permission: PERMISSION.CAN_INVOICE_UPDATE,
    isPermission: true,
  },
  {
    module: 'Invoice',
    label: 'Invoice Delete',
    role: 'FINANCE_ADMIN',
    permission: PERMISSION.CAN_INVOICE_DELETE,
    isPermission: true,
  },

  //permission
  {
    module: 'Permission',
    label: 'Permission List',
    role: 'FINANCE_ADMIN',
    permission: PERMISSION.CAN_PERMISSION_LIST,
    isPermission: true,
  },
  //employeeManager
  {
    module: 'EmployeeManager',
    label: 'EmployeeManager Add',
    role: 'FINANCE_ADMIN',
    permission: PERMISSION.CAN_EMPLOYEE_MANAGER_ADD,
    isPermission: true,
  },
  {
    module: 'EmployeeManager',
    label: 'EmployeeManager List',
    role: 'FINANCE_ADMIN',
    permission: PERMISSION.CAN_EMPLOYEE_MANAGER_BY_COMPANY_LIST,
    isPermission: true,
  },
  {
    module: 'EmployeeManager',
    label: 'Manager Of Employee List',
    role: 'FINANCE_ADMIN',
    permission: PERMISSION.CAN_MANAGER_OF_EMPLOYEE_LIST,
    isPermission: true,
  },
  {
    module: 'EmployeeManager',
    label: 'Employees Of Manager List',
    role: 'FINANCE_ADMIN',
    permission: PERMISSION.CAN_EMPLOYEES_OF_MANAGER_LIST,
    isPermission: true,
  },
  {
    module: 'EmployeeManager',
    label: 'EmployeeManager Update',
    role: 'FINANCE_ADMIN',
    permission: PERMISSION.CAN_EMPLOYEE_MANAGER_UPDATE,
    isPermission: true,
  },
];

export const HR_EXECUTIVE_PERMISSION = [
  //Auth
  {
    module: 'Auth',
    label: 'Register',
    role: 'HR_EXECUTIVE',
    permission: PERMISSION.CAN_REGISTER,
    isPermission: true,
  },
  {
    module: 'Auth',
    label: 'Login',
    role: 'HR_EXECUTIVE',
    permission: PERMISSION.CAN_LOGIN,
    isPermission: true,
  },
  {
    module: 'Auth',
    label: 'Forgot Password',
    role: 'HR_EXECUTIVE',
    permission: PERMISSION.CAN_FORGOT_PASSWORD,
    isPermission: true,
  },
  {
    module: 'Auth',
    label: 'Update Password',
    role: 'HR_EXECUTIVE',
    permission: PERMISSION.CAN_UPDATE_FORGOT_TOKEN,
    isPermission: true,
  },

  //User
  {
    module: 'User',
    label: 'User List',
    role: 'HR_EXECUTIVE',
    permission: PERMISSION.CAN_USER_LIST,
    isPermission: true,
  },
  {
    module: 'User',
    label: 'User Profile',
    role: 'HR_EXECUTIVE',
    permission: PERMISSION.CAN_USER_PROFILE,
    isPermission: true,
  },
  {
    module: 'User',
    label: 'User Update Profile',
    role: 'HR_EXECUTIVE',
    permission: PERMISSION.CAN_USER_UPDATE_PROFILE,
    isPermission: true,
  },
  {
    module: 'User',
    label: 'User Delete',
    role: 'HR_EXECUTIVE',
    permission: PERMISSION.CAN_USER_DELETE,
    isPermission: true,
  },
  {
    module: 'User',
    label: 'User List Dashboard',
    role: 'HR_EXECUTIVE',
    permission: PERMISSION.CAN_USER_LIST_DASHBOARD,
    isPermission: true,
  },
  {
    module: 'User',
    label: 'User List Role',
    role: 'HR_EXECUTIVE',
    permission: PERMISSION.CAN_USER_LIST_ROLE,
    isPermission: true,
  },
  {
    module: 'User',
    label: 'User',
    role: 'HR_EXECUTIVE',
    permission: PERMISSION.CAN_USER,
    isPermission: true,
  },
  {
    module: 'User',
    label: 'User Update Password',
    role: 'HR_EXECUTIVE',
    permission: PERMISSION.CAN_USER_UPDATE_PASSWORD,
    isPermission: true,
  },
  {
    module: 'User',
    label: 'User Update Role',
    role: 'HR_EXECUTIVE',
    permission: PERMISSION.CAN_USER_UPDATE_ROLE,
    isPermission: true,
  },

  // Employee
  {
    module: 'Employee',
    label: 'Employee List',
    role: 'HR_EXECUTIVE',
    permission: PERMISSION.CAN_EMPLOYEE_LIST,
    isPermission: true,
  },
  {
    module: 'Employee',
    label: 'Employee',
    role: 'HR_EXECUTIVE',
    permission: PERMISSION.CAN_EMPLOYEE,
    isPermission: true,
  },
  {
    module: 'Employee',
    label: 'Employee Delete',
    role: 'HR_EXECUTIVE',
    permission: PERMISSION.CAN_EMPLOYEE_DELETE,
    isPermission: true,
  },
  {
    module: 'Employee',
    label: 'Employee Update',
    role: 'HR_EXECUTIVE',
    permission: PERMISSION.CAN_EMPLOYEE_UPDATE,
    isPermission: true,
  },

  // Companies
  {
    module: 'Companies',
    label: 'Companies List',
    role: 'HR_EXECUTIVE',
    permission: PERMISSION.CAN_COMPANY_LIST,
    isPermission: true,
  },
  {
    module: 'Companies',
    label: 'Companies Update',
    role: 'HR_EXECUTIVE',
    permission: PERMISSION.CAN_COMPANY_UPDATE,
    isPermission: true,
  },
  {
    module: 'Companies',
    label: 'Companies Delete',
    role: 'HR_EXECUTIVE',
    permission: PERMISSION.CAN_COMPANY_DELETE,
    isPermission: true,
  },
  {
    module: 'Companies',
    label: 'Companies Department list',
    role: 'HR_EXECUTIVE',
    permission: PERMISSION.CAN_COMPANY_DEPARTMENT_LIST,
    isPermission: true,
  },
  {
    module: 'Companies',
    label: 'Companies Department ',
    role: 'HR_EXECUTIVE',
    permission: PERMISSION.CAN_COMPANY_DEPARTMENT,
    isPermission: true,
  },
  {
    module: 'Companies',
    label: 'Companies Department Add ',
    role: 'HR_EXECUTIVE',
    permission: PERMISSION.CAN_COMPANY_DEPARTMENT_ADD,
    isPermission: true,
  },
  {
    module: 'Companies',
    label: 'Companies Department Update ',
    role: 'HR_EXECUTIVE',
    permission: PERMISSION.CAN_COMPANY_DEPARTMENT_UPDATE,
    isPermission: true,
  },
  {
    module: 'Companies',
    label: 'Companies Department Delete ',
    role: 'HR_EXECUTIVE',
    permission: PERMISSION.CAN_COMPANY_DEPARTMENT_DELETE,
    isPermission: true,
  },

  //Client
  {
    module: 'Client',
    label: 'Client Add ',
    role: 'HR_EXECUTIVE',
    permission: PERMISSION.CAN_CLIENT_ADD,
    isPermission: true,
  },
  {
    module: 'Client',
    label: 'Client Delete ',
    role: 'HR_EXECUTIVE',
    permission: PERMISSION.CAN_CLIENT_DELETE,
    isPermission: true,
  },
  {
    module: 'Client',
    label: 'Client List ',
    role: 'HR_EXECUTIVE',
    permission: PERMISSION.CAN_CLIENT_LIST,
    isPermission: true,
  },
  {
    module: 'Client',
    label: 'Client Update ',
    role: 'HR_EXECUTIVE',
    permission: PERMISSION.CAN_CLIENT_UPDATE,
    isPermission: true,
  },
  {
    module: 'Client',
    label: 'Client ',
    role: 'HR_EXECUTIVE',
    permission: PERMISSION.CAN_CLIENT,
    isPermission: true,
  },

  // User Address
  {
    module: 'User Address',
    label: 'User Address',
    role: 'HR_EXECUTIVE',
    permission: PERMISSION.CAN_ADDRESS,
    isPermission: true,
  },

  // Company Address
  {
    module: 'Company_Address',
    label: 'Company Address',
    role: 'HR_EXECUTIVE',
    permission: PERMISSION.CAN_COMPANY_ADDRESS,
    isPermission: true,
  },

  // Bank
  {
    module: 'Bank',
    label: 'Bank detail Add',
    role: 'HR_EXECUTIVE',
    permission: PERMISSION.CAN_BANK_ADD,
    isPermission: true,
  },
  {
    module: 'Bank',
    label: 'Bank detail Update',
    role: 'HR_EXECUTIVE',
    permission: PERMISSION.CAN_BANK_UPDATE,
    isPermission: true,
  },

  // course certificate
  {
    module: 'Course Certificate',
    label: 'Course Verified',
    role: 'HR_EXECUTIVE',
    permission: PERMISSION.CAN_BANK_UPDATE,
    isPermission: true,
  },

  // document
  {
    module: 'Document',
    label: 'Document Verified',
    role: 'HR_EXECUTIVE',
    permission: PERMISSION.CAN_DOC_VERIFIED,
    isPermission: true,
  },

  // invitation
  {
    module: 'Invitation',
    label: 'Invitation List',
    role: 'HR_EXECUTIVE',
    permission: PERMISSION.CAN_INVITATION_LIST,
    isPermission: true,
  },
  {
    module: 'Invitation',
    label: 'Invitation Add',
    role: 'HR_EXECUTIVE',
    permission: PERMISSION.CAN_INVITATION_ADD,
    isPermission: true,
  },
  {
    module: 'Invitation',
    label: 'Invitation Resend',
    role: 'HR_EXECUTIVE',
    permission: PERMISSION.CAN_INVITATION_RESEND,
    isPermission: true,
  },
  {
    module: 'Invitation',
    label: 'Invitation Delete',
    role: 'HR_EXECUTIVE',
    permission: PERMISSION.CAN_INVITATION_DELETE,
    isPermission: true,
  },
  {
    module: 'Invitation',
    label: 'Invitation Bulk Send',
    role: 'HR_EXECUTIVE',
    permission: PERMISSION.CAN_INVITATION_BULK_SEND,
    isPermission: true,
  },
  {
    module: 'Invitation',
    label: 'Invitation Bulk Send',
    role: 'HR_EXECUTIVE',
    permission: PERMISSION.CAN_INVITATION_BULK_SEND,
    isPermission: true,
  },
  {
    module: 'Invitation',
    label: 'Invitation Multiple Send',
    role: 'HR_EXECUTIVE',
    permission: PERMISSION.CAN_INVITATION_MUL_SEND,
    isPermission: true,
  },

  //Department
  {
    module: 'Department',
    label: 'Department Add',
    role: 'HR_EXECUTIVE',
    permission: PERMISSION.CAN_DEPARTMENT_ADD,
    isPermission: true,
  },
  {
    module: 'Department',
    label: 'Department Update',
    role: 'HR_EXECUTIVE',
    permission: PERMISSION.CAN_DEPARTMENT_UPDATE,
    isPermission: true,
  },
  {
    module: 'Department',
    label: 'Department Delete',
    role: 'HR_EXECUTIVE',
    permission: PERMISSION.CAN_DEPARTMENT_DELETE,
    isPermission: true,
  },

  //Job-position
  {
    module: 'Job Position',
    label: 'Job Position Add',
    role: 'HR_EXECUTIVE',
    permission: PERMISSION.CAN_JOB_POSITION_ADD,
    isPermission: true,
  },
  {
    module: 'Job Position',
    label: 'Job Position List',
    role: 'HR_EXECUTIVE',
    permission: PERMISSION.CAN_JOB_POSITION_LIST,
    isPermission: true,
  },
  {
    module: 'Job Position',
    label: 'Job Position Update',
    role: 'HR_EXECUTIVE',
    permission: PERMISSION.CAN_JOB_POSITION_UPDATE,
    isPermission: true,
  },
  {
    module: 'Job Position',
    label: 'Job Position Delete',
    role: 'HR_EXECUTIVE',
    permission: PERMISSION.CAN_JOB_POSITION_DELETE,
    isPermission: true,
  },
  {
    module: 'Job Position',
    label: 'Job Position',
    role: 'HR_EXECUTIVE',
    permission: PERMISSION.CAN_JOB_POSITION,
    isPermission: true,
  },

  //Leave-rule
  {
    module: 'Leave Rule',
    label: 'Leave Rule Add',
    role: 'HR_EXECUTIVE',
    permission: PERMISSION.CAN_LEAVE_RULE_ADD,
    isPermission: true,
  },
  {
    module: 'Leave Rule',
    label: 'Leave Rule Update',
    role: 'HR_EXECUTIVE',
    permission: PERMISSION.CAN_LEAVE_RULE_UPDATE,
    isPermission: true,
  },
  {
    module: 'Leave Rule',
    label: 'Leave Rule Delete',
    role: 'HR_EXECUTIVE',
    permission: PERMISSION.CAN_LEAVE_RULE_DELETE,
    isPermission: true,
  },
  {
    module: 'Leave Rule',
    label: 'Employee By Company',
    role: 'HR_EXECUTIVE',
    permission: PERMISSION.CAN_EMPLOYEE_BY_COMPANY_LIST,
    isPermission: true,
  },
  {
    module: 'Leave Rule',
    label: 'Assign Leave Rule',
    role: 'HR_EXECUTIVE',
    permission: PERMISSION.CAN_ASSIGN_LEAVE_RULE,
    isPermission: true,
  },
  {
    module: 'Leave Rule',
    label: 'Assign Leave Rule Delete',
    role: 'HR_EXECUTIVE',
    permission: PERMISSION.CAN_ASSIGN_LEAVE_RULE_DELETE,
    isPermission: true,
  },

  //leaves-master
  {
    module: 'Leaves Master',
    label: 'Leave Request Mail',
    role: 'HR_EXECUTIVE',
    permission: PERMISSION.CAN_LEAVE_REQUEST_MAIL,
    isPermission: true,
  },
  {
    module: 'Leaves Master',
    label: 'Leave Update',
    role: 'HR_EXECUTIVE',
    permission: PERMISSION.CAN_LEAVE_UPDATE,
    isPermission: true,
  },
  {
    module: 'Leaves Master',
    label: 'Leave List',
    role: 'HR_EXECUTIVE',
    permission: PERMISSION.CAN_LEAVE_LIST,
    isPermission: true,
  },

  //works
  {
    module: 'Works',
    label: 'Works Download',
    role: 'HR_EXECUTIVE',
    permission: PERMISSION.CAN_WORKS_DOWNLOAD,
    isPermission: true,
  },

  //salary
  {
    module: 'Salary',
    label: 'Salary ',
    role: 'HR_EXECUTIVE',
    permission: PERMISSION.CAN_SALARY,
    isPermission: true,
  },
  {
    module: 'Salary',
    label: 'Salary List',
    role: 'HR_EXECUTIVE',
    permission: PERMISSION.CAN_SALARY_LIST,
    isPermission: true,
  },
  {
    module: 'Salary',
    label: 'Salary Send',
    role: 'HR_EXECUTIVE',
    permission: PERMISSION.CAN_SALARY_SEND,
    isPermission: true,
  },
  {
    module: 'Salary',
    label: 'Salary Add',
    role: 'HR_EXECUTIVE',
    permission: PERMISSION.CAN_SALARY_ADD,
    isPermission: true,
  },
  {
    module: 'Salary',
    label: 'Salary Update',
    role: 'HR_EXECUTIVE',
    permission: PERMISSION.CAN_SALARY_UPDATE,
    isPermission: true,
  },
  {
    module: 'Salary',
    label: 'Salary Download',
    permission: PERMISSION.CAN_SALARY_DOWNLOAD,
    role: 'HR_EXECUTIVE',
    isPermission: true,
  },
  {
    module: 'Salary',
    label: 'Salary History',
    permission: PERMISSION.CAN_SALARY_HISTORY,
    role: 'HR_EXECUTIVE',
    isPermission: true,
  },
  {
    module: 'Salary',
    label: 'Salary History Download',
    permission: PERMISSION.CAN_SALARY_HISTORY_DOWNLOAD,
    role: 'HR_EXECUTIVE',
    isPermission: true,
  },

  //Announcement
  {
    module: 'Announcement',
    label: 'Announcement',
    role: 'HR_EXECUTIVE',
    permission: PERMISSION.CAN_ANNOUNCEMENT,
    isPermission: true,
  },
  {
    module: 'Announcement',
    label: 'Announcement List',
    role: 'HR_EXECUTIVE',
    permission: PERMISSION.CAN_ANNOUNCEMENT_LIST,
    isPermission: true,
  },
  {
    module: 'Announcement',
    label: 'Announcement Add',
    role: 'HR_EXECUTIVE',
    permission: PERMISSION.CAN_ANNOUNCEMENT_ADD,
    isPermission: true,
  },
  {
    module: 'Announcement',
    label: 'Announcement Update',
    role: 'HR_EXECUTIVE',
    permission: PERMISSION.CAN_ANNOUNCEMENT_UPDATE,
    isPermission: true,
  },
  {
    module: 'Announcement',
    label: 'Announcement Delete',
    role: 'HR_EXECUTIVE',
    permission: PERMISSION.CAN_ANNOUNCEMENT_DELETE,
    isPermission: true,
  },

  //company-policy
  {
    module: 'Company Policy',
    label: 'Company Policy Add',
    role: 'HR_EXECUTIVE',
    permission: PERMISSION.CAN_COMPANY_POLICY_ADD,
    isPermission: true,
  },
  {
    module: 'Company Policy',
    label: 'Company Policy Update',
    role: 'HR_EXECUTIVE',
    permission: PERMISSION.CAN_COMPANY_POLICY_UPDATE,
    isPermission: true,
  },

  //Expense
  {
    module: 'Expense',
    label: 'Expense Add',
    role: 'HR_EXECUTIVE',
    permission: PERMISSION.CAN_EXPENSE_ADD,
    isPermission: false,
  },
  {
    module: 'Expense',
    label: 'Expense Update',
    role: 'HR_EXECUTIVE',
    permission: PERMISSION.CAN_EXPENSE_UPDATE,
    isPermission: false,
  },
  {
    module: 'Expense',
    label: 'Expense Delete',
    role: 'HR_EXECUTIVE',
    permission: PERMISSION.CAN_EXPENSE_DELETE,
    isPermission: false,
  },
  {
    module: 'Expense',
    label: 'Expense List',
    role: 'HR_EXECUTIVE',
    permission: PERMISSION.CAN_EXPENSE_LIST,
    isPermission: false,
  },
  {
    module: 'Expense',
    label: 'Expense Approved',
    role: 'HR_EXECUTIVE',
    permission: PERMISSION.CAN_EXPENSE_APPROVED,
    isPermission: true,
  },
  {
    module: 'Expense',
    label: 'Expense Rejected',
    role: 'HR_EXECUTIVE',
    permission: PERMISSION.CAN_EXPENSE_REJECTED,
    isPermission: true,
  },
  {
    module: 'Expense',
    label: 'Expense Paid',
    role: 'HR_EXECUTIVE',
    permission: PERMISSION.CAN_EXPENSE_PAID,
    isPermission: true,
  },

  // Expense Category
  {
    module: 'Expense Category',
    label: 'Expense Category Add',
    role: 'HR_EXECUTIVE',
    permission: PERMISSION.CAN_EXPENSE_CATEGORY_ADD,
    isPermission: true,
  },
  {
    module: 'Expense Category',
    label: 'Expense Category Update',
    role: 'HR_EXECUTIVE',
    permission: PERMISSION.CAN_EXPENSE_CATEGORY_UPDATE,
    isPermission: true,
  },
  {
    module: 'Expense Category',
    label: 'Expense Category List',
    role: 'HR_EXECUTIVE',
    permission: PERMISSION.CAN_EXPENSE_CATEGORY_LIST,
    isPermission: true,
  },
  {
    module: 'Expense Category',
    label: 'Expense Category Delete',
    role: 'HR_EXECUTIVE',
    permission: PERMISSION.CAN_EXPENSE_CATEGORY_DELETE,
    isPermission: true,
  },

  //attendance-shift
  {
    module: 'Attendance Shift',
    label: 'Attendance Shift Add',
    role: 'HR_EXECUTIVE',
    permission: PERMISSION.CAN_ATTENDANCE_RULES_ADD,
    isPermission: true,
  },
  {
    module: 'Attendance Shift',
    label: 'Attendance Shift Update',
    role: 'HR_EXECUTIVE',
    permission: PERMISSION.CAN_ATTENDANCE_RULES_UPDATE,
    isPermission: true,
  },
  {
    module: 'Attendance Shift',
    label: 'Attendance Shift LIST',
    role: 'HR_EXECUTIVE',
    permission: PERMISSION.CAN_ATTENDANCE_RULES_LIST,
    isPermission: true,
  },
  {
    module: 'Attendance Shift',
    label: 'Attendance Shift Delete',
    role: 'HR_EXECUTIVE',
    permission: PERMISSION.CAN_ATTENDANCE_RULES_DELETE,
    isPermission: true,
  },
  {
    module: 'Attendance Shift',
    label: 'Attendance Shift Assign',
    role: 'HR_EXECUTIVE',
    permission: PERMISSION.CAN_ATTENDANCE_SHIFT_ASSIGN,
    isPermission: true,
  },
  {
    module: 'Attendance Shift',
    label: 'Attendance Shift Delete',
    role: 'HR_EXECUTIVE',
    permission: PERMISSION.CAN_ATTENDANCE_SHIFT_DELETE,
    isPermission: true,
  },

  //resume-master
  {
    module: 'Resume Master',
    label: 'Resume Master Preview',
    role: 'HR_EXECUTIVE',
    permission: PERMISSION.CAN_RESUME_PREVIEW,
    isPermission: true,
  },
  {
    module: 'Resume Master',
    label: 'Resume Master List',
    role: 'HR_EXECUTIVE',
    permission: PERMISSION.CAN_RESUME_LIST,
    isPermission: true,
  },
  {
    module: 'Resume Master',
    label: 'Resume Master Add',
    role: 'HR_EXECUTIVE',
    permission: PERMISSION.CAN_RESUME_ADD,
    isPermission: true,
  },

  //invoice
  {
    module: 'Invoice',
    label: 'Invoice Add',
    role: 'HR_EXECUTIVE',
    permission: PERMISSION.CAN_INVOICE_ADD,
    isPermission: true,
  },
  {
    module: 'Invoice',
    label: 'Invoice List',
    role: 'HR_EXECUTIVE',
    permission: PERMISSION.CAN_INVOICE_LIST,
    isPermission: true,
  },
  {
    module: 'Invoice',
    label: 'Invoice Update',
    role: 'HR_EXECUTIVE',
    permission: PERMISSION.CAN_INVOICE_UPDATE,
    isPermission: true,
  },
  {
    module: 'Invoice',
    label: 'Invoice Delete',
    role: 'HR_EXECUTIVE',
    permission: PERMISSION.CAN_INVOICE_DELETE,
    isPermission: true,
  },

  //permission
  {
    module: 'Permission',
    label: 'Permission List',
    role: 'HR_EXECUTIVE',
    permission: PERMISSION.CAN_PERMISSION_LIST,
    isPermission: true,
  },

  //employeeManager
  {
    module: 'EmployeeManager',
    label: 'EmployeeManager Add',
    role: 'HR_EXECUTIVE',
    permission: PERMISSION.CAN_EMPLOYEE_MANAGER_ADD,
    isPermission: true,
  },
  {
    module: 'EmployeeManager',
    label: 'EmployeeManager List',
    role: 'HR_EXECUTIVE',
    permission: PERMISSION.CAN_EMPLOYEE_MANAGER_BY_COMPANY_LIST,
    isPermission: true,
  },
  {
    module: 'EmployeeManager',
    label: 'Manager Of Employee List',
    role: 'HR_EXECUTIVE',
    permission: PERMISSION.CAN_MANAGER_OF_EMPLOYEE_LIST,
    isPermission: true,
  },
  {
    module: 'EmployeeManager',
    label: 'Employees Of Manager List',
    role: 'HR_EXECUTIVE',
    permission: PERMISSION.CAN_EMPLOYEES_OF_MANAGER_LIST,
    isPermission: true,
  },
  {
    module: 'EmployeeManager',
    label: 'EmployeeManager Update',
    role: 'HR_EXECUTIVE',
    permission: PERMISSION.CAN_EMPLOYEE_MANAGER_UPDATE,
    isPermission: true,
  },
];
