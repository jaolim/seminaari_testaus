import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

test('Regions responds', async ({ page }) => {
    const url = String(process.env.B_URL);

    await page.goto(url);

    await expect(page.getByText("Regions of Finland")).toBeVisible();
})

test('Admin login and navigation', async ({ page }) => {
    const url = `${String(process.env.B_URL)}`;

    //home page
    await page.goto(url);
    await expect(page.getByText("Regions of Finland")).toBeVisible();

    //login page
    await page.getByRole('link', { name: 'Login' }).click();
    await expect(page).toHaveURL(`${url}/login`);

    //input elements
    const name = page.getByLabel("User Name :");
    const password = page.getByLabel("Password:");
    const button = page.getByRole('button', { name: 'Sign In' });

    //Correct error message
    await button.click();
    await expect(page.getByText("Invalid username or password.")).toBeVisible();

    //Filling user details
    await name.fill(String(process.env.B_USERNAME1));
    await password.fill(`${String(process.env.B_PASSWORD1)}`);
    await button.click();

    //Successfull login
    await expect(page).toHaveURL(url);
    await expect(page.getByText("User:")).toBeVisible();

    //Admin elements
    await expect(page.getByText("Clear Database")).toBeVisible();
    await expect(page.getByText("Repopulate Database")).toBeVisible();
    await expect(page.getByText("Add New Region")).toBeVisible();

    //Admin elements at least 1
    const selectRegionExists = await page.getByText("Select").count();
    expect(selectRegionExists).toBeGreaterThan(0);
    const editRegionExists = await page.getByText("Edit").count();
    expect(selectRegionExists).toBeGreaterThan(0);
    const deleteRegionExists = await page.getByText("Delete").count();
    expect(selectRegionExists).toBeGreaterThan(0);
    
});