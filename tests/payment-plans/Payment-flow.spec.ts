import { test, expect } from "../../utilities/sep-test-utilities";
import { CommonUI } from "../../utilities/sep-test-utilities";
import { PaymentPlanPage } from "../../pages/PaymentPlanPage";
import { ReviewPaymentPage } from "../../pages/ReviewPaymentPage";

test.describe("Payment flow tests", () => {

    let paymentPlanPage: PaymentPlanPage;
    let reviewPaymentPage: ReviewPaymentPage;

    test.beforeEach(async ({ page }) => {
        paymentPlanPage = new PaymentPlanPage(page);
        reviewPaymentPage = new ReviewPaymentPage(page);
        await CommonUI.completeStartApplicationForm(page, "Jane", "Doe", "jane.doe@example.com", "123456789");
    });

    test("Should display payment plan page after start application", async ({ page }) => {
        await expect(paymentPlanPage.chooseAPaymentPlanText).toBeVisible();
        await expect(paymentPlanPage.step2).toBeVisible();
        await expect(paymentPlanPage.activeNextButton).toBeDisabled();
    });

    test("Should select upfront payment plan and show upfront details", async () => {
        await paymentPlanPage.selectPaymentPlan("upfront");

        await expect(paymentPlanPage.upfrontPaymentOption).toHaveClass(/payment-type/);
        await expect(paymentPlanPage.upfrontPaymentAmount).toBeVisible();
        await expect(paymentPlanPage.activeNextButton).toBeEnabled();
    });

    test("Should select installment payment plan and show installment details", async () => {
        await paymentPlanPage.selectPaymentPlan("installments");

        await expect(paymentPlanPage.installmentsPaymentOption).toHaveClass(/payment-type/);
        await expect(paymentPlanPage.installmentsNumberUnderInstallments).toBeVisible();
        await expect(paymentPlanPage.pricePerInstallmentsAmountUnderInstallments).toBeVisible();
    });

    test("Should proceed to review payment page after selecting a plan", async ({ page }) => {
        await paymentPlanPage.selectPaymentPlan("upfront");
        await paymentPlanPage.clickNextButton();

        await expect(reviewPaymentPage.paymentForm).toBeVisible();
        await expect(reviewPaymentPage.productPriceText).toBeVisible();
        await expect(reviewPaymentPage.payButton).toBeVisible();
    });

});
