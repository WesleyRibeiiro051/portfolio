# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: portfolio-responsive.spec.js >> Portfólio responsivo >> mantém layout em mobile
- Location: tests\portfolio-responsive.spec.js:24:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('heading', { name: /Construindo soluções com Python/i })
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByRole('heading', { name: /Construindo soluções com Python/i })

```

```yaml
- heading "Directory listing for /" [level=1]
- separator
- list
- separator
```

# Test source

```ts
  1  | const { test, expect } = require('@playwright/test');
  2  | 
  3  | test.describe('Portfólio responsivo', () => {
  4  |   test('carrega a página principal e exibe hero, sobre e projetos', async ({ page }) => {
  5  |     await page.goto('/');
  6  | 
  7  |     await expect(page.getByRole('heading', { name: /Construindo soluções com Python/i })).toBeVisible();
  8  |     await expect(page.getByText('Repositórios públicos do GitHub')).toBeVisible();
  9  |     await expect(page.getByText('Tecnologias observadas no perfil')).toBeVisible();
  10 |   });
  11 | 
  12 |   test('mantém layout em tablet', async ({ page }) => {
  13 |     await page.setViewportSize({ width: 768, height: 1024 });
  14 |     await page.goto('/');
  15 | 
  16 |     const heroGrid = page.locator('.hero-grid');
  17 |     await expect(heroGrid).toBeVisible();
  18 | 
  19 |     const projects = page.locator('.project-card');
  20 |     await expect(projects.first()).toBeVisible();
  21 |     await expect(page.locator('.menu')).toBeVisible();
  22 |   });
  23 | 
  24 |   test('mantém layout em mobile', async ({ page }) => {
  25 |     await page.setViewportSize({ width: 390, height: 844 });
  26 |     await page.goto('/');
  27 | 
> 28 |     await expect(page.getByRole('heading', { name: /Construindo soluções com Python/i })).toBeVisible();
     |                                                                                           ^ Error: expect(locator).toBeVisible() failed
  29 |     await expect(page.locator('.mini-stats')).toBeVisible();
  30 |     await expect(page.locator('.projects-grid')).toBeVisible();
  31 |     await expect(page.locator('.tech-grid')).toBeVisible();
  32 |   });
  33 | 
  34 |   test('navegação e botões funcionam em mobile', async ({ page }) => {
  35 |     await page.setViewportSize({ width: 390, height: 844 });
  36 |     await page.goto('/');
  37 | 
  38 |     await page.getByRole('link', { name: 'Projetos' }).click();
  39 |     await expect(page.locator('#projetos')).toBeVisible();
  40 | 
  41 |     await page.getByRole('link', { name: 'GitHub' }).first().click();
  42 |     await expect(page.url()).toContain('github.com');
  43 |   });
  44 | });
  45 | 
```