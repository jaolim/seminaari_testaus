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

// Logging in as user, confirming correct elements are shown or hidden and testing navigation links
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

//Add, edit and delete region
test('Regions CRUD', async ({ page }) => {
    const url = `${String(process.env.B_URL)}`;

    //logging in
    await page.goto(`${url}/login`);
    await page.getByLabel("User Name :").fill(String(process.env.B_USERNAME1))
    await page.getByLabel("Password:").fill(`${String(process.env.B_PASSWORD1)}`);
    await page.getByRole('button', { name: 'Sign In' }).click()

    //Add region page
    await page.goto(`${url}/region/add`)
    const addButton = page.getByRole('button', { name: "Save" });
    const addName = page.locator('input[name="name"]');
    const addDescription = page.locator('input[name="description"]');
    const addImage = page.locator('input[name="image"]');

    //Missing name error
    await addButton.click();
    await expect(page.getByText("Region name is required.")).toBeVisible();

    //Duplicate name error
    await addName.fill("Uusimaa");
    await addButton.click();
    await expect(page.getByText("Region by the name of Uusimaa already exists.")).toBeVisible();

    //Add new
    await addName.fill("Playwright");
    await addDescription.fill("Region generated by a test; delete if present");
    await addImage.fill("Not a real image source!");
    await addButton.click();
    await expect(page).toHaveURL(url);

    //Added with correct values
    await expect(page.getByText("Playwright")).toBeVisible();
    await expect(page.getByText("Region generated by a test; delete if present")).toBeVisible();

    //Edit added region
    await page
        .locator('tr', { has: page.getByText('Playwright') })
        .getByRole('link', { name: 'Edit' })
        .click();
    const editButton = page.getByRole('button', { name: "Save" });
    const editName = page.locator('input[name="name"]');
    const editDescription = page.locator('input[name="description"]');
    const editImage = page.locator('input[name="image"]');

    await addName.fill("EditTest");
    await addDescription.fill("This is an edit test; delete if present");
    await addImage.fill("test");
    await addButton.click();
    await expect(page).toHaveURL(url);

    //Edited with correct values
    await expect(page.getByText("EditTest")).toBeVisible();
    await expect(page.getByText("This is an edit test; delete if present")).toBeVisible();

    //Delete added region
    await page
        .locator('tr', { has: page.getByText('EditTest') })
        .getByRole('link', { name: 'Delete' })
        .click();
    await expect(page.getByText("EditTest")).toHaveCount(0);
});

//Add, edit and delete city
test('Cities CRUD', async ({ page }) => {
    const url = `${String(process.env.B_URL)}`;

    //logging in
    await page.goto(`${url}/login`);
    await page.getByLabel("User Name :").fill(String(process.env.B_USERNAME1))
    await page.getByLabel("Password:").fill(`${String(process.env.B_PASSWORD1)}`);
    await page.getByRole('button', { name: 'Sign In' }).click()

    //Add city page
    await page.goto(`${url}/city/add`)
    const addButton = page.getByRole('button', { name: "Save" });
    const addName = page.locator('input[name="name"]');
    const addPopulation = page.locator('input[name="population"]');
    const addArea = page.locator('input[name="area"]');
    const addDescription = page.locator('input[name="description"]');
    const addImage = page.locator('input[name="image"]');

    //Missing name error
    await addButton.click();
    await expect(page.getByText("City name is required.")).toBeVisible();

    //Population error
    await addName.fill("Playwright");
    await addButton.click();
    await expect(page.getByText("Population has to be a positive integer and Area has to be a positive number")).toBeVisible();
    await addPopulation.fill("123");

    //Area error
    await addName.fill("Playwright");
    await addButton.click();
    await expect(page.getByText("Population has to be a positive integer and Area has to be a positive number")).toBeVisible();

    //Duplicate name error
    await addName.fill("Helsinki");
    await addPopulation.fill("123");
    await addArea.fill("321");
    await addButton.click();
    await expect(page.getByText("City by the name of Helsinki already exists.")).toBeVisible();

    //Add new city
    await page.locator('#regions').selectOption({ label: 'Uusimaa' });
    await addName.fill("Playwright");
    await addPopulation.fill("123");
    await addArea.fill("321");
    await addDescription.fill("City generated by a test; delete if present");
    await addImage.fill("Not a real image source!");
    await addButton.click();
    await expect(page.getByText("Playwright")).toBeVisible();

    //Edit added city
    await page
        .locator('tr', { has: page.getByText('Playwright') })
        .getByRole('link', { name: 'Edit' })
        .click();
    const editButton = page.getByRole('button', { name: "Save" });
    const editName = page.locator('input[name="name"]');
    const editPopulation = page.locator('input[name="population"]');
    const editArea = page.locator('input[name="area"]');
    const editDescription = page.locator('input[name="description"]');
    const editImage = page.locator('input[name="image"]');

    await addName.fill("CityEdit");
    await addDescription.fill("This is an edit test; delete if present");
    await addImage.fill("test");
    await addButton.click();
    await expect(page.getByText("CityEdit")).toBeVisible();

    //Delete added city
    await page
        .locator('tr', { has: page.getByText('CityEdit') })
        .getByRole('link', { name: 'Delete' })
        .click();
    await expect(page.getByText("CityEdit")).toHaveCount(0);
});

//Add, edit and delete location
test('Locations CRUD', async ({ page }) => {
    const url = `${String(process.env.B_URL)}`;

    //logging in
    await page.goto(`${url}/login`);
    await page.getByLabel("User Name :").fill(String(process.env.B_USERNAME1))
    await page.getByLabel("Password:").fill(`${String(process.env.B_PASSWORD1)}`);
    await page.getByRole('button', { name: 'Sign In' }).click()

    //Add location page
    await page
        .locator('tr', { has: page.getByText('Uusimaa') })
        .getByRole('link', { name: 'Select' })
        .click();
    await page
        .locator('tr', { has: page.getByText('Helsinki') })
        .getByRole('link', { name: 'Select' })
        .click();
    await page.getByRole('link', { name: 'Add New Location' }).click();
    await expect(page).toHaveURL(`${url}/location/add`);

    //Add location elements
    const addButton = page.getByRole('button', { name: "Save" });
    const addName = page.locator('input[name="name"]');
    const addDescription = page.locator('input[name="description"]');
    const addAddress = page.locator('input[name="address"]');
    const addImage = page.locator('input[name="image"]');

    //Missing name error
    await addButton.click();
    await expect(page.getByText("Location name is required.")).toBeVisible();

    //Duplicate name error
    await addName.fill("Central Railway Station");
    await addButton.click();
    await expect(page.getByText("Location by the name of Central Railway Station already exists.")).toBeVisible();

    //Add location
    await page.locator('#cities').selectOption({ label: 'Helsinki' });
    await addName.fill("Playwright");
    addDescription.fill("Test location; delete if present")
    addAddress.fill("A dress for addressing the added address")
    addImage.fill("Add image test");
    await addButton.click();
    await expect(page.getByText("Playwright")).toBeVisible();

    //Edit location
    await page
        .locator('tr', { has: page.getByText('Playwright') })
        .getByRole('link', { name: 'Edit' })
        .click();
    const editButton = page.getByRole('button', { name: "Save" });
    const editName = page.locator('input[name="name"]');
    const editDescription = page.locator('input[name="description"]');
    const editAddress = page.locator('input[name="address"]');
    const editImage = page.locator('input[name="image"]');

    await addName.fill("EditedLocation");
    addDescription.fill("Edited location; delete if present")
    addAddress.fill("Edited address")
    addImage.fill("edited image test");
    await addButton.click();
    await expect(page.getByText("EditedLocation")).toBeVisible();

    //Delete added location
    await page
        .locator('tr', { has: page.getByText('EditedLocation') })
        .getByRole('link', { name: 'Delete' })
        .click();
    await expect(page.getByText("EditedLocation")).toHaveCount(0);
});

//Add, edit and delete comments
test('Comments CRUD', async ({ page }) => {
    const url = `${String(process.env.B_URL)}`;

    //logging in
    await page.goto(`${url}/login`);
    await page.getByLabel("User Name :").fill(String(process.env.B_USERNAME1))
    await page.getByLabel("Password:").fill(`${String(process.env.B_PASSWORD1)}`);
    await page.getByRole('button', { name: 'Sign In' }).click()

    //Add comment page
    await page
        .locator('tr', { has: page.getByText('Uusimaa') })
        .getByRole('link', { name: 'Select' })
        .click();
    await page
        .locator('tr', { has: page.getByText('Helsinki') })
        .getByRole('link', { name: 'Select' })
        .click();
    await page
        .locator('tr', { has: page.getByText('Central Railway Station') })
        .getByRole('link', { name: 'Select' })
        .click();
    const railwayUrl = page.url();
    await page.getByRole('link', { name: 'Add New Comment' }).click();
    await expect(page).toHaveURL(`${railwayUrl}/comment/add`);

    //Add comment elements
    const addButton = page.getByRole('button', { name: "Save" });
    const addHeadline = page.locator('input[name="headline"]');
    const addBody = page.locator('input[name="body"]');

    //Headline required
    await addButton.click();
    await expect(page.getByText('Comment headline is required.')).toBeVisible();

    //Body required
    await addHeadline.fill("Headline")
    await addButton.click();
    await expect(page.getByText('Comment body is required.')).toBeVisible();

    //Add comment
    await addHeadline.fill("Playwright")
    await addBody.fill("Test comment; delete if present");
    await addButton.click();
    await expect(page.getByText('Playwright')).toBeVisible();

    //Edit location
    await page
        .locator('tr', { has: page.getByText('Playwright') })
        .getByRole('link', { name: 'Edit' })
        .click();
    const editButton = page.getByRole('button', { name: "Save" });
    const editHeadline = page.locator('input[name="headline"]');
    const editBody = page.locator('input[name="body"]');

    await editHeadline.fill("EditedHeadline")
    await editBody.fill("Edited comment test; delete if present");
    await editButton.click();
    await expect(page.getByText('EditedHeadline')).toBeVisible();

    //Delete added comment
    await page
        .locator('tr', { has: page.getByText('EditedHeadline') })
        .getByRole('link', { name: 'Delete' })
        .click();
    await expect(page.getByText("EditedHeadline")).toHaveCount(0);
});

//Clear and repopulate database - remove comments to enable
/* 
test('Database', async ({ page }) => {
    const url = `${String(process.env.B_URL)}`;

    //logging in
    await page.goto(`${url}/login`);
    await page.getByLabel("User Name :").fill(String(process.env.B_USERNAME1))
    await page.getByLabel("Password:").fill(`${String(process.env.B_PASSWORD1)}`);
    await page.getByRole('button', { name: 'Sign In' }).click()

    //Clear database
    await page.getByRole('link', { name: "Clear Database" }).click();
    await expect(page.getByText('Select')).toHaveCount(0);

    //Repopulate database
    await page.getByRole('link', { name: "Repopulate Database" }).click();
    const selectRegionExists = await page.getByText("Select").count();
    expect(selectRegionExists).toBeGreaterThan(0);
});
*/