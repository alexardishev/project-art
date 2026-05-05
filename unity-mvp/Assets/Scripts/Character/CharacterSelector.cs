using MagicBook.Core;
using UnityEngine;

namespace MagicBook.Character
{
    public class CharacterSelector : MonoBehaviour
    {
        [SerializeField] private SceneRouter sceneRouter;

        public void SelectCharacter(CharacterTemplate template)
        {
            GameManager.Instance.Session.SelectedCharacterId = template.characterId;
            sceneRouter.OpenDrawing();
        }
    }
}
