import { Client, Chain } from '@coin98-com/connect-sdk'
const client = new Client()


client.connect(Chain.cosmos, {
  logo: "https://aura.network/assets/imgs/auraTitleLogo.png",
  name: "LearnR",
  url: "http://localhost:8080/"
})