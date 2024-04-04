import { CasperServiceByJsonRPC } from "casper-js-sdk"
import { DEFAULT_NODE_NUMBER, NODE_URL } from "./constant"

class Client {
    nodeNum: number
    casperService: CasperServiceByJsonRPC

    constructor(nodeNum: number) {
        this.nodeNum = nodeNum
        this.casperService = new CasperServiceByJsonRPC(`${NODE_URL}/node-${this.nodeNum}/rpc`)
    }

    setClient(nodeNum: number) {
        this.nodeNum = nodeNum
        this.casperService = new CasperServiceByJsonRPC(`${NODE_URL}/node-${this.nodeNum}/rpc`)
    }
}

export const defaultClient = new Client(DEFAULT_NODE_NUMBER)
