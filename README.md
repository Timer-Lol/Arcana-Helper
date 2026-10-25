# Arcana Helper

Advice for the Arcana (Tarot Path) minigame in Torchlight Infinite. The helper reads the game as you play — the board,
your hand, the refill die and your chests — and suggests the best move after each one.

How well does it play? See **[what the simulations found](https://github.com/Timer-Lol/Arcana-Helper/blob/main/SIMULATION-RESULTS.md)**:
tens of thousands of simulated boards, what wins more rainbows, and tips for playing upgrade cards.

## Screenshots
**Over the game:** the helper marks the best tile with **GO** and what to use (**USE DIE**, **PLAY** on a card), gold
outlines show where the board belongs, and the panel on the right follows the board as you play.

![The helper over the game: GO on the best tile, USE DIE on the refill die, the panel on the right](https://raw.githubusercontent.com/Timer-Lol/Arcana-Helper/main/screenshots/in-game-go.jpg)

![Later in the board: PLAY on the card to use, and the panel's board filled in from the game](https://raw.githubusercontent.com/Timer-Lol/Arcana-Helper/main/screenshots/in-game-play.jpg)

**Lining up the board:** when a board needs lining up (it was dragged, or you joined a board mid-way), gold outlines show
where every tile belongs and a cyan **YOUR PIECE** outline shows where your pin goes. A small card on the game repeats
the checks (drag it anywhere, × hides it). The marks and outlines follow the board smoothly as you drag it, and near the
board's end only the rows the game shows get outlines.

![Lining up the board: gold outlines, the cyan YOUR PIECE outline, the lining-up card and the banner](https://raw.githubusercontent.com/Timer-Lol/Arcana-Helper/main/screenshots/in-game-align.jpg)

The helper shows wrong and right examples the first time you set your tile or turn the board outline on (they're also on
the **Troubleshooting** tab, with a video):

![Lining up the board, wrong and right: a board one row off can still have a tile in every outline, so check the pin](https://raw.githubusercontent.com/Timer-Lol/Arcana-Helper/main/screenshots/helper-align-guide.jpg)

**Video: lining up an old board** (the same one as on the Troubleshooting tab; click to play). Count the rows from the
bottom and set the tile you're on, then drag the board from the bottom row up until your pin sits in the cyan outline and
the top row of outlines is on the board's top edge. The board then fills in by itself (or press **Take a picture now**).

[![Video: lining up an old board with the helper's outlines (click to play)](https://raw.githubusercontent.com/Timer-Lol/Arcana-Helper/main/screenshots/lining-up-video.jpg)](https://github.com/Timer-Lol/Arcana-Helper/blob/main/screenshots/lining-up.mp4)

**The helper window:** the board with row numbers, your life, refill die, chests and hand, and the best move with its
expected chest points and risk (here in Practice, which plays random boards without the game).

![The helper window in Practice: the board, life, refill die, hand and the best move](https://raw.githubusercontent.com/Timer-Lol/Arcana-Helper/main/screenshots/helper-app.jpg)

## Start here
1. **Once, in the game:** Esc → Account Related → **Enable Log**, then log out and back in.
2. Download **`Arcana-Helper-Setup.exe`** from the [Releases page](https://github.com/Timer-Lol/Arcana-Helper/releases/latest)
   and run it. It installs in a few seconds (just for you, no admin needed), adds
   **Arcana Helper** to the Start menu and the desktop, and starts it. The helper opens in its own window and keeps
   running in the tray. **It updates itself:** a newer version downloads in the background and installs when you
   restart the helper (tray menu → **Restart to update**). Your settings and board logs are kept.
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

## Your data stays yours
The helper is closed source to protect its solver and odds from being copied and resold, not to hide what it does.
Here is exactly what it does with your PC and your data:

- **Nothing is sent unless you send it.** There's no tracking, no analytics, no account and no login. The only thing
  that ever leaves your PC is a bug report, and only when you press **Send report**.
- **You see a report before it goes.** Ctrl+Alt+J opens the report first: **See exactly what will be sent** shows
  every line and picture in it, and **Cancel** sends nothing. Your name is optional; leave it blank to stay anonymous.
- **The game log is scrubbed before anything is saved.** The helper keeps only the game's Tarot Path (Arcana) lines.
  Chat, friends, account details, player ids, server addresses and everything else are dropped before a line is ever
  written to disk, so they can't end up in a report.
- **Pictures are of the game window only.** The helper never saves your whole screen or other windows. If Windows
  has to capture the screen, the picture is cropped to the game window before it's kept.
- **It only reads; it never touches the game.** It reads the game's log file (read-only) and takes pictures of the
  game window. It doesn't read or change the game's memory or files, and it never clicks or presses keys for you.
- **Everything stays on your PC.** Settings, logs and pictures are in `%APPDATA%\Arcana Helper`. Only your newest 40
  boards are kept. Delete the folder whenever you like; uninstalling never sends anything.
- **The solver runs on your PC.** Every answer is worked out locally, not on a server. The helper's own server
  listens on `127.0.0.1` only, so nothing else on your network can reach it.
- **No admin needed.** The installer installs just for your Windows user.
- **Its only internet use:** the page's fonts load from Google Fonts, the installed app checks this GitHub page's
  releases for a newer version (it only reads the public release list), and a bug report goes to the author's own
  server when you send one. Nothing else.
- **You can check it yourself.** Only the solver is compiled. The parts that handle your data (the log scrubber, the
  bug report, the board logs) ship as JavaScript in the `companion` folder: minified (shortened), not compiled or encrypted, so anyone can read it. Watch the helper with any
  firewall or network monitor, or scan the Setup.exe on [VirusTotal](https://www.virustotal.com) before you run it.

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
- **The board was dragged:** the marks over the game follow it, and gold outlines show where it belongs; drag it back.
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
