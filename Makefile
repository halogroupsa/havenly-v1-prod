# Havenly — task entry point. Wraps the npm scripts; `npm run ...` still works.

NPM  ?= npm
PORT ?= 3000

SOURCES := next.config.mjs tsconfig.json package.json wrangler.jsonc \
           $(shell find src public scripts -type f 2>/dev/null)

.DEFAULT_GOAL := help
.PHONY: help install dev build typecheck check start preview cf-preview deploy images env env-check clean distclean \
        sync-to-prod sync-from-prod sync-to-prod-dry sync-from-prod-dry sync-prod-status sync-to-peer sync-from-peer

help: ## List the available targets
	@grep -hE '^[a-z][a-z-]*:.*?## ' $(MAKEFILE_LIST) \
		| awk -F':.*?## ' '{printf "  make %-20s %s\n", $$1, $$2}'

install: node_modules ## Install dependencies from the lockfile

node_modules: package-lock.json package.json
	$(NPM) ci
	@touch node_modules

dev: node_modules ## Run the development server
	$(NPM) run dev

build: node_modules env-check ## Export the static site to out/
	$(NPM) run build

out: $(SOURCES) node_modules
	$(NPM) run build

images: node_modules ## Rebuild the responsive derivatives in public/images/
	$(NPM) run assets:images

typecheck: node_modules ## Type-check without emitting
	$(NPM) run typecheck

check: typecheck build ## Type-check, then build

start: out ## Serve out/ locally (make start PORT=3001)
	PORT=$(PORT) $(NPM) start

preview: build ## Rebuild, then serve out/ locally
	PORT=$(PORT) $(NPM) start

cf-preview: out ## Serve out/ through the Cloudflare asset worker locally
	$(NPM) run preview:cf

deploy: check ## Type-check, build, then deploy to Cloudflare Workers
	npx wrangler deploy

env: ## Create .env.local from .env.example if it does not exist
	@if [ -f .env.local ]; then \
		echo ".env.local exists; leaving it untouched."; \
	else \
		cp .env.example .env.local; \
		echo "Created .env.local — set NEXT_PUBLIC_CONTACT_EMAIL and NEXT_PUBLIC_SITE_URL, then rebuild."; \
	fi

env-check:
	@[ -f .env.local ] || echo "Note: no .env.local — contact email and canonical URL are unset (make env). The enquiry form falls back to a copyable brief."

clean: ## Remove build output
	rm -rf .next out .wrangler tsconfig.tsbuildinfo

distclean: clean ## Remove build output and node_modules
	rm -rf node_modules

# ==============================================================================
# SYNC STAGING <-> PROD
# ==============================================================================
#
# This checkout is staging. PROD_DIR is havenly-v1-prod: the same "havenly-halo"
# package, with its own git remote (halogroupsa/havenly-v1-prod, separate from
# this checkout's Admin-DesignsFrontier/havenly-halo-df).
#
# These targets MIRROR: a file deleted here is deleted there too, so prod does
# not accumulate stale routes and images. Every target dry-runs first and lists
# the deletions before asking to proceed.
#
# Never synced in either direction — each checkout owns its own copy:
#
#   wrangler.jsonc   the Worker name. Staging deploys havenly-halo, prod
#                    deploys havenly-v1-prod; copying one over the other would
#                    retarget the deploy.
#   .env, .env.local NEXT_PUBLIC_SITE_URL is the indexing switch (see
#                    src/lib/site.ts): only a build that was told it serves
#                    https://havenly.ae drops the noindex. GTM and Google Ads
#                    IDs belong to the prod build for the same reason.
#   .git             the two checkouts track different remotes.
#
# plus build artefacts and local-only state (.next, out, node_modules,
# .wrangler, .venv-keywords, keywords_planner, tsbuildinfo). .env.example is a
# template rather than a setting, so it does sync.
#
# So havenly-v1-prod needs its own wrangler.jsonc and .env.local — the sync will
# not create them, and `make sync-prod-status` reports whether they are in
# place.
#
# This Makefile is itself synced, so the prod checkout gets these same targets.
# There, PROD_DIR resolves to prod's own directory and the sync targets refuse
# to run (same source and destination). To push a hotfix back from prod, use the
# peer targets from either side:
#
#   make sync-from-peer PEER_DIR=/path/to/havenly-v1-prod     (run in staging)
#   make sync-to-peer   PEER_DIR=/path/to/havenly-halo-staging (run in prod)
#
# The copy/prune split, and why this is not a plain `rsync -a --delete`, is
# explained at the top of scripts/sync-tree.sh: macOS ships openrsync, which
# deletes --excluded paths in the destination (it would wipe prod's .git,
# wrangler.jsonc and .env.local) and which ignores --exclude entirely once any
# --filter is present.

THIS_DIR := $(patsubst %/,%,$(dir $(abspath $(lastword $(MAKEFILE_LIST)))))
SYNC := $(THIS_DIR)/scripts/sync-tree.sh

PROD_DIR ?= /Volumes/MacLexarSsd/Lexar_Documents/DesignsFrontier/halo_ae/havenly-v1-prod
PEER_DIR ?=

# Dry-run, show the copy and delete lists, then apply only on an explicit yes.
define sync_confirm
	@$(SYNC) "$(1)" "$(2)"
	@echo ""
	@read -p "Apply these changes? [y/N]: " confirm; \
	if [ "$$confirm" = "y" ] || [ "$$confirm" = "Y" ]; then \
		$(SYNC) "$(1)" "$(2)" --apply; \
	else \
		echo "Cancelled"; \
	fi
endef

# Refuse to run the peer targets unless PEER_DIR was passed.
define require_peer
	@if [ -z "$(PEER_DIR)" ]; then \
		echo "❌ PEER_DIR is not set. Pass it explicitly:"; \
		echo "   make $@ PEER_DIR=/path/to/counterpart"; \
		echo "   (for havenly-v1-prod use make sync-to-prod / sync-from-prod)"; \
		exit 1; \
	fi
endef

sync-to-prod-dry: ## Preview staging -> prod, changing nothing
	@$(SYNC) "$(THIS_DIR)" "$(PROD_DIR)"

sync-from-prod-dry: ## Preview prod -> staging, changing nothing
	@$(SYNC) "$(PROD_DIR)" "$(THIS_DIR)"

sync-to-prod: ## Mirror staging -> prod (dry-run, then confirm)
	$(call sync_confirm,$(THIS_DIR),$(PROD_DIR))

sync-from-prod: ## Mirror prod -> staging (dry-run, then confirm)
	$(call sync_confirm,$(PROD_DIR),$(THIS_DIR))

sync-prod-status: ## Show prod's deploy config, git state, and what differs
	@echo "PROD_DIR: $(PROD_DIR)"
	@if [ ! -d "$(PROD_DIR)" ]; then echo "  ❌ does not exist"; exit 1; fi
	@for f in wrangler.jsonc .env.local; do \
		if [ -f "$(PROD_DIR)/$$f" ]; then \
			echo "  ✅ $$f present (not synced — prod owns it)"; \
		else \
			echo "  ⚠️  $$f MISSING — prod cannot build/deploy correctly until you create it"; \
		fi; \
	done
	@if git -C "$(PROD_DIR)" rev-parse --verify HEAD >/dev/null 2>&1; then \
		echo "  git: $$(git -C "$(PROD_DIR)" rev-parse --abbrev-ref HEAD), $$(git -C "$(PROD_DIR)" rev-list --count HEAD) commit(s)"; \
	else \
		echo "  git: $$(git -C "$(PROD_DIR)" branch --show-current) — no commits yet"; \
	fi
	@git -C "$(PROD_DIR)" remote get-url origin 2>/dev/null | sed 's/^/  remote: /' || true
	@echo ""
	@$(SYNC) "$(THIS_DIR)" "$(PROD_DIR)"

sync-to-peer: ## Mirror staging -> any checkout (make sync-to-peer PEER_DIR=/path)
	$(require_peer)
	$(call sync_confirm,$(THIS_DIR),$(PEER_DIR))

sync-from-peer: ## Mirror any checkout -> staging (make sync-from-peer PEER_DIR=/path)
	$(require_peer)
	$(call sync_confirm,$(PEER_DIR),$(THIS_DIR))
