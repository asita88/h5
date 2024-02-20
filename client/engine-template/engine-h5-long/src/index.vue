<template>
  <div class="engine-template-wrapper">
    <div
      class="flat relative"
      v-for="(page, i) in pageData.pages"
      :key="i"
      :style="getCommonStyle(page.commonStyle)"
    >
      <!--页面内容区域-->
      <div
        class="h5-page-wrapper"
        :style="
          getCommonStyle(
            {
              ...page.commonStyle,
              top: pageTop,
              height: pageData.height,
              width: pageData.width,
              position: 'relative',
            },
            scalingRatio
          )
        "
      >
        <componentsTemplate
          v-for="(item, index) in page.elements"
          :key="index"
          :loaded="item._loaded"
          @handleElementClick="handleElementClick"
          :pageData="pageData"
          :element="item"
          :style="getCommonStyle(item.commonStyle, scalingRatio)"
        >
        </componentsTemplate>
      </div>
    </div>
  </div>
</template>

<script>
import editorProjectConfig from "@/pages/editor/DataModel";
import componentsTemplate from "./components-template";
// import elementEvents from "@/mixins/elementEvents";
export default {
  name: "engineH5Long",
  components: {
    componentsTemplate,
  },
  // mixins: [elementEvents],
  data() {
    return {
      getCommonStyle: editorProjectConfig.getCommonStyle,
      scalingRatio: 1,
      pageData: {
        pages: [],
      },
      pageTop: 0,
    };
  },
  created() {
    let pageData = window._pageData;
    // this.scalingRatio = document.body.clientWidth / $config.canvasH5Width;
    this.scalingRatio = document.body.clientWidth / pageData.width;
    this.pageTop =
      (document.documentElement.clientHeight -
        pageData.height * this.scalingRatio) /
      2;
    this.pageTop = Math.max(this.pageTop, 0);
    this.pageData = pageData;
    // this.pageData = window._pageData;
    // // this.scalingRatio = document.body.clientWidth / $config.canvasH5Width;
    // this.scalingRatio = document.body.clientWidth / pageData.width;
    // this.pageTop =
    //   (document.documentElement.clientHeight -
    //     this.pageData.height * this.scalingRatio) /
    //   2;
    // this.pageTop = Math.max(this.pageTop, 0);
  },
  methods: {
    // /**
    //  * 按钮点击事件
    //  * @param eventsData
    //  */
    // async handleElementClick(eventsData, element) {
    //   for (let i = 0, len = eventsData.length; i < len; i++) {
    //     if (this["_event_" + eventsData[i].type]) {
    //       await this["_event_" + eventsData[i].type](
    //         eventsData[i],
    //         element,
    //         this.pageData
    //       );
    //     }
    //   }
    // },
  },
};
</script>

<style scoped>
.engine-template-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}

.relative {
  position: relative;
}

.hidden {
  overflow: hidden;
}
</style>
