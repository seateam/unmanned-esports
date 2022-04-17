import { createHash } from 'crypto'
import { convertUtf8ToHex } from '@walletconnect/utils'
import { ElMessage, ElMessageBox } from 'element-plus'
import WalletConnect from '@walletconnect/client'
import QRCodeModal from '@walletconnect/qrcode-modal'
import {
  getChainOptions,
  WalletController,
  ConnectType,
  WalletStatus,
} from '@terra-money/wallet-controller'
import { Subscription, combineLatest } from 'rxjs'

export enum WalletType {
  none = '',
  metamask = 'metamask',
  phantom = 'phantom',
  walletconnect = 'walletconnect',
  terra = 'terra',
}
export const useWallet = defineStore({
  id: 'wallet',
  state: () => {
    const { t: $t } = useI18n()
    return {
      $t,
      type: WalletType.none,
      address: '',
      loading: true,
      controller: {} as WalletController,
      subscription: {} as Subscription,
    }
  },
  actions: {
    init() {
      if (this.loading === false) {
        return
      }
      // metamask
      if (window.ethereum?.isMetaMask) {
        window.ethereum.on('accountsChanged', (accounts: string[]) => {
          this.initAddress(accounts[0], WalletType.metamask)
        })
      }
      // terra
      getChainOptions().then((chainOptions) => {
        this.controller = new WalletController({
          ...chainOptions,
        })
        this.subscription = combineLatest([
          this.controller.availableConnectTypes(),
          this.controller.availableInstallTypes(),
          this.controller.availableConnections(),
          this.controller.states(),
        ]).subscribe((res) => {
          const states = res[3]
          if (states.status === WalletStatus.WALLET_CONNECTED) {
            this.initAddress(states.wallets[0].terraAddress, WalletType.terra)
          }
        })
      })
    },
    initAddress(address: string, type: WalletType) {
      if (address) {
        this.address = address
        this.type = type
      }
    },
    connectMetaMask() {
      if (!window.ethereum?.isMetaMask) {
        ElMessage.error('please install metamask')
        return
      }
      // https://docs.metamask.io/guide/
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then((accounts: string[]) => {
          this.initAddress(accounts[0], WalletType.metamask)
        })
        .catch((reason: any) => {
          ElMessage.error(reason.message)
        })
    },
    async connectWalletConnect() {
      // https://docs.walletconnect.com/1.0/quick-start/dapps/client
      let connector = window.connector
      if (connector && connector.connected) {
        ElMessageBox.confirm(this.$t('Connected'), {
          showClose: false,
          confirmButtonText: this.$t('Continue'),
          cancelButtonText: this.$t('ReConnect'),
        })
          .then(() => {
            const { accounts } = connector.session
            this.initAddress(accounts[0], WalletType.walletconnect)
          })
          .catch(async () => {
            await connector.killSession()
            this.connectWalletConnect()
          })
        return
      }
      // create
      connector = new WalletConnect({
        bridge: 'https://bridge.walletconnect.org',
        qrcodeModal: QRCodeModal,
      }) as any
      window.connector = connector
      // events
      connector.on('session_update', (error: Error, payload: any) => {
        if (error) {
          console.error(error)
        }
        const { accounts } = payload.params[0]
        this.initAddress(accounts[0], WalletType.walletconnect)
      })
      connector.on('connect', (error: Error, payload: any) => {
        if (error) {
          console.error(error)
        }
        const { accounts } = payload.params[0]
        this.initAddress(accounts[0], WalletType.walletconnect)
      })
      connector.on('disconnect', (error: Error) => {
        if (error) {
          console.error(error)
        }
        this.disconnect()
        if (connector && connector.connected) {
          connector.killSession()
        }
      })
      // connect
      if (connector && !connector.connected) {
        await connector.createSession()
      }
    },
    async connectPhantom() {
      if (!window.solana?.isPhantom) {
        ElMessage.error('please install phantom')
        return
      }
      // https://docs.phantom.app/integrating/extension-and-mobile-browser/establishing-a-connection
      try {
        window.solana.connect().then((resp: any) => {
          this.initAddress(resp.publicKey.toString(), WalletType.phantom)
        })
      } catch (reason: any) {
        ElMessage.error(reason.message)
      }
    },
    async connectTerra() {
      this.controller.connect(ConnectType.EXTENSION)
    },
    disconnect() {
      this.address = ''
      this.type = WalletType.none
    },
    connect(type: WalletType) {
      if (type === WalletType.metamask) {
        this.connectMetaMask()
      } else if (type === WalletType.walletconnect) {
        this.connectWalletConnect()
      } else if (type === WalletType.phantom) {
        this.connectPhantom()
      }
    },
    async signString(message: string) {
      const address = this.address
      let sig = ''
      try {
        if (this.type === WalletType.walletconnect) {
          sig = await window.connector.signPersonalMessage([convertUtf8ToHex(message), address])
        } else if (this.type === WalletType.terra) {
          const res = await this.controller.signBytes(Buffer.from(message))
          if (res.success) {
            sig = res.result.signature.toString()
          }
        } else if (this.type === WalletType.metamask) {
          sig = await window.ethereum.request({
            method: 'personal_sign',
            params: [message, address],
          })
        } else if (this.type === WalletType.phantom) {
          // https://docs.phantom.app/integrating/extension-and-mobile-browser/signing-a-message
          const encodedMessage = new TextEncoder().encode(message)
          const signedMessage = await window.solana.request({
            method: 'signMessage',
            params: {
              message: encodedMessage,
              display: 'utf8',
            },
          })
          sig = signedMessage.signature
        }
      } catch (error) {
        //
      }
      return sig
    },
    async signHash(message: string) {
      const data = { message }
      const messageHash = createHash('SHA256').update(JSON.stringify(data)).digest('hex').toString()
      const address = this.address
      let sig = ''
      try {
        if (this.type === WalletType.walletconnect) {
          sig = await window.connector.signMessage([address, messageHash])
        } else if (this.type === WalletType.terra) {
          const res = await this.controller.signBytes(Buffer.from(messageHash))
          if (res.success) {
            sig = res.result.signature.toString()
          }
        } else if (this.type === WalletType.metamask) {
          sig = await window.ethereum.request({
            method: 'personal_sign',
            params: [messageHash, address],
          })
        } else if (this.type === WalletType.phantom) {
          // https://docs.phantom.app/integrating/extension-and-mobile-browser/signing-a-message
          const signedMessage = await window.solana.request({
            method: 'signMessage',
            params: {
              message: messageHash,
              display: 'hex',
            },
          })
          sig = signedMessage.signature
        }
      } catch (error) {
        //
      }
      return sig
    },
    // utils
    background(username: string, height?: number) {
      // https://github.com/hihayk/boring-avatars-service/blob/main/api/index.js
      const colors = ['47F1D4', 'CF46EF']
      const url = new URL(`https://source.boringavatars.com/marble/${height || 130}/${username}`)
      url.searchParams.set('square', '')
      url.searchParams.set('colors', colors.join())
      return `background:center/cover url(${url.href})`
    },
  },
})
