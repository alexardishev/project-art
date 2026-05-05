using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.UI;

namespace MagicBook.Drawing
{
    public class DrawingCanvas : MonoBehaviour, IPointerDownHandler, IDragHandler
    {
        [SerializeField] private RawImage targetImage;
        [SerializeField] private int textureSize = 512;
        [SerializeField] private Color startColor = Color.clear;
        [SerializeField] private float brushSize = 8f;

        private Texture2D drawTexture;
        private Texture2D undoTexture;
        private Color activeColor = Color.magenta;

        public Texture2D CurrentTexture => drawTexture;

        private void Awake()
        {
            drawTexture = new Texture2D(textureSize, textureSize, TextureFormat.RGBA32, false);
            Fill(drawTexture, startColor);
            targetImage.texture = drawTexture;
        }

        public void SetBrushColor(Color color) => activeColor = color;

        public void SetBrushSize(float value) => brushSize = value;

        public void EraseMode(bool enabled)
        {
            if (enabled)
            {
                activeColor = Color.clear;
            }
        }

        public void UndoOneStep()
        {
            if (undoTexture == null)
            {
                return;
            }

            Graphics.CopyTexture(undoTexture, drawTexture);
            drawTexture.Apply();
            undoTexture = null;
        }

        public void Clear()
        {
            Fill(drawTexture, startColor);
            drawTexture.Apply();
        }

        public void OnPointerDown(PointerEventData eventData)
        {
            SaveUndoSnapshot();
            PaintAt(eventData);
        }

        public void OnDrag(PointerEventData eventData)
        {
            PaintAt(eventData);
        }

        private void PaintAt(PointerEventData eventData)
        {
            if (!RectTransformUtility.ScreenPointToLocalPointInRectangle(targetImage.rectTransform, eventData.position, eventData.pressEventCamera, out var localPoint))
            {
                return;
            }

            var rect = targetImage.rectTransform.rect;
            float normalizedX = Mathf.InverseLerp(rect.xMin, rect.xMax, localPoint.x);
            float normalizedY = Mathf.InverseLerp(rect.yMin, rect.yMax, localPoint.y);

            int px = Mathf.RoundToInt(normalizedX * (textureSize - 1));
            int py = Mathf.RoundToInt(normalizedY * (textureSize - 1));

            DrawCircle(px, py, Mathf.RoundToInt(brushSize), activeColor);
            drawTexture.Apply();
        }

        private void SaveUndoSnapshot()
        {
            undoTexture = new Texture2D(textureSize, textureSize, TextureFormat.RGBA32, false);
            undoTexture.SetPixels(drawTexture.GetPixels());
            undoTexture.Apply();
        }

        private void DrawCircle(int cx, int cy, int radius, Color color)
        {
            for (int x = -radius; x <= radius; x++)
            {
                for (int y = -radius; y <= radius; y++)
                {
                    if (x * x + y * y > radius * radius)
                    {
                        continue;
                    }

                    int tx = cx + x;
                    int ty = cy + y;
                    if (tx < 0 || tx >= textureSize || ty < 0 || ty >= textureSize)
                    {
                        continue;
                    }

                    drawTexture.SetPixel(tx, ty, color);
                }
            }
        }

        private static void Fill(Texture2D texture, Color color)
        {
            var pixels = texture.GetPixels();
            for (int i = 0; i < pixels.Length; i++)
            {
                pixels[i] = color;
            }
            texture.SetPixels(pixels);
        }
    }
}
