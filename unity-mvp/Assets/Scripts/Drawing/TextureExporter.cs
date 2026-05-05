using UnityEngine;

namespace MagicBook.Drawing
{
    public class TextureExporter : MonoBehaviour
    {
        public Texture2D CloneTexture(Texture2D source)
        {
            if (source == null)
            {
                return null;
            }

            var copy = new Texture2D(source.width, source.height, TextureFormat.RGBA32, false);
            copy.SetPixels(source.GetPixels());
            copy.Apply();
            return copy;
        }
    }
}
