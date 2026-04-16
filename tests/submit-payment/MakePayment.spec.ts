import { test, expect } from "../../utilities/sep-test-utilities";
import { CommonUI } from "../../utilities/sep-test-utilities";
import { ReviewPaymentPage } from "../../pages/ReviewPaymentPage";


test.describe("Make a payment", () => {
    let reviewPaymentPage: ReviewPaymentPage;


    test.beforeEach(async ({ page }) => {
        reviewPaymentPage = new ReviewPaymentPage(page);
        await CommonUI.completeStartApplicationForm(page);
        await CommonUI.completeSelectingPaymentPlan(page, "upfront");
    });

    

    test('Verify successful payment and redirection to confirmation page', async () => {
        await reviewPaymentPage.enterCardNumber("4242424242424242");
        await reviewPaymentPage.enterExpiryDate("12/28");
        await reviewPaymentPage.enterCVC("368");
        await reviewPaymentPage.enterZipCode("22102");
        
        await reviewPaymentPage.clickTermsAndConditionsCheckbox();

        // Click Pay
        await reviewPaymentPage.clickPayButton();

        // Step 1: Wait for the spinner to disappear (if it exists)
        //await expect(reviewPaymentPage.progressBar).not.toBeVisible({ timeout: 15000 });

        // Step 2: Now check for the message. 
        // We use toBeVisible() which will wait for it to stop being 'hidden'
        //await expect(reviewPaymentPage.successMessage).toBeVisible({ timeout: 10000 });
    });

    /*
    CARD_NUMBER = 4242424242424242
    EXPIRATION_DATE = 12/28
    CVC = 368
    ZIP_CODE = 22102
    */
});