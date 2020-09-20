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
      :data="agents"
      border
      fit
      highlight-current-row
      style="width: 100%"
      @sort-change="sortChange"
    >
      <el-table-column label="No" prop="id">
        <template slot-scope="{ $index }">
          {{ $index + 1 }}
        </template>
      </el-table-column>

      <el-table-column
        label="Agent Name"
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
        label="Actions"
        align="center"
        width="230"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{ row, $index }">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            Edit
          </el-button>
          <el-button
            v-if="row.status != 'deleted'"
            size="mini"
            type="danger"
            @click="handleDelete(row, $index)"
          >
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="agentFormDialogVisible"
    >
      <el-form
        ref="agentForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="150px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item label="Agent Name" prop="name">
          <el-input v-model="temp.name" />
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="agentFormDialogVisible = false">
          Cancel
        </el-button>
        <el-button
          type="primary"
          @click="dialogStatus === 'create' ? addAgent() : updateAgent()"
        >
          Confirm
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import waves from '@/directive/waves';

export default {
  name: 'Agent',
  directives: { waves },
  data() {
    return {
      tableKey: 0,
      isLoading: true,
      agentFormDialogVisible: false,
      listQuery: {
        searchTerm: '',
        page: 1,
        sort: '+name'
      },
      temp: {
        id: null,
        name: ''
      },
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      rules: {
        name: [
          {
            required: true,
            message: 'Agent name is required',
            trigger: 'change'
          }
        ]
      }
    };
  },
  computed: {
    ...mapGetters(['agents'])
  },
  created() {
    this.getAgents();
  },
  methods: {
    handleFilter() {
      this.listQuery.page = 1;
      this.getAgents();
    },
    getAgents() {
      this.isLoading = true;
      this.$store
        .dispatch('agent/getAgents', this.listQuery)
        .finally(() => (this.isLoading = false));
    },
    sortChange(data) {
      const { prop, order } = data;
      this.listQuery.sort = `${order === 'ascending' ? '+' : '-'}${prop}`;
      this.getAgents();
    },
    handleCreate() {
      this.temp = { name: '' };
      this.dialogStatus = 'create';
      this.agentFormDialogVisible = true;
      this.$nextTick(() => {
        this.$refs['agentForm'].clearValidate();
      });
    },
    handleUpdate(row) {
      this.temp.id = row.id;
      this.temp.name = row.name;
      this.dialogStatus = 'update';
      this.agentFormDialogVisible = true;
    },
    handleDelete(row, $index) {
      this.$confirm(
        `Are you sure to delete the agent? You can't undo it.`,
        'Are You Sure?',
        {
          confirmButtonText: 'Delete',
          cancelButtonText: 'Cancel',
          type: 'warning',
          center: true
        }
      ).then(
        () => {
          this.dispatchAgentCrudAction(
            'agent/delete',
            { id: row.id },
            'Agent Deleted Successfully'
          );
        },
        () => {}
      );
    },
    addAgent() {
      this.$refs['agentForm'].validate(isValid => {
        if (isValid) {
          this.dispatchAgentCrudAction(
            'agent/add',
            this.temp,
            'Agent Created Successfully'
          );
        }
      });
    },
    updateAgent() {
      this.$refs['agentForm'].validate(isValid => {
        if (isValid) {
          this.dispatchAgentCrudAction(
            'agent/update',
            this.temp,
            'Agent Updated Successfully'
          );
        }
      });
    },
    getSortClass(key) {
      return this.listQuery.sort === `+${key}` ? 'ascending' : 'descending';
    },
    dispatchAgentCrudAction(actionName, payload, successMessage) {
      this.$store.dispatch(actionName, payload).then(() => {
        this.agentFormDialogVisible = false;
        this.$notify({
          title: 'Success',
          message: successMessage,
          type: 'success',
          duration: 2000
        });
        this.getAgents();
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
