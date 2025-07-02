import { type Locator, type Page } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Finds a form field's validation error message by looking for the field's label.
   * This is useful for generic messages like "Required".
   * @param label The text of the label associated with the form field (e.g., "Username").
   * @returns A locator for the validation message.
   */
  getValidationErrorByLabel(label: string): Locator {
    return this.page.locator('.oxd-input-group').filter({ hasText: label }).locator('.oxd-input-field-error-message');
  }
}