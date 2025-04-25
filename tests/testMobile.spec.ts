import{ test, expect } from "@playwright/test";

test("input fields in mobile", async ({ page }, testInfo) => {
    await page.goto("/");
    if(testInfo.project.name == 'mobile') {
        await page.locator('a.sidebar-toggle').click();
    }

    await page.getByText("Forms").click();
    await page.getByText("Form Layouts").click();
    // await page.locator('a.sidebar-toggle').click();
    if(testInfo.project.name == 'mobile') {
        await page.locator('a.sidebar-toggle').click();
    }

    const usingTheGridEmailInput = page
      .locator("nb-card", { hasText: "Using the Grid" })
      .getByRole("textbox", { name: "Email" });

    await usingTheGridEmailInput.fill("test3@test.com");

    // generic assertion
    const inputValue = await usingTheGridEmailInput.inputValue();
    expect(inputValue).toEqual("test3@test.com");

    // locator assertion
    await expect(usingTheGridEmailInput).toHaveValue("test3@test.com");
  });