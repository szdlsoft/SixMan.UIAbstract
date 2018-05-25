using System;
using System.Collections.Generic;
using System.Reflection;
using System.Text;

namespace SixMan.UICommon.Extensions
{
    public static class TypeExtensions
    {
        public static PropertyInfo GetPropertyAny(this Type type, Type propertyType, params string[] propertyNames)
        {
            foreach( var name in propertyNames)
            {
                var pi = type.GetProperty(name, propertyType);
                if( pi != null)
                {
                    return pi;
                }
            }

            return null;
        }

    }
}
