<template>
  <div class="h5-element-wrapper" @click="handleClick">
    <component
      :is="element.elName"
      class="h5-element ani"
      v-bind="element.propsValue"
    />
  </div>
</template>

<script>
import { _qk_register_components_object } from "@/plugins/index";
import runAnimations from "@/common/js/runAnimations";
import elementEvents from "@/mixins/elementEvents";

export default {
  name: "components-template",
  components: {
    // 批量注册qk组件
    ..._qk_register_components_object,
  },
  props: {
    loaded: Boolean,
    pageData: Object,
    // 元素数据
    element: {
      type: Object,
      require: true,
    },
  },
  mixins: [elementEvents],
  mounted() {
    if (this.loaded) {
      this.cssAnimations();
    }
  },
  watch: {
    loaded(val) {
      if (val) {
        this.cssAnimations();
      }
    },
  },
  methods: {
    async handleClick() {
      for (let i = 0, len = this.element.events.length; i < len; i++) {
        if (this["_event_" + this.element.events[i].type]) {
          await this["_event_" + this.element.events[i].type](
            this.element.events[i]
          );
        }
      }
    },
    cssAnimations() {
      let cssText = this.$el.style.cssText;
      let animations = this.element.animations || [];
      runAnimations(this.$el, animations, false, () => {
        this.$el.style.cssText = cssText;
      });
    },
  },
};
</script>
