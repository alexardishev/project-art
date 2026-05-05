using UnityEngine;

namespace MagicBook.Drawing
{
    public class BrushTool : MonoBehaviour
    {
        [SerializeField] private DrawingCanvas drawingCanvas;

        public void SetColor(Color color)
        {
            drawingCanvas.SetBrushColor(color);
        }
    }
}
