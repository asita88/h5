<template>
  <div class="page-data-list">
    <div class="page-search-wrapper">
      <el-row type="flex" justify="end">
        <el-button type="primary" @click="showDialog('add')">Add</el-button>
      </el-row>
    </div>

    <el-table :data="tableData">
      <el-table-column prop="id" label="ID"> </el-table-column>
      <el-table-column prop="username" label="用户名"> </el-table-column>
      <el-table-column prop="show_num" label="展现次数"> </el-table-column>
      <el-table-column prop="max_show" label="最大展现次数"> </el-table-column>
      <el-table-column prop="join_num" label="加入次数"> </el-table-column>
      <el-table-column prop="max_join" label="最大加入次数"> </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="showDialog('edit', scope.row)"
            >编辑</el-button
          >
          <el-button size="mini" type="danger" @click="deleteItem(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      layout="total, sizes, prev, pager, next, jumper"
      :current-page="page"
      :page-size="pageSize"
      :page-sizes="[10, 30, 50, 100]"
      :style="{ float: 'right', padding: '20px' }"
      :total="total"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    />
    <!-- Dialog for adding and editing items -->
    <el-dialog
      :visible.sync="dialogVisible"
      title="Add/Edit Item"
      width="30%"
      top="5vh"
    >
      <el-form
        :model="currentItem"
        label-position="right"
        label-width="120px"
        size="small"
      >
        <el-form-item label="ID:">
          <el-input
            v-model="currentItem.id"
            clearable
            placeholder="请输入"
            disabled
          />
        </el-form-item>
        <el-form-item label="用户名:">
          <el-input
            v-model="currentItem.username"
            clearable
            placeholder="请输入"
          />
        </el-form-item>
        <el-form-item label="展现次数:">
          <el-input
            v-model="currentItem.show_num"
            clearable
            placeholder="请输入"
          />
        </el-form-item>
        <el-form-item label="最大展现次数:">
          <el-input
            v-model="currentItem.max_show"
            clearable
            placeholder="请输入"
          />
        </el-form-item>

        <el-form-item label="加入次数:">
          <el-input
            v-model="currentItem.join_num"
            clearable
            placeholder="请输入"
          />
        </el-form-item>

        <el-form-item label="最大加入次数:">
          <el-input
            v-model="currentItem.max_join"
            clearable
            placeholder="请输入"
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="saveItem">Save</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [{ name: "123" }], // Your data array
      dialogVisible: false, // Dialog visibility
      currentItem: {}, // Data of the item being edited
      total: 0,
      page: 1,
      pageSize: 10,
    };
  },
  async created() {
    await this.getTableData();
  },
  methods: {
    showDialog(action, item) {
      if (action === "add") {
        // Initialize for adding
        this.currentItem = {
          id: 0,
          username: "",
          addtime: "",
          show_num: 0,
          max_show: 100,
          join_num: 0,
          max_join: 100,
        };
      } else if (action === "edit" && item) {
        // Initialize for editing
        this.currentItem = { ...item };
      }
      this.dialogVisible = true;
    },
    saveItem() {
      // Handle saving of item (add or edit)
      // Update or insert data and close the dialog
      // You will typically make API calls here
      this.dialogVisible = false;
      this.$API.addWhatsApp(this.currentItem).then((res) => {
        this.getTableData();
      });
    },
    deleteItem(item) {
      // Handle deletion of item
      // You will typically make an API call here
      this.$confirm("确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$API.delWhatsApp(item).then((res) => {
          console.log(res);
          this.getTableData();
        });
      });
    },
    getTableData() {
      this.hasLoadData = true;
      this.$API
        .getMyWhatsApps({ page: this.page, pageSize: this.pageSize })
        .then((res) => {
          this.total = res.body.total;
          this.tableData = res.body.datas || [];
        });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getTableData();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getTableData();
    },
  },
};
</script>

<style scoped>
.page-data-list {
  height: 100%;
}
</style>
