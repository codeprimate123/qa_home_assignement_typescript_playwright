import { type Locator, type Page } from '@playwright/test';
import { BasePage } from '@/pages/base.page';

export class LoginPage extends BasePage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly invalidCredentialsMessage: Locator;
  readonly usernameError: Locator;
  readonly passwordError: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.getByPlaceholder(/username/i);
    this.passwordInput = page.getByPlaceholder(/password/i);
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.invalidCredentialsMessage = page.locator('.oxd-alert-content-text');
    this.usernameError = this.getValidationErrorByLabel('Username');
    this.passwordError = this.getValidationErrorByLabel('Password');
  }

  async goto() {
    await this.page.goto('/web/index.php/auth/login');
  }

  async inputUsername(username: string) {
    await this.usernameInput.fill(username);
  }

  async inputPassword(password: string) {
    await this.passwordInput.fill(password);
  }


  async login(username: string, password?: string) {
    await this.goto();
    await this.inputUsername(username);
    if (password) await this.inputPassword(password);
    await this.loginButton.click();
  }
}