<template>
  <div>
    <el-dialog :title="'组织'+actionName" :visible.sync="dialogFormVisible" @close="handleClose">
      <el-form :model="orgaData">
        <el-form-item label="组织名称">
          <el-input v-model="orgaData.orgaName"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="saveOrga">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'OrgaName',
    components: {},
    props: {
      orga: {
        type: Object,
        default: null
      }
    },
    data() {
      return {
        actionName: '編輯',
        orgaData: {
          orgaId: 0,
          orgaName: ''

        },
        dialogFormVisible: true,
      }

    },
    methods: {
      /**
       * 组织保存
       */
      saveOrga() {
        if (this.orga === null) {
          /**
           * 组织添加
           */

        } else {
          /**
           * 组织编辑
           */
          this.http(this, 'put', this.api.orga.updateOrga + this.orgaData.orgaId, {
            orgaId: this.orgaData.orgaId,
            orgaName: this.orgaData.orgaName
          }).then(() => {
            this.$parent.loadOrgas();
            this.$notify({
              title: '成功',
              message: '修改成功',
              type: 'success'
            });
          })
        }
        this.$emit('close');
      },
      handleClose() {
        this.$emit('close');
      }
    },
    created() {
      if (this.orga != null) {
        console.log(this.orga);
        this.orgaData.orgaId = this.orga.orgaId;
        this.orgaData.orgaName = this.orga.orgaName;
      } else {
        this.actionName = "添加";
      }
    }
  }

</script>
