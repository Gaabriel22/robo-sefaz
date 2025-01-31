import { Page } from "puppeteer"

export async function preencherNumeroSerie(
  page: Page,
  numeroSerie: string
): Promise<void> {
  await page.waitForSelector("#conteudo_txtNumeroSerie", {
    visible: true,
    timeout: 5000,
  })

  await page.focus("#conteudo_txtNumeroSerie")
  await page.click("#conteudo_txtNumeroSerie", { clickCount: 3 })
  await page.keyboard.press("Backspace")
  await page.type("#conteudo_txtNumeroSerie", numeroSerie, { delay: 150 })

  console.log(`Número de Série preenchido: ${numeroSerie}`)
}

function obterDataAnterior(): string {
  const hoje = new Date()
  hoje.setDate(hoje.getDate() - 1) // Subtrai 1 dia
  const dia = String(hoje.getDate()).padStart(2, "0")
  const mes = String(hoje.getMonth() + 1).padStart(2, "0") // Janeiro é 0
  const ano = hoje.getFullYear()
  return `${dia}/${mes}/${ano}`
}

export async function preencherDatas(page: Page): Promise<void> {
  const dataAnterior = obterDataAnterior()

  await page.waitForSelector("#conteudo_txtDataInicio", { visible: true })
  await page.focus("#conteudo_txtDataInicio")
  await page.click("#conteudo_txtDataInicio", { clickCount: 3 })
  await page.keyboard.press("Backspace")
  await page.type("#conteudo_txtDataInicio", dataAnterior, { delay: 150 })

  console.log(`Data de Início preenchida: ${dataAnterior}`)

  await page.waitForSelector("#conteudo_txtDataTermino", { visible: true })
  await page.focus("#conteudo_txtDataTermino")
  await page.click("#conteudo_txtDataTermino", { clickCount: 3 })
  await page.keyboard.press("Backspace")
  await page.type("#conteudo_txtDataTermino", dataAnterior, { delay: 150 })

  console.log(`Data de Término preenchida: ${dataAnterior}`)
}

export async function clicarPesquisar(page: Page): Promise<void> {
  await page.waitForSelector("#conteudo_btnPesquisar", {
    visible: true,
    timeout: 5000,
  })
  await page.click("#conteudo_btnPesquisar")
}
