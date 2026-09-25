# Image generation prompts

Every image on the site resolves through one manifest: `src/lib/images.ts`. Slots
that have not been generated yet temporarily point at one of the three existing
photographs so the site always renders. To bring a new image in:

1. Generate it from the prompt below.
2. Optimise to WebP and strip the generator's metadata — EXIF, XMP and any C2PA
   provenance block — in one step:

   ```
   node scripts/prepare-images.mjs ~/Downloads/generated.png:intro-room.webp
   ```

   That writes straight into `public/images/` and prints the final dimensions,
   size and whether any metadata survived. Append `:full` for a full-bleed image
   (≤ 240 KB at 1920px); the default `card` budget is ≤ 140 KB at 1440px.
3. Confirm the filename matches the heading below — the manifest expects it.
4. Point the matching slot in `src/lib/images.ts` at the new path — one line.
5. Build the responsive ladder for it:

   ```
   npm run assets:images
   ```

   That writes the smaller widths beside it (`intro-room-480.webp` and so on)
   and records them in `src/lib/image-manifest.json`, which is what `<Img>`
   reads to build a `srcset`. Skip it and the new image still renders — every
   screen just downloads the full-width file. Commit the derivatives and the
   manifest along with the image.

All imagery is a styling concept, never a record of a client project. That is
stated on the pages that show it, and must stay stated.

---

## House rules for every prompt

These lines below exist because generated interiors have a recognisable set of
tells. Keep them on every prompt; they are what separates a believable property
photograph from an obviously synthetic one.

**Always include:**

- Real camera language: `28mm` or `35mm` lens, eye level at 1.4–1.5 m, straight
  verticals, natural depth of field. Architectural photographers shoot this way;
  generators default to an impossible floating wide angle.
- One dominant light source with a direction, and shadows that agree with it.
- Slight asymmetry: a cushion not centred, a chair pulled out, a rug edge not
  parallel to the wall, one book out of alignment.
- Material honesty: linen creases, a fingerprint on glass, a faint scuff on
  skirting, wood grain that varies between boards.
- Neutral white balance. UAE daylight is bright and slightly cool at midday — not
  amber.
- Believable emptiness. Surfaces that would genuinely be bare, left bare.

**Always exclude** (append verbatim):

> Avoid: CGI or 3D render appearance, plastic sheen, glowing highlights, HDR
> halos, orange or teal grade, impossible symmetry, floating furniture, warped
> door frames, bent skirting lines, duplicated furniture legs, melted chair
> joints, garbled book spines, unreadable text, wall art with fake writing,
> excessive props, styled-to-death surfaces, fake plants with plastic leaves,
> lens flare, vignette, people, hands, pets, text, logos, watermarks.

**Structural check before accepting an image:** follow every straight line in the
room — skirting, door frames, window mullions, table edges. If any of them bends,
doubles or dissolves, regenerate rather than retouch. That single check catches
most of what reads as "AI" to a visitor who could not say why.

---

## `about-hero.webp` — About page opening

Use case: photorealistic-natural
Asset type: wide page header, 2.1:1 crop safe
Scene: A calm contemporary UAE apartment living room mid-afternoon, photographed
from the doorway. Low oatmeal linen sofa against a warm white plaster wall, one
walnut side chair turned slightly towards the window, a low travertine table with
a single ceramic bowl and one closed book. Woven wool rug, pale limestone floor.
Composition: 35mm, eye level 1.45 m, straight verticals, generous empty floor in
the foreground, furniture grouped to the right so the left third stays quiet.
Light: single directional daylight from a tall window at frame right, soft
shadows falling left, no fill light.
Details: linen creased where someone has sat, rug edge very slightly askew, one
cushion leaning rather than propped.
Avoid: [house rules exclude list]

## `services-hero.webp` — Services page opening

Use case: photorealistic-natural
Asset type: wide page header, 2.1:1 crop safe
Scene: A Dubai villa living room in late afternoon. Ivory linen sectional, two
walnut lounge chairs, large natural-fibre rug, floor-to-ceiling glazing at frame
right showing a sunlit garden and the edge of a palm, slightly out of focus.
Composition: 28mm, eye level, straight verticals, wide and calm, left third
darker for white overlay text.
Light: strong low sun through the glazing, long soft shadows across the floor.
Details: one chair angled away from the group as though recently moved, a throw
folded once over the sofa arm rather than draped.
Avoid: [house rules exclude list]

## `contact-entrance.webp` — Contact page

Use case: photorealistic-natural
Asset type: wide page header
Scene: The entrance hall of a UAE villa. Shallow oak console against warm white
plaster, a round mirror above it reflecting daylight from a door out of frame,
one ceramic vessel and a set of keys on the console, a woven runner on limestone.
Composition: 35mm, eye level, straight verticals, corridor receding to frame
left.
Light: daylight entering from behind the camera's left shoulder.
Details: keys genuinely scattered rather than arranged, runner slightly off
centre, a faint scuff at the base of the wall.
Avoid: [house rules exclude list] — in particular, no legible text on keys or
paperwork.

## `spaces-hero.webp` — Our spaces parallax band

Use case: photorealistic-natural
Asset type: full-width parallax band, heavily cropped top and bottom
Scene: A wide, quiet villa interior looking towards open garden doors. Seating in
the mid-ground turned towards the view, generous empty floor.
Composition: 28mm, eye level, the horizon of the floor line near the vertical
centre so a 7% vertical drift never exposes an edge.
Light: bright but diffused, midday, cool-neutral white balance.
Avoid: [house rules exclude list]

---

## `staging-before.webp` and `staging-after.webp` — the comparison wipe

These two must be **the same room, the same camera position, the same lens and
the same time of day**. The comparison only works if nothing but the furniture
changes. Generate `staging-after.webp` first, then use it as the edit target to
produce the empty version — do not generate the pair independently.

### `staging-after.webp` (generate first)

Use case: photorealistic-natural
Asset type: before/after comparison, 1.78:1
Scene: An unremarkable, believable Dubai apartment living room — plain white
walls, beige porcelain tile floor, one aluminium-framed sliding door at frame
right, a plain ceiling with two downlights. Styled with a mid-grey three-seat
sofa, a wool rug, a low oak coffee table with one bowl, a floor lamp at the left,
two cushions and a folded throw, one framed abstract print low on the left wall.
Composition: 28mm, camera at 1.45 m, centred on the room, straight verticals.
Light: daylight through the sliding door at frame right, no artificial fill.
Details: keep the architecture ordinary. This should look like a real mid-market
apartment that has been furnished well, not a show villa.
Avoid: [house rules exclude list] — and avoid making the shell look luxurious.

### `staging-before.webp` (edit of the above)

Use case: precise-object-edit
Primary request: Remove every piece of furniture, the rug, the lamp, the artwork
and all accessories, leaving the room completely empty.
Constraints: change only the contents. Keep the walls, floor tiles, tile grout
lines, ceiling, downlights, sliding door, frame, glazing, camera position, lens,
shadows and daylight direction exactly as they are. The floor must continue
unbroken where the rug was. Add faint, realistic wear: a small mark on the wall
where a frame hung, slightly dustier tile at the edges.
Avoid: [house rules exclude list] — and do not re-light, re-grade or re-frame.

---

## `material-detail.webp` — parallax texture band

Use case: photorealistic-natural
Asset type: full-width parallax band
Scene: A close, shallow-focus detail of layered natural materials on a surface —
a folded linen edge, the corner of an oak table, a ceramic dish with a visible
glaze pool, the edge of a wool rug. No full room visible.
Composition: 50mm, close, shallow depth of field, shot slightly from above at
about 30 degrees.
Light: single soft side light raking across the textures to reveal weave and
grain.
Details: the weave of the linen must be resolvable; the oak grain must vary; the
glaze must pool unevenly at the base of the dish.
Avoid: [house rules exclude list] — and no perfectly repeating textures, which is
the clearest tell in fabric close-ups.

## `install-day.webp` — installation parallax band

Use case: photorealistic-natural
Asset type: full-width parallax band
Scene: A room mid-installation. A rug half unrolled, a chair not yet in position,
a protective blanket folded on the floor, a cushion still in its wrap on a
windowsill, a tape measure on a table. Nobody in frame.
Composition: 35mm, eye level, straight verticals, deliberately uncomposed — as
though photographed quickly during the work.
Light: ordinary daylight, no styling of the light.
Details: this image earns its place by being slightly untidy. Resist every
instinct to resolve it.
Avoid: [house rules exclude list] — and avoid making it look finished.

## `consultation-table.webp` — consultation service

Use case: photorealistic-natural
Asset type: supporting image
Scene: A dining or work table with a floor plan printed on paper, two fabric
swatches, a timber sample, a pencil and a phone face down. Daylight from the
left. Nobody in frame.
Composition: top-down at about 70 degrees, 50mm, close.
Details: the plan should read as a plan at a glance but must not contain legible
dimensions or labels — keep it soft-focus at the edges. Swatches overlapping
casually, not arranged in a fan.
Avoid: [house rules exclude list] — especially garbled text on the drawing.

---

## Gallery concepts

Each of these fills one card in `/spaces/` and one detail page. Keep them
recognisably the same studio: the same palette, the same restraint, the same
quality of daylight. They should look like one photographer's work.

### `space-townhouse.webp` — the family townhouse

Open-plan townhouse ground floor: living, dining and kitchen in one volume.
Three zones defined by a rug, the orientation of the sofa and a pendant over the
table. Nothing above shoulder height in the middle of the plan. 28mm, eye level,
straight verticals, daylight from a garden door at the far end. Hard-wearing
materials — this is a family house, not a show home.
Avoid: [house rules exclude list]

### `space-penthouse.webp` — the skyline penthouse

Upper-floor living room with floor-to-ceiling glazing filling frame right,
showing a hazy Dubai skyline in soft focus. All furniture below the window line.
Matte surfaces, no glass tabletop, no mirrors facing the glazing. 28mm, eye
level, straight verticals. Late afternoon, cool-neutral grade.
Avoid: [house rules exclude list] — and no visible camera reflection in the
glazing, which is the usual failure of this shot.

### `space-majlis.webp` — the majlis

A formal receiving room in an Abu Dhabi villa. Generous perimeter seating in
oatmeal and sand upholstery, layered floor textiles, low serving tables within
reach of each seat, a simple plaster ceiling detail. Calm and hospitable rather
than ornate; restrained palette consistent with the rest of the set. 28mm, eye
level, straight verticals, diffused daylight from tall windows at frame left.
Avoid: [house rules exclude list] — and avoid pastiche ornament, gold, or heavy
pattern.

### `space-entrance.webp` — the entrance

The first three metres of a villa interior: shallow console, round mirror
carrying daylight down the corridor, one sculptural ceramic, a low bench, keys
and a folded linen cloth. 35mm, eye level, straight verticals, corridor receding.
Avoid: [house rules exclude list]

### `space-terrace.webp` — the shaded terrace

A UAE apartment or villa terrace in shade. Two outdoor chairs and a small table
in weather-honest materials — teak, powder-coated aluminium, an outdoor rug — one
large planted olive or frangipani in a plain vessel. Strong ambient light outside
the shaded area, cooler light within it. 35mm, eye level, straight verticals,
late afternoon.
Details: the shade structure must be structurally believable and cast a shadow
that matches the sun direction.
Avoid: [house rules exclude list] — and no lush temperate planting, which does
not read as the UAE.

---

## Homepage intro mosaic

Four images fill the band under "More than a beautiful room" on the homepage.
They replace two paragraphs that used to carry that argument in words, so the
set has to do the arguing: this studio works across the rooms a UAE property
actually has, in real light.

Four **rooms**, not four distances. The earlier set varied the lens — whole
room, close detail, threshold — and read as one photographer demonstrating
range rather than one studio demonstrating work. Vary them on room, on light
and on camera height; if two match on two of the three, regenerate the weaker.

| Slot | Room | Light | Camera height | Shape |
| --- | --- | --- | --- | --- |
| `intro-room.webp` | living room, Marina apartment | cool side light, mid-morning | 1.45 m | portrait 4:5 |
| `intro-detail.webp` | villa majlis | warm raking, late afternoon | 1.0 m | landscape 16:9 |
| `intro-threshold.webp` | dining room | flat overcast, no cast shadow | 1.45 m | landscape 16:9 |
| `intro-bedroom.webp` | bedroom corner | cool, low, early morning | 1.2 m | portrait 4:5 |

The two middle filenames are historical — they held a detail macro and a
threshold shot before this set. Renaming them means touching `images.ts`, the
four CSS class names and this table together.

The band is full-bleed and its height is fixed by `clamp(560px, 68vh, 840px)`,
so the frames change shape with the screen rather than holding one ratio:

| Viewport | Outer frames (room, bedroom) | Middle frames (majlis, dining) |
| --- | --- | --- |
| 1280 | 0.73 — close to 3:4 | 1.53 — close to 3:2 |
| 1440 | 0.82 | 1.73 |
| 1920 | 0.96 — nearly square | 2.01 — a 2:1 letterbox |

Generate the outer two at **4:5**, which sits mid-range for what they have to
cover, and the middle two at **16:9** or **2:1**. A 3:2 source loses a quarter
of its height on a wide screen, which is enough to cut into a subject.

The crops are handled in CSS with `object-fit: cover`, so let the site crop —
but keep the subject well clear of the top and bottom edges in all four. The
outer pair has to survive 3:4 through square, and the middle pair 3:2 through
2:1, so anything near those edges is gone at one width or another.

### `intro-room.webp` — living room

Use case: photorealistic-natural
Asset type: portrait, 4:5, crops to nearly square on a wide screen
Scene: The living room of a Dubai Marina apartment, mid-morning. Floor-to-
ceiling glazing on the left wall with a sheer on the inner track and a heavy
linen curtain stacked back on the outer one; the marina towers and water legible
but thrown out of focus behind the glass. Oatmeal linen sofa, a walnut side
chair turned a few degrees towards the window, low travertine coffee table, a
wool rug whose edge is not quite parallel to the sofa. One throw pushed to one
end of the sofa, not folded. Large-format porcelain floor tiles with grout lines
running true. A recessed linear air-conditioning grille in the gypsum ceiling.
Composition: 28mm, eye level at 1.45 m, straight verticals, deep depth of field.
Light: Gulf daylight from the glazing at frame left, bright and slightly cool,
laying a defined patch of floor light with a soft edge; the rest lit by bounce.
Details: leave the far third of the room genuinely sparse. Linen creases, wood
grain that varies between boards, a faint scuff on the skirting.
Avoid: [house rules exclude list] — and nothing styled into the lower corners of
the frame.

### `intro-detail.webp` — majlis

Use case: photorealistic-natural
Asset type: landscape, 16:9, crops to 2:1 on a wide screen
Scene: The majlis of a UAE villa, late afternoon. Low seating running along two
perimeter walls — deep bouclé and linen cushions on a built-in banquette,
bolsters against the wall, one pushed out of line. A long low oak table with a
brass dallah and two small cups set down off-centre, as if used. Two rugs
layered, the upper not squared to the lower. Plaster walls with a deep window
reveal at frame right.
Composition: 35mm, camera low at about 1.0 m to sit at the height of the
seating, straight verticals, the banquette running out of frame at the left.
Light: low late-afternoon sun through the reveal at frame right, raking hard
across the plaster and picking up its trowel texture, long soft shadows from the
bolsters. The warmth is the hour, not a colour grade.
Details: believable emptiness — most of the seating unoccupied and unstyled.
Keep the table and cups well clear of the top and bottom edges.
Avoid: [house rules exclude list] — and no repeating cushion patterns, no
garbled Arabic lettering, and no perfectly mirrored pair of bolsters.

### `intro-threshold.webp` — dining room

Use case: photorealistic-natural
Asset type: landscape, 16:9, crops to 2:1 on a wide screen
Scene: The dining area of a UAE villa on an overcast day. A long solid oak table
for eight, six chairs in a pale woven fabric with one pulled out and turned
slightly. A shallow ceramic bowl and a single stem of olive on the table, placed
off-centre. A plain plaster wall behind, a sideboard partly out of frame at the
left. One pendant hanging slightly off the table's centre line, as real
installations usually are.
Composition: 35mm, eye level at 1.45 m, shot along the length of the table so
its edge runs as one straight line, verticals true.
Light: soft overcast daylight from a large window off frame right, even and
slightly cool, with almost no cast shadow — the only frame in the set without a
hard light direction.
Details: oak grain that changes across the boards and does not repeat. Keep the
tabletop objects clear of the top and bottom edges.
Avoid: [house rules exclude list] — and no perfectly spaced place settings.

### `intro-bedroom.webp` — bedroom corner

Use case: photorealistic-natural
Asset type: portrait, 4:5, crops to nearly square on a wide screen
Scene: The corner of a principal bedroom in a UAE apartment, early morning.
Layered bedding in sand and chalk tones, the top layer folded back unevenly, one
pillow carrying a slight dent. A low timber stool serving as a bedside table
with one book on it. A window at frame right with a sheer curtain lifting
slightly, the blackout curtain drawn back behind it. Jute rug over porcelain.
Composition: 35mm, camera at a seated height of about 1.2 m, straight verticals,
the bed running diagonally out of frame at the bottom right. Do not show the
whole bed.
Light: early daylight through the sheer at frame right, soft, cool and low,
throwing long gentle shadows across the bedding. This is the coolest frame in
the set.
Details: the bedding folds must fall under gravity with weight in the hem. The
sheer must read as a single layer of fabric, not as fog.
Avoid: [house rules exclude list] — and no perfectly plumped hotel pillows and
no symmetrical pair of bedside tables.

---

## Homepage service tiles

Three portrait tiles fill the "How we can help" grid. Each is the whole card:
there is no copy block beneath it, the service title sits on the photograph, and
on hover a summary and a link rise into the lower third.

That gives these three a constraint the rest of the set does not have. **The
bottom third of each frame has to stay quiet** — wall, floor, a plain surface,
something the eye reads past. A sofa back, a patterned rug or a bright window in
that band will fight the title. Compose for it deliberately: put the subject in
the upper two thirds and let the foreground fall away.

The other rule is that the three must not collapse into one another. They sit
side by side, so vary the room, the palette weight and the distance:

| Slot | Room | Distance | Weight |
| --- | --- | --- | --- |
| `service-tile-staging.webp` | living room, vacant-feeling | wide | light, airy |
| `service-tile-furnishing.webp` | bedroom, fully furnished | mid | warm, layered |
| `service-tile-consultation.webp` | dining area, in use | mid-close | cool, spare |

All three: portrait, 4:5, and keep the subject clear of the frame edges — the
tiles crop towards 1.15:1 landscape on a phone, taking the top and bottom off.

### `service-tile-staging.webp` — home staging

Use case: photorealistic-natural
Asset type: portrait tile, 4:5, title overlaid on the lower third
Scene: A villa living room staged for viewings. Enough furniture to explain the
room and no more: a pale linen sofa, one armchair angled towards it, a low table
with a single bowl, a large rug. Generous bare floor across the foreground. The
room should read as beautifully presented but not lived in — no personal
objects, no half-read book, no cup.
Composition: 28mm, eye level at 1.45 m, straight verticals, shot from the
doorway so the floor occupies the bottom third of the frame and nothing else
does.
Light: bright mid-morning daylight from tall windows at frame right, cool-neutral
white balance. The room should feel full of light — this is the lightest of the
three tiles.
Details: the rug edge should sit slightly off-parallel to the sofa. One cushion
pushed out of true. Leave the far corner of the room empty.
Avoid: [house rules exclude list] — and nothing in the bottom third of the frame
except floor, because the title sits there.

### `service-tile-furnishing.webp` — furnishing & styling

Use case: photorealistic-natural
Asset type: portrait tile, 4:5, title overlaid on the lower third
Scene: A bedroom that is completely furnished and clearly in use. Upholstered bed
in oatmeal, layered bedding in sand and chalk, a walnut bedside table with a lamp
and one book, a bench at the foot of the bed, curtains hung properly to the
floor. This is the fullest and warmest of the three — it has to show the result
of a whole furnishing plan, not a single good object.
Composition: 35mm, eye level, straight verticals, framed so the foot of the bed
and a stretch of rug fill the lower third and the headboard wall fills the upper
two thirds.
Light: late-afternoon daylight from frame left, warmer than the staging tile but
still neutral in the whites. Soft shadows with direction.
Details: bedding folded back unevenly, one pillow dented, the bench not quite
square to the bed. Timber grain varying between the bedside table and the bench.
Avoid: [house rules exclude list] — and no hotel symmetry: one bedside table, not
a matched pair. Keep the lower third free of pattern.

### `service-tile-consultation.webp` — design consultation

Use case: photorealistic-natural
Asset type: portrait tile, 4:5, title overlaid on the lower third
Scene: An apartment dining area partway through a decision. A round walnut table
with four chairs, one pulled out at an angle, and on the table a floor plan, two
fabric swatches and a pencil — the consultation in progress, nobody in frame.
Sparer and cooler than the other two tiles: plain walls, one plant, nothing
decorative on the sideboard.
Composition: 35mm, standing height, straight verticals, closer than the other
two so the table fills the middle of the frame and plain floor fills the bottom
third.
Light: flat, even daylight from a large window behind the camera. Cool-neutral,
minimal shadow — working light rather than golden hour.
Details: the plan must read as a plan at a glance but carry no legible dimensions
or labels; keep its text soft. Swatches overlapping casually, not fanned.
Avoid: [house rules exclude list] — especially garbled text on the drawing, and
keep the bottom third to plain floor.

---

## Homepage material swatches

Four square macros replacing the four flat colour dots under the philosophy
copy. They run at roughly 100–150px square on a desktop and smaller on a phone,
so each one has to read as a single material at a glance: one surface, filling
the frame, no room, no object, no context. Shoot them as a set — same lens, same
distance, same light direction — so the row reads as four samples rather than
four photographs.

Shared for all four, append to each prompt:

> Macro detail, 1:1 square crop, 60mm macro lens, camera square to the surface,
> the material filling the entire frame edge to edge. Single soft directional
> daylight raking from frame left at a low angle so the texture casts its own
> micro-shadows. Neutral white balance. Shallow but not extreme depth of field —
> the surface stays legible across the whole frame. No object, no room, no
> horizon, no styling. Avoid: [house rules exclude list] — and no tiling or
> repeating pattern, no seamless-texture look, no colour cast.

### `swatch-linen.webp` — linen

Use case: photorealistic-natural
Scene: Oatmeal-coloured washed linen, gathered into two or three soft irregular
folds running diagonally across the frame. Slubs and thread irregularities
visible. One fold deeper than the others so the frame is not evenly divided.
[shared macro block]

### `swatch-oak.webp` — oak

Use case: photorealistic-natural
Scene: Pale European oak, unfinished or hard-wax-oiled, the grain running
roughly diagonally. One fine knot or a single darker cathedral figure off-centre
so the frame has a subject. Visible open pores, a faint sanding direction.
[shared macro block]

### `swatch-travertine.webp` — travertine

Use case: photorealistic-natural
Scene: Honed cream travertine, cut across the bedding so the characteristic
elongated voids run horizontally. Two or three open pores catching shadow, faint
tonal banding. Matte, never polished.
[shared macro block]

### `swatch-boucle.webp` — bouclé

Use case: photorealistic-natural
Scene: Chalk-white bouclé upholstery fabric, the looped yarn filling the frame.
Loops of varying size, a slight compression at one edge as though something rests
against it. The deepest shadows sit between loops, not across the frame.
[shared macro block]

---

## Homepage process stage

Two new frames complete the four-step sticky stage. The other two are
`consultation-table.webp` (step 01) and `install-day.webp` (step 03), already
generated. All four are centre-cropped into a 16:10 frame, so keep the subject
away from the extreme left and right edges.

### `process-moodboard.webp` — step 02, the plan

Use case: photorealistic-natural
Asset type: 16:10 landscape, sits in the sticky stage beside the steps
Scene: A studio worktable seen from standing height, partway through a scheme.
An A2 floor plan weighted down at one corner, a loose fan of fabric cuttings in
linen, bouclé and a single deeper walnut-brown, two timber samples, a travertine
offcut, a pencil laid across the plan. A mug set down away from the work. Nobody
in frame. The table is oak; the room behind it is plain and slightly out of
focus.
Composition: 35mm, camera high and looking down at roughly 40°, straight
verticals on whatever wall is visible, the plan running diagonally out of the
bottom-left of the frame so the arrangement is not centred.
Light: broad, even daylight from a large window at frame left. Cool-neutral,
soft-edged shadows falling right. Working light, not golden hour.
Details: the swatches overlapping casually rather than fanned; the plan's line
work must read as drafting at a glance but carry no legible dimensions, room
names or title block — keep all its text soft and unresolved.
Avoid: [house rules exclude list] — especially legible text on the drawing, and
no laptop, phone or screen in frame.

### `process-reveal.webp` — step 04, the finished room

Use case: photorealistic-natural
Asset type: 16:10 landscape, sits in the sticky stage beside the steps
Scene: A completed UAE apartment living room, finished and empty of people, the
moment before a viewing. Oatmeal linen sofa, one walnut lounge chair turned
towards the window, travertine coffee table with one ceramic bowl, a wool rug,
curtains hung to the floor. Everything resolved — this is the payoff frame, so
it should be the warmest and most complete of the four.
Composition: 28mm, eye level 1.45 m, straight verticals, shot from the doorway
so a stretch of clear floor runs into the foreground and the seating group sits
in the middle distance.
Light: late-afternoon sun through glazing at frame right, long soft shadows
across the floor, whites still neutral.
Details: one cushion leaning rather than propped, the rug edge very slightly off
parallel, a throw folded once over the sofa arm.
Avoid: [house rules exclude list] — and no over-styling: no tray of objects, no
stack of coffee-table books, no flowers.

---

## `uae-band.webp` — the UAE band background

Use case: photorealistic-natural
Asset type: full-bleed parallax band, 16:9. The picture is pinned to the
viewport and the band scrolls over it, so the visitor only ever sees a ~560px
horizontal slice of it at a time and never the whole frame at once. Keep the
subject in the middle band of the image and let the top and bottom go quiet.
Sits under a dark scrim with centred white type over the middle.
Scene: A UAE living space with the country legible in it without a landmark
doing the work — a high apartment interior at dusk with the city beyond the
glass reading as soft light rather than a recognisable skyline, or a villa majlis
with deep window reveals and layered floor textiles. Furnished, calm, nobody in
frame.
Composition: 28mm, eye level, straight verticals, wide. The middle third must
stay visually quiet: no strong pattern, no bright window, nothing the eye fights
to read type against. Put the detail in the outer thirds.
Light: low, warm, directional — early evening. Deeper shadow than the daytime
images on the rest of the site, because a scrim sits over this one and a bright
photograph under a scrim reads as grey.
Details: one lamp on, curtains not perfectly even, a chair pulled slightly out.
Avoid: [house rules exclude list] — and no Burj Khalifa, Sheikh Zayed Mosque or
any identifiable building; no flags, no Arabic calligraphy, no lanterns. The
band says "here" through light and materials, not through souvenirs.

---

## `faq-room.webp` — the FAQ column

Use case: photorealistic-natural
Asset type: portrait, 3:4, fills the column beside the questions and is cropped
to whatever height the questions leave, so keep the subject central and give the
top and bottom of the frame nothing that matters
Scene: A quiet corner of a styled bedroom or reading nook. A low walnut stool or
bench, a folded linen throw, part of a bed or an armchair entering the frame at
one edge, a plain plaster wall, pale limestone floor. Restrained — this sits
beside a column of text and must not compete with it.
Composition: 35mm, eye level 1.4 m, straight verticals, the subject grouped in
the middle half of the frame with plain wall above and plain floor below.
Light: soft daylight from frame left, one direction, gentle shadows.
Details: the throw folded once and not quite square, a faint indentation where
someone has sat.
Avoid: [house rules exclude list] — and nothing in the top or bottom sixth of
the frame; those bands get cropped away at some viewport widths.

---

## `founder-portrait.webp` — the founder, for the about page

**Read this before generating.** Every other prompt in this file makes a room.
This one makes a person, and a person is a different kind of claim: a visitor
reads a portrait beside a signed first-person note as a photograph of someone
who exists. A generated face on that page states that a person who does not
exist runs this studio.

So: **this prompt is a layout and lighting brief for the real photographer, and
a last resort otherwise.** If the founder can be photographed, photograph her or
him and use the prompt only as the shot list. If a generated image ships to
staging, `founderIsPlaceholder` in `src/lib/site.ts` stays `true` and the note
keeps saying so — and it does not go to production either way.

Use case: photorealistic-natural
Asset type: portrait, 4:5, sits in the left column of the founder's note and is
cropped to 3:2 landscape below 900px — so keep the subject centred vertically
with headroom to lose at the top and bottom

Scene: The founder of a UAE home staging studio, photographed at work in a
styled Dubai living room rather than against a studio backdrop. Mid-shot, waist
up, standing or perched on the arm of a linen sofa, turned about fifteen degrees
away from the camera and looking into it. Relaxed, unposed, the expression of
someone interrupted mid-conversation — not a broad smile, not a folded-arms
corporate portrait. Dressed simply and neutrally: linen or fine knit in
off-white, stone or a muted olive, no pattern, no visible branding, minimal
jewellery.

Setting: the room behind is the studio's own work and must read that way —
travertine or pale limestone floor, plaster wall, a low walnut or oak piece, one
linen chair, a single ceramic vessel. Throw the background about one and a half
stops out of focus so it reads as a real room without competing with the face.

Composition: 50mm or 85mm at eye level 1.5 m, straight verticals, shallow but
believable depth of field (roughly f/2.8 — the eyes sharp, the ears already
softening, the room soft). Subject occupying the middle half of the frame with
clear space above the head; nothing that matters in the top or bottom sixth.

Light: one dominant soft source from frame left — daylight through a sheer — with
a gentle fall-off to the right side of the face and a faint bounce from the
floor. Catchlight in both eyes, one direction only. Neutral white balance, the
same slightly cool UAE daylight as the rest of the site. No second light, no rim
light, no reflector glow under the chin.

Details: skin texture kept — pores, a line at the corner of the eye, a strand of
hair out of place. Linen creased where an arm has rested. Hands, if in frame,
relaxed and doing something ordinary: holding a fabric sample, resting on the
back of a chair.

Avoid: [house rules exclude list] — except that a person is the subject here, so
"people" is lifted from that list and everything else on it still applies. Plus,
specifically: retouched-to-plastic skin, teeth whitened beyond natural, symmetric
"AI face", overlarge or glassy eyes, hair that dissolves into the background,
malformed or extra fingers, jewellery that merges into skin, a second person
half-visible, any office or conference-room setting, a headshot backdrop, a
laptop, business attire, a hard-sell smile.

**Structural check before accepting an image:** count the fingers; follow the
hairline all the way round; check both earrings match; check the catchlights in
the two eyes come from the same direction. Then do the straight-line check from
the house rules on the room behind. A portrait fails on hands and ears far more
often than on the face.

**Before this reaches the about page:**

1. Optimise it in: `node scripts/prepare-images.mjs ~/Downloads/founder.png:founder-portrait.webp`
2. Set `founderIsPlaceholder` to `false` in `src/lib/site.ts` — that swaps the
   empty frame for the photograph and drops the placeholder note.
3. Fill in `founder.name`; the signature falls back to "The founder, Havenly
   Halo" while it is empty, so it reads correctly either way.
4. Have the person signing the note read the note. It is written in their voice
   and they have not seen it.

---

## Typography

Text is never baked into an image. All type is rendered in HTML in Assistant
(headings) and the system sans-serif (body). If a generated image contains any
legible lettering, regenerate it.
