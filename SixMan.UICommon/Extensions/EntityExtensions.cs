using SixMan.UICommon.Lookup;
using System;
using System.Collections.Generic;
using System.Text;

namespace SixMan.UICommon.Extensions
{
    public static class EntityExtensions
    {
        /// <summary>
        /// 获取可视信息
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="entity"></param>
        /// <returns></returns>
        private static string GetText(this IId entity, Func<IId, string> textFactory = null )
        {
            if( textFactory != null )
            {
                return textFactory(entity);
            }

            if(  entity is IText)
            {
                return ((IText)entity).Text;
            }

            var pi = entity.GetType().GetPropertyAny( typeof(string), "DisplayName", "Name", "Description");
            if ( pi != null)
            {
                return pi.GetValue(entity) as string;
            }


            return entity.ToString();
        }

        public static LookUpItem ToLookupItem( this IId entity )
        {
            return new LookUpItem( entity.Id, entity.GetText());
        }
    }
}
