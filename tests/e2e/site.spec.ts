import { expect, test, type Page } from "@playwright/test";

const postPath = "/blog/reflection-on-my-coding-journey-with-ai";
const deepWorkPostPath = "/blog/deep-work-digital-habits";

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
  await expect(page.getByRole("heading", { level: 2, name: "Journey" })).toBeVisible();
  await expect(page.getByText("Student · Writer · Builder", { exact: true })).toHaveCount(0);
  await expect(page.getByText(/I do a lot of writing in my free time/)).toHaveCount(0);
  await expect(page.getByText("Ideas worth working through.", { exact: true })).toHaveCount(0);
  await expect(page.getByText("Writing, learning, and building with purpose.")).toHaveCount(0);
  await expect(page.getByText("© 2026 Evan Jo", { exact: true })).toHaveCount(0);
  await expect(page.locator(".hero__portrait-accent")).toHaveCount(0);
  await expect(
    page.getByRole("link", { name: "Algonquin Regional High School", exact: true }),
  ).toHaveAttribute("href", "https://www.arhs.nsboro.k12.ma.us/");

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
  await expect(page.getByRole("link", { name: "Email Evan Jo" })).toHaveAttribute(
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
  await expect(page.getByText("Notes & reflections", { exact: true })).toHaveCount(0);
  await expect(page.getByText("9:35 audio", { exact: true })).toHaveCount(0);
  await expect(page.getByText("Read and listen", { exact: true })).toHaveCount(0);

  await page.getByRole("link", { name: /Reflection on my coding journey with AI/ }).click();
  await expect(page).toHaveURL(new RegExp(`${postPath}$`));
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Reflection on my coding journey with AI",
  );
  await expect(page.locator("audio")).toBeVisible();
  await expect(page.getByText("Reflection", { exact: true })).toHaveCount(0);
  await expect(page.getByText(/Read by Evan Jo/)).toHaveCount(0);
  await expect(page.getByText("Download MP3", { exact: true })).toHaveCount(0);
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

test("Deep Work entry and audio are published together", async ({ page, request }) => {
  const errors = collectBrowserErrors(page);

  await page.goto(deepWorkPostPath);
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Deep Work: A Look into My Own Habits on the Internet",
    }),
  ).toBeVisible();
  await expect(page.getByText("August 17, 2026", { exact: true })).toBeVisible();
  await expect(page.getByText(/But the question remains/)).toBeVisible();
  await expect(page.locator("audio source")).toHaveAttribute(
    "src",
    "/media/entries/digitalhabits-august-17.mp3",
  );

  const response = await request.get("/media/entries/digitalhabits-august-17.mp3", {
    headers: { Range: "bytes=0-1023" },
  });
  expect(response.status()).toBe(206);
  expect(response.headers()["content-type"]).toContain("audio/mpeg");
  expect((await response.body()).byteLength).toBe(1024);
  expect(errors).toEqual([]);
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

  for (const path of ["/", "/blog", postPath, deepWorkPostPath]) {
    await page.goto(path);
    const sizes = await page.evaluate(() => ({
      viewport: window.innerWidth,
      document: document.documentElement.scrollWidth,
    }));
    expect(sizes.document).toBeLessThanOrEqual(sizes.viewport);
  }
});
