import { test, expect } from "../../utilities/sep-test-utilities";
import { CommonUI } from "../../utilities/sep-test-utilities";
import { ReviewPaymentPage } from "../../pages/ReviewPaymentPage";

test.describe("Error message for the invalid card number", () => {

    let reviewPaymentPage: ReviewPaymentPage;

    test.beforeEach(async ({ page }) => {
        reviewPaymentPage = new ReviewPaymentPage(page);
        await CommonUI.completeStartApplicationForm(page);
        await CommonUI.completeSelectingPaymentPlan(page, "upfront");
    });

    test('Verify error message for incomplete card number', async () => {
        await reviewPaymentPage.enterCardNumber("4242");
        // Click away to trigger the Stripe blur event validation
        await reviewPaymentPage.totalText.click(); 
        
        await expect(reviewPaymentPage.cardNumberErrorMessage).toHaveText("Your card number is incomplete.");
    });

    test('Verify error message for invalid card number', async () => {
        await reviewPaymentPage.enterCardNumber("4242 5467 8973 1232");
        await reviewPaymentPage.totalText.click();
        
        await expect(reviewPaymentPage.cardNumberErrorMessage).toHaveText("Your card number is invalid.");
    });


});