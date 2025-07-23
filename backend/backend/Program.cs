using backend.Repositories;
using backend.Services;
using Dapper;
using System.Data;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddScoped<IDbConnection>(sp =>
    new MySql.Data.MySqlClient.MySqlConnection(
        builder.Configuration.GetConnectionString("DefaultConnection")));

// Testing
builder.Services.AddScoped<ITestRepository, TestRepository>();
builder.Services.AddScoped<TestService>();

// Register Services and Repositories
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IProfessionalRepository, ProfessionalRepository>();
builder.Services.AddScoped<IProfessionalService, ProfessionalService>();
builder.Services.AddScoped<IServiceRepository, ServiceRepository>();
builder.Services.AddScoped<IServiceService, ServiceService>();
builder.Services.AddScoped<IProfessionalServiceMappingRepository, ProfessionalServiceMappingRepository>();
builder.Services.AddScoped<IProfessionalServiceMappingService,  ProfessionalServiceMappingService>();
builder.Services.AddScoped<IProfessionalAvailabilityRepository, ProfessionalAvailabilityRepository>();
builder.Services.AddScoped<IProfessionalAvailabilityService, ProfessionalAvailabilityService>();
builder.Services.AddScoped<IBookingService, BookingService>();
builder.Services.AddScoped<IBookingRepository, BookingRepository>();
builder.Services.AddScoped<IAvailabilityRepository, AvailabilityRepository>();
builder.Services.AddScoped<IAvailabilityService, AvailabilityService>();
builder.Services.AddScoped<IProfessionalReviewService, ProfessionalReviewService>();
builder.Services.AddScoped<IProfessionalReviewRepository, ProfessionalReviewRepository>();


builder.Services
    .AddControllers()
    .AddJsonOptions(opts =>
    {
        opts.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
    });

// Enable underscore support in Dapper
DefaultTypeMap.MatchNamesWithUnderscores = true;

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Move CORS configuration BEFORE `builder.Build()`
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader());
});

var app = builder.Build();

// Use CORS
app.UseCors("AllowAll");

// Swagger for development
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
