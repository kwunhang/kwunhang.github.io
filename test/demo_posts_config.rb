# Test-only override: exercise retained demo posts without publishing them.
require "yaml"

config = YAML.load_file("_config.yml")
fixtures = %w[
  _posts/2015-10-20-disqus-comments.md
  _posts/2018-12-22-distill.md
  _posts/2022-10-15-rtl.md
  _posts/2022-12-10-giscus-comments.md
  _posts/2025-04-28-marimo.md
]
fixtures.each { |path| abort "Missing integration fixture: #{path}" unless File.file?(path) }
excluded = config.fetch("exclude").reject { |path| path.delete_suffix("/") == "_posts" }
# Avoid unrelated demos that fetch Twitter embeds or convert notebooks.
excluded.concat(Dir.glob("_posts/**/*").select { |path| File.file?(path) } - fixtures)
puts({
  "exclude" => excluded,
  "external_sources" => [],
  "imagemagick" => { "enabled" => false }
}.to_yaml)
