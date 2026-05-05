# Волшебная книжка рисунков — Unity MVP (боевой каркас)

Это Unity-реализация MVP по ТЗ: выбор персонажа → дорисовка → оживление → мини-игра «Потерянные звёздочки» → сохранение в библиотеку.

## Что уже реализовано в коде
- Базовая архитектура `Core`, `Drawing`, `Character`, `MiniGame`, `Library`, `UI`.
- Системы:
  - `GameManager` + `SessionData` (состояние текущей сессии);
  - `SceneRouter` (навигация по сценам);
  - `SaveLoadService` (локальные JSON + PNG в `Application.persistentDataPath`);
  - `DrawingCanvas` (рисование, очистка, undo 1 шаг);
  - `CharacterSelector` и `CharacterReviveController`;
  - `StarGameController`/`StarSpawner`/`StarCollectible`;
  - `LibraryController` + `StoryReplayController`.

## Структура
```text
unity-mvp/
  Assets/
    Scenes/
    Scripts/
      Core/
      Drawing/
      Character/
      MiniGame/
      Library/
      UI/
```

## Запуск и тест на Windows

### 1) Установка
1. Установи **Unity Hub**.
2. Через Unity Hub установи редактор **Unity 2022.3 LTS** (или более новый LTS).
3. При установке добавь модули:
   - Android Build Support (SDK/NDK/OpenJDK);
   - iOS Build Support (по желанию, если нужен экспорт проекта на Mac).

### 2) Открытие проекта
1. В Unity Hub нажми **Open**.
2. Выбери папку `unity-mvp`.
3. Дождись импорта пакетов и компиляции скриптов.

### 3) Создание сцен (один раз)
Создай и сохрани 6 сцен в `Assets/Scenes/`:
- `MainMenuScene`
- `CharacterSelectScene`
- `DrawingScene`
- `ReviveScene`
- `MiniGameScene`
- `LibraryScene`

И добавь их в **File → Build Settings** в таком же порядке.

### 4) Подключение скриптов в сценах
- На `MainMenuScene`:
  - объект `AppRoot` с `GameManager`, `SceneRouter`, `SaveLoadService`.
- На `CharacterSelectScene`:
  - `CharacterSelector`, кнопки выбора персонажей вызывают `SelectCharacter(CharacterTemplate)`.
- На `DrawingScene`:
  - `DrawingCanvas`, `BrushTool`, `EraserTool`, `TextureExporter`, `MvpFlowController`.
- На `ReviveScene`:
  - `CharacterReviveController`, кнопка «Играть дальше» ведёт в `MiniGameScene`.
- На `MiniGameScene`:
  - `StarSpawner`, `StarGameController`, кнопка финала вызывает `MvpFlowController.SaveCompletedStory()`.
- На `LibraryScene`:
  - `LibraryController`, `StoryReplayController`.

### 5) Локальный запуск
- Нажми **Play** в Unity Editor и пройди полный цикл.
- Проверь, что истории появляются в библиотеке после мини-игры.

### 6) Где лежат сохранения на Windows
`Application.persistentDataPath` обычно указывает на:
`C:\Users\<User>\AppData\LocalLow\<CompanyName>\<ProductName>\MagicBookMvp`

Там будут:
- `stories.json` (метаданные),
- `drawing_*.png` (рисунки).

### 7) Сборка Android APK
1. Открой **File → Build Settings**.
2. Выбери **Android** и нажми **Switch Platform**.
3. Нажми **Build** или **Build And Run**.

## Важно
Это production-ready каркас кода и архитектуры MVP, но для релизного качества нужно донастроить сцены/префабы/UI в редакторе Unity и пройти QA на целевых устройствах.
