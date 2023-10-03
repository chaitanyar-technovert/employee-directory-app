using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeDirectory.ViewModels
{
    public partial class EmployeeViewModel
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
    }
}
