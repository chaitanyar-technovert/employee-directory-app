using EmployeeDirectory.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeDirectory.Repository.Interface
{
    public interface IOfficeLocationRepository
    {
        public void AddOfficeLocation(OfficeLocation officeLocation);
        public List<OfficeLocation> GetOfficeLocations();
        public OfficeLocation GetOfficeLocationById(int id);
        public void UpdateOfficeLocation(OfficeLocation officeLocation);
        public void DeleteOfficeLocation(int id);
    }
}
