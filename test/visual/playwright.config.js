const path = require("path");
const { execFileSync } = require("child_process");
const { devices } = require("@playwright/test");

const repoRoot = path.resolve(__dirname, "../..");
const siteBaseurl = execFileSync("ruby", ["-ryaml", "-e", "print YAML.load_file('_config.yml').fetch('baseurl', '').to_s"], {
  cwd: repoRoot,
  encoding: "utf8",
}).trim();
const siteURL = `http://127.0.0.1:4000${siteBaseurl}/`;

const webServer = process.env.NO_WEBSERVER
  ? undefined
  : {
      command: "bundle exec jekyll serve --host 127.0.0.1 --port 4000 --no-watch --quiet",
      cwd: repoRoot,
      url: siteURL,
      reuseExistingServer: !process.env.CI,
      timeout: 300000,
    };

module.exports = {
  testDir: __dirname,
  // The retained template specs require demo pages that this site does not publish.
  testMatch: "personal-site.spec.js",
  reporter: [["line"], ["html", { open: "never" }]],
  timeout: 120000,
  expect: {
    timeout: 10000,
    toHaveScreenshot: {
      animations: "disabled",
      fullPage: true,
      maxDiffPixelRatio: 0.02,
    },
  },
  use: {
    baseURL: siteURL,
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
  },
  webServer,
  projects: [
    {
      name: "desktop",
      use: {
        viewport: { width: 1366, height: 1800 },
      },
    },
    {
      name: "mobile",
      use: {
        ...devices["iPhone 12"],
      },
    },
  ],
};
