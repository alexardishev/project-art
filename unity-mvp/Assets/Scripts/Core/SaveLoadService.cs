using System;
using System.Collections.Generic;
using System.IO;
using UnityEngine;

namespace MagicBook.Core
{
    [Serializable]
    public class StorySaveData
    {
        public string storyId;
        public string characterId;
        public string drawingFile;
        public bool completed;
        public string createdAt;
    }

    [Serializable]
    public class StorySaveDataList
    {
        public List<StorySaveData> items = new List<StorySaveData>();
    }

    public class SaveLoadService : MonoBehaviour
    {
        private const string MetaFileName = "stories.json";

        public string BasePath => Path.Combine(Application.persistentDataPath, "MagicBookMvp");

        public void EnsureStorage()
        {
            if (!Directory.Exists(BasePath))
            {
                Directory.CreateDirectory(BasePath);
            }
        }

        public string SaveDrawing(Texture2D texture, string storyId)
        {
            EnsureStorage();
            var fileName = $"drawing_{storyId}.png";
            var fullPath = Path.Combine(BasePath, fileName);
            File.WriteAllBytes(fullPath, texture.EncodeToPNG());
            return fileName;
        }

        public void SaveStory(StorySaveData data)
        {
            EnsureStorage();
            var all = LoadAllStories();
            all.items.Insert(0, data);
            var json = JsonUtility.ToJson(all, true);
            File.WriteAllText(Path.Combine(BasePath, MetaFileName), json);
        }

        public StorySaveDataList LoadAllStories()
        {
            EnsureStorage();
            var fullPath = Path.Combine(BasePath, MetaFileName);
            if (!File.Exists(fullPath))
            {
                return new StorySaveDataList();
            }

            var json = File.ReadAllText(fullPath);
            if (string.IsNullOrWhiteSpace(json))
            {
                return new StorySaveDataList();
            }

            return JsonUtility.FromJson<StorySaveDataList>(json) ?? new StorySaveDataList();
        }

        public Texture2D LoadDrawing(string drawingFile)
        {
            var fullPath = Path.Combine(BasePath, drawingFile);
            if (!File.Exists(fullPath))
            {
                return null;
            }

            var bytes = File.ReadAllBytes(fullPath);
            var texture = new Texture2D(2, 2, TextureFormat.RGBA32, false);
            texture.LoadImage(bytes);
            return texture;
        }
    }
}
