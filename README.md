# Arcana Helper

Advice for the Arcana (Tarot Path) minigame in Torchlight Infinite. The helper reads the game as you play — the board,
your hand, the refill die and your chests — and suggests the best move after each one.

## Start here
1. **Once, in the game:** Esc → Account Related → **Enable Log**, then log out and back in.
2. Download **`Arcana-Helper-Setup.exe`** from the [Releases page](https://github.com/Timer-Lol/Arcana-Helper/releases/latest)
   and run it. It installs in a few seconds (just for you, no admin needed), adds
   **Arcana Helper** to the Start menu and the desktop, and starts it. The helper opens in its own window and keeps
   running in the tray. To update, run the newer Setup.exe the same way: your settings and board logs are kept.
   (Windows may say it "protected your PC" the first time: More info → Run anyway.)
3. Play Arcana. When a board opens, the board fills in by itself and the advice comes up after each move. Anything the
   pictures can't tell, the helper asks you under **Tell me what happened**. Something wrong? **Ctrl+Alt+J** sends a bug report.

## Using it
- **Play** follows the game. To correct something, tap a tile to set what it is, or use the controls for life, the
  refill die, your hand and your chests. What you set by hand is kept until the game moves on.
- **What should I do?** shows the best move (it also comes up by itself). The move is marked on the board and over the
  game; the list shows every option with its expected chest points and risk.
- **Practice** plays random boards without the game.
- **Settings** changes the goal, how long it thinks, and the marks drawn over the game.

**The panel over the game:** a small copy of the helper opens over the game during a board (Ctrl+Alt+P shows or hides
it; drag its top bar to move it).

**Hotkeys** (change them on the Hotkeys tab): Ctrl+Alt+A show/hide the helper · Ctrl+Alt+S take a picture now ·
Ctrl+Alt+T keep on top · Ctrl+Alt+P the panel. On keyboards where AltGr types accented letters, pick other keys.

**Text size:** A− / A+ in the helper window and in the panel (or Ctrl + − / + / 0, Ctrl + scroll). Each keeps its own.

## Something wrong? Send a bug report
Press **Ctrl+Alt+J** (it works while you're in the game; change the key on the Hotkeys tab). The helper saves that
moment and a picture of the game, then asks what went wrong. Press **Send report** and it goes to the helper's author;
press Cancel and nothing is sent. You can also use **Report a bug** in the helper window or **Send a bug report** in
the tray menu.

A bug report holds that board's game lines (only the game's Tarot Path lines: chat, friends, account, player ids and
everything else are dropped before anything is written), the helper's pictures of the game window (never your whole
screen), what the helper held at that moment, and your note. Nothing is sent at any other time. The helper keeps the
newest 40 boards on your PC so a report has something to show (tray menu → **Open the board logs folder**).

## If something's wrong
- **No pictures / black pictures:** play windowed or borderless. If the game runs as administrator, right-click
  **Arcana Helper** in the Start menu → Run as administrator. The tray menu's **Save a test picture** checks that pictures work.
- **"No game detail lines":** turn on Enable Log in the game (step 1), then log out and back in.
- **The board was dragged:** gold outlines show where it belongs; drag it back.
- Everything the helper keeps is in `%APPDATA%\Arcana Helper`: its settings, its log (`logs\app.log`), and in
  `companion\` the board logs and pictures. Uninstalling (Windows Settings → Apps → Arcana Helper) leaves this folder;
  delete it by hand to remove everything.
- Without the installer: the folder copy still runs with `Start-Arcana-Helper-App.bat` if Node.js is installed
  (its first start downloads the app's parts); it keeps its board logs in its own `companion\sessions`.

## Credits
- **Arcasti** ([tli-warden](https://github.com/arcasti/tli-warden)): helped with the solver.
- **Sif** ([tli-tools](https://github.com/WolfDan/tli-tools)): helped with the in-game textures and data.
- **Members of Ruetoo's Community:**
  - **Therapist**: a big contribution to fine-tuning the logic.
  - **LobsterKite**, **Forszaken**, **Hasoon**: suggestions for the logic.
  - **Radiar**, **BATMAN**: provided normal and special boards.
- Vibe coded by **Timer**.

See `LICENSE` for the terms of use.
