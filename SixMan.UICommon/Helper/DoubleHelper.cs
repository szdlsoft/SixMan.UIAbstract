using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SixMan.UICommon.Helper
{
    public static class DoubleHelper
    {
        /// <summary>
        /// double 带误差的比较
        /// </summary>
        /// <param name="v"></param>
        /// <param name="up"></param>
        /// <param name="low"></param>
        /// <returns></returns>
        public static bool OutRange(double v, double up, double low,  double dev = 0.0001)
        {
            return  ( v > up  &&  ( v - up ) > dev ) ||
                    ( v < low &&  ( low - v ) > dev)
                    ;
        }
    }
}
