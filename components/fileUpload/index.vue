<template>
  <div>
    <input
      :multiple="multiFils"
      type="file"
      ref="file"
      @change="onFileChange"
      style="display: none"
    />
    <v-text-field
      :append-icon="'mdi-attachment'"
      v-model="imageName"
      filled
      dense
      @click:append="$refs.file.click()"
      @click="$refs.file.click()"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <template v-slot:prepend>
        <v-btn :href="file_url" target="_blank" icon v-if="file_url">
          <v-icon>mdi-file</v-icon>
        </v-btn>
      </template>
    </v-text-field>

    <v-dialog v-model="errorDialog" max-width="300" persistent>
      <v-card>
        <v-card-text class="subheading">
          <v-alert>{{ ImageErrorMsg }}</v-alert>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="primary" @click="resetData">{{
            $t('button.got_it')
          }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { isValidPDfType, isValidImgSize } from '@/utils/validate'

export default {
  name: 'FileUpload',
  inheritAttrs: false,
  props: {
    reset: {
      type: Boolean,
      default: false,
    },
    reqType: {
      type: String,
      default: '',
    },
    maxSize: {
      type: Number,
      default: 5,
    },
    file_url: {
      type: String,
      default: '',
    },
    files_urls: {
      type: Array,
      default: () => [],
    },
    file_id: {
      default: null,
    },
    file_name: {
      type: String,
      default: '',
    },
    locale: {
      type: String,
      default: 'en',
    },
    editCase: {
      type: Boolean,
      default: false,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    reset: {
      handler(value) {
        if (value) {
          this.$refs.file.value = ''
          this.imageName = ''
          this.fileId = ''
          this.indexFile = ''
        }
      },
      immediate: true,
    },

    file_id: {
      handler(value) {
        if (value) {
          this.fileId = value
        }
      },
      immediate: true,
    },
  },

  computed: {
    ImageErrorMsg() {
      if (this.errorType === 'NOT_PDF') {
        return this.$t('validation.file_type')
      } else if (this.errorType === 'SIZE') {
        return this.$t('validation.imageSize', { count: this.maxSize })
      }
    },
    multiFils() {
      if (this.multiple) {
        return true
      } else {
        return false
      }
    },
  },
  data() {
    return {
      imageName: null,
      ImageUrl: null,
      errorDialog: null,
      errorText: '',
      errorType: '',
      absolute: false,
      overlay: false,
      zIndex: 990,
      pdfFile: '',
      filePath: '',
      loading: false,
      passingFiles: this.files_urls,
      fileId: this.file_id || null,
      indexFile: null,
    }
  },
  methods: {
    readImage(pdfFile) {
      if (this.validateSize(pdfFile)) {
        this.imageName = pdfFile.name
        this.ImageUrl = URL.createObjectURL(pdfFile)

        if (pdfFile) {
          let dataObj = {
            file: pdfFile,
          }

          if (this.fieldName) {
            dataObj.name = this.fieldName
            this.$emit('fileSelected', dataObj)
          } else {
            this.$emit('fileSelected', dataObj)
          }
        }
      }
    },
    resetData() {
      this.$refs.file.value = ''
      this.errorDialog = false
      setTimeout(() => {
        this.errorType = ''
      }, 300)
    },
    onFileChange(e) {
      const files = e.target.files
      if (files.length > 0) {
        // this.filePath = null;
        if (!this.multiple) {
          this.readImage(files[0])
          // if (this.validateType(files[0])) {
          // }
        } else {
          for (let file of files) {
            this.readImage(file)
            // if (this.validateType(file)) {
            // }
          }
        }
      }
    },

    validateSize(file) {
      if (isValidImgSize(file.size, this.maxSize)) {
        return true
      } else {
        this.errorType = 'SIZE'
        this.errorDialog = true
        return false
      }
    },
    validateType(file) {
      if (isValidPDfType(file)) {
        return true
      } else {
        this.errorType = 'NOT_PDF'
        this.errorDialog = true
        return false
      }
    },
  },
}
</script>
