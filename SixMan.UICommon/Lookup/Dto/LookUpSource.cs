using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace SixMan.UICommon.Lookup
{
    /// <summary>
    /// 字典表
    /// </summary>
    public class LookUpSource
        : List<LookUpItem>
    {
        public string ToEasyUIDataJson()
        {
            return JsonConvert.SerializeObject(this, Formatting.None)
                   .Replace("Id", "id")
                   .Replace("Text", "text")
                   .Replace('"', '\'');

        }
    }

}
