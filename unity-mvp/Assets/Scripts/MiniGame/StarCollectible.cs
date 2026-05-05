using UnityEngine;
using UnityEngine.EventSystems;

namespace MagicBook.MiniGame
{
    public class StarCollectible : MonoBehaviour, IPointerClickHandler
    {
        private StarGameController gameController;

        public void Setup(StarGameController controller)
        {
            gameController = controller;
        }

        public void OnPointerClick(PointerEventData eventData)
        {
            gameController.OnStarCollected(this);
        }
    }
}
