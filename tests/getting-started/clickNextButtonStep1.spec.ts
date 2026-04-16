import { test, expect } from "../../utilities/sep-test-utilities";
import { StartApplicationPage } from "../../pages/StartApplicationPage";
import { productInfo } from "../../utilities/qa-data-reader";
import { ReviewPaymentPage } from "../../pages/ReviewPaymentPage";
import { PaymentPlanPage } from "../../pages/PaymentPlanPage";

test.describe('Click on the next button on step 1', async () => {

    let starteAppPage: StartApplicationPage;
    let paymentPlanPage: PaymentPlanPage;
    let reviewPaymentPage: ReviewPaymentPage;


    test.beforeEach(async ({ page }) => {
    starteAppPage = new StartApplicationPage(page);
    paymentPlanPage = new PaymentPlanPage(page);
    reviewPaymentPage = new ReviewPaymentPage(page);    
    });


    test("User should be able to click on the next button on step 1 when all fields are provided", async ({ page }) => {
    await starteAppPage.enterFirstName("Jane");
    await starteAppPage.enterLastName("Doe");
    await starteAppPage.enterEmail("example@example.com");
    await starteAppPage.enterPhoneNumber("123456789");
    await starteAppPage.selectHowDidYouHearAboutUs("google");

    await starteAppPage.clickNextButton();
    
    // ASSERTION: Verify we actually arrived at Step 2
    await expect(paymentPlanPage.upfrontPaymentOption).toBeVisible({ timeout: 5000 });
});

test("User should be able to click on the next button on step 1 when only the required fields are provided", async ({ page }) => {
    await starteAppPage.enterFirstName("Jane");
    await starteAppPage.enterLastName("Doe");
    await starteAppPage.enterEmail("example@example.com");
    await starteAppPage.enterPhoneNumber("123456789");

    await starteAppPage.clickNextButton();
    
    // ASSERTION: Verify the next page element is visible
    await expect(paymentPlanPage.upfrontPaymentOption).toBeVisible({ timeout: 5000 });
});

    
    
    


    
});
