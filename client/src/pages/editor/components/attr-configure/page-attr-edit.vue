<template>
  <el-scrollbar class="components-attr-edit">
    <p class="page-title fontBold">当前页样式</p>
    <div class="attr-item-edit-wrapper">
      <p class="attr-item-title">背景颜色：</p>
      <div class="attr-item-edit-input no-top">
        <el-color-picker
          size="mini"
          :show-alpha="true"
          v-model="activePage.commonStyle.backgroundColor"
        ></el-color-picker>
      </div>
    </div>
    <div class="attr-item-edit-wrapper">
      <p class="attr-item-title">背景图片：</p>
      <div class="attr-item-edit-input">
        <imageSelect :url.sync="activePage.commonStyle.backgroundImage" />
      </div>
    </div>
    <p class="page-title fontBold">全局配置</p>
    <div class="attr-item-edit-wrapper">
      <p class="attr-item-title">尺寸：</p>
      <div class="col-2 attr-item-edit-input">
        <el-input-number
          size="mini"
          v-model="projectData.width"
          controls-position="right"
          :min="0"
        />
        <div class="attr-item-edit-input-des">宽度</div>
      </div>
      <div class="col-2 attr-item-edit-input">
        <el-input-number
          size="mini"
          v-model="projectData.height"
          controls-position="right"
          :min="0"
        />
        <div class="attr-item-edit-input-des">高度</div>
      </div>
    </div>
    <div class="attr-item-edit-wrapper">
      <p class="attr-item-title">页面模式</p>
      <div class="col-2 attr-item-edit-input">
        <el-select
          size="mini"
          v-model="projectData.pageMode"
          placeholder="请选择"
        >
          <el-option
            v-for="item in pageModeList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
    </div>
  </el-scrollbar>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import imageSelect from "@/components/image-select";

export default {
  components: {
    imageSelect,
  },
  computed: {
    ...mapState({
      projectData: (state) => state.editor.projectData,
      activePageUUID: (state) => state.editor.activePageUUID,
      activeElementUUID: (state) => state.editor.activeElementUUID,
    }),
    ...mapGetters([
      "currentPageIndex",
      "activeElementIndex",
      "activeElement",
      "activePage",
    ]),
  },
  data() {
    return {
      pageModeList: [],
    };
  },
  created() {
    this.pageModeList = this.$config.pageModeList;
  },
};
</script>

<style lang="scss" scoped>
.components-attr-edit {
  height: 100%;
}

.components-attr-animate-edit {
  position: relative;
}

.attr-title {
  font-weight: bold;
}
.attr-item-edit-wrapper {
  padding-left: 18px;
  display: flex;
  width: 100%;
  text-align: center;
  padding-bottom: 10px;
  .attr-item-title {
    text-align: left;
    min-width: 60px;
    font-size: 12px;
  }
  .attr-item-edit-input {
    &.col-2 {
      width: 90px;
      margin-left: 10px;
    }
    &.col-1 {
      width: 250px;
    }
    &.col-3 {
      width: 60px;
      margin-left: 10px;
    }
    &.col-4 {
      width: 50px;
      margin-left: 10px;
    }
    .attr-item-edit-input-des {
      text-align: center;
      line-height: 1;
      margin-top: 2px;
      font-size: 12px;
      color: $gray;
    }
  }
}
</style>
