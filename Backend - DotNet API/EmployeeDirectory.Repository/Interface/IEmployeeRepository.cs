using EmployeeDirectory.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeDirectory.Repository.Interface
{
    public interface IEmployeeRepository
    {
        public void AddEmployee(Employee employee);
        public List<Employee> GetEmployees();
        public Employee GetEmployeeById(int id);
        public void UpdateEmployee(Employee employee);
        public void DeleteEmployee(int id);
    }
}
