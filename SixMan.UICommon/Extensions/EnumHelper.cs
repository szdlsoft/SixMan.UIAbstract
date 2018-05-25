using SixMan.UICommon.Lookup;
using System;
using System.Collections.Generic;
using System.Text;

namespace SixMan.UICommon.Extensions
{
    public static class EnumHelper
    {
        public static LookUpSource GetLookUpSource(Type enumType)
        {
            LookUpSource result = new LookUpSource();

            var values = Enum.GetValues(enumType);
            foreach (var v in values)
            {
                int value = (int)v;
                result.Add(new LookUpItem( value, v.ToString()));
            }

            return result;
        }
        /// <summary>
        /// 枚举转easyui-combobox的data-options
        /// </summary>
        /// <param name="enumType"></param>
        /// <returns></returns>
        public static string ToEasyuiComboboxDataOptions(this Type enumType)
        {
            //valueField: 'value',
            //      textField: 'label',
            //      data: [{
            //    label: 'Open',
            //                value: '0'
            //            },{
            //    label: 'OnGoing',
            //       value: '1'

            //            },{
            //    label: 'Close',
            //       value: '2'

            //            }]
            StringBuilder sb = new StringBuilder();

            sb.Append("valueField:'id',  textField:'text',data:");
            LookUpSource items = EnumHelper.GetLookUpSource(enumType);

            sb.Append("[");
            foreach (var item in items)
            {
                sb.Append("{" + $"id:'{item.Id}',text:'{item.Text}'" + "},");
            }
            sb.Append("]");

            return sb.ToString();
        }

    }
}
