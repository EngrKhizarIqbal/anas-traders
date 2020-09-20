<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.searchTerm"
        placeholder="Name"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >
        Search
      </el-button>
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >
        Add
      </el-button>
    </div>

    <el-table
      :key="tableKey"
      v-loading="isLoading"
      :data="shops"
      border
      fit
      highlight-current-row
      style="width: 100%"
      @sort-change="sortChange"
    >
      <el-table-column label="No." prop="id">
        <template slot-scope="{ $index }">
          {{ $index + 1 }}
        </template>
      </el-table-column>

      <el-table-column
        label="Shop Name"
        prop="name"
        sortable="custom"
        align="center"
        :class-name="getSortClass('name')"
      >
        <template slot-scope="{ row }">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="Address"
        prop="address"
        sortable="custom"
        align="center"
        :class-name="getSortClass('address')"
      >
        <template slot-scope="{ row }">
          <span>{{ row.address }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="Actions"
        align="center"
        width="230"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{ row }">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            Edit
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(row)"
          >
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="shopFormDialogVisible"
    >
      <el-form ref="shopForm" :rules="rules" :model="temp">
        <el-form-item label="Shop Name" prop="name">
          <el-input v-model="temp.name" />
        </el-form-item>

        <el-form-item label="Shop Address" prop="address">
          <el-input v-model="temp.address" />
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="shopFormDialogVisible = false">
          Cancel
        </el-button>
        <el-button
          type="primary"
          @click="dialogStatus === 'create' ? addShop() : updateShop()"
        >
          Confirm
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import waves from '@/directive/waves';
import { mapGetters } from 'vuex';

export default {
  name: 'Shop',
  directives: { waves },
  props: {},
  data() {
    return {
      isLoading: true,
      tableKey: 0,
      listQuery: {
        searchTerm: '',
        page: 1,
        sort: '+name'
      },
      temp: {
        id: null,
        name: '',
        address: ''
      },
      shopFormDialogVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      rules: {
        name: [
          {
            required: true,
            message: 'Shop name is required',
            trigger: 'change'
          }
        ],
        address: [
          {
            required: true,
            message: 'Shop address is required',
            trigger: 'change'
          }
        ]
      }
    };
  },
  computed: {
    ...mapGetters(['shops'])
  },
  created() {
    this.getShops();
  },
  methods: {
    getShops() {
      this.$store
        .dispatch('shop/get', this.listQuery)
        .finally(() => (this.isLoading = false));
    },
    handleFilter() {
      this.listQuery.page = 1;
      this.getShops();
    },
    handleCreate() {
      this.temp = { name: '', address: '' };
      this.dialogStatus = 'create';
      this.shopFormDialogVisible = true;
      this.$nextTick(() => this.$refs['shopForm'].clearValidate());
    },
    handleUpdate(row) {
      this.temp.id = row.id;
      this.temp.name = row.name;
      this.temp.address = row.address;
      this.dialogStatus = 'update';
      this.shopFormDialogVisible = true;
      this.$nextTick(() => this.$refs['shopForm'].clearValidate());
    },
    handleDelete(row) {
      this.$confirm(
        `Are you sure to delete the shop? You can't undo it.`,
        'Are You Sure?',
        {
          confirmButtonText: 'Delete',
          cancelButtonText: 'Cancel',
          type: 'warning',
          center: true
        }
      ).then(
        () => {
          this.dispatchShopCrudAction(
            'shop/remove',
            { id: row.id },
            'Shop Deleted Successfully'
          );
        },
        () => {}
      );
    },
    addShop() {
      this.$refs['shopForm'].validate(isValid => {
        if (isValid) {
          this.dispatchShopCrudAction(
            'shop/add',
            this.temp,
            'Shop Added Successfully'
          );
        }
      });
    },
    updateShop() {
      this.$refs['shopForm'].validate(isValid => {
        if (isValid) {
          this.dispatchShopCrudAction(
            'shop/update',
            this.temp,
            'Shop Updated Successfully'
          );
        }
      });
    },
    sortChange(data) {
      const { prop, order } = data;
      this.listQuery.sort = `${order === 'ascending' ? '+' : '-'}${prop}`;
      this.getShops();
    },
    getSortClass(key) {
      return this.listQuery.sort === `+${key}` ? 'ascending' : 'descending';
    },
    dispatchShopCrudAction(actionName, payload, successMessage) {
      this.isLoading = true;
      this.$store.dispatch(actionName, payload).then(() => {
        this.shopFormDialogVisible = false;
        this.$notify({
          title: 'Success',
          message: successMessage,
          type: 'success',
          duration: 2000
        });
        this.getShops();
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
