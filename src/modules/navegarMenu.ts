import { Page } from "puppeteer"

export async function navegarMenu(page: Page): Promise<void> {
  try {
    await page.waitForSelector(".ui-dialog-buttonpane button.ui-button", {
      visible: true,
      timeout: 3000,
    })
    await page.click(".ui-dialog-buttonpane button.ui-button")
    console.log("Alerta fechado com sucesso!")
  } catch (error) {
    console.log("Alerta não encontrado. Seguindo o fluxo normalmente...")
  }

  await page.waitForSelector("a.menuroot", { visible: true, timeout: 3000 })
  await page.hover("a.menuroot")

  await page.waitForSelector(
    'a[href="/COMSAT/Private/ConsultarLotesEnviados/PesquisaLotesEnviados.aspx"]'
  )
  await page.click(
    'a[href="/COMSAT/Private/ConsultarLotesEnviados/PesquisaLotesEnviados.aspx"]'
  )

  console.log(
    'Acesso a pagina "Consultar Lotes Enviados" realizado com sucesso!'
  )
}
