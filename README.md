# The World in One Page — 22 November 2026

[![news-image-20261122](https://make.fun/badge/news-image-20261122.svg)](https://make.fun/bounty/news-image-20261122)
[![rank](https://make.fun/badge/news-image-20261122/sayaaku12/news-image-20261122/rank.svg)](https://make.fun/bounty/news-image-20261122)
[![reward](https://make.fun/badge/news-image-20261122/sayaaku12/news-image-20261122/reward.svg)](https://make.fun/bounty/news-image-20261122)

One image that sums up the world's news of Sunday 22 November 2026, laid out
as a single front page: **THE WORLD**.

The lead story is the fire in the Strait of Hormuz — Iran struck US bases in
the Gulf and a tanker burns under a black sky. Below it, four more stories
from the day: Russian missiles hit Lviv; Trump meets Xi in Shenzhen; the EU
and Indonesia sign a trade deal ten years in the making; a magnitude 6.9
quake shakes Peru's Andes. The footer carries the rest: COP31 deadlocked,
Estonia closing its Russian border, Hong Kong voting.

## How it runs

`main.ts` (Node 22, standard library only) validates `entry.png` against
the gate — a whole PNG, at most 1 MiB and 1024 by 1024 — and copies it to
`/output/entry.png`. No network, no randomness: two runs write the same
bytes.

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

## Entry

- Competition: [Sum up 22 November's world news in one image](https://make.fun/bounty/news-image-20261122)
- Image: `entry.png`, 1024×1024 PNG, 787,059 bytes
- License: MIT
