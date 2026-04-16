import { test, expect } from "../../utilities/sep-test-utilities";
import { StartApplicationPage } from "../../pages/StartApplicationPage";
import { productInfo } from "../../utilities/qa-data-reader";
import { ReviewPaymentPage } from "../../pages/ReviewPaymentPage";
import { PaymentPlanPage } from "../../pages/PaymentPlanPage";

test.describe('Enter my Personal details', async () => {

    let starteAppPage: StartApplicationPage;
    let paymentPlanPage: PaymentPlanPage;
    let reviewPaymentPage: ReviewPaymentPage;
    

    test.beforeEach(async ({ page }) => {
    starteAppPage = new StartApplicationPage(page);
    paymentPlanPage = new PaymentPlanPage(page);
    reviewPaymentPage = new ReviewPaymentPage(page);    
    });


    test("Verify presence and validation types of personal detail fields", async () => {
        // Critical Fix: Added 'await' to ensure assertions execute correctly
        await expect(starteAppPage.firstNameInputBox).toBeEnabled();
        await expect(starteAppPage.lastNameInputBox).toBeEnabled();
        await expect(starteAppPage.emailInputBox).toBeEnabled();
        await expect(starteAppPage.phoneNumberInputBox).toBeEnabled();

        await starteAppPage.enterFirstName("Jane");
        await starteAppPage.enterLastName("Doe");
        await starteAppPage.enterEmail("example@example.com");
        await starteAppPage.enterPhoneNumber("123456789");
    });

    test("Verify 'How did you hear about us' dropdown functionality", async () => {
        await expect(starteAppPage.howDidYouHearAboutUsDropDown).toBeVisible();
        await starteAppPage.selectHowDidYouHearAboutUs("google");
    });

    test("Verify 'Next' button state based on data validity", async ({ page }) => {

        //Making sure next button is disabled by checking if it takes us to the next page
        await starteAppPage.nextButton.click();
        await expect(paymentPlanPage.upfrontPaymentOption).not.toBeVisible();
        
        //invalid data
        await starteAppPage.enterFirstName("Jane");
        await starteAppPage.enterLastName("Doe");
        await starteAppPage.enterEmail("invalid-email"); // Missing @ or .com
        await starteAppPage.enterPhoneNumber("/*/*");

        await starteAppPage.nextButton.click();
        await expect(paymentPlanPage.upfrontPaymentOption).not.toBeVisible();

        //valid data
        await starteAppPage.enterEmail("example@example.com");
        await starteAppPage.enterPhoneNumber("1234567890");
        await starteAppPage.selectHowDidYouHearAboutUs("Google");
        
        await starteAppPage.nextButton.click();

        await expect(paymentPlanPage.upfrontPaymentOption).toBeVisible({ timeout: 5000 });
});
    
});
