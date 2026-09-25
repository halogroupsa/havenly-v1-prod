#!/usr/bin/env bash
#
# Mirror one checkout of this project onto another: the destination ends up
# matching the source tree exactly, apart from everything named in EXCLUDES,
# which is neither copied nor removed.
#
# Why this is not a one-line `rsync -a --delete`:
#
# macOS ships openrsync, not GNU rsync, and its --exclude and --filter rules do
# not compose the way GNU's do. Two behaviours matter here:
#
#   1. With --delete, openrsync removes destination paths that match --exclude.
#      GNU rsync protects them. So `rsync -a --delete --exclude=.env` deletes
#      the destination's .env.local — and its wrangler.jsonc with it. A
#      non-empty excluded directory survives only by accident, with a "not
#      empty, cannot delete" warning.
#   2. Adding any --filter (including the "protect" rules that would fix #1)
#      makes --exclude stop taking effect on the transfer, so the source's own
#      .env and wrangler.jsonc get copied over the destination's.
#
# Both were verified against /usr/bin/rsync (openrsync protocol 29). There is no
# flag combination that gets both halves right, so the mirror runs in two
# explicit phases instead: rsync copies (never with --delete), then this script
# prunes destination paths absent from the source, walking around the excluded
# names itself.
#
# Usage: sync-tree.sh <src> <dst> [--apply]
#   Without --apply, prints what would change and exits 0.

set -eu

# Matched against the basename of an entry at any depth, like rsync's own
# unanchored patterns. Everything here is either a build artefact, a local-only
# secret, or per-environment deploy config that each checkout owns itself.
#
# .env.example is deliberately absent: it is a template, not a setting, and both
# checkouts should carry the same one.
EXCLUDES="
node_modules
.next
out
.wrangler
.git
.turbo
.venv-keywords
keywords_planner
.DS_Store
*.tsbuildinfo
*.log
.env
.env.local
.env.*.local
.env.production
.env.development
.dev.vars
.dev.vars.*
wrangler.*
"

die() { printf '❌ %s\n' "$1" >&2; exit 1; }

[ $# -ge 2 ] || die "usage: sync-tree.sh <src> <dst> [--apply]"

SRC=$1
DST=$2
APPLY=${3:-}

[ -d "$SRC" ] || die "source is not a directory: $SRC"
[ -d "$DST" ] || die "destination is not a directory: $DST"

SRC=$(cd "$SRC" && pwd -P)
DST=$(cd "$DST" && pwd -P)

[ "$SRC" != "$DST" ] || die "source and destination are the same directory"
case "$DST/" in "$SRC"/*) die "destination is inside the source: $DST";; esac
case "$SRC/" in "$DST"/*) die "source is inside the destination: $SRC";; esac

# Guard against pointing a mirror at a directory that holds a different
# application: the sibling halo_ae directories are a mix of Next.js, Vite and
# Pages projects, and an unguarded mirror would replace one wholesale.
pkg_name() {
  [ -f "$1/package.json" ] || return 0
  sed -n 's/.*"name"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/p' "$1/package.json" | head -1
}
SRC_PKG=$(pkg_name "$SRC")
DST_PKG=$(pkg_name "$DST")
if [ -n "$DST_PKG" ] && [ "$SRC_PKG" != "$DST_PKG" ]; then
  die "destination is a different project: package.json name is \"$DST_PKG\", expected \"$SRC_PKG\"
   ($DST)
   Refusing to overwrite an unrelated application."
fi

# Build the rsync exclude flags and the find prune expression from one list.
set --
FIND_PRUNE=""
for pat in $EXCLUDES; do
  set -- "$@" "--exclude=$pat"
  if [ -z "$FIND_PRUNE" ]; then
    FIND_PRUNE="-name $pat"
  else
    FIND_PRUNE="$FIND_PRUNE -o -name $pat"
  fi
done

if [ "$APPLY" = "--apply" ]; then
  RSYNC_FLAGS="-a"
else
  RSYNC_FLAGS="-avn"
fi

printf '📦 Copy phase: %s → %s\n' "$SRC" "$DST"
rsync $RSYNC_FLAGS "$@" "$SRC/" "$DST/"

# Phase 2: destination paths with no counterpart in the source.
#
# find prints parents before children under LC_ALL=C sort, so once a directory
# is recorded as stale its contents are skipped — the whole directory goes at
# once rather than being listed file by file.
printf '\n🧹 Prune phase: paths in the destination with no counterpart in the source\n'

STALE=$(
  # shellcheck disable=SC2086 # FIND_PRUNE is a deliberately word-split expression
  find "$DST" -mindepth 1 \( $FIND_PRUNE \) -prune -o -print 2>/dev/null \
    | LC_ALL=C sort \
    | while IFS= read -r path; do
        rel=${path#"$DST"/}
        [ -n "$rel" ] || continue
        [ -e "$SRC/$rel" ] && continue
        printf '%s\n' "$rel"
      done \
    | awk '
        # Drop entries whose ancestor directory is already being removed.
        NR == 1 { print; prev = $0 "/"; next }
        index($0 "/", prev) == 1 { next }
        { print; prev = $0 "/" }
      '
)

if [ -z "$STALE" ]; then
  echo "   (nothing to prune)"
else
  COUNT=$(printf '%s\n' "$STALE" | wc -l | tr -d ' ')
  MAX=${SYNC_MAX_DELETE:-500}
  printf '%s\n' "$STALE" | sed 's/^/   delete /'
  printf '   %s path(s) to delete\n' "$COUNT"
  if [ "$COUNT" -gt "$MAX" ]; then
    die "refusing to delete $COUNT paths (limit $MAX).
   Re-run with SYNC_MAX_DELETE=$COUNT if that is really intended."
  fi
  if [ "$APPLY" = "--apply" ]; then
    printf '%s\n' "$STALE" | while IFS= read -r rel; do
      case "$rel" in ""|*..*) continue;; esac
      rm -rf "$DST/$rel"
    done
  fi
fi

if [ "$APPLY" = "--apply" ]; then
  printf '\n✅ Mirrored %s → %s\n' "$SRC" "$DST"
else
  printf '\n(dry run — nothing changed)\n'
fi
