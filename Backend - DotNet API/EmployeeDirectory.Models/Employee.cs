using System.ComponentModel.DataAnnotations.Schema;

namespace EmployeeDirectory.Models
{
    public partial class Employee
    {
        public int Id { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public int JobTitleId { get; set; }
        public int OfficeLocationId { get; set; }
        public int DepartmentId { get; set; }
        public long PhoneNumber { get; set; }
        public string SkypeId { get; set; } = string.Empty;

        // Navigation property
        [ForeignKey("DepartmentId")]
        public Department Department { get; set; }
        
        [ForeignKey("JobTitleId")]
        public JobTitle JobTitle { get; set; }

        [ForeignKey("OfficeLocationId")]
        public OfficeLocation OfficeLocation { get; set; }
    }
}