<template>
  <div class="page-data-list">
    <!--页面列表-->
    <div class="page-item-wrapper">
      <el-row :gutter="40">
        <el-col :span="6" v-for="page in pageList" :key="page.id">
          <div class="page-item">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span
                  ><el-tag type="success"
                    >{{ page.id }}/{{ page.title }}</el-tag
                  ></span
                >
              </div>
              <div class="text item">
                <el-row :gutter="20">
                  <el-col :span="12">
                    <el-statistic
                      group-separator=","
                      :precision="2"
                      :value="page.visitCount || 0"
                      title="今日访问人数"
                    ></el-statistic>
                  </el-col>
                  <el-col :span="12">
                    <el-statistic
                      group-separator=","
                      :precision="2"
                      :value="page.visitCountToday || 0"
                      title="累计访问人数"
                    ></el-statistic>
                  </el-col>
                </el-row>
                <el-divider></el-divider>
                <el-row :gutter="20">
                  <el-col :span="12">
                    <el-statistic
                      group-separator=","
                      :precision="2"
                      :value="page.joinUsCount || 0"
                      title="今日加入人数"
                    ></el-statistic>
                  </el-col>
                  <el-col :span="12">
                    <el-statistic
                      group-separator=","
                      :precision="2"
                      :value="page.joinUsCountToday || 0"
                      title="累计加入人数"
                    ></el-statistic>
                  </el-col>
                </el-row>
              </div>
            </el-card>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageList: [],
    };
  },
  created() {
    this.getPageData();
  },
  methods: {
    /**
     * 获取所有页面
     */
    getPageData() {
      this.$API.getPageData().then((res) => {
        this.pageList = res.body || [];
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.page-data-list {
  height: 100%;
  .page-item-wrapper {
    .page-item {
      background-color: aqua;
      float: center;
      width: 100%;
      margin: 20px;
    }
  }
}
</style>
