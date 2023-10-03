namespace EmployeeDirectory.Models
{
    public partial class OfficeLocation
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public ICollection<Employee> Employees { get; set; }
    }
}
