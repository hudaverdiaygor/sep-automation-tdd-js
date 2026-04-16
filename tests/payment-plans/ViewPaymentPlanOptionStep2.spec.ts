import { test, expect } from "../../utilities/sep-test-utilities";
import { CommonUI } from "../../utilities/sep-test-utilities";
import { PaymentPlanPage } from "../../pages/PaymentPlanPage";
import { productInfo } from "../../utilities/qa-data-reader";

test.describe("View payment plan options in Step 2 ", () => {

    let paymentPlanPage: PaymentPlanPage;

    test.beforeEach(async ({ page }) => {
        paymentPlanPage = new PaymentPlanPage(page);
        await CommonUI.completeStartApplicationForm(page, "Jane", "Doe", "jane.doe@example.com", "123456789");
    });

   test('Verify upfront payment option display', async () => {
        await paymentPlanPage.selectPaymentPlan("upfront");
        
        // Assertions
        await expect(paymentPlanPage.upfrontPaymentOption).toBeVisible();
        await expect(paymentPlanPage.upfrontPaymentAmount).toBeVisible();
    });

    test('Verify installment payment options and data accuracy', async () => {
        await paymentPlanPage.selectPaymentPlan("installments");

        // 1. Verify Installment Count from JSON
        const expectedCount = productInfo.prices[1]!.numberOfInstallments!.toString();
        await expect(paymentPlanPage.installmentsNumberUnderInstallments).toContainText(expectedCount);

        // 2. Verify Price breakdown (Simplified by removing redundant .toBeVisible() calls)
        await expect(paymentPlanPage.pricePerInstallmentsAmountUnderInstallments).toHaveText("$100");
        await expect(paymentPlanPage.dueTodayTextUnderInstallments).toBeVisible();
        await expect(paymentPlanPage.firstMonthPaymentAmountUnderInstallments).toHaveText("$100");
    });

    


});