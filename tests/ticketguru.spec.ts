import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

test('TicketGuru responds', async ({ page }) => {
    const url = String(process.env.T_URL);

    await page.goto(url);

    await expect(page.getByText("Pääsylippusi")).toBeVisible();
})
