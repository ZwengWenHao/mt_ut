/**
 * 随机六进制颜色
 */
export function randomHexColor() {
    let color;
    do {
        color = `#${Math.floor(Math.random() * 0xfefefe).toString(16).padStart(6, '0')}`;
    } while (parseInt(color.substring(1), 16) > 0xf0f0f0); // 如果颜色接近白色，则重新生成
    return color;
}

/**
 * 随机ID
 */
export function generateRandomId(digit = 8) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < digit; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result
}