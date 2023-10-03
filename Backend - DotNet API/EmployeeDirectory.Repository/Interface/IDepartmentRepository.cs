using EmployeeDirectory.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeDirectory.Repository.Interface
{
    public interface IDepartmentRepository
    {
        public void AddDepartment(Department department);
        public List<Department> GetDepartments();
        public Department GetDepartmentById(int id);
        public void UpdateDepartment(Department department);
        public void DeleteDepartment(int id);
        //public Department GetDepartmentByName(string name);
    }
}
