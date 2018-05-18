using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace SixMan.UIAbstract.Lookup
{
    /// <summary>
    /// 
    /// </summary>
    public interface ILookUpDataProvider
    {
        LookUpSource GetLookUp();
    }

    public static class IQueryableExtensions
    {
        public static LookUpSource ToLookUpSource(this IEnumerable<LookUpItem> list)
        {
            LookUpSource result = new LookUpSource();
            result.AddRange(list);
            return result;
        }
    }

}
