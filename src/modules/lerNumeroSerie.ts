import ExcelJS from "exceljs"

export async function lerNumerosSerie(): Promise<
  { numeroSerie: string; pdv: string }[]
> {
  const workbook = new ExcelJS.Workbook()
  await workbook.xlsx.readFile(
    "Caminho/da/planilha"
  )

  const worksheet = workbook.getWorksheet(1)
  const pdvsENumerosSerie: { numeroSerie: string; pdv: string }[] = []

  for (let i = 4; i <= 23; i++) {
    const pdv = worksheet?.getCell(`C${i}`).text
    const numeroSerie = worksheet?.getCell(`D${i}`).text 

    if (pdv && numeroSerie) {
      pdvsENumerosSerie.push({ pdv, numeroSerie })
    }
  }

  return pdvsENumerosSerie
}
