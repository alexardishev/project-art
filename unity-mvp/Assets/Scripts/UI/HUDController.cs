using TMPro;
using UnityEngine;

namespace MagicBook.UI
{
    public class HUDController : MonoBehaviour
    {
        [SerializeField] private TMP_Text title;

        public void SetTitle(string value)
        {
            title.text = value;
        }
    }
}
