using AutoMapper;
using EmployeeDirectory.ApiModels;
using EmployeeDirectory.Models;
using EmployeeDirectory.Services.Interface;
using EmployeeDirectory.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EmployeeDirectory.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentsController : ControllerBase
    {
        private readonly IDepartmentService _departmentsService;
        private readonly IMapper _mapper;
        private readonly EmployeeDbContext _dbContext;

        public DepartmentsController(IDepartmentService departmentsService, IMapper mapper, EmployeeDbContext context)
        {
            _departmentsService = departmentsService;
            _mapper = mapper;
            _dbContext = context;
        }

        [HttpGet]
        public IActionResult GetDepartments()
        {
            List<DepartmentViewModel> departments = _mapper.Map<List<DepartmentViewModel>>(_departmentsService.GetDepartments());
            return Ok(departments);
        }

        [HttpGet("{id}")]
        public IActionResult GetDepartmentById(int id)
        {
            DepartmentViewModel department = _mapper.Map<DepartmentViewModel>(_departmentsService.GetDepartmentById(id));
            if (department is null)
            {
                return NotFound();
            }
            return Ok(department);
        }

        [HttpPost]
        public IActionResult AddDepartment(DepartmentRequestModel department)
        {
            _departmentsService.AddDepartment(_mapper.Map<Department>(department));
            return Ok();
        }

        [HttpPut("{id}")]
        public IActionResult UpdateDepartment(int id, DepartmentRequestModel updatedDepartment)
        {
            //_dbContext.Departments.Update()
            // Department Check.
            DepartmentViewModel department = _mapper.Map<DepartmentViewModel>(_departmentsService.GetDepartmentById(id));
            if (department is null)
            {
                return NotFound();
            }

            _mapper.Map(updatedDepartment, department);

            _departmentsService.UpdateDepartment(_mapper.Map<Department>(department));
            return Ok(department);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteDepartment(int id)
        {
            var department = _departmentsService.GetDepartmentById(id);
            if (department is null)
            {
                return NotFound();
            }
            _departmentsService.DeleteDepartment(id);
            return Ok();
        }
    }
}
