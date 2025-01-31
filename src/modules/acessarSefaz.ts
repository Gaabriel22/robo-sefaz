import puppeteer, { Browser, Page } from "puppeteer"

export async function acessarSefaz(): Promise<Page> {
  try {
    const browser: Browser = await puppeteer.launch({
      headless: false,
      args: ["--ignore-certificate-errors", "--start-maximized"],
      defaultViewport: { width: 1920, height: 1080 },
    })

    const page: Page = await browser.newPage()

    await page.goto(
      "https://satsp.fazenda.sp.gov.br/COMSAT/Account/LoginSSL.aspx?ReturnUrl=%2fCOMSAT%2f"
    )
    await page.click("#conteudo_rbtContribuinte")

    await page.waitForSelector("#conteudo_imgCertificado", { visible: true })
    await page.click("#conteudo_imgCertificado")

    console.log("Acesso ao SEFAZ realizado com sucesso!")

    return page
  } catch (error) {
    console.error("Erro ao acessar o SEFAZ:", error)
    throw error
  }
}
