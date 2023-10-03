using AutoMapper;
using EmployeeDirectory.ApiModels;
using EmployeeDirectory.Models;
using EmployeeDirectory.Services.Interface;
using EmployeeDirectory.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeDirectory.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly IEmployeeService _employeeService;
        private readonly IMapper _mapper;

        public EmployeesController(IEmployeeService employeeService, IMapper mapper)
        {
            _employeeService = employeeService;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetEmployees()
        {
            List<EmployeeViewModel> employees = _mapper.Map<List<EmployeeViewModel>>(_employeeService.GetEmployees());
            return Ok(employees); 
        }

        [HttpGet("{id}")]
        public IActionResult GetEmployeeById(int id)
        {
            EmployeeViewModel employee = _mapper.Map<EmployeeViewModel>(_employeeService.GetEmployeeById(id));
            if (employee == null)
            {
                return NotFound();
            }
            return Ok(employee);
        }

        [HttpPost]
        public IActionResult AddEmployee(EmployeeRequestModel employee)
        {
            _employeeService.AddEmployee(_mapper.Map<Employee>(employee));
            return Ok();
        }

        [HttpPut("{id}")]
        public IActionResult UpdateEmployee(int id, EmployeeRequestModel updatedEmployee)
        {
            // Employee Check.
            EmployeeViewModel employee = _mapper.Map<EmployeeViewModel>(_employeeService.GetEmployeeById(id));
            if (employee is null)
            {
                return NotFound();
            }

            _mapper.Map(updatedEmployee, employee);

            _employeeService.UpdateEmployee(_mapper.Map<Employee>(employee));
            return Ok(employee);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteEmployee(int id)
        {
            var employee = _employeeService.GetEmployeeById(id);
            if (employee is null)
            {
                return NotFound();
            }

            _employeeService.DeleteEmployee(id);
            return Ok();
        }
    }
}
