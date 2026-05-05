using UnityEngine;

namespace MagicBook.Character
{
    [CreateAssetMenu(menuName = "MagicBook/CharacterTemplate")]
    public class CharacterTemplate : ScriptableObject
    {
        public string characterId;
        public string displayName;
        public Sprite baseSprite;
    }
}
