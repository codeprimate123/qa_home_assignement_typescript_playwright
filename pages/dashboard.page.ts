import { type Locator, type Page } from '@playwright/test';
import { BasePage } from '@/pages/base.page';

export class DashboardPage extends BasePage {
  readonly dashboardHeading: Locator;

  constructor(page: Page) {
    super(page);
    this.dashboardHeading = page.getByRole('heading', { name: 'Dashboard' });
  }
}