# Interior organizing — image prompts

Fifty-five photographs for `/interior-organizing/` and its seven room pages.

**Done (9).** The hub hero, the seven room photographs and the products band
have been generated, prepared and laddered. They are live.

**Still to do (46).** Three sets, and they behave differently when they are
missing — which decides what to shoot first.

| Still needed | Used on | Missing behaviour |
| --- | --- | --- |
| `org-visit`, `org-edit`, `org-fit`, `org-finish` (4) | The four moves, on every organizing page | Falls back to an existing organizing photograph. The band works, with a repeat. |
| `org-kitchen-detail` … `org-garage-detail` (7) | The mosaic under each room's opening | Falls back to the room's wide shot, and the mosaic drops from two frames to one. |
| `org-<room>-style-<layout>` (35 — five per room) | The **styles rail** on each room page | **The band does not render.** A rail of five layouts standing in with five copies of one photograph says nothing about five layouts, so it leaves itself out until at least three of its five exist. |

The rail is the only set that makes a band appear or disappear, so it is worth
doing a room at a time — all five of one room, rather than one of each — and a
room turns its rail on as soon as three of its five have landed.

The house rules in [`image-prompts.md`](image-prompts.md#house-rules-for-every-prompt)
apply to every prompt here. This file adds the rules specific to organized
spaces, which have their own set of AI tells.

---

## 1. Why organizing images look fake, and how these prompts avoid it

Generated "organized" rooms fail in the same few ways. A visitor can't say why,
but they stop trusting the page.

| AI tell | What a real organized room looks like | How the prompts handle it |
| --- | --- | --- |
| Rainbow-sorted, showroom-perfect shelves | Grouped by use, with colour following the contents | "grouped by category, not by colour" |
| Forty identical jars in a grid | A few container sizes, filled to different levels | Fill levels are stated per prompt |
| Gibberish text on labels | Short labels, too small or too far away to read | Labels are always "blank or too distant to read" |
| Glowing LED strips and a mirror-finish gloss | Ordinary daylight and a matte, used surface | One named window light, "no LED strip lighting" |
| Nothing looks used | A fingerprint on a canister, a slightly open drawer | Two or three specific imperfections per prompt |
| Generic American kitchen | Dubai villa or apartment: limestone or porcelain floors, a ceiling AC grille, flat white doors | Local details are written into each scene |
| Warped shelves and melted containers | Straight lines everywhere | Structural check (below) before accepting |

**Add to every prompt's Avoid line, after the house-rules list:**

> rainbow colour-sorted shelves, perfectly identical repeated containers,
> legible or garbled label text, LED strip lighting, glossy showroom finish,
> every container full to the same level, overflowing decorative produce,
> excessive plants, influencer flat-lay styling, pastel colour grade.

**Before accepting an image, check:**

1. **Straight lines.** Follow each shelf edge, drawer front and cabinet
   door. If one bends, doubles or fades out, regenerate. Don't retouch.
2. **Containers.** Zoom to 100%. Each lid should sit on its own jar. There
   should be no jars fused together and no hanger hooks passing through the rail.
3. **Labels.** Every label should be blank, or too small to read. If you can
   read a word, check it is spelled correctly. If you can't tell, regenerate.
4. **Counts.** Count the hangers, jars and bins in one row. If the shapes
   repeat exactly, like a copy-paste pattern, regenerate.

---

## 2. Generation settings

- **Model:** a photographic model. Choose realism over "aesthetic" styles, and
  don't add style presets or upscalers that sharpen texture.
- **Shape depends on where the image is used:**

  | Image | Generate | Why |
  | --- | --- | --- |
  | Room photographs, `org-hero` | 16:9, ≥ 1920 px wide | Full-bleed page header, **and** cropped to a portrait tile (≈ 0.84) on the hub. Keep the subject in the middle third so both crops hold it. |
  | `org-products` | 16:9, ≥ 1920 px wide | A parallax band, cropped hard top and bottom. Subject across the vertical centre. |
  | The four moves | **4:5 portrait**, ≥ 1200 px wide | Shown as four portrait frames side by side. |
  | Room details | **4:5 portrait**, ≥ 1200 px wide | A tall frame beside the statement. |
  | Styles rail | **4:5 portrait**, ≥ 1200 px wide | Alternate frames on the rail are cropped to 3:4, so keep the subject clear of the left and right eighth of the frame. |

- The page header also carries white text across its lower third. Keep that
  band of the frame quiet — no high-contrast edge where a line of type lands.
- Generate **3–4 candidates per prompt** and keep the one that passes all four
  checks above.
- **No people, hands or pets.** They are the fastest way for an image to look
  generated, and a real client's home would not show them either.

---

## 3. Prompts

### `org-hero.webp`: hub page header

Use case: photorealistic-natural
Asset type: wide page header, 16:9. The centre third must survive a 4:5 crop.
Scene: An organizing consultation in progress in a bright Dubai apartment.
On a pale oak dining table: an open A4 notebook with a hand-sketched shelf plan
in pencil (lines only, no readable words), a yellow retractable tape measure
partly extended, three sample containers (one clear acrylic bin, one woven seagrass
basket, one ribbed glass canister with a wooden lid) and a small stack of velvet
hangers. Cabinetry is blurred in the background.
Composition: 35mm, camera at seated eye height (1.2 m), about 30° off the table
edge, shallow but natural depth of field. The notebook and tape are sharp.
Light: late-morning daylight from a large window at frame left, with soft
directional shadows falling right.
Details: the tape measure is slightly curled, a pencil lies at an angle across
the notebook, one hanger has slipped off the stack, and there is faint wood grain
variation on the table.
Avoid: [house rules] + [organizing additions], readable handwriting.

### `org-kitchen.webp`: kitchen page and hub tile

Use case: photorealistic-natural
Asset type: wide page header, 16:9, with the subject centred.
Scene: A real Dubai villa kitchen with matte warm-white flat-panel cabinets and a
honed pale stone counter. The top drawer beside the hob is pulled open about 40 cm,
showing natural oak drawer dividers. Inside: wooden spoons together, a whisk and
tongs together, a few mismatched but good-quality utensils. The counter behind
holds only a wooden board leaning against the backsplash and one ceramic crock
of spatulas.
Composition: 35mm, eye level 1.45 m, looking slightly down into the drawer, with
straight cabinet verticals. The drawer is in sharp focus and the far counter
softly out of focus.
Light: daylight from a window beyond the counter at frame right. The inside of
the drawer is in soft shade.
Details: one spoon lies across a divider rather than in it, there is a faint
water mark on the counter, and the drawer runner is just visible.
Avoid: [house rules] + [organizing additions], chrome-and-gloss "luxury" kitchen,
fruit bowls, an island full of props.

### `org-pantry.webp`: pantry page and hub tile

Use case: photorealistic-natural
Asset type: wide page header, 16:9, with the subject centred.
Scene: A walk-in pantry in a Dubai villa with white-painted adjustable shelves.
Middle shelf: ribbed glass canisters with wooden lids in two heights, holding
rice, pasta, oats and lentils, filled to **different levels**. Shelf above: two
seagrass baskets and a clear bin of packet snacks with the packaging visible but
unbranded. Lower shelf: a two-tier turntable of oils and jars. Small white labels
on the canisters, **blank or too distant to read**.
Composition: 35mm, standing in the pantry doorway, eye level, with shelves filling
the frame. The canister shelf is at the vertical centre.
Light: a single ceiling downlight plus daylight spilling in from the kitchen at
frame left, so there is a gentle falloff to the right.
Details: one canister lid is slightly ajar, a few grains of rice sit on the
shelf edge, and one basket is pulled forward by a couple of centimetres.
Avoid: [house rules] + [organizing additions], dozens of identical jars, pastel
containers, a chalkboard label wall.

### `org-bedroom.webp`: bedroom & wardrobe page and hub tile

Use case: photorealistic-natural
Asset type: wide page header, 16:9, with the subject centred.
Scene: An open built-in wardrobe in a Dubai apartment with warm-white doors, one
door open. The hanging rail has slim charcoal velvet hangers, all facing the same
way, holding shirts and light trousers grouped by type in real, muted colours
(white, navy, beige, one olive). Shelf above: folded knitwear in stacks of four or five, the
stacks at slightly different heights. Below: an angled shoe shelf with six or seven
pairs of worn-in shoes.
Composition: 35mm, eye level, square-on to the wardrobe with straight verticals.
The rail sits across the centre third.
Light: daylight from a bedroom window behind the camera's left shoulder. The
wardrobe interior is a little darker than the room.
Details: one shirt sleeve hangs slightly forward, one shoe sits a little off the
line, and a clear dust bag is visible on the top shelf.
Avoid: [house rules] + [organizing additions], boutique-style display, clothes in
a colour gradient, designer logos, gold rails.

### `org-kids-room.webp`: kids room page and hub tile

Use case: photorealistic-natural
Asset type: wide page header, 16:9, with the subject centred.
Scene: A child's bedroom in a Dubai villa. A low white open shelving unit about
90 cm high holds four lidded seagrass baskets and two clear bins of wooden
blocks and a train set. Each basket has a small **picture label** (simple
line drawings, not words). Above the unit, a forward-facing ledge holds five
picture books. A soft wool rug is on pale porcelain tiles.
Composition: 35mm, **camera at child height (about 90 cm)**, looking straight
at the shelving with straight verticals.
Light: soft afternoon daylight from a window at frame right.
Details: one basket lid rests at an angle, a wooden block has been left on the
rug, and a book leans against its neighbour.
Avoid: [house rules] + [organizing additions], primary-colour plastic overload,
cartoon murals, character branding, a "Pinterest nursery" pastel grade.

### `org-bathroom.webp`: bathrooms page and hub tile

Use case: photorealistic-natural
Asset type: wide page header, 16:9, with the subject centred.
Scene: A Dubai en-suite bathroom vanity in pale honed limestone with a single
undermount basin. On the counter: one travertine tray holding a pump dispenser,
a small glass jar of cotton pads and a folded hand towel. Nothing else is on the
counter. The vanity drawer is half open, showing clear acrylic dividers with
skincare tubes standing upright. A woven basket of rolled white towels sits on
the floor at the edge of the frame.
Composition: 35mm, eye level, slightly off-axis so the mirror reflects only a
blurred wall and **not the camera**.
Light: soft daylight from a frosted window at frame left.
Details: a few water droplets near the tap, one towel roll slightly looser than
the others, and a faint soap mark on the dispenser.
Avoid: [house rules] + [organizing additions], a hotel-spa candle and orchid
set-up, gold fixtures, readable product branding, a camera reflection.

### `org-laundry.webp`: laundry page and hub tile

Use case: photorealistic-natural
Asset type: wide page header, 16:9, with the subject centred.
Scene: A compact laundry room in a Dubai villa: a front-loading washer and dryer
side by side under a pale laminate worktop. Above them are two white floating
shelves. The lower shelf holds three glass dispensers of detergent at different
fill levels and a jar of wooden pegs. The upper shelf holds folded white towels and
a woven basket. A slim three-tier rolling cart sits beside the machines, and a
linen laundry bag hangs from a hook.
Composition: 35mm, eye level, square-on, with straight verticals.
Light: daylight from a small high window, plus a cool-neutral ceiling light.
Details: the dryer door is slightly open, a folded towel on top of the dryer is
ready to be put away, and there is a faint lint trace on the worktop.
Avoid: [house rules] + [organizing additions], farmhouse "laundry" signs, rustic
props, pastel machines, readable brand names on the appliances.

### `org-garage.webp`: garage page and hub tile

Use case: photorealistic-natural
Asset type: wide page header, 16:9, with the subject centred.
Scene: A single garage in a Dubai villa with a grey epoxy floor and white-painted
block walls. Along the back wall: black heavy-duty steel shelving holding lidded
grey and clear storage boxes, **grouped by category** (sports, tools, travel,
seasonal). Each box has a large label that is **blank or too distant to read**.
A wall rail at the side holds two bicycles, a padel racket bag and a folded
beach chair. The floor in front is clear.
Composition: 28mm, standing just inside the open garage door, at eye level, with
straight verticals. The shelving is centred.
Light: bright, hard Dubai daylight from the open door behind the camera, casting
long soft shadows toward the back wall, with a fluorescent tube glowing faintly.
Details: a thin layer of dust on the top shelf, one box lid not fully clipped,
and a tyre mark on the floor.
Avoid: [house rules] + [organizing additions], American-style pegboard walls full
of tools, workshop clutter, sports cars, a showroom floor shine.

### `org-products.webp`: "signature finish" parallax band

Use case: photorealistic-natural
Asset type: **full-bleed parallax band**. It is cropped heavily at top and
bottom, so the subject must sit in a horizontal strip across the vertical centre.
Scene: A long run of shelving seen close up: ribbed glass canisters, two
woven baskets, a stack of lidded linen boxes and a row of velvet hangers on a rail
at one end, all spaced evenly and aligned to the front edge of the shelf.
Composition: 50mm, eye level with the shelf, running across the whole frame.
There is plain wall above and below.
Light: raking daylight from frame left, picking out the ribbing on the glass and
the weave of the baskets.
Details: one basket is slightly proud of the line, and the canisters are filled
to different levels.
Avoid: [house rules] + [organizing additions].

### The four moves — `org-visit`, `org-edit`, `org-fit`, `org-finish`

These four run side by side on every organizing page, so they have to work as
a set: **the same home, the same day, the same light**, photographed as four
moments in one job. Generate them in order and carry the room and the light
through. A large numeral is drawn over the bottom-left of each frame, so keep
that corner quiet.

All four: 4:5 portrait, 50mm, eye level, one window as the light source at
frame left, natural depth of field. Avoid: [house rules] + [organizing
additions], people, hands.

#### `org-visit.webp` — 01, the consultation

Scene: A pale oak table near the window of a Dubai apartment. An open A4
notebook shows a shelf elevation sketched in pencil — ruled lines and
dimension arrows, **no readable words or numbers**. Beside it a yellow tape
measure part-extended, a folding rule, and three container samples: a clear
acrylic bin, a small seagrass basket, a ribbed glass canister with a wooden
lid. Cabinetry soft in the background.
Details: the tape is curled rather than coiled, a pencil rests at an angle
across the page, one sample sits apart from the other two.
Bottom-left of the frame: plain table surface.

#### `org-edit.webp` — 02, the edit

Scene: **The same room, the same table, an hour later.** The table is now
covered in one household's kitchen contents grouped into clear categories:
a group of wooden utensils, a group of stacked melamine bowls, a group of
spice jars, a group of tinned goods. The groups are distinct, with gaps
between them, and the table is genuinely full. Two open cardboard boxes stand
on the floor at the frame edge.
Details: nothing is arranged prettily — this is a working surface. One stack
leans. A jar lies on its side.
Bottom-left of the frame: the edge of one group against bare table.

#### `org-fit.webp` — 03, fitting the system

Scene: **The same home.** An open kitchen drawer, photographed from slightly
above, with oak dividers being set into place — one divider sits slightly
proud, not yet pushed home. Beside the drawer on the counter: two more
dividers and a tape measure. The drawer is half filled, half empty.
Details: a pencil line marking a cut position on one divider, fine sawdust on
the counter.
Bottom-left of the frame: clear counter.

#### `org-finish.webp` — 04, the finish

Scene: **The same home, finished.** A run of open shelving styled and
complete: ribbed glass canisters filled to different levels, two seagrass
baskets, a small stack of folded linen, everything aligned to the front edge
of the shelf and evenly spaced. Nothing is left over.
Details: one basket very slightly proud of the line, a soft shadow under the
shelf lip.
Bottom-left of the frame: plain shelf or wall.

---

### The seven room details

One close photograph per room, shown in a tall frame beside that page's
statement. Each is a **detail, not a second wide shot** — the page header
already gives the room, so this frame should be the thing the room page is
actually about, seen close.

All seven: 4:5 portrait, 50mm or 85mm, natural depth of field with the
subject sharp and the background falling away, a single window light. Avoid:
[house rules] + [organizing additions], people, hands, readable labels.

#### `org-kitchen-detail.webp`

Scene: An open drawer seen close, filled with natural oak dividers. In one
compartment, wooden spoons laid parallel; in the next, a whisk and tongs; in
the next, measuring spoons. The dividers meet the drawer sides cleanly.
Details: one spoon crosses a divider rather than sitting in it, faint use
marks on the wood.

#### `org-pantry-detail.webp`

Scene: Three ribbed glass canisters on a white shelf, close, holding rice,
red lentils and pasta — **filled to three different levels**. Small blank
white labels. A seagrass basket half out of frame behind them.
Details: one wooden lid sits a few millimetres askew, a fingerprint on the
front glass, two grains on the shelf.

#### `org-bedroom-detail.webp`

Scene: A close view along a wardrobe rail: slim charcoal velvet hangers, all
hooks facing the same way, holding shirts in white, navy and beige, evenly
spaced, receding out of focus.
Details: one sleeve hangs slightly forward, one hanger sits a fraction closer
to its neighbour than the rest.

#### `org-kids-room-detail.webp`

Scene: Close on two lidded seagrass baskets on a low white shelf, each with a
small **picture label** — a simple line drawing of a building block and of a
toy car, no words. A wooden block rests on the shelf beside them.
Details: one lid rests at a slight angle, a scuff on the shelf edge.

#### `org-bathroom-detail.webp`

Scene: Close on a honed travertine tray on a limestone vanity, holding a matte
ceramic pump dispenser, a small glass jar of cotton pads and one folded hand
towel. The rest of the counter is bare and out of focus.
Details: two water droplets on the stone, the towel folded by hand rather than
pressed.

#### `org-laundry-detail.webp`

Scene: Close on three glass dispensers on a white shelf holding detergent,
softener and powder at **different levels**, with small blank labels, and a
glass jar of wooden pegs beside them.
Details: one dispenser pump turned slightly out of line, a faint powder trace
on the shelf.

#### `org-garage-detail.webp`

Scene: Close on the corner of black steel garage shelving, showing two grey
lidded storage boxes stacked, each with a large blank white label, and the
edge of a third box behind. Epoxy floor visible below, out of focus.
Details: a thin film of dust on the top lid, one clip not fully closed, a
scuff on the steel upright.

---


---

## 4. The styles rail — five layouts per room

Each room page carries a rail of **five ways that room is actually laid out**.
A visitor arrives with one kind of pantry in their head; a page that shows one
pantry quietly tells the other six that this studio does not do theirs.

The five in a set are only worth having if they are *visibly different rooms*.
Shoot them as five separate briefs, not five crops of one scene: change the
depth of the room, the amount of wall, the light and the fittings. If two of
them could be swapped without anyone noticing, one of them is wasted.

**All thirty-five:** 4:5 portrait, ≥ 1200 px wide, 35mm or 50mm, one natural
light source, no people, no hands, no readable label text. Alternate frames on
the rail are cropped to 3:4, so keep the subject clear of the left and right
eighth of the frame. Avoid: [house rules] + [organizing additions].

A room's rail appears once **three of its five** exist, so finish one room
before starting the next.

---

### Pantry — `org-pantry-style-*.webp`

Five ways a pantry is actually built in Dubai homes. The point of the set is
that they are visibly *different rooms*, not one pantry photographed five
times — different depth, different light, different amount of wall.

#### `org-pantry-style-butlers.webp` — Butler's pantry

Scene: A small service room off a kitchen, seen from its doorway. A short run of
counter along one side with a kettle and a wooden board on it, open shelves
above holding decanted staples in mixed glass and ceramic, and a doorway at
the far end giving back onto the kitchen. Warm side light from the kitchen
beyond, the room itself dimmer.
Details: one canister turned so its lid handle faces sideways, a tea towel over the
counter edge, a faint water ring on the stone.

#### `org-pantry-style-walk-in.webp` — Walk-in pantry

Scene: A walk-in pantry shot from the doorway, shelving on three walls. Glass
canisters at eye level with the front row aligned to the shelf edge, woven
baskets above, tins and oils on the bottom shelf. Cool daylight from a small
high window at the back.
Details: the back row of one shelf sitting a little behind the front, one basket not
square to the wall, a packet of pasta leaning.

#### `org-pantry-style-cabinet.webp` — Cabinet pantry

Scene: A single tall kitchen cupboard with its pull-out shelves drawn part-way out
at three different depths, so the layers read as layers. Packets standing
upright in low bins, jars on the middle tier, heavier bottles at the bottom.
Flat daylight from the kitchen window off frame left.
Details: one pull-out not quite level with the others, a packet slumped against its
neighbour, a crumb on the lowest tier.

#### `org-pantry-style-open-shelf.webp` — Open shelving

Scene: Two or three open shelves on a plaster wall beside a kitchen counter, no
doors anywhere. Ribbed glass canisters filled to different levels, a stack of
plain crockery, one seagrass basket. Everything visible and nothing hidden.
Soft raking light from the left.
Details: one canister a few centimetres proud of the line, a plate not perfectly
squared to the stack, a shadow gap under the shelf lip.

#### `org-pantry-style-under-stair.webp` — Under the stairs

Scene: A pantry built into the wedge under a staircase, shelves stepped down with
the rake so the tallest items are at the high end and the lowest shelf takes
flat boxes. Seen straight on with the stair soffit clearly visible. Light
from the hallway falling in from the left.
Details: one shelf holding a jar that only just clears the soffit, a tin turned label
away, the join between plaster and shelf slightly imperfect.

---

### Kitchen — `org-kitchen-style-*.webp`

Five kitchen layouts. The difference between them has to be structural — the
shape of the room and where the storage is — not just a change of styling.

#### `org-kitchen-style-drawers.webp` — Drawer-led

Scene: A run of deep pot drawers pulled open at two different depths, pans and lids
standing on edge in pegged dividers rather than stacked. Stone counter above,
handleless fronts. Daylight from the right.
Details: one lid leaning against its peg, a faint scorch on a pan base, a smear on the
stone.

#### `org-kitchen-style-galley.webp` — Galley

Scene: A narrow galley kitchen shot down its length, a counter run on each side and
a window at the far end. Prep on one side, cooking on the other, both counters
almost clear. Bright daylight from the end window.
Details: a chopping board propped against a wall, one drawer not fully closed, a cloth
over the oven rail.

#### `org-kitchen-style-island.webp` — Island

Scene: A kitchen island with a clear stone top, drawers in its side with one pulled
open to show dividers, and a run of tall cabinetry along the far wall. Side
light across the island top.
Details: a single bowl left on the island, one drawer a few millimetres out, a chair
pushed in at a slight angle.

#### `org-kitchen-style-handleless.webp` — Closed and handleless

Scene: A wall of flat, handleless kitchen cabinetry with one door swung open,
revealing divided interior storage — not an empty shell. The closed fronts
read as a quiet plane. Flat overcast light.
Details: a faint fingerprint near the push-catch on one door, a shadow line where two
doors meet unevenly.

#### `org-kitchen-style-open-shelf.webp` — Open shelf

Scene: A kitchen with two open timber shelves above a stone counter holding daily
crockery and glasses, everything else behind closed cabinetry below. Warm
afternoon light raking across the shelf fronts.
Details: one glass turned, a plate stack slightly off-square, a coffee ring on the
counter.

---

### Bedroom & wardrobe — `org-bedroom-style-*.webp`

Five wardrobe types. Shoot the storage, not the bedroom — a bed may appear at
the edge of frame but the wardrobe is the subject in all five.

#### `org-bedroom-style-dressing-room.webp` — Dressing room

Scene: A dressing room with rails on two walls, a low drawer island in the centre
with a folded stack on top, and shelves of shoes at one end. Seen from the
doorway. Even daylight from a window off frame.
Details: one drawer of the island fractionally open, a jumper folded slightly larger
than the one beneath it.

#### `org-bedroom-style-sliding.webp` — Fitted sliding wardrobe

Scene: A fitted wardrobe wall with sliding doors, one panel slid fully back to show
a hanging rail above a bank of drawers and a shelf. Half the wardrobe is
necessarily hidden. Soft frontal daylight.
Details: a fingerprint on the door edge, one hanger turned the wrong way, the door
track visibly used.

#### `org-bedroom-style-open-rail.webp` — Open rail

Scene: A single open clothing rail against a plaster wall, hangers spaced widely,
holding a small edited set in white, oatmeal and charcoal, with a shelf of
folded pieces above and shoes lined up beneath. Boutique, not full.
Details: one garment hanging a little forward of the rest, a shoe toe out of line.

#### `org-bedroom-style-freestanding.webp` — Freestanding

Scene: A freestanding timber wardrobe beside a low dresser, both doors and one
drawer open, the two working as a single system — hanging in one, folded in
the other. Warm morning light from the left.
Details: the dresser drawer not quite square, a scarf over the wardrobe door edge.

#### `org-bedroom-style-walk-in.webp` — Walk-in corridor

Scene: A narrow walk-in wardrobe shot down its length: short hanging over a bank of
drawers on one side, long hanging opposite, shelving at the far end. Light
from the room behind the camera.
Details: one hanger clustered slightly closer to its neighbour, a belt coiled on a
shelf rather than hung.

---

### Kids room — `org-kids-room-style-*.webp`

Five children's rooms at five ages. No children and no hands in frame — the
age has to read from the heights, the scale of the storage and the contents.

#### `org-kids-room-style-nursery.webp` — Nursery

Scene: A nursery corner planned around the adult doing the reaching: a changing top
at waist height, labelled baskets of folded clothes on open shelves below it,
and a low bookshelf. Soft, diffused daylight.
Details: one basket pulled a little forward, a muslin folded loosely, a small dent in
the changing mat.

#### `org-kids-room-style-toddler.webp` — Toddler

Scene: A low cube unit at a small child's height holding lidded seagrass baskets,
each with a simple picture label, with a soft rug in front and a few toys on
the top surface. Nothing stored above reach. Bright, even light.
Details: one basket lid not fully seated, a wooden block on the rug, a label slightly
crooked.

#### `org-kids-room-style-shared.webp` — Shared room

Scene: A shared children's bedroom with two beds and a matched pair of storage
units, one per child, each labelled so ownership is obvious. Symmetry with
one small break in it. Daylight from between the beds.
Details: one bed's blanket pulled tighter than the other, one unit's basket pushed in
further.

#### `org-kids-room-style-playroom.webp` — Playroom corner

Scene: A corner of a living room given over to play: a low unit of open baskets, a
rug, and a small table — all of it tidy, as it would be at bedtime. The rest
of the adult room visible at the frame edge. Late afternoon light.
Details: one basket not flush with the shelf front, a crayon on the table, the rug
corner turned up.

#### `org-kids-room-style-teen.webp` — Teen

Scene: A teenager's room with a desk under a single long shelf on one wall and an
open wardrobe on the other, the two zones clearly apart. Cool daylight from a
window between them.
Details: a notebook left open on the desk, a hoodie over the chair back, one shelf
file leaning.

---

### Bathrooms — `org-bathroom-style-*.webp`

Five bathrooms of different size and use. Keep every bathroom dry-looking and
plain — no spa styling, no rolled towels, no orchid.

#### `org-bathroom-style-double-vanity.webp` — Double vanity

Scene: A double vanity with a stone tray of daily essentials at each basin, one
divided drawer pulled open below showing separated zones. The two sides
visibly belong to two different routines. Flat daylight from a side window.
Details: one tray holding one more item than the other, a water mark on the stone, a
toothbrush at a slight angle.

#### `org-bathroom-style-single-vanity.webp` — Single vanity

Scene: A small bathroom with a single-basin vanity, a stone tray, and one divided
drawer open beneath holding a small, edited set. The cupboard is doing
everything. Soft light from a high window.
Details: a folded hand towel slightly off-square, a faint splash on the mirror edge.

#### `org-bathroom-style-powder-room.webp` — Powder room

Scene: A narrow powder room with a wall-hung basin, a single dispenser and one
folded hand towel — nothing else on show. Dim, warm light from a wall
fitting.
Details: the towel fold not perfectly even, a small shadow behind the dispenser.

#### `org-bathroom-style-ensuite.webp` — Ensuite and linen tower

Scene: An ensuite bathroom with a vanity and a full-height linen tower beside it,
one tower door open to folded towels in stacks by size. Daylight from the
bedroom doorway behind the camera.
Details: one towel stack a fraction taller than the next, a door hinge shadow, a
fingerprint on the tower edge.

#### `org-bathroom-style-family.webp` — Family bathroom

Scene: A family bathroom with a low labelled basket of children's things beside the
bath, within a child's reach, and adult storage in the vanity above. Two
heights, clearly deliberate. Bright, even light.
Details: a bath toy in the basket rather than put away neatly, a splash mark on the
bath rim.

---

### Laundry — `org-laundry-style-*.webp`

Five laundry setups, from a whole room to a cupboard. The difference is how
much space there is, so shoot each one so the scale is obvious.

#### `org-laundry-style-room.webp` — Laundry room

Scene: A dedicated laundry room laid out in the order the work happens: sorting at
the door, machines, then a folding counter, with decanted supplies on a shelf
above. Daylight from a window over the counter.
Details: a folded towel slightly out of line, one dispenser lower than the others, a
peg on the counter.

#### `org-laundry-style-closet.webp` — Laundry cupboard

Scene: A laundry cupboard about a metre wide with stacked machines, a narrow shelf
of supplies above and a slim pull-out beside — doors open, the surrounding
hallway wall visible so the scale reads. Hall light falling in.
Details: the door edge showing wear, one bottle turned label away.

#### `org-laundry-style-stacked.webp` — Stacked in a niche

Scene: A stacked washer and dryer in a built niche, with a narrow rolling cart
filling the gap beside them and a shelf bridging the top. Tight space, fully
used. Flat frontal light.
Details: the cart not pushed fully home, a cloth over the dryer handle.

#### `org-laundry-style-utility.webp` — Utility and mudroom

Scene: A utility room doing two jobs: laundry machines along one side, and hooks, a
bench and open shoe storage opposite. The threshold to outside visible.
Strong daylight from the outside door.
Details: one pair of shoes not squared to the shelf, a bag strap hanging off a hook,
sand on the floor by the door.

#### `org-laundry-style-linen.webp` — Laundry and linen store

Scene: A laundry room with a machine run on one side and a separate shelved linen
store on the other, sheet sets folded together by bed size, each shelf
labelled. Even daylight.
Details: one set folded slightly bulkier than its neighbours, a label corner lifting.

---

### Garage — `org-garage-style-*.webp`

Five garages. Dubai villa garages — plaster or block walls, epoxy or tiled
floor, roller door. Keep them warm-grey and dry, never a dark workshop.

#### `org-garage-style-single.webp` — Single garage

Scene: A single villa garage with steel shelving along one wall holding labelled
lidded boxes, and a clear parking bay beside it. Roller door partly up,
daylight spilling across the floor.
Details: one box lid not clipped, a tyre mark on the floor, a broom leaning in the
corner.

#### `org-garage-style-double.webp` — Double garage

Scene: A double garage with shelving on both side walls and a clear working aisle
down the middle, shot down the aisle. Even light from the open roller door
behind the camera.
Details: one shelf holding a box turned label-in, a coil of hose not quite neat.

#### `org-garage-style-store-room.webp` — Garage and store room

Scene: A garage with an open doorway into a small shelved store room, lidded
seasonal boxes stacked inside it, so the garage itself stays clear. Light
from the garage falling into the store.
Details: a box slightly proud of the shelf edge, dust on the top lid.

#### `org-garage-style-sports.webp` — Sports wall

Scene: A garage wall given to sport: two bicycles on wall hooks, boards racked
vertically, rackets on a rail and a low bin of balls beneath. Nothing on the
floor. Daylight from the left.
Details: one pedal turned, a ball out of the bin, a scuff on the plaster under a
hook.

#### `org-garage-style-workshop.webp` — Workshop corner

Scene: A workshop corner of a garage: a bench with a clear top, a pegboard of hand
tools above it with each tool outlined, and labelled drawers beneath. Task
light plus daylight.
Details: one tool hung a little off its outline, sawdust in the bench corner, a pencil
on the bench.


---

## 5. Before photos: use real ones, never generated

Every room page has a **Before** section with four labelled frames, for example
Kitchen → *Utensil drawer, Base cabinets, Fridge, Counter*. These must be
**real photographs from Havenly client projects**, taken with the client's
permission. A generated "before" presented as a client's home is a fabricated
record. The site's honesty rules forbid it, and it would undo the trust the rest
of the page builds. Until real ones exist, the frames render as empty, labelled
placeholders.

How to shoot them (a phone is fine):

- Shoot in portrait orientation (4:5), from the position you will use again for
  the "after" shot.
- Use natural light only. Turn the flash off.
- Leave out faces, family photos, documents, and anything that identifies
  the client or the building.

To apply one, prepare it the same way (section 5), then pass it to that page's
`BeforeSection` in `src/app/interior-organizing/<room>/page.tsx`:

```tsx
zones={[
  { label: "Utensil drawer", src: "/images/before-kitchen-drawer.webp" },
  …
]}
```

---

## 6. Applying the images

Each step below is required. Skipping step 2 leaves the generator's metadata
in the file, and skipping step 3 means phones download the full-size image.

1. **Save the chosen image** at full resolution, as PNG if the generator allows.

2. **Strip the AI metadata and convert to web-ready WebP.** Append `:full` for
   anything that runs full-bleed — the page headers and the parallax band —
   so it is prepared at 1920 px rather than 1440 px and stays sharp on a
   desktop display. The moves and the details are small frames, so they take
   the default `card` budget.

   The eleven moves and details:

   ```sh
   node scripts/prepare-images.mjs \
     ~/Downloads/visit.png:org-visit.webp \
     ~/Downloads/edit.png:org-edit.webp \
     ~/Downloads/fit.png:org-fit.webp \
     ~/Downloads/finish.png:org-finish.webp \
     ~/Downloads/kitchen-detail.png:org-kitchen-detail.webp \
     ~/Downloads/pantry-detail.png:org-pantry-detail.webp \
     ~/Downloads/bedroom-detail.png:org-bedroom-detail.webp \
     ~/Downloads/kids-detail.png:org-kids-room-detail.webp \
     ~/Downloads/bathroom-detail.png:org-bathroom-detail.webp \
     ~/Downloads/laundry-detail.png:org-laundry-detail.webp \
     ~/Downloads/garage-detail.png:org-garage-detail.webp
   ```

   A room's five styles, all in one go — the rail wants a room finished, not
   one frame from each of seven:

   ```sh
   node scripts/prepare-images.mjs \
     ~/Downloads/butlers.png:org-pantry-style-butlers.webp \
     ~/Downloads/walk-in.png:org-pantry-style-walk-in.webp \
     ~/Downloads/cabinet.png:org-pantry-style-cabinet.webp \
     ~/Downloads/open-shelf.png:org-pantry-style-open-shelf.webp \
     ~/Downloads/under-stair.png:org-pantry-style-under-stair.webp
   ```

   The file name is not decoration: `StyleRail` builds it from the room slug
   and the layout slug in the page file, so
   `org-<room>-style-<layout>.webp` has to match the `slug` given in that
   room's `<StyleRail>` exactly.

   The nine already done were prepared as `card`. They are page headers now,
   so re-running them with `:full` from the original PNGs would sharpen them
   on large screens — worth doing if you still have the sources:

   ```sh
   node scripts/prepare-images.mjs ~/Downloads/kitchen.png:org-kitchen.webp:full
   ```

   `sharp` re-encodes each image without copying its EXIF, XMP or C2PA
   provenance block. Every line it prints should end in `metadata clean`. If
   one says `METADATA PRESENT`, don't use that file. Room images are capped at 1440 px and ≤ 140 KB. The
   parallax band (`:full`) is capped at 1920 px and ≤ 240 KB.

   To double-check the metadata is gone:

   ```sh
   exiftool public/images/org-*.webp | grep -iE "c2pa|xmp|software|creator|ai"
   ```

   This should print nothing.

3. **Build the mobile sizes:**

   ```sh
   npm run assets:images
   ```

   This writes 320, 480, 768 and 1200 px versions beside each image and records
   them in `src/lib/image-manifest.json`. `<Img>` uses that file to build the
   `srcset`, so a phone downloads the 480 px file, not the 1440 px one.

4. **Nothing to edit.** Each organizing slot in `src/lib/images.ts` switches
   from its stand-in to the new image as soon as it appears in the manifest.
   This happens only after step 3, so an image never goes live without its
   mobile sizes.

   The styles rail is the one band that appears rather than swaps. It asks
   `shot()` rather than `ready()` — no stand-in — and renders nothing until
   **three of a room's five** are in the manifest. So the third file you
   prepare for a room is the one that makes its rail show up.

5. **Check and commit:**

   ```sh
   npm run build && npm start   # open /interior-organizing/ and each room
   ```

   Check the hub tiles on a phone-width window: each image's subject should
   still be visible in the portrait crop. Check the styles rail on a desktop
   window too — alternate frames are cropped to 3:4, so anything sitting in
   the outer eighth of a frame is the first thing to go. Commit the `org-*.webp` files, their
   `-320/-480/-768/-1200` versions and `image-manifest.json` together.
