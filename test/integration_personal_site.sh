#!/usr/bin/env bash
set -euo pipefail

tmp_dir="$(mktemp -d)"
cleanup() {
  rm -rf "${tmp_dir}"
}
trap cleanup EXIT

# Use the real production config: fixture overrides must never leak into deploys.
JEKYLL_ENV=production bundle exec jekyll build -d "${tmp_dir}/site" >/dev/null
bundle exec ruby test/assert_personal_site.rb "${tmp_dir}/site"
