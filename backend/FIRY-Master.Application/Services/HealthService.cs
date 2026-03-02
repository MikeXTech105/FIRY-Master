using FIRY_Master.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FIRY_Master.Application.Services
{
    public class HealthService
    {
        private readonly IHealthRepository _repository;

        public HealthService(IHealthRepository repository)
        {
            _repository = repository;
        }

        public async Task<string> GetHealthAsync()
        {
            return await _repository.GetStatusAsync();
        }
    }
}
