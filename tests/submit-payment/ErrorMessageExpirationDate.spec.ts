import { test, expect } from "../../utilities/sep-test-utilities";
import { CommonUI } from "../../utilities/sep-test-utilities";
import { ReviewPaymentPage } from "../../pages/ReviewPaymentPage";

test.describe("Error messages for the invalid expiration number", () => {
    let reviewPaymentPage: ReviewPaymentPage;

    test.beforeEach(async ({ page }) => {
        reviewPaymentPage = new ReviewPaymentPage(page);
        await CommonUI.completeStartApplicationForm(page);
        await CommonUI.completeSelectingPaymentPlan(page, "upfront");
    });

    test('Verify error message for incomplete expiration date', async () => {
        await reviewPaymentPage.enterExpiryDate("12/2");
        await reviewPaymentPage.totalText.click(); 
        await expect(reviewPaymentPage.cardExpiryErrorMessage).toHaveText(/Your card.*expiration date is incomplete/);
    });

    test('Verify error message for expired card', async () => {
        await reviewPaymentPage.enterExpiryDate("12/20"); // Year 2020 is definitely in the past!
        await reviewPaymentPage.totalText.click(); 
        await expect(reviewPaymentPage.cardExpiryErrorMessage).toHaveText(/Your card.*expiration year is in the past/);
    });
});