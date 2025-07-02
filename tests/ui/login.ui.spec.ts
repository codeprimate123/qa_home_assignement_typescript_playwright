import { test, expect } from '@playwright/test';
import { LoginPage } from '@/pages/login.page';
import { DashboardPage } from '@/pages/dashboard.page';

test.describe('Login Functionality', () => {
  test('should allow a user to log in with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const username = process.env.UI_USERNAME!;
    const password = process.env.UI_PASSWORD!;

    await loginPage.login(username, password);

    const dashboardPage = new DashboardPage(page);
    await expect(dashboardPage.dashboardHeading).toBeVisible();
  });

  test('should show an error for fully invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await loginPage.login('invalid_user', 'invalid_password');

    await expect(loginPage.invalidCredentialsMessage).toHaveText('Invalid credentials');
    await expect(dashboardPage.dashboardHeading).not.toBeVisible();
  });

  test('should show an error for a valid username and invalid password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const username = process.env.UI_USERNAME!;

    await loginPage.login(username, 'invalid_password');

    await expect(loginPage.invalidCredentialsMessage).toHaveText('Invalid credentials');
    await expect(dashboardPage.dashboardHeading).not.toBeVisible();
  });

  test('should show an error for an invalid username and valid password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const password = process.env.UI_PASSWORD!;

    await loginPage.login('invalid_user', password);

    await expect(loginPage.invalidCredentialsMessage).toHaveText('Invalid credentials');
    await expect(dashboardPage.dashboardHeading).not.toBeVisible();
  });
  
  test('should show "Required" error when fields are empty', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.loginButton.click();

    await expect(loginPage.usernameError).toHaveText('Required');
    await expect(loginPage.passwordError).toHaveText('Required');
  });

  test('should show "Required" error when password is empty', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const username = process.env.UI_USERNAME!;

    await loginPage.inputUsername(username);
    await loginPage.loginButton.click();

    await expect(loginPage.usernameError).toHaveText('Required');
    await expect(dashboardPage.dashboardHeading).not.toBeVisible();
    });
});
