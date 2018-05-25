using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SixMan.UICommon.Helper
{
    public static class FileHelper
    {
        public static void CreateIfNotExist(params string[] paths)
        {
            foreach( var path in paths)
            {
                if (!Directory.Exists(path))
                {
                    Directory.CreateDirectory(path);
                }
            }
        }

        public static void Move(string file, string targetPath)
        {
            EnsureDirectory(targetPath);

            string fileName = Path.GetFileName(file);
            string destFileName = Path.Combine(targetPath, fileName);
            EnsureEmpty(destFileName);

            File.Move(file, destFileName);
        }

        public static void EnsureEmpty(string destFileName)
        {
            if (File.Exists(destFileName))
            {
                File.Delete(destFileName);
            }
        }

        public static void EnsureDirectory(string targetPath)
        {
            if (!Directory.Exists(targetPath))
            {
                Directory.CreateDirectory(targetPath);
            }
        }
       
    }
}
