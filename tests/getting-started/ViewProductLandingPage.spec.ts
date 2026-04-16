import { test, expect } from "../../utilities/sep-test-utilities";
import { StartApplicationPage } from "../../pages/StartApplicationPage";
import { productInfo } from "../../utilities/qa-data-reader";
import { ReviewPaymentPage } from "../../pages/ReviewPaymentPage";
import { PaymentPlanPage } from "../../pages/PaymentPlanPage";
import { LeftMainPage } from "../../pages/LeftMainPage";

test.describe('Enter my Personal details', async () => {

    let starteAppPage: StartApplicationPage;
    let paymentPlanPage: PaymentPlanPage;
    let reviewPaymentPage: ReviewPaymentPage;
    let leftMainPage : LeftMainPage;



    test.beforeEach(async ({ page }) => {
    starteAppPage = new StartApplicationPage(page);
    paymentPlanPage = new PaymentPlanPage(page);
    reviewPaymentPage = new ReviewPaymentPage(page);
    leftMainPage = new LeftMainPage(page);    
    });


    test("Verify header and program information", async () => {
        // toHaveText implicitly checks visibility and retries
        await expect(leftMainPage.secureCheckout).toHaveText("Secure checkout");
        await expect(leftMainPage.programName).toBeVisible();
    });

    test("Verify footer links and contact information", async () => {
        const expectedFooterLinks = [
            "Terms and conditions",
            "Privacy Policy",
            "Disclaimer",
            "Cookie Policy"
        ];

        // Checks all elements in the collection against the array in order
        await expect(leftMainPage.footerElements).toHaveText(expectedFooterLinks);
        await expect(leftMainPage.cydeoImageAtLeftWindow).toBeVisible();
        
        await expect(starteAppPage.footer).toBeVisible();
    });

    
    
});
