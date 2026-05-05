using System.Collections.Generic;
using TMPro;
using UnityEngine;

namespace MagicBook.MiniGame
{
    public class StarGameController : MonoBehaviour
    {
        [SerializeField] private StarSpawner starSpawner;
        [SerializeField] private int starsTotal = 6;
        [SerializeField] private TMP_Text progressLabel;
        [SerializeField] private GameObject successPanel;

        private int collected;
        private List<StarCollectible> activeStars = new List<StarCollectible>();

        private void Start()
        {
            StartGame();
        }

        public void StartGame()
        {
            collected = 0;
            successPanel.SetActive(false);
            foreach (var star in activeStars)
            {
                if (star != null)
                {
                    Destroy(star.gameObject);
                }
            }

            activeStars = starSpawner.Spawn(starsTotal, this);
            RefreshProgress();
        }

        public void OnStarCollected(StarCollectible star)
        {
            if (star == null)
            {
                return;
            }

            activeStars.Remove(star);
            Destroy(star.gameObject);
            collected++;
            RefreshProgress();

            if (collected >= starsTotal)
            {
                successPanel.SetActive(true);
            }
        }

        private void RefreshProgress()
        {
            progressLabel.text = $"Собрано: {collected}/{starsTotal}";
        }
    }
}
