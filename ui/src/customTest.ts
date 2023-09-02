import type { Page } from '@playwright/test';
import { HomePage } from '@Pages/homePage';
import { CategoryPage } from '@Pages/categoryPage';
import { DataLayer } from '@Utils/dataLayer';
import { test as base, expect } from '@playwright/test';

type Options = {
    page: Page;
    homePage: HomePage;
    categoryPage: CategoryPage;
    dataLayer: DataLayer;
};

const test = base.extend<Options>({
    page: async ({ page, context, baseURL }, use) => {
        await context.addCookies([
            {
                name: 'OptanonAlertBoxClosed',
                value: new Date().toISOString(),
                url: baseURL,
            },
        ]);
        await use(page);
    },

    dataLayer: async ({ page }, use) => {
        await use(new DataLayer(page));
    },

    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },

    categoryPage: async ({ page }, use) => {
        await use(new CategoryPage(page));
    },
});

export { test, expect };
