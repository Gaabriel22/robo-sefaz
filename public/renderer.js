/// <reference path="../src/types/electron.d.ts" />

const botaoIniciar = document.getElementById("iniciar")
const resultadosDiv = document.getElementById("resultado")

if (botaoIniciar && resultadosDiv) {
  botaoIniciar.addEventListener("click", () => {
    console.log("Botão Clicado! Iniciando o processo...")

    if (window.electron && window.electron.enviarMensagem) {
      window.electron.enviarMensagem("iniciar-processo")
    } else {
      console.error("Erro: window.electron não está definido!")
    }
  })

  if (window.electron) {
    window.electron.onProcessoConcluido((event, resultados) => {
      console.log("Resultados recebidos:", resultados)

      resultadosDiv.innerHTML = ""

      resultados.forEach(({ pdv, totalCupons }) => {
        const resultadoItem = document.createElement("div")
        resultadoItem.className = "resultado-item"
        resultadoItem.textContent = `PDV: ${pdv} - ${totalCupons} cupons.`
        resultadosDiv.appendChild(resultadoItem)
      })
    })

    window.electron.onProcessoErro((event, erro) => {
      console.error("Erro no processo:", erro)

      resultadosDiv.innerHTML = `<div class="erro">Erro: ${erro}</div>`
    })
  }
} else {
  console.error("Elementos 'iniciar' ou 'resultados' não encontrados!")
}
