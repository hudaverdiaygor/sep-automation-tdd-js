import { test, expect } from "../../utilities/sep-test-utilities";
import { StartApplicationPage } from "../../pages/StartApplicationPage";
import { productInfo } from "../../utilities/qa-data-reader";
import { ReviewPaymentPage } from "../../pages/ReviewPaymentPage";
import { PaymentPlanPage } from "../../pages/PaymentPlanPage";

test.describe('Display the steps of the checkout process', async () => {

    let starteAppPage: StartApplicationPage;
    let paymentPlanPage: PaymentPlanPage;
    let reviewPaymentPage: ReviewPaymentPage;


    test.beforeEach(async ({ page }) => {
    starteAppPage = new StartApplicationPage(page);
    paymentPlanPage = new PaymentPlanPage(page);
    reviewPaymentPage = new ReviewPaymentPage(page);    
    });


    test("User should see the steps of the checkout process", async ({ page }) => {
    
    await expect(starteAppPage.startApplicationText).toBeVisible();
    await expect(starteAppPage.paymentPlanText).toBeVisible();
    await expect(starteAppPage.reviewText).toBeVisible();
    await expect(starteAppPage.startApplicationStepCircle).toHaveCSS("background-color","rgb(1, 201, 255)");
    await expect(starteAppPage.paymentPlanStepCircle).toHaveCSS("background-color","rgba(0, 0, 0, 0)");
    await expect(starteAppPage.reviewStepCircle).toHaveCSS("background-color","rgba(0, 0, 0, 0)");

    });


    
    
});
