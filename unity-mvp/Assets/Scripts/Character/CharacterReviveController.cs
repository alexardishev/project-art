using System.Collections;
using UnityEngine;
using UnityEngine.UI;

namespace MagicBook.Character
{
    public class CharacterReviveController : MonoBehaviour
    {
        [SerializeField] private RawImage characterImage;
        [SerializeField] private CanvasGroup glowGroup;
        [SerializeField] private float reviveDuration = 1.5f;

        public void ApplyDrawing(Texture2D drawing)
        {
            characterImage.texture = drawing;
        }

        public void PlayRevive()
        {
            StopAllCoroutines();
            StartCoroutine(PlayReviveRoutine());
        }

        private IEnumerator PlayReviveRoutine()
        {
            float t = 0f;
            while (t < reviveDuration)
            {
                t += Time.deltaTime;
                float pulse = Mathf.PingPong(t * 2f, 1f);
                glowGroup.alpha = pulse;
                yield return null;
            }

            glowGroup.alpha = 0f;
        }
    }
}
