import EmployeeTableList from '../sections/employee/EmployeeTableList'
import Page from '../components/Page'
import React from 'react'

const EmployeePage = () => {
  return (
    <Page title='Employee Page'>
      <EmployeeTableList />
    </Page>
  )
}

export default EmployeePage