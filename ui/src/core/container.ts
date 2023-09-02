import type { Page } from 'playwright-core';

export class Container {
    public constructor(protected page: Page) {}
}
