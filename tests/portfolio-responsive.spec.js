const { test, expect } = require('@playwright/test');

test.describe('Portfólio responsivo', () => {
  test('carrega a página principal e exibe hero, sobre e projetos', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { name: /Construindo soluções com Python/i })).toBeVisible();
    await expect(page.getByText('Repositórios públicos do GitHub')).toBeVisible();
    await expect(page.getByText('Tecnologias observadas no perfil')).toBeVisible();
  });

  test('mantém layout em tablet', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');

    const heroGrid = page.locator('.hero-grid');
    await expect(heroGrid).toBeVisible();

    const projects = page.locator('.project-card');
    await expect(projects.first()).toBeVisible();
    await expect(page.locator('.menu')).toBeVisible();
  });

  test('mantém layout em mobile', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');

    await expect(page.getByRole('heading', { name: /Construindo soluções com Python/i })).toBeVisible();
    await expect(page.locator('.mini-stats')).toBeVisible();
    await expect(page.locator('.projects-grid')).toBeVisible();
    await expect(page.locator('.tech-grid')).toBeVisible();
  });

  test('navegação e botões funcionam em mobile', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');

    await page.getByRole('link', { name: 'Projetos' }).click();
    await expect(page.locator('#projetos')).toBeVisible();

    await page.getByRole('link', { name: 'GitHub' }).first().click();
    await expect(page.url()).toContain('github.com');
  });
});
