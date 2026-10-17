require "yaml"
require "nokogiri"
require "bibtex"

site = ARGV.fetch(0)
config = YAML.load_file("_config.yml")
baseurl = config.fetch("baseurl", "").to_s
hidden = %w[blog projects cv teaching people books]

hidden.each do |route|
  abort "Unwanted route was published: #{route}" if File.exist?(File.join(site, route))
end
abort "404 page is missing" unless File.file?(File.join(site, "404.html"))

home = Nokogiri::HTML(File.read(File.join(site, "index.html")))
publications = Nokogiri::HTML(File.read(File.join(site, "publications/index.html")))
nav = home.css(".navbar-nav a.nav-link").map { |link| link["href"] }
expected_nav = ["#{baseurl}/", "#{baseurl}/publications/", "#{baseurl}/experiences/", "#{baseurl}/repositories/"]
abort "Unexpected navigation: #{nav.inspect}" unless nav == expected_nav

papers = BibTeX.parse(File.read("_bibliography/papers.bib").sub(/\A---\n---\n/, "")).entries.values
title = ->(paper) { paper[:title].to_s.delete("{}") }
expected_titles = papers.map(&title)
selected = papers.select { |paper| paper[:selected].to_s == "true" }
abort "Expected three selected papers" unless selected.length == 3
selected.each do |paper|
  author = paper[:author].first
  abort "Selected paper is not first-authored by Kwun Hang Lau" unless author.last == "Lau" && author.first == "Kwun Hang"
end
actual_titles = publications.css(".publications .title").map { |node| node.text.strip }
abort "Publication list does not match bibliography" unless actual_titles.sort == expected_titles.sort
home_titles = home.css(".publications .title").map { |node| node.text.strip }
abort "Homepage selected papers do not match bibliography" unless home_titles.sort == selected.map(&title).sort

# Check navigation, search data, sitemap and feeds for links into hidden sections.
files = Dir.glob(File.join(site, "**/*.{html,xml,json}"))
hidden.each do |route|
  pattern = /["'>]#{Regexp.escape(baseurl)}\/#{route}\//
  files.each do |path|
    abort "Hidden route linked from #{path}: #{route}" if File.read(path).match?(pattern)
  end
end

puts "personal site integration checks passed (navigation, hidden routes, publications, selected papers)"
