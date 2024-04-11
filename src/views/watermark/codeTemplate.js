export function codeContent() {
    let str =
`// 如果希望在整个项目中都添加水印，可以在app.vue中使用指令
// <template>
//   <div id="app">
//     <router-view v-watermark="{text: '水印名称', textColor: 'rgba(180, 180, 180, 0.3)'}" />
//   </div>
// </template>

// 如果希望给图片添加水印
// <template>
//   <div v-watermark="{text: '水印名称', textColor: 'rgba(180, 180, 180, 0.3)'}" >
//     <img src="" alt="" >
//   </div>
// </template>

Vue.directive('watermark', {
    bind: function (el, binding) {
        // 水印配置项
        const watermarkConfig = {
            text: binding.value.text || '水印名称',
            textColor: binding.value.textColor || 'rgba(180, 180, 180, 0.3)',
            width: binding.value.width || 250,
            height: binding.value.height || 60,
            font: binding.value.font || '13px Microsoft Yahei',
            fillTextX: binding.value.fillTextX || '10'
        };

        // 创建水印
        function createWatermark(str, parentNode, width, height, font, textColor, fillTextX){
            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            canvas.style.display = 'none';

            const context = canvas.getContext('2d');
            context.rotate(-20 * Math.PI / 180);
            context.font = font;
            context.fillStyle = textColor;
            context.textAlign = 'left';
            context.textBaseline = 'Middle';
            context.fillText(str, fillTextX, canvas.height);

            const div = document.createElement('div');
            div.style.pointerEvents = 'none';
            div.style.top = '0';
            div.style.left = '0';
            div.style.position = 'absolute';
            div.style.zIndex = '999';
            div.style.width = '100%';
            div.style.height = '100%';
            div.style.background = 'url(' + canvas.toDataURL('image/png') + ')';
            parentNode.appendChild(div);
        }

        // 检查父元素是否包含子元素
        function elementContains(parent, child) {
            return parent !== child && parent.contains(child);
        }

        // 防止重复创建水印
        if (!elementContains(el, document.querySelector('canvas'))) {
            createWatermark(
                watermarkConfig.text,
                el,
                watermarkConfig.width,
                watermarkConfig.height,
                watermarkConfig.font,
                watermarkConfig.textColor,
                watermarkConfig.fillTextX
            );
        }
    }
});  
`
    return str
}