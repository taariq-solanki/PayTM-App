import { atom } from "recoil";

export const sendAmountAtom=atom({
    key:"sendAmountAtom",
    default:0
})
export const toAtom=atom({
    key:"toAtom",
    default:""
})