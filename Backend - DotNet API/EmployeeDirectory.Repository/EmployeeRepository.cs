using EmployeeDirectory.Models;
using EmployeeDirectory.Repository.Interface;
using Microsoft.EntityFrameworkCore;
using System.Data.SqlClient;

namespace EmployeeDirectory.Repository
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private EmployeeDbContext _dbContext;

        public EmployeeRepository(EmployeeDbContext context)
        {
            _dbContext = context;
        }

        public void AddEmployee(Employee employee)
        {
            _dbContext.Employees.Add(employee);
            _dbContext.SaveChanges();
        }

        public void DeleteEmployee(int id)
        {
            var employee = _dbContext.Employees.FirstOrDefault(emp => emp.Id == id);
            if (employee is not null)
            {
                _dbContext.Employees.Remove(employee);
                _dbContext.SaveChanges();
            }
        }

        public Employee GetEmployeeById(int id)
        {
            return _dbContext.Employees.First(emp => emp.Id.Equals(id));
        }

        public List<Employee> GetEmployees()
        {
            return _dbContext.Employees.Include(d => d.Department).Include(jt => jt.JobTitle).Include(ol => ol.OfficeLocation).ToList();
        }

        public void UpdateEmployee(Employee employee)
        {
            // Check if the entity is already attached to the context
            var existingEmployee = _dbContext.Employees.FirstOrDefault(e => e.Id == employee.Id);

            if (existingEmployee is not null)
            {
                // If it's attached, update its properties
                _dbContext.Entry(existingEmployee).CurrentValues.SetValues(employee);
            }
            else
            {
                // If it's not attached, attach it and mark it as modified
                _dbContext.Attach(employee);
                _dbContext.Entry(employee).State = EntityState.Modified;
            }
            _dbContext.SaveChanges();

        }
    }
}