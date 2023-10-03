using AutoMapper;
using EmployeeDirectory.ApiModels;
using EmployeeDirectory.Models;
using EmployeeDirectory.ViewModels;

namespace EmployeeDirectory
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<DepartmentRequestModel, Department>().ReverseMap();
            CreateMap<EmployeeRequestModel, Employee>().ReverseMap();
            CreateMap<JobTitleRequestModel, JobTitle>().ReverseMap();
            CreateMap<OfficeLocationRequestModel, OfficeLocation>().ReverseMap();

            CreateMap<DepartmentViewModel, Department>().ReverseMap();
            CreateMap<EmployeeViewModel, Employee>().ReverseMap();
            CreateMap<JobTitleViewModel, JobTitle>().ReverseMap();
            CreateMap<OfficeLocationViewModel, OfficeLocation>().ReverseMap();

            CreateMap<DepartmentRequestModel, DepartmentViewModel>().ReverseMap();
            CreateMap<EmployeeRequestModel, EmployeeViewModel>().ReverseMap();
            CreateMap<JobTitleRequestModel, JobTitleViewModel>().ReverseMap();
            CreateMap<OfficeLocationRequestModel, OfficeLocationViewModel>().ReverseMap();

        }
    }
}
