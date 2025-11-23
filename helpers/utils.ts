import { Page } from '@playwright/test';

export async function trClickIfExists(page: Page, row: string, element: string) {
    const clickable = page
    .locator('tr', { hasText: row })
    .getByRole('link', { name: element })

    if (await clickable.count()) {
        await clickable.click();
    }
}