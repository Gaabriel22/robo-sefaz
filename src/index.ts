import { Page } from "puppeteer"
import { acessarSefaz, fecharNavegador } from "./modules/acessarSefaz"
import { lerNumerosSerie } from "./modules/lerNumeroSerie"
import { navegarMenu } from "./modules/navegarMenu"
import {
  clicarPesquisar,
  preencherDatas,
  preencherNumeroSerie,
} from "./modules/preencherFormulario"
import { contarCupons } from "./modules/contarCupons"
import { verificarAlerta } from "./modules/verificarAlerta"

export async function main() {
  try {
    const page: Page = await acessarSefaz()
    await navegarMenu(page)

    const pdvsENumerosSerie = await lerNumerosSerie()

    await preencherDatas(page)

    const resultados: {
      pdv: string
      numeroSerie: string
      totalCupons: number
    }[] = []

    for (const { numeroSerie, pdv } of pdvsENumerosSerie) {
      console.log(`Consultando PDV: ${pdv} - Numero de Serie: ${numeroSerie}`)

      await preencherNumeroSerie(page, numeroSerie)
      await clicarPesquisar(page)

      await verificarAlerta(page)

      try {
        await page.waitForSelector(
          '[id^="conteudo_grvConsultarLotesEnviados_lkbNumeroRecibo_"]',
          { visible: true, timeout: 3000 }
        )
        const totalCupons = await contarCupons(page)
        console.log(
          `Total de cupons encontrados para o PDV ${pdv}: ${totalCupons}`
        )

        resultados.push({ pdv, numeroSerie, totalCupons })
      } catch (error) {
        console.log(
          `Nenhum lote encontrado para o PDV ${pdv}. Indo para o próximo...`
        )
        resultados.push({ pdv, numeroSerie, totalCupons: 0 })
      }
    }

    resultados.sort((a, b) => parseInt(a.pdv) - parseInt(b.pdv))

    console.log("\nResumo Final da Consulta:")
    resultados.forEach(({ pdv, totalCupons }) => {
      console.log(`PDV: ${pdv} - ${totalCupons} cupons.`)
    })

    await fecharNavegador()

    return resultados
  } catch (error) {
    console.error("Erro no fluxo principal:", error)
    await fecharNavegador()
    throw error
  }
}
