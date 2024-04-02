import Clipboard from "clipboard"

/**
 * @description 复制到剪切板
 * @param {Object} options 配置项
 */
export function copyTextClipboard({ copyText = '', onSuccess = null, onError = null }) {
    const targetEle = document.createElement('span');
    targetEle.setAttribute('id', 'copy-target-ele');
    // 设置复制内容
    targetEle.setAttribute('data-clipboard-text', copyText);
    // 元素插入到body中
    targetEle.style.cssText = 'opacity: 0; position: absolute; left: -3000px;';
    document.body.appendChild(targetEle)

    targetEle.addEventListener('click', (event) => {
        copyText2Clip(event)
    });
    targetEle.click()

    // 销毁元素
    function removeCopyTargetEle() {
        document.body.removeChild(targetEle)
    }
    function copyText2Clip(event) {
        const clipboard = new Clipboard(event.target)
        clipboard.on('success', res => {
            showTip()
            clipboard.destroy();  //及时销毁
            removeCopyTargetEle()
            if (onSuccess) {
                onSuccess()
            }
        })
        //复制失败，不支持复制
        clipboard.on('error', res => {
            clipboard.destroy()
            removeCopyTargetEle()
            if (onError) {
                onError()
            }
        })
        clipboard.onClick(event)  //解决第一次不触发问题
    }
}

function showTip() {
    const eleTip = document.createElement('span');
    eleTip.innerHTML = '复制成功 ~ 🐮🐮 ';
    eleTip.style.cssText =
        'z-index:3333;position:absolute;top:8%;right:1%;padding:6px 12px;background-color:#333;color:#fff;font-size:14px;border-radius:6px;font-family:sans-serif;';
    document.body.appendChild(eleTip);
    setTimeout(() => {
        eleTip?.parentNode?.removeChild(eleTip);
    }, 1000);
}

/**
 * 复制文本，并提示复制成功
 * @params text需要复制的字符串 isShowTip默认是true
 *
 * <img onClick={()=>cpText(url)} width="20" src='https://blog-huahua.oss-cn-beijing.aliyuncs.com/blog/code/copy.png'/>
 */
export async function cpText(text, isShowTip = true) {
    const clipboard = navigator.clipboard;
    clipboard ? await clipboard.writeText(text) : copyByInput(text);
    isShowTip && cpTextShowTip();
};
function copyByInput(text) {
    // 创建input元素
    const input = document.createElement('input');
    // 赋值 - 想要复制的内容
    input.value = text;
    // 插入到文档
    document.body.appendChild(input);
    // 隐藏
    input.style.cssText = `position:fixed;clip:rect(0 0 0 0);top:10px`;
    // 选中
    input.select();
    // 复制
    document.execCommand('copy');
    // 移除input
    document.body.removeChild(input);
}
function cpTextShowTip() {
    const eleTip = document.createElement('span');
    eleTip.innerHTML = '复制成功 ~ ';
    eleTip.style.cssText =
        'z-index:3333;position:absolute;top:40%;left:45%;padding:6px 12px;background-color:#333;color:#fff;font-size:14px;border-radius:6px;font-family:sans-serif;';
    document.body.appendChild(eleTip);
    setTimeout(() => {
        eleTip?.parentNode?.removeChild(eleTip);
    }, 1000);
}