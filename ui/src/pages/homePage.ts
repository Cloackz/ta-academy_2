import { FeaturedIn } from '@Components/featuredIn';
import { Container } from '@Core/container';

export class HomePage extends Container {
    protected LOCATORS = {
        featuredIn: this.page.locator('//section[contains(., "As featured in.")]'),
    };

    public FeaturedIn = new FeaturedIn(this.LOCATORS.featuredIn, this.page);

    public async open(): Promise<void> {
        await this.page.goto('/', { waitUntil: 'domcontentloaded' });
    }
}
