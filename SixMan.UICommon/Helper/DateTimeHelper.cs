using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SixMan.UICommon.Helper
{
    public static class DateTimeHelper
    {
        public static DateTime ParseDate(string str)
        {
            return DateTime.ParseExact(str, "yyyy-MM-dd", System.Globalization.CultureInfo.InvariantCulture);
        }
    }
}
