import {test,expect} from '@playwright/test'

test('Click Add to cart for Product 2', async({page}) => {

    await page.goto('http://localhost:3000/playwright-locators-practice.html');
    await page.waitForTimeout(3000);
    await page.getByRole('listitem')
        .filter({has: page.getByRole('heading', {name: 'Product 2'})})
        .getByTestId('add-btn')
        .click();
})

test('Click Add to cart for Product 3 using regex', async({page}) => {

    await page.goto('http://localhost:3000/playwright-locators-practice.html');
    await page.waitForTimeout(3000);
    await page.getByRole('listitem')
        .filter({hasText: /Product 3/})
        .getByRole('button')
        .click();
})

test('Count products having “In Stock', async({page}) => {

    await page.goto('http://localhost:3000/playwright-locators-practice.html');
    await page.waitForTimeout(3000);
/*     const statusLocator = page.locator("#products > li > p");
    console.log('No. of status paragraph elements: ' + await statusLocator.count());
    
    expect(statusLocator).toHaveCount(3);
    let cnt: number = await statusLocator.count();
    let cntInStock: number = 0;

    for (let index: number = 0; index < cnt; index++) {
        const statusText = await statusLocator.nth(index).textContent();
        if (statusText === "Status: In Stock") {
            cntInStock++;
        }        
    } */

    const inStockItems = page.getByRole('listitem')
  .filter({ hasText: 'In Stock' });
    console.log("Count products having 'In Stock' is: " + await inStockItems.count());
    await expect(inStockItems).toHaveCount(2);
    
})