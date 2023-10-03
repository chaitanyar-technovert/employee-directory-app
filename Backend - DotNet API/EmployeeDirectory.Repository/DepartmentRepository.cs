using EmployeeDirectory.Models;
using EmployeeDirectory.Repository.Interface;
using Microsoft.EntityFrameworkCore;

namespace EmployeeDirectory.Repository
{
    public class DepartmentRepository : IDepartmentRepository
    {
        private EmployeeDbContext _dbContext;

        public DepartmentRepository(EmployeeDbContext context)
        {
            _dbContext = context;
        }

        public void AddDepartment(Department department)
        {
            _dbContext.Departments.Add(department);
            _dbContext.SaveChanges();
        }

        public void DeleteDepartment(int id)
        {
            var department = _dbContext.Departments.FirstOrDefault(dept => dept.Id == id);
            if (department is not null)
            {
                _dbContext.Departments.Remove(department);
                _dbContext.SaveChanges();
            }
        }

        public Department GetDepartmentById(int id)
        {
            return _dbContext.Departments.First(dept => dept.Id == id);
        }

        public List<Department> GetDepartments()
        {
            return _dbContext.Departments.ToList();
        }

        public void UpdateDepartment(Department department)
        {
            // Check if the entity is already attached to the context
            var existingDepartment = _dbContext.Departments.FirstOrDefault(d => d.Id == department.Id);

            if (existingDepartment is not null)
            {
                // If it's attached, update its properties
                _dbContext.Entry(existingDepartment).CurrentValues.SetValues(department);
            }
            else
            {
                // If it's not attached, attach it and mark it as modified
                _dbContext.Attach(department);
                _dbContext.Entry(department).State = EntityState.Modified;
            }
            _dbContext.SaveChanges();
        }
    }
}
