import { Locator, Page } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class NavigationPage extends HelperBase {

    // readonly page: Page;
    readonly fromLayoutMenuItem: Locator;
    readonly datePickerMenuItem: Locator;
    readonly smartTableMenuItem: Locator;
    readonly toastrMenuItem: Locator;
    readonly tooltipMenuItem: Locator;

    constructor(page: Page) {
        super(page);
        // this.page = page;
        this.fromLayoutMenuItem = this.page.getByText("Form Layouts");
        this.datePickerMenuItem = this.page.getByText("Datepicker");
        this.smartTableMenuItem = this.page.getByText("Smart table");
        this.toastrMenuItem = this.page.getByText("Toastr");
        this.tooltipMenuItem = this.page.getByText("Tooltip");
    }

    async formLayoutsPage() {
        // await this.page.getByText("Forms").click();
        await this.selectGroupMenuItem("Forms");
        await this.fromLayoutMenuItem.click();
        await this.waitForNumberOfSeconds(2);
    }

    async datepickerPage() {
        // await this.page.getByText("Forms").click();
        await this.selectGroupMenuItem("Forms");
        await this.datePickerMenuItem.click();
    }

    async smartTablePage() {
        // await this.page.getByText("Tables & Data").click();
        await this.selectGroupMenuItem("Tables & Data");
        await this.smartTableMenuItem.click();
    }

    async toastrPage() {
        // await this.page.getByText("Modal & Overlays").click();
        await this.selectGroupMenuItem("Modal & Overlays");
        await this.toastrMenuItem.click();
    }

    async tooltipPage() {
        // await this.page.getByText("Modal & Overlays").click();
        await this.selectGroupMenuItem("Modal & Overlays");
        await this.tooltipMenuItem.click();
    }

    private async selectGroupMenuItem(groupItemTitle: string) {
        // const groupMenuItem = this.page.getByTitle(groupItemTitle);
        // const expendedState = await groupMenuItem.getAttribute('aria-expanded');
        // if (expendedState =='false') {
        if (await this.page.getByTitle(groupItemTitle).getAttribute('aria-expanded') =='false') {
            // await groupMenuItem.click();
            await this.page.getByTitle(groupItemTitle).click();
        }
    }

}