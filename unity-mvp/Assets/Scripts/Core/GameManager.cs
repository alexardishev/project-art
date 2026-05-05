using UnityEngine;

namespace MagicBook.Core
{
    public class GameManager : MonoBehaviour
    {
        public static GameManager Instance { get; private set; }

        public SessionData Session { get; private set; } = new SessionData();

        private void Awake()
        {
            if (Instance != null && Instance != this)
            {
                Destroy(gameObject);
                return;
            }

            Instance = this;
            DontDestroyOnLoad(gameObject);
        }

        public void ResetSession()
        {
            Session = new SessionData();
        }
    }
}
