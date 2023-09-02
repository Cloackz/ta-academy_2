import { Component } from '@Core/component';
import type { Locator } from '@playwright/test';

export class FeaturedIn extends Component {
    protected LOCATORS = {
        magazine: this.locator.locator('//li'),
    };

    public async scrollToSection(): Promise<void> {
        await this.locator.scrollIntoViewIfNeeded();
    }

    public async getMagazines(): Promise<Locator[]> {
        return await this.LOCATORS.magazine.all();
    }
}
