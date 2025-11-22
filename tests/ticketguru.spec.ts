import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

// Page is responsive
test('TicketGuru responds', async ({ page }) => {
    const url = String(process.env.T_URL);

    await page.goto(url);

    await expect(page.getByText("pääsylippusi")).toBeVisible();
})

// Logging in as admin
test('Login works admin', async ({ page }) => {
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

// Logging in as user
test('Login works user', async ({ page }) => {
    const url = `${String(process.env.T_URL)}/login`;

    await page.goto(url);

    await expect(page.getByText("Please sign in")).toBeVisible();

    const name = page.getByPlaceholder("Username");
    const password = page.getByPlaceholder("Password");
    const button = page.getByRole("button");

    await name.fill(String(process.env.T_USERNAME2));
    await password.fill(`${String(process.env.T_PASSWORD2)}`);
    await button.click();

    await expect(page.getByText("pääsylippusi")).toBeVisible();

})

// Testing navigation links
test('Endpoints', async ({ page }) => {
    const url = `${String(process.env.T_URL)}`;

    //logging in 
    await page.goto(`${url}/login`);
    await expect(page.getByText("Please sign in")).toBeVisible();
    await page.getByPlaceholder("Username").fill(String(process.env.T_USERNAME1));
    await page.getByPlaceholder("Password").fill(`${String(process.env.T_PASSWORD1)}`);
    await page.getByRole("button").click();
    await expect(page.getByText("pääsylippusi")).toBeVisible();

    // /sell endpoint
    await page.getByRole('link', { name: "Sell Tickets" }).click();
    await expect(page.getByRole('link', { name: "Create Sale" })).toBeVisible();
    await page.getByRole('link', { name: "Home" }).click();
    await expect(page).toHaveURL(url);

    // /eventpage endpoint
    await page.getByRole('link', { name: "Events" }).click();
    await expect(page.getByRole('button', { name: "Add New Event" })).toBeVisible();
    await page.getByRole('link', { name: "Home" }).click();
    await expect(page).toHaveURL(url);

    // /venuepage endpoint
    await page.getByRole('link', { name: "Venues" }).click();
    await expect(page.getByRole('button', { name: "Add New Venue" })).toBeVisible();
    await page.getByRole('link', { name: "Home" }).click();
    await expect(page).toHaveURL(url);

    // /eventpage userpage
    await page.getByRole('link', { name: "Users" }).click();
    await expect(page.getByRole('button', { name: "Add New User" })).toBeVisible();
    await page.getByRole('link', { name: "Home" }).click();
    await expect(page).toHaveURL(url);

})

