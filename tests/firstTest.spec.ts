import { test, expect } from "@playwright/test";

test.beforeEach(async({page}) => {
    await page.goto('/');
    await page.getByText('Forms').click();
    await page.getByText('Form Layouts').click();
});

// test('Navigate to the Form Layouts page', async ({page}) => {
//     await page.getByText('Form Layouts').click();
// })

// test('Navigate to the Datepicker page', async ({page}) => {
//     await page.getByText('Datepicker').click();
// })

test('Assertions', async ({page}) => {

    expect(5).toEqual(5);

    const basicFormButton = page.locator('nb-card').filter({hasText: 'Basic form'}).locator('button');

    const text = await basicFormButton.textContent();
    expect(text).toEqual('Submit');

    await expect(basicFormButton).toHaveText('Submit');
})

