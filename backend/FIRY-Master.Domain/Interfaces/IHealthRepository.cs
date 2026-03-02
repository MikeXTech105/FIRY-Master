using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FIRY_Master.Domain.Interfaces
{
    public interface IHealthRepository
    {
        Task<string> GetStatusAsync();
    }
}
