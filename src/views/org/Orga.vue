<template>
  <div class="block">


    <el-row>
      <el-col :span="6">
        <div>
          <el-tree
            node-key="id"
            default-expand-all
            :props="props"
            :data="orgaData"
            :show-checkbox="false"
            :expand-on-click-node="false"
            @current-change="handleCurrentNodeChange">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span>
          <el-button
            type="text"
            size="mini"
            @click="() => modifyOrga(data)">
            修改
          </el-button>
          <el-button
            type="text"
            size="mini"
            @click="() => deleteOrga(node, data)">
            刪除
          </el-button>
        </span>
      </span>
          </el-tree>
        </div>
      </el-col>
      <el-col :span="18">
        <div>
          <el-row>
            <el-col :span="24">
              <el-form :inline="true" align="left" class="demo-form-inline">
                <el-form-item label="请选择组织">
                  <OrgaSelector v-model="orgaIdToBeAdd"></OrgaSelector>
                </el-form-item>
                <el-form-item>
                  <el-input size="small" style="width: 200px;" v-model="orgaNameToBeAdd"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button size="mini" type="primary" @click="createOrga()" :disabled="orgaNameToBeAdd.length === 0">
                    添加组织
                  </el-button>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <div>
                <User ref="user" :showCreateUser="false" :showOpt="false" :selectedNode="selectedNode"></User>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
    <OrgaForm v-if="showOrgaForm" ref="orgaForm" :orga="selectedOrga" @close="closeForm"></OrgaForm>
  </div>
</template>

<script>

  import OrgaForm from '@/views/org/OrgaForm';
  import OrgaSelector from '@/components/OrgaSelector.vue';
  import User from '@/views/user/User';

  export default {
    name: 'Orga',
    components: {
      OrgaForm,
      OrgaSelector,
      User
    }, data() {
      return {
        //ztee数据
        orgaData: [],
        //将label的值改为orgaName
        props: {
          label: function (row) {
            return row.orga.orgaName;
          },
          children: 'children'
        },
        //是否展示OrgaForm
        showOrgaForm: false,
        //当前选中的组织
        selectedOrga: null,
        //要添加的组织Id
        orgaIdToBeAdd: 0,
        //要添加的组织名称
        orgaNameToBeAdd: '',
        selectedNode: null
      }
    },
    methods: {
      /**
       * 组织添加
       */
      createOrga() {
        let postData = {
          orgaName: this.orgaNameToBeAdd,
        }
        if (this.orgaIdToBeAdd === 0) {
          postData.orgaParent = null;
        } else {
          postData.orgaParent = this.orgaIdToBeAdd;
        }
        this.http(this, 'post', this.api.orga.createOrga, postData).then(() => {
          this.orgaNameToBeAdd = '';
          this.loadOrgas();

          this.$notify({
            title: '成功',
            message: '添加成功',
            type: 'success'
          });
        })
      },
      /**
       *组织删除
       */
      deleteOrga(node, data) {
        this.$confirm('此操作将永久删除该组织, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.http(this, 'delete', this.api.orga.deleteOrga + data.orga.orgaId).then((data) => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.loadOrgas();
            const parent = node.parent;
            const children = parent.data.children || parent.data;
            const index = children.findIndex(d => d.id === data.id);
            children.splice(index, 1);
          })
        })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
      },
      /**
       * 组织修改
       */
      modifyOrga(data) {
        this.selectedOrga = data.orga;
        this.showOrgaForm = true;
      },
      /**
       * 加载tree数据
       */
      loadOrgas() {
        //前端需要一个数组[id,label,children] children还是一个组织对象
        this.http(this, 'get', this.api.orga.nestedOrga).then((data) => {
          this.orgaData = data;
        })
      },
      /**
       * 显示对应部门的员工
       */
      handleCurrentNodeChange(row) {
        this.selectedNode = row;
        setTimeout(() => {
          this.$refs['user'].loadUsers();
        }, 100)
      },
      /**
       * 关闭窗口
       */
      closeForm() {
        this.showOrgaForm = false;
      }
    },
    /**
     * 页面初始化执行的方法
     */
    created() {
      this.loadOrgas();
    }

  }

</script>
