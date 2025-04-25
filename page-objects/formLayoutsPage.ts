import { Locator, Page } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class FormLayoutsPage extends HelperBase {

    // private readonly page: Page;
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

    async submitUsingTheGridFormWithCredentialsAndSelectOption(email: string, password: string, optionText: string) {
        const usingTheGridForm = this.page
    .locator("nb-card", { hasText: "Using the Grid" });
        await usingTheGridForm.getByRole("textbox", { name: "Email" }).fill(email);
        await usingTheGridForm.getByRole("textbox", { name: "Password" }).fill(password);
        await usingTheGridForm.getByRole("radio", { name: optionText }).check({force: true});
        await usingTheGridForm.getByRole('button').click();
    }

    /**
     * This method will out the Inline form with user details
     * @param name - should be first and last name
     * @param email - valid email for the test user
     * @param rememberMe - true or false if user session to be safed
     */
    async submitInLineFormWithNameEmailAndCheckbox(name: string, email: string, rememberMe: boolean) {
        const inLineForm = this.page
        .locator("nb-card", { hasText: "Inline form" });
        await inLineForm.getByRole("textbox", { name: "Jane Doe" }).fill(name);
        await inLineForm.getByRole("textbox", { name: "Email" }).fill(email);
        if(rememberMe) {
            await inLineForm.getByRole('checkbox').check({force: true});
        }
        await inLineForm.getByRole('button').click();
    }

}