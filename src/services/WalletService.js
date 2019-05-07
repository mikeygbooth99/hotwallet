export default class WalletService {
  constructor ({ db }) {
    this.db = db
  }

  async addWallet({ symbol, address = null, xpub = null, isManual = false, name = null }) {
    const asset = await this.db.assets.get(symbol)
    if (!asset) throw new Error('Invalid symbol')
    const wallets = await this.getWallets({ symbol })
    // TODO: validate unique address and xpub
    return this.db.wallets.post({
      symbol,
      address,
      xpub,
      isManual,
      name
    })
  }

  getWallets({ symbol }) {
    return this.db.wallets.find({
      selector: { symbol }
    })
  }

  setWalletName({ symbol, name }) {
    return 
  }

  setWalletSyncTime({ walletId }) {
    
  }

  removeWallet(walletId) {
    // delete transactions
    // delete wallet
  }
}