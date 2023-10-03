using AutoMapper;
using EmployeeDirectory.ApiModels;
using EmployeeDirectory.Models;
using EmployeeDirectory.Services.Interface;
using EmployeeDirectory.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeDirectory.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JobTitlesController : ControllerBase
    {
        private readonly IJobTitleService _jobTitleService;
        private readonly IMapper _mapper;

        public JobTitlesController(IJobTitleService jobTitleService, IMapper mapper)
        {
            _jobTitleService = jobTitleService;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetJobTitles()
        {
            List<JobTitleViewModel> jobTitles = _mapper.Map<List<JobTitleViewModel>>(_jobTitleService.GetJobTitles());
            return Ok(jobTitles);
        }

        [HttpGet("{id}")]
        public IActionResult GetJobTitleById(int id)
        {
            JobTitleViewModel JobTitle = _mapper.Map<JobTitleViewModel>(_jobTitleService.GetJobTitleById(id));
            if (JobTitle is null)
            {
                return NotFound();
            }
            return Ok(JobTitle);
        }

        [HttpPost]
        public IActionResult AddJobTitle(JobTitleRequestModel jobTitle)
        {
            _jobTitleService.AddJobTitle(_mapper.Map<JobTitle>(jobTitle));
            return Ok();
        }

        [HttpPut("{id}")]
        public IActionResult UpdateJobTitle(int id, JobTitleRequestModel updatedJobTitle)
        {
            JobTitleViewModel jobTitle = _mapper.Map<JobTitleViewModel>(_jobTitleService.GetJobTitleById(id));
            if (jobTitle is null)
            {
                return NotFound();
            }

            _mapper.Map(updatedJobTitle, jobTitle);

            _jobTitleService.UpdateJobTitle(_mapper.Map<JobTitle>(jobTitle));
            return Ok(jobTitle);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteJobTitle(int id)
        {
            var jobTitle = _jobTitleService.GetJobTitleById(id);
            if (jobTitle is null)
            {
                return NotFound();
            }
            _jobTitleService.DeleteJobTitle(id);
            return Ok();
        }
    }
}
