import { Page } from "puppeteer"

export async function contarCupons(page: Page): Promise<number> {
  let totalCupons = 0

  async function processarLotes(): Promise<void> {
    await page.waitForSelector(
      '[id^="conteudo_grvConsultarLotesEnviados_lkbNumeroRecibo_"]',
      { visible: true, timeout: 5000 }
    )

    const lotes = await page.$$eval(
      '[id^="conteudo_grvConsultarLotesEnviados_lkbNumeroRecibo_"]',
      (links) => links.map((link) => link.id)
    )

    for (const loteId of lotes) {
      await page.click(`#${loteId}`)
      await page.waitForSelector("#conteudo_lblQuantidadeCupons", {
        visible: true,
      })

      const quantidadeCupons = await page.$eval(
        "#conteudo_lblQuantidadeCupons",
        (span) => parseInt(span.textContent || "0", 10)
      )
      totalCupons += quantidadeCupons

      console.log(`Lote ${loteId} possui ${quantidadeCupons} cupons.`)

      await new Promise((resolve) => setTimeout(resolve, 2000))

      await page.waitForSelector("#conteudo_btnSair", { visible: true })
      await page.click("#conteudo_btnSair")
      await page.waitForSelector(`#${loteId}`, { visible: true }) // Garantir que voltou à página principal
    }
  }

  // Processar lotes e navegar entre páginas
  do {
    await processarLotes()

    const botaoProximaExiste = await page.$("#conteudo_lnkBtnProxima")
    if (botaoProximaExiste) {
      await page.click("#conteudo_lnkBtnProxima")
      await new Promise((resolve) => setTimeout(resolve, 3000))
      await page.waitForSelector(
        '[id^="conteudo_grvConsultarLotesEnviados_lkbNumeroRecibo_"]',
        { visible: true, timeout: 5000 }
      )
    } else {
      break
    }
  } while (true)

  console.log(`Total de cupons encontrados: ${totalCupons}`)
  return totalCupons
}
