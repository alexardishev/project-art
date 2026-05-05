using System;
using MagicBook.Character;
using MagicBook.Drawing;
using UnityEngine;

namespace MagicBook.Core
{
    public class MvpFlowController : MonoBehaviour
    {
        [SerializeField] private TextureExporter textureExporter;
        [SerializeField] private DrawingCanvas drawingCanvas;
        [SerializeField] private CharacterReviveController reviveController;
        [SerializeField] private SaveLoadService saveLoadService;

        public void CaptureDrawingForRevive()
        {
            var drawing = textureExporter.CloneTexture(drawingCanvas.CurrentTexture);
            GameManager.Instance.Session.CurrentDrawing = drawing;
            reviveController.ApplyDrawing(drawing);
            reviveController.PlayRevive();
        }

        public void SaveCompletedStory()
        {
            var storyId = $"story_{DateTime.UtcNow:yyyy_MM_dd_HH_mm_ss}";
            var drawingFile = saveLoadService.SaveDrawing(GameManager.Instance.Session.CurrentDrawing, storyId);

            var story = new StorySaveData
            {
                storyId = storyId,
                characterId = GameManager.Instance.Session.SelectedCharacterId,
                drawingFile = drawingFile,
                completed = true,
                createdAt = DateTime.UtcNow.ToString("o")
            };

            saveLoadService.SaveStory(story);
        }
    }
}
