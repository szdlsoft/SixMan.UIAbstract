using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SixMan.UICommon.Extensions
{
    public static class ObjectExtensions
    {
        public static object GetPropertyValue(this object obj, string propertyName)
        {
            return  obj.GetType().GetProperty(propertyName)?.GetValue(obj);
        }
    }
}
