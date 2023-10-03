using EmployeeDirectory.Models;
using EmployeeDirectory.Repository;
using EmployeeDirectory.Repository.Interface;
using EmployeeDirectory.Services;
using EmployeeDirectory.Services.Interface;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

// Configure ConnectionString
string connectionString = builder.Configuration.GetConnectionString("EmpDbConnection")!;

builder.Services.AddSingleton(connectionString);

// Registering the Repositories.
builder.Services.AddScoped<IEmployeeRepository, EmployeeRepository>();
builder.Services.AddScoped<IDepartmentRepository, DepartmentRepository>();
builder.Services.AddScoped<IOfficeLocationRepository, OfficeLocationRepository>();
builder.Services.AddScoped<IJobTitleRepository, JobTitleRepository>();

// Registering the Services.
builder.Services.AddScoped<IEmployeeService, EmployeeService>();
builder.Services.AddScoped<IDepartmentService, DepartmentService>();
builder.Services.AddScoped<IOfficeLocationService, OfficeLocationService>();
builder.Services.AddScoped<IJobTitleService, JobTitleService>();

// AutoMapper
builder.Services.AddAutoMapper(typeof(Program).Assembly);

// Database context for application.
builder.Services.AddDbContext<EmployeeDbContext>(options => options.UseSqlServer(connectionString));

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(policy => policy.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());

app.UseAuthorization();

app.MapControllers();

app.Run();
