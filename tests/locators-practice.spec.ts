import {test,expect} from '@playwright/test'

test('Use getByRole locator', async({page}) => {

    await page.goto('file:///C:/HTML/playwright-locators-practice.html');
    await expect(page.getByRole('button', {name: 'Login'})).toBeVisible();
    await page.getByRole('button', {name: 'Login'}).click();
})

test('Use getByPlaceholder locator', async({page}) => {

    await page.goto('file:///C:/HTML/playwright-locators-practice.html', {waitUntil: 'domcontentloaded'});
    await page.getByPlaceholder('Enter username', {exact: true}).fill('test user');
})

test('Click “Visible Button” only', async({page}) => {

    await page.goto('file:///C:/HTML/playwright-locators-practice.html', {waitUntil: 'domcontentloaded'});
    // const btnVisibleButton = page.getByRole('button', {name: 'Visible Button'});
    const btnVisibleButton = page.getByText('Visible Button', {exact: true});
    await expect(btnVisibleButton).toBeVisible();
    await btnVisibleButton.click();
})