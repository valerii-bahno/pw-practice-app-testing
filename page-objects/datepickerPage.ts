import { expect, Page } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class DatepickerPage extends HelperBase {

    // private readonly page: Page;

    constructor(page: Page) {
        super(page);
        // this.page = page;
    }

    async selectCommonDatepickerFromToday(numberOfDaysFromToday: number) {
        const calendarInputField = this.page.getByPlaceholder('Form Picker');
        await calendarInputField.click();
        
        const dataToAssert = await this.selectDateInTheCalender(numberOfDaysFromToday);
        
        await expect(calendarInputField).toHaveValue(dataToAssert);
    }

    async selectDatepickerWithRangeFromToday(startDateFromToday: number, endDayFromToday: number) {
        const calendarInputField = this.page.getByPlaceholder('Range Picker');
        await calendarInputField.click();

        const dataStartToAssert = await this.selectDateInTheCalender(startDateFromToday);
        const dataEndToAssert = await this.selectDateInTheCalender(endDayFromToday);

        const dateToAssert = `${dataStartToAssert} - ${dataEndToAssert}`;

        await expect(calendarInputField).toHaveValue(dateToAssert);
    }

    private async selectDateInTheCalender(numberOfDaysFromToday: number) {
        let date = new Date();
        date.setDate(date.getDate() + numberOfDaysFromToday);
        
        const expectedDate = date.getDate().toString();
        
        const expectedMonthShort = date.toLocaleString('En-US', {month: 'short'});
        const expectedMonthLong = date.toLocaleString('En-US', {month: 'long'});
        const expectedYear = date.getFullYear();
        const dataToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`;
        
        let calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent();
        
        const expectedMonthAndYear = ` ${expectedMonthLong} ${expectedYear}`;
        while(!calendarMonthAndYear!.includes(expectedMonthAndYear)) {
            await this.page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click();
            calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent();
            }
                
        await this.page.locator('.day-cell.ng-star-inserted').getByText(expectedDate, {exact: true}).click();
        return dataToAssert;
    }
}