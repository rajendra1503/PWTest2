import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
    await page.goto('file:///C:/HTML/playwright-locators-practice.html');
})

test('Product 2 checkbox is disabled', async ({ page }) => {

    const chkProd2 = page.getByRole('listitem')
        .filter({ hasText: 'Product 2' })
        .getByRole('checkbox');
    await expect(chkProd2).toBeDisabled();
    console.log(await chkProd2.isDisabled());

})

test('Only 2 checkboxes are enabled', async ({ page }) => {

    await expect(page.getByRole('listitem')
        .filter({ hasText: /Status: In Stock/ }).getByRole('checkbox')).toHaveCount(2);


    console.log("No. of enabled check boxes are: " + await page.getByRole('listitem')
        .filter({ hasText: /Status: In Stock/ }).getByRole('checkbox').count());
})

test('Select checkbox only for In Stock products', async({page}) => {

    const enabledCheckboxes = page.getByRole('listitem')
                                .filter({hasText: /Status: In Stock/ }).getByRole('checkbox');

    console.log("No. of enabled checkboxes are: " + await enabledCheckboxes.count());
    let cnt: number = await enabledCheckboxes.count();

    for (let i = 0; i < cnt; i++) {
        await enabledCheckboxes.nth(i).check();
        await page.waitForTimeout(3000);
    }
    
})

test('Try selecting checkbox for Product 2', async({page}) => {

    const chkProd2 = page.getByRole('listitem')
                    .filter({hasText: /Out of Stock/})
                    .getByRole('checkbox');
    
/*     await chkProd2.check();

    await expect(chkProd2).not.toBeChecked(); */

    await expect(async() => {
        await chkProd2.check()
    }).rejects.toThrow();
})

test('Click Add to cart only for In Stock products - validate Button turns green and Text becomes "Added"', async({page}) => {

    const allInStockButtons = page.getByRole('listitem')
                                .filter({hasText: 'Status: In Stock'})
                                .getByTestId('add-btn');

    let cnt: number = 0;
    cnt = await allInStockButtons.count();
    
    for (let i = 0; i < cnt; i++) {
        const element = allInStockButtons.nth(i);
        await element.click();
        await page.waitForTimeout(1500);
        await expect(element).toHaveText('Added');
        await expect(element).toHaveCSS('background-color', 'rgb(0, 128, 0)');
    }

/*         await expect(allInStockButtons).toHaveText(['Added', 'Added']);
        await expect(allInStockButtons).toHaveCSS('background-color', 'rgb(0, 128, 0)'); */
})

test('Click Add to cart for Out of Stock - validate Button turns red and Text becomes "Out of Stock"', async({page}) => {

    const allInStockButtons = page.getByRole('listitem')
                                .filter({hasText: 'Status: Out of Stock'})
                                .getByTestId('add-btn');
    
    let cnt: number = 0;
    cnt = await allInStockButtons.count();
    
    for (let i = 0; i < cnt; i++) {
        const element = allInStockButtons.nth(i);
        await element.click();
        await page.waitForTimeout(1500);
        await expect(element).toHaveText('Out of Stock');
        await expect(element).toHaveCSS('background-color', 'rgb(255, 0, 0)')
    }
})

test('Combined Filtering', async({page}) => {

    const chkProd3 = page.getByRole('listitem')
                    .filter({hasText: 'Product 3'})
                    .filter({hasText: /In Stock/})
                    .getByRole('checkbox');
    const btnAddProd3 = page.getByRole('listitem')
                    .filter({hasText: 'Product 3'})
                    .filter({hasText: /In Stock/})
                    .getByTestId('add-btn');

    await chkProd3.check();                    
    await btnAddProd3.click();

})

test('Negative Testing - Verify No disabled checkbox belongs to In Stock product', async({page}) => {

    const inStockCheckboxes = page.getByRole('listitem')
                                .filter({hasText: /In Stock/})
                                .getByRole('checkbox');

    let cnt: number = 0;
    cnt = await inStockCheckboxes.count();
    console.log("No. of checkboxes are: " + cnt);
    

    for (let i = 0; i < cnt; i++) {
        const element = inStockCheckboxes.nth(i);
        await expect(element).not.toBeDisabled();
        
    }
})

test('Verify - No green button exists for Out of Stock product', async({page}) => {

    const btnOutOfStock = page.getByRole('listitem')
                            .filter({hasText: /Out of Stock/})
                            .getByTestId('add-btn');

    await btnOutOfStock.click();

    let colour: string;
    colour = await btnOutOfStock.evaluate(el => getComputedStyle(el).backgroundColor);
    console.log("Button color after clicking is: " + colour);
    
    
    await expect(btnOutOfStock).not.toHaveCSS('background-color','rgb(0, 128, 0)');
})

test('count items in list', async({page}) => {

    const lstProducts = page.getByRole('listitem');

    let cnt: number = await lstProducts.count();
    console.log('No. of items in list: ' + cnt);
    await expect(lstProducts).toHaveCount(cnt);
    
})