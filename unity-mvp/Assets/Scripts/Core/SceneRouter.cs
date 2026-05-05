using UnityEngine;
using UnityEngine.SceneManagement;

namespace MagicBook.Core
{
    public class SceneRouter : MonoBehaviour
    {
        public void OpenMainMenu() => SceneManager.LoadScene("MainMenuScene");
        public void OpenCharacterSelect() => SceneManager.LoadScene("CharacterSelectScene");
        public void OpenDrawing() => SceneManager.LoadScene("DrawingScene");
        public void OpenRevive() => SceneManager.LoadScene("ReviveScene");
        public void OpenMiniGame() => SceneManager.LoadScene("MiniGameScene");
        public void OpenLibrary() => SceneManager.LoadScene("LibraryScene");
    }
}
