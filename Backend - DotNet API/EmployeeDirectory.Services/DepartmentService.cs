using EmployeeDirectory.Models;
using EmployeeDirectory.Repository.Interface;
using EmployeeDirectory.Services.Interface;

namespace EmployeeDirectory.Services
{
    public class DepartmentService : IDepartmentService
    {
        private readonly IDepartmentRepository _departmentRepository;

        public DepartmentService(IDepartmentRepository departmentRepository)
        {
            _departmentRepository = departmentRepository;
        }

        public void AddDepartment(Department department)
        {
            _departmentRepository.AddDepartment(department);
        }

        public void DeleteDepartment(int id)
        {
            _departmentRepository.DeleteDepartment(id);
        }

        public Department GetDepartmentById(int id)
        {
            return _departmentRepository.GetDepartmentById(id);
        }

        public List<Department> GetDepartments()
        {
            return _departmentRepository.GetDepartments();
        }

        public void UpdateDepartment(Department department)
        {
            _departmentRepository.UpdateDepartment(department);
        }
    }
}
