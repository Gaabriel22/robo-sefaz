interface Window {
  electron: {
    enviarMensagem: (canal: string, dados?: any) => void
  }
}
