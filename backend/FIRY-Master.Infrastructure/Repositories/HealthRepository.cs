using Dapper;
using FIRY_Master.Domain.Interfaces;
using FIRY_Master.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FIRY_Master.Infrastructure.Repositories
{
    public class HealthRepository : IHealthRepository
    {
        private readonly DapperContext _context;

        public HealthRepository(DapperContext context)
        {
            _context = context;
        }

        public async Task<string> GetStatusAsync()
        {
            var query = "SELECT 'API is running successfully'";

            using var connection = _context.CreateConnection();
            var result = await connection.QueryFirstOrDefaultAsync<string>(query);

            return result!;
        }
    }
}
