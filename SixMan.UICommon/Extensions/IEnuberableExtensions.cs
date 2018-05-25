using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace SixMan.UICommon.Extensions
{
    public static class IEnumerableExtensions
    {
        public static string AggregateToStr(this IEnumerable<object> list, string str )
        {
            var astring = list.Aggregate(str, (s, n) => s + "," + n.ToString());
            return astring.Substring(1, astring.Length - 1); //去掉头部,
        }

    }
}
