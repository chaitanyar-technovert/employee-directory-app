using EmployeeDirectory.Models;
using EmployeeDirectory.Repository.Interface;
using Microsoft.EntityFrameworkCore;

namespace EmployeeDirectory.Repository
{
    public class JobTitleRepository : IJobTitleRepository
    {
        private readonly EmployeeDbContext _dbContext;
        public JobTitleRepository(EmployeeDbContext context)
        {
            _dbContext = context;
        }

        public void AddJobTitle(JobTitle jobTitle)
        {
            _dbContext.JobTitles.Add(jobTitle);
            _dbContext.SaveChanges();
        }

        public void DeleteJobTitle(int id)
        {
            var jobTitle = _dbContext.JobTitles.FirstOrDefault(x => x.Id == id);
            if (jobTitle is not null)
            {
                _dbContext.JobTitles.Remove(jobTitle);
                _dbContext.SaveChanges();
            }
        }

        public JobTitle GetJobTitleById(int id)
        {
            return _dbContext.JobTitles.First(jt => jt.Id == id);
        }

        public List<JobTitle> GetJobTitles()
        {
            return _dbContext.JobTitles.ToList();
        }

        public void UpdateJobTitle(JobTitle jobTitle)
        {
            // Check if the entity is already attached to the context
            var existingJobTitle = _dbContext.JobTitles.FirstOrDefault(j => j.Id == jobTitle.Id);

            if (existingJobTitle is not null)
            {
                // If it's attached, update its properties
                _dbContext.Entry(existingJobTitle).CurrentValues.SetValues(jobTitle);
            }
            else
            {
                // If it's not attached, attach it and mark it as modified
                _dbContext.Attach(jobTitle);
                _dbContext.Entry(jobTitle).State = EntityState.Modified;
            }
            _dbContext.SaveChanges();
        }
    }
}
