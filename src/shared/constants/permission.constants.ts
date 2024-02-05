export const PERMISSION = {
  //Auth
  CAN_REGISTER: 'can-register',
  CAN_LOGIN: 'can-login',
  CAN_FORGOT_PASSWORD: 'can-forgot',
  CAN_UPDATE_FORGOT_TOKEN: 'can-update-password',

  // User
  CAN_USER_LIST: 'can-user-list',
  CAN_USER_PROFILE: 'can-user-profile',
  CAN_USER_UPDATE_PROFILE: 'can-user-update-profile',
  CAN_USER_DELETE: 'can-user-delete',
  CAN_USER_LIST_DASHBOARD: 'can-user-list-dashboard',
  CAN_USER_LIST_ROLE: 'can-user-list-role',
  CAN_USER: 'can-user',
  CAN_USER_UPDATE_PASSWORD: 'can-user-update-password',
  CAN_USER_UPDATE_ROLE: 'can-user-update-role',

  // Employee
  CAN_EMPLOYEE_LIST: 'can-employee-list',
  CAN_EMPLOYEE: 'can-employee',
  CAN_EMPLOYEE_DELETE: 'can-employee-delete',
  CAN_EMPLOYEE_UPDATE: 'can-employee-update',

  // Companies
  CAN_COMPANY_LIST: 'can-company-list',
  CAN_COMPANY_UPDATE: 'can-company-update',
  CAN_COMPANY_DELETE: 'can-company-delete',
  CAN_COMPANY_DEPARTMENT_LIST: 'can-company-department-list',
  CAN_COMPANY_DEPARTMENT: 'can-company-department',
  CAN_COMPANY_DEPARTMENT_ADD: 'can-company-department-add',
  CAN_COMPANY_DEPARTMENT_UPDATE: 'can-company-department-update',
  CAN_COMPANY_DEPARTMENT_DELETE: 'can-company-department-delete',

  //Client
  CAN_CLIENT_ADD: 'can-client-add',
  CAN_CLIENT_DELETE: 'can-client-delete',
  CAN_CLIENT_LIST: 'can-client-list',
  CAN_CLIENT_UPDATE: 'can-client-update',
  CAN_CLIENT: 'can-client',

  // User Address
  CAN_ADDRESS: 'can-address',

  // Company Address
  CAN_COMPANY_ADDRESS: 'can-company-address',

  // Bank
  CAN_BANK_ADD: 'can-bank-add',
  CAN_BANK_UPDATE: 'can-bank-update',

  // course certificate
  CAN_COURSE_VERIFIED: 'can-course-verified',

  // document
  CAN_DOC_VERIFIED: 'can-doc-verified',

  // invitation
  CAN_INVITATION_LIST: 'can-invitation-list',
  CAN_INVITATION_ADD: 'can-invitation-add',
  CAN_INVITATION_RESEND: 'can-invitation-resend',
  CAN_INVITATION_DELETE: 'can-invitation-delete',
  CAN_INVITATION_BULK_SEND: 'can-invitation-bulk-send',
  CAN_INVITATION_MUL_SEND: 'can-invitation-multiple-send',

  //Department
  CAN_DEPARTMENT_ADD: 'can-department-add',
  CAN_DEPARTMENT_UPDATE: 'can-department-update',
  CAN_DEPARTMENT_DELETE: 'can-department-delete',

  //Job-position
  CAN_JOB_POSITION_ADD: 'can-job-position-add',
  CAN_JOB_POSITION_LIST: 'can-job-position-list',
  CAN_JOB_POSITION_UPDATE: 'can-job-position-update',
  CAN_JOB_POSITION_DELETE: 'can-job-position-delete',
  CAN_JOB_POSITION: 'can-job-position',

  //Leave-rule
  CAN_LEAVE_RULE_ADD: 'can-leave-rule-add',
  CAN_LEAVE_RULE_UPDATE: 'can-leave-rule-update',
  CAN_LEAVE_RULE_DELETE: 'can-leave-rule-delete',
  CAN_EMPLOYEE_BY_COMPANY_LIST: 'can-employee-by-company-list',
  CAN_ASSIGN_LEAVE_RULE: 'can-assign-leave-rule',
  CAN_ASSIGN_LEAVE_RULE_DELETE: 'can-assign-leave-rule-delete',

  //leaves-master
  CAN_LEAVE_REQUEST_MAIL: 'can-leave-request-mail',
  CAN_LEAVE_UPDATE: 'can-leave-update',
  CAN_LEAVE_LIST: 'can-leave-list',

  //works
  CAN_WORKS_DOWNLOAD: 'can-works-download',

  //salary
  CAN_SALARY: 'can-salary',
  CAN_SALARY_LIST: 'can-salary-list',
  CAN_SALARY_SEND: 'can-salary-send',
  CAN_SALARY_ADD: 'can-salary-add',
  CAN_SALARY_UPDATE: 'can-salary-update',
  CAN_SALARY_DOWNLOAD: 'can-salary-download',
  CAN_SALARY_HISTORY: 'can-salary-history',
  CAN_SALARY_HISTORY_DOWNLOAD: 'can-salary-history-download',

  //announcement
  CAN_ANNOUNCEMENT: 'can-announcement',
  CAN_ANNOUNCEMENT_LIST: 'can-announcement-list',
  CAN_ANNOUNCEMENT_ADD: 'can-announcement-add',
  CAN_ANNOUNCEMENT_UPDATE: 'can-announcement-update',
  CAN_ANNOUNCEMENT_DELETE: 'can-announcement-delete',

  //company-policy
  CAN_COMPANY_POLICY_ADD: 'can-company-policy-add',
  CAN_COMPANY_POLICY_UPDATE: 'can-company-policy-update',

  //Expense
  CAN_EXPENSE_APPROVED: 'can-expense-approved',
  CAN_EXPENSE_REJECTED: 'can-expense-rejected',
  CAN_EXPENSE_PAID: 'can-expense-paid',
  CAN_EXPENSE_ADD: 'can-expense-add',
  CAN_EXPENSE_UPDATE: 'can-expense-update',
  CAN_EXPENSE_DELETE: 'can-expense-delete',
  CAN_EXPENSE_LIST: 'can-expense-list',

  // Expense Category
  CAN_EXPENSE_CATEGORY_ADD: 'can-expense-category-add',
  CAN_EXPENSE_CATEGORY_UPDATE: 'can-expense-category-update',
  CAN_EXPENSE_CATEGORY_LIST: 'can-expense-category-list',
  CAN_EXPENSE_CATEGORY_DELETE: 'can-expense-category-delete',

  //Attendance Rules
  CAN_ATTENDANCE_RULES_ADD: 'can-attendance-rules-add',
  CAN_ATTENDANCE_RULES_UPDATE: 'can-attendance-rules-update',
  CAN_ATTENDANCE_RULES_LIST: 'can-attendance-rules-list',
  CAN_ATTENDANCE_RULES_DELETE: 'can-attendance-rules-delete',
  CAN_ATTENDANCE_SHIFT_ASSIGN: 'can-attendance-shift-assign',
  CAN_ATTENDANCE_SHIFT_DELETE: 'can-attendance-shift-delete',

  //resume-master
  CAN_RESUME_PREVIEW: 'can-resume-preview',
  CAN_RESUME_LIST: 'can-resume-list',
  CAN_RESUME_ADD: 'can-resume-add',

  //invoice
  CAN_INVOICE_LIST: 'can-invoice-list',
  CAN_INVOICE_ADD: 'can-invoice-add',
  CAN_INVOICE_UPDATE: 'can-invoice-update',
  CAN_INVOICE_DELETE: 'can-invoice-delete',

  //permission
  CAN_PERMISSION_LIST: 'can-permission-list',

  //employeeManager
  CAN_EMPLOYEE_MANAGER_ADD: 'can-employee-manager-add',
  CAN_EMPLOYEE_MANAGER_BY_COMPANY_LIST: 'can-employee-manager-by-company-list',
  CAN_MANAGER_OF_EMPLOYEE_LIST: 'can-manager-of-employee-list',
  CAN_EMPLOYEES_OF_MANAGER_LIST: 'can-employees-of manager-list',
  CAN_EMPLOYEE_MANAGER_UPDATE: 'can--employee-manager-update',
};
