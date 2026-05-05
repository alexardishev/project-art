using System.Collections.Generic;
using UnityEngine;

namespace MagicBook.MiniGame
{
    public class StarSpawner : MonoBehaviour
    {
        [SerializeField] private RectTransform spawnArea;
        [SerializeField] private StarCollectible starPrefab;

        public List<StarCollectible> Spawn(int amount, StarGameController controller)
        {
            var spawned = new List<StarCollectible>();
            for (int i = 0; i < amount; i++)
            {
                var star = Instantiate(starPrefab, spawnArea);
                var rect = star.GetComponent<RectTransform>();
                rect.anchoredPosition = new Vector2(
                    Random.Range(-spawnArea.rect.width / 2f, spawnArea.rect.width / 2f),
                    Random.Range(-spawnArea.rect.height / 2f, spawnArea.rect.height / 2f)
                );
                star.Setup(controller);
                spawned.Add(star);
            }

            return spawned;
        }
    }
}
