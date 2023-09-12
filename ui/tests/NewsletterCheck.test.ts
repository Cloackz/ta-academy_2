import { test, expect } from '@playwright/test';
import { DataLayer } from '@Utils/dataLayer';
import { faker } from '@faker-js/faker';

test.describe('Check an event in the Newsletter Subscription section', () => {
    test.beforeEach(async ({ page, baseURL }) => {
        await page.context().addCookies([
            {
                name: 'OptanonAlertBoxClosed',
                value: new Date().toISOString(),
                url: baseURL,
            },
        ]);
        await page.goto('/', { waitUntil: 'domcontentloaded' });
    });
    test('scroll to section after entering email', async ({ page }) => {
        const newsSection = await page.locator('//div[input[@name="email"]]');
        const input = newsSection.locator('//input');
        const button = newsSection.locator('//button//div[contains(text(), "Sign Up")]');
        await newsSection.scrollIntoViewIfNeeded();

        await test.step('click button after entering email', () => {
            input.type(faker.internet.email());
            button.click();
        });

        const dataLayer = new DataLayer(page);
        const expectedEvent = {
            event: 'GeneralInteraction',
            eventCategory: 'Footer - D',
            eventAction: 'Newsletter Subscription',
            eventLabel: 'Success',
        };

        const [event] = await dataLayer.waitForDataLayer(expectedEvent);
        expect(event).toStrictEqual(expectedEvent);
    });
});
