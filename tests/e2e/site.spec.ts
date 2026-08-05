import { expect, test, type Page } from "@playwright/test";

const postPath = "/blog/reflection-on-my-coding-journey-with-ai";

function collectBrowserErrors(page: Page) {
  const errors: string[] = [];

  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(error.message));

  return errors;
}

test("about page renders every supplied profile asset and public contact link", async ({
  page,
}) => {
  const errors = collectBrowserErrors(page);

  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1, name: "Evan Jo" })).toBeVisible();
  await expect(page.getByText("Waters Corporation")).toBeVisible();
  await expect(page.getByText("Algonquin Regional High School")).toBeVisible();
  await expect(page.getByText("Romans 8:1")).toBeVisible();

  const images = page.locator("img");
  await expect(images).toHaveCount(3);
  for (let index = 0; index < (await images.count()); index += 1) {
    await expect(images.nth(index)).toHaveJSProperty("complete", true);
    expect(
      await images.nth(index).evaluate((image) => (image as HTMLImageElement).naturalWidth),
    ).toBeGreaterThan(0);
  }

  await expect(page.getByRole("link", { name: "LinkedIn" }).first()).toHaveAttribute(
    "href",
    "https://www.linkedin.com/in/evan-jo-5a47a9407",
  );
  await expect(page.getByRole("link", { name: "GitHub" }).first()).toHaveAttribute(
    "href",
    "https://github.com/SU0R",
  );
  await expect(page.getByRole("link", { name: "evanjo2100@gmail.com" })).toHaveAttribute(
    "href",
    "mailto:evanjo2100@gmail.com",
  );
  expect(errors).toEqual([]);
});

test("primary navigation leads from About Me to the blog and article", async ({ page }) => {
  const errors = collectBrowserErrors(page);

  await page.goto("/");
  await page.getByRole("link", { name: "Blog", exact: true }).click();
  await expect(page).toHaveURL(/\/blog$/);
  await expect(page.getByRole("heading", { level: 1, name: "Blog" })).toBeVisible();

  await page.getByRole("link", { name: "Read and listen" }).click();
  await expect(page).toHaveURL(new RegExp(`${postPath}$`));
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Reflection on my coding journey with AI",
  );
  await expect(page.locator("audio")).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: "How did we get here?" })).toBeVisible();
  expect(errors).toEqual([]);
});

test("audio asset supports HTTP byte-range delivery", async ({ request }) => {
  const response = await request.get("/media/entries/vibe-coding-principles-august-5.mp3", {
    headers: { Range: "bytes=0-1023" },
  });

  expect(response.status()).toBe(206);
  expect(response.headers()["content-type"]).toContain("audio/mpeg");
  expect(response.headers()["content-range"]).toMatch(/^bytes 0-1023\/\d+$/);
  expect((await response.body()).byteLength).toBe(1024);
});

test("unknown routes render the custom not-found page", async ({ page }) => {
  await page.goto("/not-a-real-page");
  await expect(
    page.getByRole("heading", { level: 1, name: "This page has wandered off." }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Return home" })).toBeVisible();
});

test("pages do not overflow the mobile viewport", async ({ page, isMobile }) => {
  test.skip(!isMobile, "Mobile-only layout assertion");

  for (const path of ["/", "/blog", postPath]) {
    await page.goto(path);
    const sizes = await page.evaluate(() => ({
      viewport: window.innerWidth,
      document: document.documentElement.scrollWidth,
    }));
    expect(sizes.document).toBeLessThanOrEqual(sizes.viewport);
  }
});
