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
        <el-button type="primary" @click="modifyOrga">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

  import axios from 'axios';

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
       * 编辑组织
       */
      modifyOrga() {
        let orga = {
          orgaId: this.orgaData.orgaId,
          orgaName: this.orgaData.orgaName
        }
        axios.put(this.api.orga.updateOrga + this.orgaData.orgaId, orga).then((response) => {
          let result = response.data;
          if (result && result.code === "10000") {
            this.$parent.loadOrgas();
            //关闭窗口
            this.$emit('close');
            this.$notify({
              title: '成功',
              message: '修改成功',
              type: 'success'
            });
          }
        }).catch((response) => {
          let result = response.response.data;
          this.$notify({
            title: '提示',
            message: result.error,
            type: 'error'
          });
        })
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
