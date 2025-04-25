import { test, expect } from "@playwright/test";
// import { NavigationPage } from '../page-objects/navigationPage';
// import { FormLayoutsPage } from "../page-objects/formLayoutsPage";
// import { DatepickerPage } from "../page-objects/datepickerPage";
import { PageManager } from "../page-objects/pageManager";
import { faker } from '@faker-js/faker';

test.beforeEach(async({page}) => {
    await page.goto('/');
    // await page.waitForLoadState('load');
});

test('navigate to form page @smoke @regression', async ({page}) => {
    // const navigateTo = new NavigationPage(page);

    const pm = new PageManager(page);

    await pm.navigateTo().formLayoutsPage();
    await pm.navigateTo().datepickerPage();
    await pm.navigateTo().smartTablePage();
    await pm.navigateTo().toastrPage();
    await pm.navigateTo().tooltipPage();
});

test('parametrized method', async ({page}) => {
    // const navigateTo = new NavigationPage(page);
    // const onFormLayoutsPage = new FormLayoutsPage(page);
    // const onDatepickerPage = new DatepickerPage(page);

    const pm = new PageManager(page);
    const randomFullName = faker.person.fullName();
    const randomEmail = `${randomFullName.replace(' ', '')}${faker.number.int(1000)}@test.com`;

    await pm.navigateTo().formLayoutsPage();
    await pm.onFormLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelectOption(process.env.USERNAME_INCORRECT as string, process.env.PASSWORD as string, 'Option 2');
    // await page.screenshot({path: 'screenshots/formLayoutPage.png'});

    await pm.onFormLayoutsPage().submitInLineFormWithNameEmailAndCheckbox(randomFullName, randomEmail, false);
    // await page.locator('nb-card', {hasText: 'Inline form'}).screenshot({path: 'screenshots/inLineForm.png'});

    // await pm.navigateTo().datepickerPage();
    // await pm.onDatepickerPage().selectCommonDatepickerFromToday(5);
    // await pm.onDatepickerPage().selectDatepickerWithRangeFromToday(6, 15);
});

test.only('testing with argos ci', async ({page}) => {
    const pm = new PageManager(page);
    await pm.navigateTo().formLayoutsPage();
    await pm.navigateTo().datepickerPage();
});
