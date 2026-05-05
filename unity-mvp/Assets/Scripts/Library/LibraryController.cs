using MagicBook.Core;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

namespace MagicBook.Library
{
    public class LibraryController : MonoBehaviour
    {
        [SerializeField] private SaveLoadService saveLoadService;
        [SerializeField] private Transform cardsRoot;
        [SerializeField] private GameObject storyCardPrefab;
        [SerializeField] private StoryReplayController replayController;

        private void Start()
        {
            Render();
        }

        public void Render()
        {
            foreach (Transform child in cardsRoot)
            {
                Destroy(child.gameObject);
            }

            var stories = saveLoadService.LoadAllStories();
            foreach (var story in stories.items)
            {
                var card = Instantiate(storyCardPrefab, cardsRoot);
                var label = card.GetComponentInChildren<TMP_Text>();
                if (label != null)
                {
                    label.text = $"{story.characterId} | {story.createdAt}";
                }

                var image = card.GetComponentInChildren<RawImage>();
                if (image != null)
                {
                    image.texture = saveLoadService.LoadDrawing(story.drawingFile);
                }

                var button = card.GetComponentInChildren<Button>();
                if (button != null)
                {
                    button.onClick.AddListener(() => replayController.Play(story));
                }
            }
        }
    }
}
