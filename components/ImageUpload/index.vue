<template>
  <main v-bind="$attrs" style="height: 400px">
    <section class="image-preview">
      <img
        ref="image_ref"
        :src="ImageUrl ? ImageUrl : require('@/assets/images/avatar.png')"
        alt="photo"
      />
      <v-btn
        v-if="authType !== 'COMPANY'"
        class="image-preview__upload-button"
        large
        icon
        @click="$refs.file.click()"
        v-on="$attrs"
        :title="$t('upload_image')"
      >
        <v-icon color="#fff">mdi-camera</v-icon>
      </v-btn>
    </section>
    <input
      type="file"
      ref="file"
      @change="onFileChange"
      style="display: none"
    />

    <v-dialog v-model="errorDialog" max-width="300" persistent>
      <v-card>
        <v-card-text class="subheading">{{ ImageErrorMsg }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="resetData">{{ $t('button.got_it') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </main>
</template>

<script>
import { isValidImgType, isValidImgSize } from '@/utils/validate'

export default {
  name: 'ImageUpload',
  inheritAttrs: false,
  props: {
    file_name: {
      type: String,
      default: '',
    },
    authType: {
      type: String,
      default: 'USER',
    },
    reqType: {
      type: String,
      default: '',
    },
    maxSize: {
      type: Number,
      default: 1,
    },
    imgUrl: {
      type: String,
      default: null,
    },
    imgId: {
      default: null,
    },
    width: {
      type: Number,
      default: null,
    },
    height: {
      type: Number,
      default: null,
    },
    maxHeight: {
      type: Number,
      default: 200,
    },
    minHeight: {
      type: Number,
      default: 200,
    },
    reset: {
      type: Boolean,
      default: false,
    },
    resetToggle: {
      type: Boolean,
      default: false,
    },
    fieldName: {
      type: String,
      default: '',
    },
    value: {
      type: String,
    },
    isUpdate: {
      type: Boolean,
      default: true,
    },
  },
  watch: {
    reset: {
      handler(value) {
        if (value) {
          this.resetImageFile()
        }
      },
      immediate: true,
    },

    imgUrl: {
      handler(newValue) {
        if (newValue) {
          this.ImageUrl = newValue
        }
      },
      immediate: true,
    },
  },
  computed: {
    ImageErrorMsg() {
      if (this.errorType === 'MIME') {
        return this.$t('validation.imageType')
      } else if (this.errorType === 'SIZE') {
        return this.$t('validation.imageSize', { count: this.maxSize })
      } else if (this.errorType === 'DIMENSIONS') {
        return this.$t('validation.imageDimensions', {
          width: this.width,
          height: this.height,
        })
      } else {
        return ''
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
    }
  },
  methods: {
    onFileChange(e) {
      if (e.target.files.length > 0) {
        let imageFile = e.target.files[0]
        // with Dimensions
        if (this.width && this.height) {
          if (this.validateType(imageFile)) {
            this.validateDimentions(imageFile)
              .then(() => {
                this.readImage(imageFile)
              })
              .catch(() => {
                this.errorType = 'DIMENSIONS'
                this.errorDialog = true
              })
          }
          // without Dimensions
        } else {
          if (this.validateType(imageFile)) {
            this.readImage(imageFile)
          }
        }
      }
    },
    readImage(imageFile) {
      if (this.validateSize(imageFile)) {
        if (this.isUpdate) {
          const formData = new FormData()
          formData.append('avatar', imageFile)
          this.$refs.image_ref.classList.add('transparent-image')
          this.$axios.post('/user/update-avatar', formData).then(() => {
            this.$store.dispatch('profile/setUserProfile')
            this.$auth.fetchUser()
            this.imageName = imageFile.name
            this.ImageUrl = URL.createObjectURL(imageFile)
            this.$refs.image_ref.classList.remove('transparent-image')
          })
        } else {
          this.$emit('on-file-change', imageFile)
          this.imageName = imageFile.name
          this.ImageUrl = URL.createObjectURL(imageFile)
        }
      }
    },

    validateDimentions(file) {
      return new Promise((resolve, reject) => {
        let image = new Image()
        image.src = URL.createObjectURL(file)
        image.addEventListener(
          'load',
          () => {
            let width = image.naturalWidth
            let height = image.naturalHeight
            if (width !== this.width && height !== this.height) {
              reject(false)
            } else {
              resolve(true)
            }
          },
          false
        )
      })
    },
    validaRatio(file) {
      return new Promise((resolve, reject) => {
        let image = new Image()
        image.src = URL.createObjectURL(file)
        image.addEventListener(
          'load',
          () => {
            let width = image.naturalWidth
            let height = image.naturalHeight
            if (width / height !== 1) {
              reject(false)
            } else {
              resolve(true)
            }
          },
          false
        )
      })
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
      if (isValidImgType(file)) {
        return true
      } else {
        this.errorType = 'MIME'
        this.errorDialog = true
        return false
      }
    },
    resetImageFile() {
      this.ImageUrl = null
      this.$refs.file.value = ''
    },
    resetData() {
      this.$refs.file.value = ''
      this.errorDialog = false
      setTimeout(() => {
        this.errorType = ''
      }, 300)
    },
  },
}
</script>

<style >
.transparent-image {
  opacity: 0.7;
  transition: all 0.5s ease-in-out;
}
</style>