# Styling concepts: image prompts

Photographs for the eight concept pages under `/spaces/`: garden villa, city
residence, quiet retreat, family townhouse, skyline penthouse, majlis,
entrance and shaded terrace.

Each page is built from four image bands. The first one already works with
the photographs the site has. The other three fill in as their files arrive.

| Band | Files | Shape | What happens while it's missing |
| --- | --- | --- | --- |
| **Three decisions**: the room with three numbered marks | The page's existing hero | 16:9 | Already live. Nothing to make. |
| **Up close**: three portrait close-ups | `space-<page>-close-<slug>.webp` (24) | 4:5 | Hidden until all three for a page exist. |
| **The palette**: square material macros | `swatch-<material>.webp` (9 new, 4 existing) | 1:1 | Shown when at least three of a page's four exist. |
| **Full-bleed statement**: a second angle of the room | `space-<page>-wide.webp` (8) | 16:9 | Uses an existing photograph from elsewhere on the site. |

Make them in this order:

1. **Swatches first.** There are only nine, they're shared by all eight
   pages, and a macro of rope or walnut is the hardest image for a generator
   to get wrong. Adding `jute` and `walnut` alone switches the palette on for
   four more pages.
2. **Close-ups next, one page at a time.** The band only appears once a page
   has all three, so finish one page before starting the next.
3. **Wide angles last.** Every page already has a stand-in for these.

The house rules in [`image-prompts.md`](image-prompts.md#house-rules-for-every-prompt)
apply to every prompt here. This file adds the rules for concept rooms.

---

## 1. Don't repeat the look the site already has

Put the eight existing concept photographs side by side and they look like
one generator's default idea of "Dubai luxury": beige on beige, a potted olive
tree, a palm in the window, a jute rug, a bouclé chair and warm gold-hour
light. They're usable as heroes. But a new set made in the same style makes
the whole site look generated. **The new images must not follow the existing
colours or the existing AI patterns.**

**Banned in every prompt here unless it is already in that room's hero:**

> potted olive tree, palm trees framing a window, pampas grass, dried
> bunny-tail stems, a bowl of lemons, a single branch in a glass vase, beige
> on beige on beige, a jute rug by default, gold-hour glow on every surface,
> a "wabi-sabi" vase on every flat surface, a stack of two coffee-table books
> with a small bowl on top, symmetrical cushion rows.

**Give each concept its own light.** No two pages share a time of day. The
light column below sets it for every image on that page:

| Page | Light | Grade |
| --- | --- | --- |
| Garden villa | 10:00, hard direct sun through glass, crisp shadows | Neutral-cool, bright whites |
| City residence | Blue hour, tungsten lamps inside, city light outside | Cool exterior, warm interior, no orange cast on skin-tone surfaces |
| Quiet retreat | 07:30, low sun filtered through sheers | Soft, slightly cool, low contrast |
| Family townhouse | Noon, bright overcast (a hazy summer day) | Flat and honest, the look of a real-estate photograph |
| Skyline penthouse | 17:30, sun behind the towers, glass reflections under control | Neutral, with the exposure set for the view |
| Majlis | Late afternoon, sun blocked by a mashrabiya or deep reveal | Warm but not amber, deep shadow in the corners |
| Entrance | Mixed: daylight from the far end, one lamp near the door | Neutral |
| Shaded terrace | 16:00, hard sun on the parapet, deep shade under the pergola | High contrast, with shadow detail kept |

### Find real references before writing a prompt

Before generating a page's images, run the **reference searches** listed for
it on Google Images (and Pinterest, if you want more). Save four or five real
photographs of real homes, taken by real photographers. They answer questions
a prompt can't: how deep a Dubai window reveal really is, what an Emaar
townhouse kitchen looks like, how a real majlis cushion sags.

Use the references for **layout, light and material behaviour**, not for
colour. Don't upload a reference photograph into the generator as an image
prompt. That copies someone else's work and brings its grade with it. Write
down what you saw instead:

- "the reveal is 30 cm deep"
- "the sofa seat is 45 cm off the floor"
- "a ceiling AC grille runs along the window wall"

Then put those facts in the prompt.

Good sources to search within:

- Property-portal listing photos (Bayut, Property Finder) for real Dubai
  layouts, floors and ceilings
- AD Middle East and Dezeen for the regional architecture
- Kinfolk and Openhouse for how real, lived-in rooms are photographed

**Where you can, use the existing hero as an image reference.** The
close-ups and the wide angle show the **same room** as the page's hero, so the
materials have to match it. The sofa can't change from linen to leather
between two photographs. Most generators take a reference image: use the
hero at low strength so it carries the furniture and materials. The new
light comes from the prompt.

### AI tells specific to concept rooms

| Tell | What a real photograph shows | In the prompt |
| --- | --- | --- |
| Perfect upholstery | Seat cushions compressed where people sit, a crease line on a cushion | "seat cushion compressed on the left, as if sat on" |
| Every surface styled | Most surfaces bare, and one object where there is one | "the counter is bare apart from…" |
| Macro textures that look like noise | A clear, repeating weave, with fibres that end | "individual fibres visible, the weave repeating regularly" |
| Floating contact shadows | A thin dark line where a leg meets the floor | "legs cast a tight contact shadow" |
| Garbled Arabic on dallahs, books or art | No lettering at all | "no lettering, no calligraphy" |
| Warped windows and mullions | Straight verticals | Run the structural check (below) before accepting |

**Before accepting any image:**

1. **Straight lines.** Check the window mullions, the skirting, table edges
   and the pergola beams. If one bends, doubles or fades out, regenerate.
   Don't retouch.
2. **Contact points.** Each leg and object should touch its surface and cast
   a shadow.
3. **Macros.** Zoom to 100%. The fibres should end and the grain should run
   one way. Reject smeared or looping texture.
4. **Text.** There should be none anywhere. Reject any image with lettering.
5. **Match the hero.** Hold it next to the page's hero. Check the material,
   the colour of the wood and the upholstery are the same pieces.

---

## 2. Generation settings

- **Model:** a photographic model with the realism setting on. Don't use
  "aesthetic", "cinematic" or "editorial" style presets, and don't use an
  upscaler that adds sharpening.
- **No people, hands or pets.**
- Generate **three or four candidates** per prompt. Keep the one that passes
  the checks above.

| Set | Generate | How it's shown | Prepare as |
| --- | --- | --- | --- |
| Close-ups | 4:5, ≥ 1200 px wide | Three portraits in a row. On phones they are cropped to 16:10, so keep the subject in the **middle 60%** of the height. | `card` |
| Swatches | 1:1, ≥ 1200 px | Squares from 150 to 300 px wide. Fill the whole frame with the material: no edges, no props. | `card` |
| Wide angles | 16:9, ≥ 1920 px wide | A full-bleed band with a line of white type on the **left third**. Keep that third calm and mid-toned. | `full` |

---

## 3. Swatch library: `swatch-<material>.webp`

Already live: `swatch-linen`, `swatch-oak`, `swatch-travertine`,
`swatch-boucle`. Match their framing. The swatch should fill the whole frame,
shot straight down (or at a slight angle for pile), in soft side light from
the left.

**Shared prompt frame.** Use it for every swatch and fill in the material:

> Use case: photorealistic-natural. Asset type: square material macro, 1:1.
> Subject: {material}, filling the whole frame edge to edge. Camera: 100mm
> macro, 25 cm from the surface, the surface plane square to the lens,
> natural depth of field with slight fall-off at one corner. Light: one soft
> window light from frame left at a low angle, so the texture throws small
> shadows. Neutral white balance.
> Avoid: [house rules], props, edges of the object, visible background,
> seamless repeating pattern, over-sharpened texture, glossy sheen, colour
> cast.

| File | Material, as written into `{material}` | Used on | Reference search |
| --- | --- | --- | --- |
| `swatch-jute.webp` | hand-loomed natural jute rug, chunky basket weave, a few stray fibres standing up, one slightly darker yarn | Garden villa, townhouse, majlis | `jute rug macro texture close up` |
| `swatch-walnut.webp` | oiled American black walnut board, straight grain with one gentle cathedral figure, a faint pale sapwood streak along one edge, matte oil finish | Garden villa, city residence | `oiled walnut wood grain close up` |
| `swatch-wool.webp` | dense undyed grey wool rug pile, slightly flattened in one direction, a few fibres lying across | City residence, quiet retreat, penthouse | `wool rug pile macro` |
| `swatch-bronze.webp` | brushed bronze plate with a soft uneven brown patina and fine directional brushing marks, one faint fingerprint | City residence | `brushed bronze patina texture` |
| `swatch-rattan.webp` | natural woven rattan cane webbing, open hexagonal weave, slight colour variation between strands, one strand frayed | Townhouse | `rattan cane webbing close up` |
| `swatch-plaster.webp` | hand-trowelled lime plaster wall in warm off-white, soft cloudy tonal variation and faint trowel arcs, matte | Majlis, entrance | `lime plaster wall texture tadelakt matte` |
| `swatch-teak.webp` | weathered outdoor teak slat, silver-grey surface with honey colour showing where it has worn, open grain, one small check (crack) | Terrace | `weathered teak outdoor furniture close up` |
| `swatch-rope.webp` | woven outdoor furniture rope, 6 mm flat braid in warm grey, woven over-under, a light film of fine sand in the gaps | Terrace | `outdoor rope weave furniture detail` |
| `swatch-cast-stone.webp` | cast stone surface in pale warm grey, small air pockets, fine aggregate visible, soft sanded finish | Terrace | `cast stone concrete texture close up` |

---

## 4. Close-ups and wide angles, page by page

Each page lists its reference searches, then the prompts in the order the
page shows them. The `slug` in each file name has to match the `slug` in that
page's `closeUps` list in `src/app/spaces/<page>/page.tsx` exactly.

Each prompt ends with the Avoid line from the house rules, plus the banned
list from section 1.

### Garden villa: `space-garden-villa-*`

Hero: `villa.webp`. Light: 10:00, hard sun through the glass.
**Reference searches:** `Dubai Hills villa living room photography`,
`Emirates Hills villa interior glass doors garden`,
`honed travertine coffee table unfilled`.

**`space-garden-villa-close-linen.webp`: "Linen, left creased"**
Scene: the seat cushion and one back cushion of the hero's washed white linen
sofa. The seat is compressed on the left, as if someone has just stood up.
The linen has soft creases and a slightly irregular slub. Camera: 50mm,
40 cm away, looking down at 30°. Light: a hard sun stripe from the glass
crosses the cushion diagonally, and the rest is in open shade.

**`space-garden-villa-close-travertine.webp`: "A table you can lean on"**
Scene: the edge and top of the hero's oval honed travertine coffee table,
with its **unfilled pores** clearly visible and a slight change of tone
across the stone. On the table there is one hand-thrown stoneware bowl, off
centre and empty. Camera: 50mm at table height, the edge running
diagonally. Light: direct morning sun, with a crisp bowl shadow falling to
the right.

**`space-garden-villa-close-threshold.webp`: "One floor, inside and out"**
Scene: the floor at the sliding glass door. Pale stone runs level from the
room, over a flush aluminium track, and out onto the terrace. Out of focus
beyond: a lawn and a low rendered garden wall, **no palms**. Camera: 35mm at
knee height (60 cm), looking out. Light: a bright exterior with the interior
a stop darker, and sun across the track.

**`space-garden-villa-wide.webp`: second angle**
Scene: the same living room seen from the garden side, looking back into
the house. The sofa's back is to the camera, with the two walnut lounge
chairs and the kitchen visible deep in the plan. The left third of the frame
is a plain rendered wall in shade, where the band's type sits. Camera: 28mm,
1.4 m, straight verticals. Light: 10:00 sun raking across the floor.

### City residence: `space-city-residence-*`

Hero: `dining-dubai-luxury-landscape.webp`. Light: blue hour, lamps on.
**Reference searches:** `Downtown Dubai apartment dining room night`,
`oval walnut dining table rounded edge detail`,
`fluted sideboard styling minimal`.

**`space-city-residence-close-table-edge.webp`: "An edge that takes a hand"**
Scene: the rounded end of the hero's oval walnut table. The oiled grain runs
around the curve, and there is **one faint water ring** on the surface.
Camera: 50mm at table height. Light: warm light from the wall sconce, frame
left, and a cool blue fill from the window, frame right.

**`space-city-residence-close-chair.webp`: "Chairs you stay in"**
Scene: the back and seat of one upholstered dining chair in a grey woven
cloth, pulled 20 cm out from the table and slightly angled. The seat shows
light compression. Camera: 50mm at 1 m. Light: the tungsten sconce, with a
deep shadow under the table.

**`space-city-residence-close-sideboard.webp`: "The sideboard, nearly bare"**
Scene: the top of the dark fluted sideboard. It holds one matte black
stoneware bowl and one small lidded box, and **nothing else**. The fluting on
the front catches light on each ridge. Camera: 35mm, 1.2 m, square to the
front. Light: the brass sconce directly above, throwing a cone of light down
the wall.

**`space-city-residence-wide.webp`: second angle**
Scene: the dining room from the window side, looking back into the
apartment. The table sits mid-frame, with a warm living room beyond and the
sconce and sideboard at frame right. The left third is a dark curtain in
shadow. Camera: 28mm, 1.4 m. Light: blue hour, lamps on, with the glass
reflections controlled.

### Quiet retreat: `space-quiet-retreat-*`

Hero: `bedroom.webp`. Light: 07:30 through the sheers.
**Reference searches:** `stonewashed linen bedding unmade bed photography`,
`Jumeirah villa master bedroom morning light`,
`bench at foot of bed styling`.

**`space-quiet-retreat-close-bedding.webp`: "Linen, slept in"**
Scene: a corner of the bed. Stonewashed white linen sheets, rumpled and
**not ironed**, with an oatmeal knitted throw folded back loosely and one
pillow dented. Camera: 50mm, 50 cm, looking down at 40°. Light: low, soft
sun through the sheer curtains, grazing the creases.

**`space-quiet-retreat-close-lamp.webp`: "A lamp at pillow height"**
Scene: a brass dome lamp, lit, on a dark timber nightstand. Beside it are two
paperbacks with **plain cloth spines, no titles**, and a glass of water with
a real meniscus. Camera: 50mm at nightstand height. Light: the lamp's warm
pool plus pale morning daylight from the right.

**`space-quiet-retreat-close-bench.webp`: "The end of the bed"**
Scene: an upholstered bench at the foot of the bed, one folded wool blanket
on it, slightly askew. The duvet overhangs behind, and a stripe of sun lies
across the floor. Camera: 35mm, 1.2 m, low angle. Light: a morning sun
stripe on the floor.

**`space-quiet-retreat-wide.webp`: second angle**
Scene: the bedroom from beside the bed, looking towards the window wall. The
sheers are half drawn, the bouclé armchair sits in the corner and the view
beyond is soft. The left third is the plain plaster wall in shade. Camera:
28mm, 1.4 m. Light: 07:30, cool and soft.

### Family townhouse: `space-townhouse-family-*`

Hero: `space-townhouse.webp`. Light: noon, bright haze. It should look like
a real family home, not a showroom.
**Reference searches:** `Town Square Dubai townhouse interior`,
`Arabian Ranches townhouse open plan living dining kitchen`,
`rush seat counter stool kitchen island`.

**`space-townhouse-family-close-rug.webp`: "A rug that forgives"**
Scene: a flat-woven natural jute rug under one leg of an oak coffee table.
On the rug: a few crumbs, one small toy car and the edge of a folded blanket.
Camera: 35mm, 80 cm, looking down at 45°. Light: flat bright daylight from
the garden doors.

**`space-townhouse-family-close-stools.webp`: "Rush seats at the counter"**
Scene: two timber counter stools with woven rush seats at a white quartz
island. One is pushed in and one is turned out. On the counter: a child's
water bottle and a folded tea towel. Camera: 35mm, 1.1 m. Light: noon haze
from the right.

**`space-townhouse-family-close-pendant.webp`: "A pendant, not a chandelier"**
Scene: a woven rattan dome pendant hanging low over a timber dining table,
seen from a seated angle. Its weave is visible against a plain ceiling with
a **linear AC grille**. Camera: 35mm, 1.1 m, looking up at 20°. Light:
daylight, with the pendant switched off.

**`space-townhouse-family-wide.webp`: second angle**
Scene: the ground floor from the garden doors looking back towards the
entrance, with the lounge, dining and kitchen all readable. A school bag
leans against the island, and the stair is visible. The left third is the
corner sofa's back and a plain wall. Camera: 24mm, 1.4 m, straight
verticals. Light: noon, bright overcast.

### Skyline penthouse: `space-skyline-penthouse-*`

Hero: `space-penthouse.webp`. Light: 17:30, with the exposure set for the
view.
**Reference searches:** `Burj Khalifa view penthouse interior photography`,
`DIFC penthouse living room low furniture`,
`how to photograph interior with window view exposure`.

**`space-skyline-penthouse-close-table.webp`: "Turned oak"**
Scene: the top of the low round oak table, the grain in raking light. On it:
one grey stoneware bowl and two books with plain spines. **No reflections of
the skyline** in the matte surface. Camera: 50mm, 60 cm, looking down at
35°. Light: low sun from the glass, frame right.

**`space-skyline-penthouse-close-chair.webp`: "One chair to the glass"**
Scene: a cream bouclé armchair angled towards the window, with a dark olive
cushion on the seat and a dent in it. The towers beyond are soft but
readable. Camera: 35mm, 1.2 m, behind and beside the chair. Light: the sun
behind the towers, and the interior exposed so the chair holds detail.

**`space-skyline-penthouse-close-curtain.webp`: "Stacked back"**
Scene: heavy natural linen curtains, stacked narrow against the edge of a
tall black-framed window, pinch-pleat heading visible and the hem just
kissing the floor. Camera: 50mm, 1.3 m. Light: side light through the
glass, picking out the folds.

**`space-skyline-penthouse-wide.webp`: second angle**
Scene: the living room from deep inside the apartment. The sofa is
silhouetted low against the full height of the glass, and the skyline fills
the right two thirds at 17:30. The left third is a wall in shadow with one
floor lamp lit. Camera: 24mm, 1.4 m, straight verticals. Light: dusk, with
the lamps on and the window exposed correctly.

### Majlis: `space-majlis-welcome-*`

Hero: `space-majlis.webp`. Light: late afternoon, through a deep reveal.
**Reference searches:** `modern majlis design UAE villa`,
`contemporary Emirati majlis interior photography`,
`dallah finjan serving tray majlis`.

**`space-majlis-welcome-close-cushions.webp`: "Cushions, not a showroom row"**
Scene: back cushions along the low majlis seating, in mixed natural weaves:
linen, a nubby wool and one tightly woven cotton. **One cushion leans off
line**, and the seat is compressed in two places. Camera: 50mm at seat
height, looking along the row. Light: warm raking afternoon light from the
left, with the far end in shadow.

**`space-majlis-welcome-close-serving.webp`: "Serving, within reach"**
Scene: a traditional brass **dallah** and three small white **finjan** cups
on a round timber tray, on a low table beside the seating. The brass is
softly worn, **with no lettering or engraving that reads as text**. There are
a few dates in a small ceramic dish. Camera: 50mm, 70 cm, looking down at
35°. Light: afternoon sun catching the brass.

**`space-majlis-welcome-close-pouf.webp`: "One loose seat"**
Scene: a round bouclé pouf with a knitted throw draped over it, on
overlapping woven rugs in front of the seating. The rug edges overlap
visibly. Camera: 35mm, 1 m. Light: soft afternoon light.

**`space-majlis-welcome-wide.webp`: second angle**
Scene: the majlis from one end of the seating, looking along it. The seating
runs around three walls, with low tables spaced along its length and a
hand-trowelled plaster wall. The left third is the plain plaster wall in
shade. **No television, no calligraphy, no chandelier.** Camera: 24mm at
1.2 m (seated eye height). Light: late afternoon, with deep shadow in the
corners.

### Entrance: `space-first-impression-entrance-*`

Hero: `space-entrance.webp`. Light: daylight from the far end, one lamp near
the door.
**Reference searches:** `villa entrance hall console mirror styling Dubai`,
`narrow hallway console depth 30cm`, `jute runner stone floor hallway`.

**`space-first-impression-entrance-close-keys.webp`: "A place for the keys"**
Scene: the end of the oak console with a folded natural linen cloth on it.
On the cloth: a car key fob and a house key on a plain leather tab, **with no
visible logo**. Camera: 50mm, 60 cm, looking down at 45°. Light: daylight
from the far end, frame right.

**`space-first-impression-entrance-close-vessel.webp`: "One object"**
Scene: a single textured stoneware vessel with a pierced handle and a shallow
stone bowl beside it on the console, against a lime-plaster wall. The bottom
of the round mirror's frame is just visible at the top edge. Camera: 50mm,
90 cm, at console height. Light: soft daylight from the side.

**`space-first-impression-entrance-close-runner.webp`: "A runner that points the way"**
Scene: a jute runner laid down the centre of a pale honed-stone hall floor.
Its edge is not perfectly parallel to the skirting. The corridor leads to
glass doors and daylight. Camera: 35mm at knee height, looking down the
hall. Light: bright at the far end and falling off towards the camera.

**`space-first-impression-entrance-wide.webp`: second angle**
Scene: the hall seen from the far end, looking back towards the front door:
the bench on the left, the console and mirror on the right, and the door
slightly open. The left third is the plain wall above the bench. Camera:
24mm, 1.4 m. Light: daylight behind the camera and one lamp lit by the door.

### Shaded terrace: `space-shaded-terrace-*`

Hero: `space-terrace.webp`. Light: 16:00, hard sun beyond deep shade.
**Reference searches:** `Dubai villa terrace pergola shade outdoor lounge`,
`teak rope outdoor chair detail weathered`,
`cast stone side table outdoor`.

**`space-shaded-terrace-close-rope.webp`: "Rope that dries"**
Scene: the woven outdoor-rope back and weathered teak arm of one lounge
chair. There's a **light film of fine sand** on the teak and one strand of
rope slightly loose. Camera: 50mm, 50 cm. Light: shade, with a hard sun
stripe from a gap in the pergola.

**`space-shaded-terrace-close-table.webp`: "A table that stays put"**
Scene: a low cast-stone side table with two small ceramic cups on it, one of
them half full of mint tea. The pergola's slat shadows fall across the
table top. Camera: 50mm, 70 cm, looking down at 35°. Light: 16:00, with
striped slat shadows.

**`space-shaded-terrace-close-planter.webp`: "One planter, not ten"**
Scene: a large, rough stone planter with a young **gnarled** olive, a little
soil spilled on the paving and a drip-irrigation line coming out of the soil.
It stands against a sunlit rendered wall. Camera: 35mm, 1.2 m, low. Light:
hard afternoon sun on the wall and the planter half in shade.

**`space-shaded-terrace-wide.webp`: second angle**
Scene: the terrace seen from the garden, looking back at the house. The
pergola throws a deep rectangle of shade over the two chairs, and the
glazing behind reflects the garden. The left third is a sunlit rendered
parapet with no detail. **No skyline this time.** Camera: 24mm, 1.4 m,
straight verticals. Light: 16:00, high contrast, with shadow detail kept.

---

## 5. Applying the images

1. **Download** each keeper as a PNG. Don't use a screenshot, and don't use
   a generator's own "web" export, because those often carry metadata of
   their own.

2. **Prepare.** This one step strips the AI metadata (EXIF, XMP and the C2PA
   provenance block), re-encodes the file as WebP and caps its size:

   ```sh
   # swatches and close-ups: card (1440 px, ≤ 140 KB)
   node scripts/prepare-images.mjs \
     ~/Downloads/jute.png:swatch-jute.webp \
     ~/Downloads/walnut.png:swatch-walnut.webp \
     ~/Downloads/gv-linen.png:space-garden-villa-close-linen.webp \
     ~/Downloads/gv-travertine.png:space-garden-villa-close-travertine.webp \
     ~/Downloads/gv-threshold.png:space-garden-villa-close-threshold.webp

   # wide angles: full (1920 px, ≤ 240 KB)
   node scripts/prepare-images.mjs ~/Downloads/gv-wide.png:space-garden-villa-wide.webp:full
   ```

   Every line should end in `metadata clean`. If one says
   `METADATA PRESENT`, don't use that file. To double-check:

   ```sh
   exiftool public/images/space-*.webp public/images/swatch-*.webp \
     | grep -iE "c2pa|xmp|software|creator|ai"
   ```

   This should print nothing.

3. **Build the mobile sizes:**

   ```sh
   npm run assets:images
   ```

   This writes the 320, 480, 768 and 1200 px versions and records them in
   `src/lib/image-manifest.json`. `<Img>` builds each `srcset` from that
   file, so a phone downloads the 480 px close-up, not the 1440 px one. The
   full-bleed band picks its 768 or 1200 px version by viewport width.

4. **Nothing to edit.** The bands check the manifest, so each one appears or
   switches over as soon as its files have been through step 3:
   - a page's close-ups appear once all three are in
   - a palette appears once three of its four swatches are in
   - a wide angle replaces its stand-in straight away

5. **Check and commit:**

   ```sh
   npm run build && npm start   # open /spaces/<page>/
   ```

   Check on a phone-width window that each close-up still shows its subject
   in the 16:10 crop, and that the band's white type is readable over the
   left third of each wide angle. Commit each `.webp`, its
   `-320/-480/-768/-1200` versions and `image-manifest.json` together.
