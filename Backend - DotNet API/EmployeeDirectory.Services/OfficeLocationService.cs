using EmployeeDirectory.Models;
using EmployeeDirectory.Repository.Interface;
using EmployeeDirectory.Services.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeDirectory.Services
{
    public class OfficeLocationService : IOfficeLocationService
    {
        private readonly IOfficeLocationRepository _officeLocationRepository;

        public OfficeLocationService(IOfficeLocationRepository officeLocationRepository)
        {
            _officeLocationRepository = officeLocationRepository;
        }

        public void AddOfficeLocation(OfficeLocation officeLocation)
        {
            _officeLocationRepository.AddOfficeLocation(officeLocation);
        }

        public void DeleteOfficeLocation(int id)
        {
            _officeLocationRepository.DeleteOfficeLocation(id);
        }

        public OfficeLocation GetOfficeLocationById(int id)
        {
            return _officeLocationRepository.GetOfficeLocationById(id);
        }

        public List<OfficeLocation> GetOfficeLocations()
        {
            return _officeLocationRepository.GetOfficeLocations();
        }

        public void UpdateOfficeLocation(OfficeLocation officeLocation)
        {
            _officeLocationRepository.UpdateOfficeLocation(officeLocation);
        }
    }
}
