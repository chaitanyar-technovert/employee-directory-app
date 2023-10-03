namespace EmployeeDirectory.Models
{
    public partial class JobTitle
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public ICollection<Employee> Employees { get; set; }
    }
}
