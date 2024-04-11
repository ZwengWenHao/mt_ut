<template>
  <div
    :class="['frame_card', { frame_card_active: is_rolling }]"
    :style="{
      background:
        'repeating-linear-gradient(-45deg, ' +
        randomHexColor() +
        ' 0 10px, #fff 10px 20px, ' +
        randomHexColor() +
        '  20px 30px, #fff 30px 40px) ' +
        `-${distance}px -${distance}px` +
        '/ 200% 200%',
    }"
  >
    <div class="frame_card_container">
      "In the heart of the bustling city, amidst the cacophony of honking horns
      and hurried footsteps, there exists a sanctuary of serenity known as
      Central Park. Here, amidst the towering skyscrapers, nature weaves its
      enchanting tapestry, offering respite to weary souls and a haven for the
      restless mind. Within this urban oasis, the vibrant hues of blooming
      flowers dance in the gentle breeze, their fragrant whispers lulling
      visitors into a state of tranquil reverie. Tall trees stretch their
      branches towards the heavens, providing shade and solace to those seeking
      refuge from the scorching sun. Lovers stroll hand in hand along winding
      pathways, their laughter mingling with the rustle of leaves overhead.
    </div>
  </div>
</template>
<script>
import { randomHexColor } from "@/utils/random";
export default {
  props: {
    // 滚动距离
    distance: {
      type: String,
      default: () => "20",
    },
    // 是否滚动
    is_rolling: {
      type: Boolean,
      default: () => true,
    },
  },
  data() {
    return {};
  },
  methods: {
    randomHexColor,
  },
};
</script>
<style lang="scss">
.frame_card {
  padding: 5px;
  border-radius: 10px;
  line-height: 1.5;
  transition: 0.5s;
  cursor: pointer;
  &_container {
    background: #fff;
    border-radius: inherit;
    padding: inherit;
  }
}
.frame_card_active:hover {
  background-position: 0 0 !important;
}
</style>
