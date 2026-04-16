import { test, expect } from "../../utilities/sep-test-utilities";
import { StartApplicationPage } from "../../pages/StartApplicationPage";
import { productInfo } from "../../utilities/qa-data-reader";
import { ReviewPaymentPage } from "../../pages/ReviewPaymentPage";
import { PaymentPlanPage } from "../../pages/PaymentPlanPage";

test.describe('Display the product information', async () => {

    let starteAppPage: StartApplicationPage;
    let paymentPlanPage: PaymentPlanPage;
    let reviewPaymentPage: ReviewPaymentPage;


    test.beforeEach(async ({ page }) => {
    starteAppPage = new StartApplicationPage(page);
    paymentPlanPage = new PaymentPlanPage(page);
    reviewPaymentPage = new ReviewPaymentPage(page);    
    });


    test("User should be able to see the product information such as product name, price, flexible payment, program start date and refund date", async ({ page }) => {

        await expect(starteAppPage.programNameOnInfoCard).toHaveText(productInfo.productName);
        const expectedPrice = `$${productInfo.prices[0].baseAmount}`;
        await expect(starteAppPage.programPrice).toContainText(expectedPrice);
        await expect(starteAppPage.flexiblePaymentsPlanAvailableText).toBeVisible();
        await expect(starteAppPage.programStartDate).toHaveText(productInfo.startDate);
        await expect(starteAppPage.refundEndDate).toHaveText(productInfo.refundDate);
    });
    
});
