using UnityEngine;

namespace MagicBook.Drawing
{
    public class EraserTool : MonoBehaviour
    {
        [SerializeField] private DrawingCanvas drawingCanvas;

        public void EnableEraser()
        {
            drawingCanvas.SetBrushColor(Color.clear);
        }
    }
}
