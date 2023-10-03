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
    public class OfficeLocationsController : ControllerBase
    {
        private readonly IOfficeLocationService _officeLocationService;
        private readonly IMapper _mapper;

        public OfficeLocationsController(IOfficeLocationService officeLocationService, IMapper mapper)
        {
            _officeLocationService = officeLocationService;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetOfficeLocations()
        {
            List<OfficeLocationViewModel> officeLocations = _mapper.Map<List<OfficeLocationViewModel>>(_officeLocationService.GetOfficeLocations());
            return Ok(officeLocations);
        }

        [HttpGet("{id}")]
        public IActionResult GetOfficeLocationById(int id)
        {
            OfficeLocationViewModel officeLocation = _mapper.Map<OfficeLocationViewModel>(_officeLocationService.GetOfficeLocationById(id));
            if (officeLocation is null)
            {
                return NotFound();
            }
            return Ok(officeLocation);
        }

        [HttpPost]
        public IActionResult AddOfficeLocation(OfficeLocationRequestModel officeLocation)
        {
            _officeLocationService.AddOfficeLocation(_mapper.Map<OfficeLocation>(officeLocation));
            return Ok();
        }

        [HttpPut("{id}")]
        public IActionResult UpdateOfficeLocation(int id, OfficeLocationRequestModel updatedOfficeLocation)
        {
            OfficeLocationViewModel officeLocation = _mapper.Map<OfficeLocationViewModel>(_officeLocationService.GetOfficeLocationById(id));
            if (officeLocation is null)
            {
                return NotFound();
            }

            _mapper.Map(updatedOfficeLocation, officeLocation);
            
            _officeLocationService.UpdateOfficeLocation(_mapper.Map<OfficeLocation>(officeLocation));
            return Ok(updatedOfficeLocation);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteOfficeLocation(int id)
        {
            var officeLocation = _officeLocationService.GetOfficeLocationById(id);
            if (officeLocation is null)
            {
                return NotFound();
            }
            _officeLocationService.DeleteOfficeLocation(id);
            return Ok();
        }
    }
}
