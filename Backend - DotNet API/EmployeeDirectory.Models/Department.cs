namespace EmployeeDirectory.Models
{
    public partial class Department
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public ICollection<Employee> Employees { get; set; }
    }
}