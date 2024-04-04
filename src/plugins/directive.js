import Vue from 'vue'

Vue.directive('watermark', {
    // 如果希望在整个项目中都添加水印，可以在app.vue中使用指令
    //     <template>
    //   <div id="app">
    //     <router-view v-watermark="{text: '水印名称', textColor: 'rgba(180, 180, 180, 0.3)'}" />
    //   </div>
    // </template>

    //     如果希望给图片添加水印
    //     <template>
    //   <div v-watermark="{text: '水印名称', textColor: 'rgba(180, 180, 180, 0.3)'}" >
    //     <img src="" alt="" >
    //   </div>
    // </template>
    bind: function (el, binding) {
        // 水印文字，父元素，画布宽度，画布高度，字体，文字颜色，画布横坐标
        function addWaterMarker(str, parentNode, width, height, font, textColor, fillTextX = '10') {
            // 检查父元素是否包含子元素
            const elementContains = (parent, child) => parent !== child && parent.contains(child);
            const flag = elementContains(parentNode, document.querySelector('canvas'));
            // 防止重复创建
            if (!flag) {
                let can = document.createElement('canvas');
                parentNode.appendChild(can);
                can.width = width || 200;
                can.height = height || 140;
                can.style.display = 'none';
                let cans = can.getContext('2d');
                cans.rotate(-20 * Math.PI / 180);
                cans.font = font || "13px Microsoft Yahei";
                cans.fillStyle = textColor || "#DDDDDD";
                cans.textAlign = 'left';
                cans.textBaseline = 'Middle';
                cans.fillText(str, fillTextX, can.height);
                // 设置背景图（整个项目中都添加水印建议使用此方法）
                // parentNode.style.backgroundImage = "url(" + can.toDataURL("image/png") + ")";

                // 创建div 定位覆盖（某个元素，如图片添加水印建议使用此方法）
                let div = document.createElement('div');
                div.id = str;
                div.style.pointerEvents = 'none';
                div.style.top = '0';
                div.style.left = '0';
                div.style.position = 'absolute';
                div.style.zIndex = '100000';
                div.style.width = '100%';
                div.style.height = '100%';
                div.style.background = 'url(' + can.toDataURL('image/png') + ')';
                parentNode.appendChild(div);
                // const observer = new MutationObserver(() => {
                //   const wmInstance = document.getElementById(id)
                //   if (
                //     (wmInstance && wmInstance.getAttribute("style") !== styleStr) ||
                //     !wmInstance
                //   ) {
                //     //如果标签在，只修改了属性，重新赋值属性
                //     // console.log("水印属性修改了")
                //     if (wmInstance) {
                //       // 避免一直触发
                //       observer.disconnect();
                //       console.log("水印属性修改了")
                //       wmInstance.setAttribute("style", styleStr)
                //     } else {
                //       /* 此处根据用户登录状态，判断是否终止监听，避免用户退出后登录页面仍然有水印 */
                //       if (store.state.user.token) {
                //         //标签被移除，重新添加标签
                //         // console.log('水印标签被移除了');
                //         document.body.appendChild(div)
                //       } else {
                //         observer.disconnect()
                //       }
                //     }
                //   }
                // })
                // observer.observe(document.body, {
                //   attributes: true,
                //   subtree: true,
                //   childList: true,
                // })
            }
        }
        if (binding.value.text) {
            addWaterMarker(binding.value.text, el, binding.value.width, binding.value.height, binding.value.font, binding.value.textColor, binding.value.fillTextX)
        }
    }
})