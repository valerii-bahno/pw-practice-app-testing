import { test } from "../test-options";
// import { PageManager } from "../page-objects/pageManager";
import { faker } from '@faker-js/faker';

// test.beforeEach(async({page}) => {
//     await page.goto('/');
// });

test('parametrized method', async ({ pageManager }) => {
    // const pm = new PageManager(page);
    const randomFullName = faker.person.fullName();
    const randomEmail = `${randomFullName.replace(' ', '')}${faker.number.int(1000)}@test.com`;

    // await pm.navigateTo().formLayoutsPage();
    await pageManager.onFormLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelectOption(process.env.USERNAME_INCORRECT as string, process.env.PASSWORD as string, 'Option 2');
    // await page.screenshot({path: 'screenshots/formLayoutPage.png'});

    await pageManager.onFormLayoutsPage().submitInLineFormWithNameEmailAndCheckbox(randomFullName, randomEmail, false);
    // await page.locator('nb-card', {hasText: 'Inline form'}).screenshot({path: 'screenshots/inLineForm.png'});

    // await pm.navigateTo().datepickerPage();
    // await pm.onDatepickerPage().selectCommonDatepickerFromToday(5);
    // await pm.onDatepickerPage().selectDatepickerWithRangeFromToday(6, 15);
});
