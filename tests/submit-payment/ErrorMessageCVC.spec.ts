import { test, expect } from "../../utilities/sep-test-utilities";
import { CommonUI } from "../../utilities/sep-test-utilities";
import { ReviewPaymentPage } from "../../pages/ReviewPaymentPage";

test.describe("Error message for the invalid CVC number", () => {

    let reviewPaymentPage: ReviewPaymentPage;

    test.beforeEach(async ({ page }) => {
        reviewPaymentPage = new ReviewPaymentPage(page);
        await CommonUI.completeStartApplicationForm(page);
        await CommonUI.completeSelectingPaymentPlan(page, "upfront");
    });

    test('Verify error message for incomplete CVC number', async () => {
        await reviewPaymentPage.enterCVC("12");
        await reviewPaymentPage.totalText.click(); 
        
        // Using a Regex (/.../) makes it immune to curly vs straight apostrophe issues
        await expect(reviewPaymentPage.cardCVCErrorMessage).toHaveText(/Your card.*security code is incomplete/);
    });

    


});