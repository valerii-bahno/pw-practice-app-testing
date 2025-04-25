import{ test, expect } from "@playwright/test";

test("Applitools Visual Test", async ({ page }) => {
    await page.goto("/");
    await page.getByText("Forms").click();
    await page.getByText("Form Layouts").click();


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