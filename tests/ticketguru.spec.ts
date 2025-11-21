import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

test('TicketGuru responds', async ({ page }) => {
    const url = String(process.env.T_URL);

    await page.goto(url);

    await expect(page.getByText("pääsylippusi")).toBeVisible();
})

test('Login works', async ({ page }) => {
    const url = `${String(process.env.T_URL)}/login`;

    await page.goto(url);

    await expect(page.getByText("Please sign in")).toBeVisible();

    const name = page.getByPlaceholder("Username");
    const password = page.getByPlaceholder("Password");
    const button = page.getByRole("button");

    await name.fill(String(process.env.T_USERNAME1));
    await password.fill(`${String(process.env.T_PASSWORD1)}`);
    await button.click();

    await expect(page.getByText("pääsylippusi")).toBeVisible();
    
})