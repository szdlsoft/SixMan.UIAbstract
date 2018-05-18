using System;
using System.Collections.Generic;
using System.Text;

namespace SixMan.UIAbstract.Lookup
{
    /// <summary>
    /// 查找项目
    /// </summary>
    public class LookUpItem
    {

        public LookUpItem(long id, string displayName)
        {
            Id = id;
            Text = displayName;
        }

        /// <summary>
        /// Value: id
        /// </summary>
        public long Id { get; set; }
        /// <summary>
        /// Text field
        /// </summary>
        public string Text { get; set; }
        /// <summary>
        /// 备注
        /// </summary>
        public string Description { get; set; }
    }
}
