const { test, expect } = require("@playwright/test");

test("navigation shows only the personal site's public sections", async ({ page, baseURL }) => {
  await page.goto("./", { waitUntil: "domcontentloaded" });
  const links = page.locator(".navbar-nav a.nav-link");
  const labels = (await links.allTextContents()).map((label) => label.replace("(current)", "").trim());
  expect(labels).toEqual(["About", "Publications", "Experiences", "Repositories"]);
  const toggle = page.locator(".navbar-toggler");
  if (await toggle.isVisible()) await toggle.click();
  await page.getByRole("link", { name: "Publications", exact: true }).first().click();
  await expect(page).toHaveURL(new URL("publications/", baseURL).href);
  await expect(page.locator(".publications .title")).toHaveCount(4);
});

test("homepage features only the three first-author papers", async ({ page }) => {
  await page.goto("./", { waitUntil: "domcontentloaded" });
  const titles = page.locator(".publications .title");
  await expect(titles).toHaveCount(3);
  expect((await titles.allTextContents()).join(" ")).not.toContain("Do Reasoning Models Enhance Embedding Models?");
});

test("publications include the coauthored embedding paper", async ({ page }) => {
  await page.goto("./publications/", { waitUntil: "domcontentloaded" });
  const paper = page.locator(".publications li").filter({ hasText: "Do Reasoning Models Enhance Embedding Models?" });
  await expect(paper.locator(".title")).toHaveText("Do Reasoning Models Enhance Embedding Models?");
  await expect(paper.locator(".author")).toContainText("Kwun Hang Lau");
  await expect(paper.getByRole("button", { name: "PDF", exact: true })).toHaveAttribute("href", "https://arxiv.org/pdf/2601.21192");
});

test("hidden sections and demo detail pages return HTTP 404", async ({ request }) => {
  for (const route of [
    "blog/",
    "blog/page/2/",
    "blog/2022/giscus-comments/",
    "blog/2021/distill/",
    "blog/2022/rtl/",
    "blog/2025/marimo/",
    "projects/",
    "projects/1_project/",
    "cv/",
    "teaching/",
    "people/",
    "books/",
  ]) {
    const response = await request.get(`./${route}`);
    expect(response.status(), route).toBe(404);
  }
});
