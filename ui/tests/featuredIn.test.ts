import { test, expect } from '@Test';

test.describe('check event in Datalayer', () => {
    test('check evets after scroll and click magazines', async ({ homePage, page, dataLayer }) => {
        await homePage.open();
        await homePage.FeaturedIn.scrollToSection();

        await test.step('event should fire after scroll to the section', async () => {
            const expectedEvent = {
                event: 'HPInteraction',
                eventAction: 'Magazines',
                eventCategory: 'HP - D',
                eventLabel: 'Visible',
            };

            const [event] = await dataLayer.waitForDataLayer({
                event: 'HPInteraction',
                eventCategory: 'HP - D',
                eventAction: 'Magazines',
            });

            expect(event).toStrictEqual(expectedEvent);
            /**
             * To get all events in console
             */
            const a = console.log(await page.evaluate(() => window.dataLayer));
        });

        await test.step('event should fire after click each magazine', async () => {
            const expectedEvent = {
                event: 'HPInteraction',
                eventAction: 'Magazines',
                eventCategory: 'HP - D',
                eventLabel: 'Click',
            };
            const magazines = await homePage.FeaturedIn.getMagazines();

            for (const magazine of magazines) {
                await dataLayer.clearDataLayer();
                await magazine.click();

                const [event] = await dataLayer.waitForDataLayer({
                    event: 'HPInteraction',
                    eventAction: 'Magazines',
                    eventCategory: 'HP - D',
                    eventLabel: 'Click',
                });

                expect(event).toStrictEqual(expectedEvent);
            }
        });
    });
});
