using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SixMan.UICommon.Extensions
{
    public static class BoolExtensions
    {
        public static bool IsTrue(this bool? value)
        {
            return value != null && value.Value;
        }
    }
}
