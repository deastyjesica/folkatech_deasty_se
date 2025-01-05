const {By, Builder, until} = require('selenium-webdriver');
require('chromedriver');
const assert = require('assert');
const fs = require('fs');

const takeScreenshot = async (driver, filename) => {
    const image = await driver.takeScreenshot();
    fs.writeFileSync(filename, image, 'base64');
};

describe('Folkatech', function(){
    this.timeout(10000);
    it('1. Login with Valid Credential', async function(){
        const chai = await import('chai');
        chai.should();
        let driver = await new Builder().forBrowser('chrome').build();
        await driver.get('https://lapor.folkatech.com/');
        await driver.manage().window().maximize();     
        await driver.findElement(By.xpath("//input[@type='email']")).sendKeys("admin@example.com");
        await driver.findElement(By.xpath("//input[@type='password']")).sendKeys("password");
        await driver.findElement(By.xpath("//button[@type='submit']")).click();
        await driver.wait(until.elementsLocated(By.xpath("//h3[@class='mb-3' and text()='Dashboard']")), 5000);

        await takeScreenshot(driver, './login-valid.png')
        
        await driver.quit();
    })

    it('2. Login with Invalid Credential', async function(){
        const chai = await import('chai');
        chai.should();
        let driver = await new Builder().forBrowser('chrome').build();
        await driver.get('https://lapor.folkatech.com/');
        await driver.manage().window().maximize();     
        await driver.findElement(By.xpath("//input[@type='email']")).sendKeys("admin123@example.com");
        await driver.findElement(By.xpath("//input[@type='password']")).sendKeys("password123");
        await driver.findElement(By.xpath("//button[@type='submit']")).click();
        await driver.wait(until.elementsLocated(By.xpath("//label[@role='alert' and text()='Login Gagal! Akun tidak ada.']")), 5000);

        await takeScreenshot(driver, './error-login-invalid.png');

        await driver.quit();
    })
})