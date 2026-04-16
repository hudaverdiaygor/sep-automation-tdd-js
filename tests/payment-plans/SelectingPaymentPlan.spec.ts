import { test, expect } from "../../utilities/sep-test-utilities";
import { CommonUI } from "../../utilities/sep-test-utilities";
import { PaymentPlanPage } from "../../pages/PaymentPlanPage";

test.describe("Selecting a price plan", () => {
    let paymentPlanPage: PaymentPlanPage;

    test.beforeEach(async ({ page }) => {
        paymentPlanPage = new PaymentPlanPage(page);
        await CommonUI.completeStartApplicationForm(page, "Jane", "Doe", "jane.doe@example.com", "123456789");
    });

    test('Verify plan selection highlights the chosen option and next button becomes enabled', async () => {
        await paymentPlanPage.selectPaymentPlan("upfront");
        
        
        await expect(paymentPlanPage.upfrontPaymentFrame).toHaveClass(/mat-expanded/);
        await expect(paymentPlanPage.activeNextButton).toBeVisible();
    });

    test('Verify users can change plan selection and toggle highlight states', async () => {
        // Step 1: Select Upfront
        await paymentPlanPage.selectPaymentPlan("upfront");
        await expect(paymentPlanPage.upfrontPaymentFrame).toHaveClass(/mat-expanded/);
        
        // Step 2: Switch to Installments
        await paymentPlanPage.selectPaymentPlan("installments");
        
        // Step 3: Verify the chosen payment plan is highlighted and the other is not
        await expect(paymentPlanPage.installmentsPaymentFrame).toHaveClass(/mat-expanded/);
        await expect(paymentPlanPage.upfrontPaymentFrame).not.toHaveClass(/mat-expanded/);
    });

});