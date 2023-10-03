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
    public class JobTitleService : IJobTitleService
    {
        private readonly IJobTitleRepository _jobTitleRepository;

        public JobTitleService(IJobTitleRepository jobTitleRepository)
        {
            _jobTitleRepository = jobTitleRepository;
        }

        public void AddJobTitle(JobTitle jobTitle)
        {
            _jobTitleRepository.AddJobTitle(jobTitle);
        }

        public void DeleteJobTitle(int id)
        {
            _jobTitleRepository.DeleteJobTitle(id);
        }

        public JobTitle GetJobTitleById(int id)
        {
            return _jobTitleRepository.GetJobTitleById(id);
        }

        public List<JobTitle> GetJobTitles()
        {
            return _jobTitleRepository.GetJobTitles();
        }

        public void UpdateJobTitle(JobTitle jobTitle)
        {
            _jobTitleRepository.UpdateJobTitle(jobTitle);
        }
    }
}
