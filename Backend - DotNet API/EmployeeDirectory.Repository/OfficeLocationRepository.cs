using EmployeeDirectory.Models;
using EmployeeDirectory.Repository.Interface;
using Microsoft.EntityFrameworkCore;

namespace EmployeeDirectory.Repository
{
    public class OfficeLocationRepository : IOfficeLocationRepository
    {
        private readonly EmployeeDbContext _dbContext;

        public OfficeLocationRepository(EmployeeDbContext context)
        {
            _dbContext = context;
        }

        public void AddOfficeLocation(OfficeLocation officeLocation)
        {
            _dbContext.OfficeLocations.Add(officeLocation);
            _dbContext.SaveChanges();
        }

        public void DeleteOfficeLocation(int id)
        {
            var delOfficeLocation = _dbContext.OfficeLocations.FirstOrDefault(o => o.Id == id);
            if (delOfficeLocation is not null)
            {
                _dbContext.OfficeLocations.Remove(delOfficeLocation);
                _dbContext.SaveChanges();
            }
        }

        public OfficeLocation GetOfficeLocationById(int id)
        {
            return _dbContext.OfficeLocations.First(offLoc => offLoc.Id == id);
        }

        public List<OfficeLocation> GetOfficeLocations()
        {
            return _dbContext.OfficeLocations.ToList();
        }

        public void UpdateOfficeLocation(OfficeLocation officeLocation)
        {
            // Check if the entity is already attached to the context
            var existingOfficeLocation = _dbContext.OfficeLocations.FirstOrDefault(o => o.Id == officeLocation.Id);

            if (existingOfficeLocation is not null)
            {
                // If it's attached, update its properties
                _dbContext.Entry(existingOfficeLocation).CurrentValues.SetValues(officeLocation);
            }
            else
            {
                // If it's not attached, attach it and mark it as modified
                _dbContext.Attach(officeLocation);
                _dbContext.Entry(officeLocation).State = EntityState.Modified;
            }
            _dbContext.SaveChanges();
        }
    }
}
