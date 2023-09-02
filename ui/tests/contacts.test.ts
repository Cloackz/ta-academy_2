import { test, expect } from '@Test';

test.use({ trace: 'on' });
test.describe('check products quantity on Contacts page', () => {
    test('quantity of products should be equal 36', async ({ page, baseURL, categoryPage }) => {
        await categoryPage.open('contact-lenses');

        await test.step('check url', () => {
            const url = page.url();
            expect(url).toBe(`${baseURL}contact-lenses`);
        });

        await test.step('scroll to products and check quantity', async () => {
            await categoryPage.scrollProducts();
            await expect(async () => {
                const products = await categoryPage.getProducts();
                expect(products.length).toBe(36);
            }).toPass();
        });
    });
});
