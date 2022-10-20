import { atom } from "recoil"

const exampleAtom = atom<string>({
    key: "exampleAtom",
    default: "",
})