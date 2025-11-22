import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

// Page is responsive
test('Regions responds', async ({ page }) => {
    const url = String(process.env.B_URL);

    await page.goto(url);

    await expect(page.getByText("Regions of Finland")).toBeVisible();
})

// Logging in as admin, confirming elements are present and navigation links work
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

    //Successful login
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
    expect(editRegionExists).toBeGreaterThan(0);
    const deleteRegionExists = await page.getByText("Delete").count();
    expect(deleteRegionExists).toBeGreaterThan(0);

    //Add Region page
    await page.getByRole('link', { name: 'Add New Region' }).click();
    await expect(page).toHaveURL(`${url}/region/add`);

    //Home Page
    await page.getByRole('link', { name: 'Home' }).click();
    await expect(page).toHaveURL(url);

    //Edit Region page
    await page
        .locator('tr', { has: page.getByText('Kainuu') })
        .getByRole('link', { name: 'Edit' })
        .click();
    await expect(page.getByText("Image Source Url")).toBeVisible();

    //Home Page
    await page.getByRole('link', { name: 'Home' }).click();
    await expect(page).toHaveURL(url);

    //Select Uusimaa
    await page
        .locator('tr', { has: page.getByText('Uusimaa') })
        .getByRole('link', { name: 'Select' })
        .click();
    await expect(page.getByRole('cell', { name: 'Helsinki', exact: true })).toBeVisible();
    const uusimaaUrl = page.url();

    //Add City page
    await page.getByRole('link', { name: 'Add City' }).click();
    await expect(page).toHaveURL(`${url}/city/add`);

    //Edit City
    await page.goto(uusimaaUrl);
    await page
        .locator('tr', { has: page.getByText('Helsinki') })
        .getByRole('link', { name: 'Edit' })
        .click();
    await expect(page.getByText("Image Source Url")).toBeVisible();

    //Select Helsinki
    await page.goto(uusimaaUrl);
    await page
        .locator('tr', { has: page.getByText('Helsinki') })
        .getByRole('link', { name: 'Select' })
        .click();
    const helsinkiUrl = page.url();

    //Add Location page
    await page.getByRole('link', { name: 'Add New Location' }).click();
    await expect(page.getByText("Image Source Url")).toBeVisible();

    //Edit Central Railway Station
    await page.goto(helsinkiUrl);
    await page
        .locator('tr', { has: page.getByText('Central Railway Station') })
        .getByRole('link', { name: 'Edit' })
        .click();
    await expect(page.getByText("Image Source Url")).toBeVisible();

    //Select Central Railway Station
    await page.goto(helsinkiUrl);
    await page
        .locator('tr', { has: page.getByText('Central Railway Station') })
        .getByRole('link', { name: 'Select' })
        .click();
    const railwaysUrl = page.url();

    //Add comment page
    await page.getByRole('link', { name: 'Add New Comment' }).click();
    await expect(page.getByText("Add Comment for")).toBeVisible();

    //Edit comment page
    await page.goto(railwaysUrl);
    await page
        .locator('tr', { has: page.getByText('Statues') })
        .getByRole('link', { name: 'Edit' })
        .click();
    await expect(page.getByText("Edit commment for")).toBeVisible(); //Typo spotted, fix original!

    //Edit shouldn't exist(only visible to owner)
    await page.goto(railwaysUrl);
    await expect(page
        .locator('tr', { has: page.getByText('Beautiful Views') })
        .getByRole('link', { name: 'Edit' })).toHaveCount(0);
});

// Logging in as user, confirming elements are present and navigation links work
test('User login and navigation', async ({ page }) => {
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
    await name.fill(String(process.env.B_USERNAME2));
    await password.fill(`${String(process.env.B_PASSWORD2)}`);
    await button.click();

    //Successful login
    await expect(page).toHaveURL(url);
    await expect(page.getByText("User:")).toBeVisible();

    //Admin elements
    await expect(page.getByText("Clear Database")).toHaveCount(0);
    await expect(page.getByText("Repopulate Database")).toHaveCount(0);
    await expect(page.getByText("Add New Region")).toHaveCount(0);

    //Admin elements at least 1
    const selectRegionExists = await page.getByText("Select").count();
    expect(selectRegionExists).toBeGreaterThan(0);
    const editRegionExists = await page.getByText("Edit").count();
    expect(editRegionExists).toBeLessThanOrEqual(0);
    const deleteRegionExists = await page.getByText("Delete").count();
    expect(deleteRegionExists).toBeLessThanOrEqual(0);

    //Add Region not present
    await expect(page.getByRole('link', { name: 'Add New Region' })).toHaveCount(0);


    //Edit Region not prsent
    await expect(page
        .locator('tr', { has: page.getByText('Kainuu') })
        .getByRole('link', { name: 'Edit' }))
        .toHaveCount(0)

    //Select Uusimaa
    await page
        .locator('tr', { has: page.getByText('Uusimaa') })
        .getByRole('link', { name: 'Select' })
        .click();
    await expect(page.getByRole('cell', { name: 'Helsinki', exact: true })).toBeVisible();
    const uusimaaUrl = page.url();

    //Add City not present
    await expect(page.getByRole('link', { name: 'Add City' })).toHaveCount(0);

    //Edit City not present
    await page.goto(uusimaaUrl);
    await expect(page
        .locator('tr', { has: page.getByText('Helsinki') })
        .getByRole('link', { name: 'Edit' }))
        .toHaveCount(0);

    //Select Helsinki
    await page.goto(uusimaaUrl);
    await page
        .locator('tr', { has: page.getByText('Helsinki') })
        .getByRole('link', { name: 'Select' })
        .click();
    const helsinkiUrl = page.url();

    //Add Location not present
    await expect(page.getByRole('link', { name: 'Add New Location' })).toHaveCount(0);

    //Edit Central Railway Station mpt present
    await page.goto(helsinkiUrl);
    await expect(page
        .locator('tr', { has: page.getByText('Suomenlinna Fortress') })
        .getByRole('link', { name: 'Edit' }))
        .toHaveCount(0);

    //Select Suomenlinna Fortress
    await page.goto(helsinkiUrl);
    await page
        .locator('tr', { has: page.getByText('Suomenlinna Fortress') })
        .getByRole('link', { name: 'Select' })
        .click();
    const locationUrl = page.url();

    //Add comment page
    await page.getByRole('link', { name: 'Add New Comment' }).click();
    await expect(page.getByText("Add Comment for")).toBeVisible();

    //Edit comment page
    await page.goto(locationUrl);
    await page
        .locator('tr', { has: page.getByText('Great Spot for Sunrise') })
        .getByRole('link', { name: 'Edit' })
        .click();
    await expect(page.getByText("Edit commment for")).toBeVisible(); //Typo spotted, fix original!

    //Edit shouldn't exist(only visible to owner)
    await page.goto(locationUrl);
    await expect(page
        .locator('tr', { has: page.getByText('Majestic Building') })
        .getByRole('link', { name: 'Edit' })).toHaveCount(0);
});