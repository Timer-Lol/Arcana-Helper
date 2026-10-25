# What the simulations found

The Arcana Helper was tested by playing **tens of thousands of simulated boards** on a 15-core PC, in overnight and
multi-hour runs. In each test, every setup plays the **same boards with the same dice and card draws**, so the
differences come from the decisions, not from luck. Numbers below are averages per board; a "±" is the 95% range of
that average (if a difference's range doesn't include 0, it's real).

## How a board is scored
You get **7 reward slots** a board, so what matters is how rare your chests are, not how many you collect. Tests score
the 7 slots in **rarity points**: green 1, blue 1, purple 3, gold 5, red 10, rainbow 25 (each step is roughly twice
the one below; every chest draws from the same loot pool, with better odds the rarer it is). The two oldest tests
below were scored with green 0, blue 0, purple 1, gold 4, so their totals are lower; compare setups within one test.

## Headline: the helper as you download it
Latest test (24 Oct, **1,158 boards**, current board odds):

| | per board |
|---|---|
| Rarity points | **55.3 ± 1.5** |
| Rainbow chests | **1.23** |
| Red chests | 1.34 |
| Gold chests | 1.46 |
| Gold or better | **4.03** of 7 slots |
| Boards lost to 0 life | 3.0% |
| Thinking time | about 21 s for a whole board (on the test PC) |

For comparison, **real players in the game logs averaged about 3.2 gold-or-better chests a board**; the helper gets
about 4.0 to 4.2 on the same kind of boards.

## Aim for rare chests, not more chests
An early version of the helper aimed for the most gold-or-better chests. It filled the slots with golds and gave up
reds and rainbows to do it. Aiming for rarity instead, with the same thinking time (13,130 boards each, 22 Oct):

| Goal | Points a board | Rainbows | Reds | Golds |
|---|---|---|---|---|
| Rarest chests (what the helper does) | **36.9** | **0.63** | 1.38 | 1.58 |
| Most gold-or-better chests | 32.4 | 0.29 | 1.24 | 2.92 |

That's **more than twice the rainbows** for fewer golds. A second test (5,845 boards, both at Quick thinking) found the
same: a rainbow on **46%** of boards aiming for rarity, against **27%** aiming for the count.

**For players:** a gold in every slot is not a great board. When you have a choice, go for the tile or card that can
reach a red or rainbow, even if it costs you a gold.

## Thinking longer helps
The helper's **Settings → Thinking** setting (5,845 boards each, 23 Oct, older scoring):

| Thinking | Points a board | A rainbow on | Died | Time a board |
|---|---|---|---|---|
| Deep (400 play-outs per option) | **47.9** | **58%** of boards | 4.0% | 46 s |
| Normal (150, the default) | 43.3 | 53% | 5.5% | 16 s |
| Quick (60) | 37.4 | 46% | 8.2% | 6 s |

Deep beats Normal by **4.6 ± 0.9 points a board**, and Normal beats Quick by about 6. If you don't mind waiting a
few seconds a move, **Deep is worth it**.

The helper also re-checks its best 3 moves on fresh boards before answering. Against a very long reference search
on 38 positions, that check cut the points lost per decision from 0.46 to **0.29** on Normal and from 0.14 to
**0.06** on Deep.

## Upgrade cards
Players noticed the helper spending upgrade cards too early, so they got their own tests.

- **Play the lowest card that does the job.** If two cards would leave the same chests, play the weaker one and
  keep the stronger one for later (a ≤Blue before a ≤Red on a blue chest).
- **Save a card for its best chest.** A ≤Red card waits for a red, a ≤Gold for a gold, and a 2- or 3-chest card
  waits until it can raise that many chests, unless the slots are full, you're on your last life or the last tile.
  On 80 boards this cut wasted 2- and 3-chest plays from **63 to 18**, and raised what each card added from 3.0 to
  **3.45 points**.
- **But don't stress over the exact timing.** On 1,550 boards, saving cards, not saving them, and saving them except
  in the last 20 tiles all scored within **0.15 points** of each other (56.5 to 56.7). Holding red cards for the "?"
  tiles versus playing them at once made no measurable difference either.
- **Upgrade cards come as ×1, ×2 or ×3** (70% / 25% / 5%, from the game's files), and each raises a different
  collected chest, highest eligible rarity first.

## Ideas that were tested and didn't help
Several ideas from players and from the solver's own design were played out on the same 683 boards before deciding
whether to keep them. None beat the helper as shipped by more than noise, so none were switched on:

| Idea | vs the helper |
|---|---|
| Don't let the look-ahead "peek" past what the screen shows | +0.3 ± 2.4 |
| Solve the last 8 tiles exactly instead of sampling | −0.1 ± 0.1 |
| Don't chase heals late; spare life is worth little | −0.5 ± 1.7 |
| Hold a 2-/3-chest card while a higher tier is in view | −1.3 ± 2.2 |
| Treat flexible hand cards (Choose 1–6, odd/even) as costly to spend | −2.7 ± 2.3 |
| All five together | −1.9 ± 2.3 |

## Facts from the game's files and real boards
- **Chest odds** (game files): green 40%, blue 30%, purple 20%, gold 8%, red 1.6%, rainbow 0.4%.
- **7 reward slots**, and the hand holds at most **10 cards**; extra cards are lost (you may discard one to make room).
- **Hitting 0 life ends the board, but you keep the chests you collected.**
- **On the last tile, the refill die can be re-rolled as often as you like.** With a Back card in hand, re-roll
  until "back n, then the die" lands on two worthwhile tiles.
- The screen shows your row and the next 4; the helper only decides from what's visible.

## Fine print
- These are simulations. The board layouts and "?" outcomes are decided by the game's server; the simulator's
  versions are fitted on real boards that players recorded, and get refined as more come in. The helper's real
  results will vary with the boards you get.
- Totals from different tests aren't comparable (different scoring or board odds); compare setups within one table.
- The solver's tuned settings and the fitted board odds are not published here; they're what the helper's closed
  source protects.

Simulations, tests and analysis by **Timer**, with help from the people in the README's Credits.
