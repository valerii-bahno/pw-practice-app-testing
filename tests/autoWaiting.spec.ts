import { test, expect } from "@playwright/test";

test.beforeEach(async({page}, testInfo) => {
    await page.goto(process.env.URL as string);
    await page.getByText('Button Triggering AJAX Request').click();
    testInfo.setTimeout(testInfo.timeout + 2000);
});

test('auto-waiting', async ({page}) => {
    const successButton = page.locator('.bg-success');

    // await successButton.click();

    // expect(await successButton.allTextContents()).toContain('Data loaded with AJAX get request.');

    await expect(successButton).toHaveText('Data loaded with AJAX get request.', {timeout: 20000});
});

test.skip('alternative waits', async ({page}) => {
    const successButton = page.locator('.bg-success');

    // wait for selector
    // await page.waitForSelector('.bg-success');

    // wait for response
    // await page.waitForResponse('http://uitestingplayground.com/ajaxdata');

    // wait for network calls
    await page.waitForLoadState('networkidle', {timeout: 20000});

    const text = await successButton.allTextContents();

    expect(text).toContain('Data loaded with AJAX get request.');
})

test.skip('timeout', async ({page}) => {
    test.setTimeout(10000);
    test.slow();
    const successButton = page.locator('.bg-success');
    await successButton.click();
});