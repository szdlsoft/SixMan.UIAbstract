using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;

namespace SixMan.UICommon.Extensions
{
    public static class StringExtensions
    {
        public static string[] ToStringList(this string str, char separator = ',')
        {
            return str.Split(separator).ToArray();
        }

        public static string ToStr(this double?[] values)
        {
            return values.Aggregate("", (s, v) => s + " " + v.ToString());
        }

        public static string ToStr(this int[] values)
        {
            return values.Aggregate("", (s, v) => s + " " + v.ToString());
        }

        public static string ToStr(this double[] values)
        {
            return values.Aggregate("", (s, v) => s + " " + v.ToString());
        }

        public static double TryParseDouble(this string str, double defaultValue = 0)
        {
            double result = defaultValue;
            double.TryParse(str, out result);
            return result;
        }

        public static bool IsNullOrEmpty(this string str)
        {
            return str == null || string.IsNullOrEmpty(str.Trim());
        }

        public static bool IsNotNullOrEmpty(this string str)
        {
            return !str.IsNullOrEmpty();
        }

        public static bool IsInList(this string str, IEnumerable<string> list)
        {
            return list.Any(item => string.Compare(item, str, true) == 0);
        }

        public static bool IsNotInList(this string str, IEnumerable<string> list)
        {
            return !IsInList(str, list);
        }

        public static bool IsCap(this string str)
        {
            return Regex.IsMatch(str, "^[A-Z]+$");
        }

        //public static string ToJsonName(this string name)
        //{
        //    if (name.IsCap()) //如果是缩写
        //    {
        //        return name.ToLower();
        //    }
        //    else
        //    {
        //        return name.ToCamelCase();
        //    }
        //}
        /// <summary>
        /// '/' 变 '\\'
        /// </summary>
        /// <param name="slashName"></param>
        /// <returns></returns>
        public static string ToAntiSlash(this string slashName)
        {
            if (slashName == null)
            {
                return null;
            }

            return slashName.Replace('/', '\\');
        }
        /// <summary>
        /// '\\'变  '/'
        /// </summary>
        /// <param name="antiSlashName"></param>
        /// <returns></returns>
        public static string ToSlash(this string antiSlashName)
        {
            if (antiSlashName == null)
            {
                return null;
            }
            return antiSlashName.Replace('\\', '/');
        }
        /// <summary>
        /// 取括号中得内容
        /// 例如：  苏州市部分农贸市场零售均价（2018年03月29日） 得到：2018年03月29日
        /// 
        /// </summary>
        /// <param name="str"></param>
        /// <returns></returns>
        public static string BracketsSub(this string str)
        {
            var start = str.IndexOfAny(new char[] { '(', '（' });
            var end = str.IndexOfAny(new char[] { ')', '）' }, start);

            return str.Substring(start + 1, end - start - 1);
        }

        /// <summary>
        /// 解析2018年03月29日
        /// </summary>
        /// <param name="str"></param>
        /// <returns></returns>
        public static DateTime ToDate(this string str)
        {
            var defaultValue = new DateTime(1980, 1, 1);
            if (DateTime.TryParseExact(str, "yyyy年MM月dd日", CultureInfo.InvariantCulture, DateTimeStyles.AllowInnerWhite, out DateTime value))
            {
                return value;
            }

            return defaultValue;
        }

        public static double GetDouble(this string str, double defaultValue = 0)
        {
            if (str.IsNullOrEmpty())
            {
                return defaultValue;
            }

            if (double.TryParse(str, out double value))
            {
                return value;
            }

            return defaultValue;
        }

        public static String ToUTF8(this String str)
        {
            if (str == null)
            {
                return null;
            }
            //str = str.Replace("[^\\u0000-\\uFFFF]", "");
            //return str;
            //StringBuilder sb = new StringBuilder();
            //for (int i = 0; i < str.Length; i++)
            //{
            //    var c = str[i];
            //    if ((str[i] & 0xF8) == 0xF0)
            //    {
            //        c = ' ';
            //        i += 3;
            //    }

            //    sb.Append(c);
            //}

            //return sb.ToString();
            //string -> byte[]
            byte[] bytes = Encoding.UTF8.GetBytes(str);
            //byte[] -> string
            return Encoding.UTF8.GetString(bytes);
        }
    }
}
