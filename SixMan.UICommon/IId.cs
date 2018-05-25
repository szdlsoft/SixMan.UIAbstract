using System;
using System.Collections.Generic;
using System.Text;

namespace SixMan.UICommon
{
    public interface IId
        : IId<long>
    {
    }

    public interface IId<TPrimaryKey>
    {
        TPrimaryKey Id { get; set; }
    }
}
