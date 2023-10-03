using EmployeeDirectory.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeDirectory.Repository.Interface
{
    public interface IJobTitleRepository
    {
        public void AddJobTitle(JobTitle jobTitle);
        public List<JobTitle> GetJobTitles();
        public JobTitle GetJobTitleById(int id);
        public void UpdateJobTitle(JobTitle jobTitle);
        public void DeleteJobTitle(int id);
    }
}
