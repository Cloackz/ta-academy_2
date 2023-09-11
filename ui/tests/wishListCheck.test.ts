import { test, expect } from '@playwright/test';
import { DataLayer } from '@Utils/dataLayer';

test.describe('adding a product to wishList and checking that the item is available', () => {
    test.beforeEach(async ({ page, baseURL }) => {
        await page.context().addCookies([
            {
                name: 'OptanonAlertBoxClosed',
                value: new Date().toISOString(),
                url: baseURL,
            },
        ]);
        await page.goto('/sunglasses', { waitUntil: 'domcontentloaded' });
    });

    test('adding a product to wishList', async ({ page }) => {
        const [product] = await page.locator('[data-test-name="product"]').all();
        const productId = await product.getAttribute('data-test-id');
        const buttonProduct = product.locator('[aria-label="myPick"]');
        await buttonProduct.click();

        const dataLayer = new DataLayer(page);
        const expectedEvent = {
            event: 'CategoryInteraction',
            eventCategory: 'Category - D',
            eventAction: 'Product',
            eventLabel: 'Add to Wishlist',
        };

        const [event] = await dataLayer.waitForDataLayer(expectedEvent);

        expect(event).toStrictEqual(expectedEvent);

        await test.step('opening wishList and checking that the item exists', async () => {
            const buttonMyPicksList = page.locator('//button//div[@aria-label="View My Picks"]');
            await buttonMyPicksList.click();

            const response = await page.waitForResponse(
                (response) => response.url().includes('/ms/elastic') && response.status() === 200
            );

            expect((await response.body()).includes(`"id":${productId}`)).toBe(true);
        });
    });
});
