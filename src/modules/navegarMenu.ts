import { Page } from "puppeteer"

export async function navegarMenu(page: Page): Promise<void> {
  await page.waitForSelector("a.menuroot")
  await page.hover("a.menuroot")

  await page.waitForSelector(
    'a[href="/COMSAT/Private/ConsultarLotesEnviados/PesquisaLotesEnviados.aspx"]'
  )
  await page.click(
    'a[href="/COMSAT/Private/ConsultarLotesEnviados/PesquisaLotesEnviados.aspx"]'
  )

  console.log(
    'Acesso à página "Consultar Lotes Enviados" realizado com sucesso!'
  )
}
