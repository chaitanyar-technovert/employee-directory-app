namespace EmployeeDirectory.ApiModels
{
    public class EmployeeRequestModel
    {
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public int JobTitleId { get; set; }
        public int OfficeLocationId { get; set; }
        public int DepartmentId { get; set; }
        public long PhoneNumber { get; set; }
        public string SkypeId { get; set; } = string.Empty;
    }
}
