using MagicBook.Core;
using UnityEngine;
using UnityEngine.UI;

namespace MagicBook.Library
{
    public class StoryReplayController : MonoBehaviour
    {
        [SerializeField] private SaveLoadService saveLoadService;
        [SerializeField] private RawImage preview;
        [SerializeField] private CanvasGroup replayGroup;

        public void Play(StorySaveData data)
        {
            preview.texture = saveLoadService.LoadDrawing(data.drawingFile);
            replayGroup.alpha = 1f;
            replayGroup.gameObject.SetActive(true);
        }

        public void Hide()
        {
            replayGroup.alpha = 0f;
            replayGroup.gameObject.SetActive(false);
        }
    }
}
