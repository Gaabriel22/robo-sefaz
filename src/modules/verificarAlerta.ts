import { Page } from "puppeteer"

export async function verificarAlerta(page: Page): Promise<void> {
  return new Promise(async (resolve) => {
    try {
      await page.waitForSelector(".ui-dialog-buttonset button.ui-button", {
        visible: true,
        timeout: 5000,
      })

      await page.click(".ui-dialog-buttonset button.ui-button")

      console.log("Caixa de alerta fechada")

      await page.waitForSelector("body")

      await page.reload()

      resolve()
    } catch (error) {
      console.log("Caixa de alerta não encontrada ou outro erro:")

      resolve()
    }
  })
}
