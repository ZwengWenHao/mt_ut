export function randomHexColor(){
    return  `#${Math.floor(Math.random() * 0xffffff).toString(16)}`
}