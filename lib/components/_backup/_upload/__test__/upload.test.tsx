import { describe, expect, it, vi } from 'vitest'
import { reactive, ref, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { URL } from 'url'
import LewUpload from '../src/LewUpload'
import { UploadFile } from '../src/upload.type'

const getMockFile = (element: Element, files: File[]): void => {
  Object.defineProperty(element, 'files', {
    get() {
      return files
    }
  })
}

/**
 * fix js-dom TypeError: The "obj" argument must be an instance of Blob. Received an instance of File
 * https://github.com/vitest-dev/vitest/issues/1377
 */
const createObjectURLFn = vi.fn()
Object.defineProperty(URL, 'createObjectURL', {
  writable: true,
  value: createObjectURLFn
})

describe('Upload', () => {
  it('accept/multiple properties work well', () => {
    const wrapper = mount({
      components: { LewUpload },
      setup() {
        return () => <lew-upload accept=".png,.jpg" multiple></lew-upload>
      }
    })

    const input = wrapper.find('.lew-upload__input')
    expect(input.exists()).toBeTruthy()
    expect(input.attributes('accept')).toBe('.png,.jpg')
    expect(input.attributes('multiple')).toBe('')
  })

  it('fileList/showFileList work well', async () => {
    const fileList = reactive([
      {
        name: 'img_1.png',
        url: 'http://abc.com/statis/img_1.png',
        status: 'ready',
        percent: 0
      },
      {
        name: 'img_2.png',
        url: 'http://abc.com/statis/img_2.png',
        status: 'uploading',
        percent: 10
      },
      {
        name: 'img_3.png',
        url: 'http://abc.com/statis/img_3.png',
        status: 'success',
        percent: 100
      },
      {
        name: 'img_4.png',
        url: 'http://abc.com/statis/img_4.png',
        status: 'error',
        percent: 100
      }
    ])

    const showFileList = ref(true)

    const wrapper = mount({
      components: { LewUpload },
      template: `    
                <lew-upload
                    :showFileList="showFileList"
                    v-model:fileList="fileList"
                >
                </lew-upload>
            `,
      setup() {
        return {
          showFileList,
          fileList
        }
      }
    })

    const list = wrapper.find('.lew-upload-list')
    expect(list.exists()).toBeTruthy()

    const listItems = wrapper.findAll('.lew-upload-list__item')
    expect(listItems.length).toBe(4)

    // don't show file list
    showFileList.value = false
    fileList.length = 0
    await nextTick()
    const newList = wrapper.find('.lew-upload-list')
    expect(newList.exists()).toBe(false)

    const newListItems = wrapper.findAll('.lew-upload-list__item')
    expect(newListItems.length).toBe(0)
  })

  it('drag work file', async () => {
    const wrapper = mount({
      components: { LewUpload },
      setup() {
        return () => <lew-upload drag></lew-upload>
      }
    })

    const dragger = wrapper.find('.lew-upload-dragger')
    expect(dragger.exists()).toBe(true)
  })

  it('disabled work well', () => {
    const wrapper = mount({
      components: { LewUpload },
      setup() {
        const fileList = reactive([
          {
            name: 'img_3.png',
            url: 'http://abc.com/statis/img_3.png',
            status: 'success',
            percent: 100
          }
        ])

        return () => <lew-upload disabled v-model:fileList={fileList}></lew-upload>
      }
    })

    const listItemStatus = wrapper.find('.lew-upload-list__item-status')
    expect(listItemStatus.exists()).toBeTruthy()

    const icons = listItemStatus.findAll('.lew-icon')
    expect(icons.length).toBe(1) // no delete icon
  })

  it('listType work well', () => {
    const wrapper = mount({
      components: { LewUpload },
      setup() {
        const fileList = reactive([
          {
            name: 'img_3.png',
            url: 'http://abc.com/statis/img_3.png',
            status: 'success',
            percent: 100
          }
        ])

        return () => <lew-upload listType="picture" v-model:fileList={fileList}></lew-upload>
      }
    })

    const list = wrapper.find('.lew-upload-list--picture')
    expect(list.exists()).toBeTruthy()
  })

  it('onBeforeUpload work well', async () => {
    const onBeforeUploadFn = vi.fn((file: File) => {
      if (file.type === 'text/plain') {
        return false
      }
      return true
    })

    const onChangeFn = vi.fn()

    const wrapper = mount({
      components: { LewUpload },
      template: `
                <lew-upload
                    @beforeUpload="onBeforeUploadFn"
                    @change="onChangeFn"
                >
                </lew-upload>
            `,
      setup() {
        return {
          onBeforeUploadFn,
          onChangeFn
        }
      }
    })

    const input = wrapper.find('.lew-upload__input')
    expect(input.exists()).toBeTruthy()

    await input.trigger('click')

    const uploadFileList = [
      new File(['test text'], 'file1.txt', {
        type: 'text/plain',
        lastModified: Date.now()
      }),
      new File(['test image'], 'image1.png', {
        type: 'image/png',
        lastModified: Date.now()
      })
    ]

    getMockFile(input.element, uploadFileList)

    const evt = new Event('change')

    await input.element.dispatchEvent(evt)

    expect(onBeforeUploadFn).toBeCalledTimes(2)
    expect(onChangeFn).toBeCalledTimes(1)
  })

  it('slot work well', async () => {
    const wrapper = mount({
      components: { LewUpload },
      template: `
                <lew-upload>
                    <button class="slot-default">submit</button>
                    <template #tip>
                        <span class="slot-tip">tip</span>
                    </template>
                </lew-upload>
            `
    })

    const defaultSlot = wrapper.find('.slot-default')
    expect(defaultSlot.exists()).toBeTruthy()

    const tipSlot = wrapper.find('.slot-tip')
    expect(tipSlot.exists()).toBeTruthy()
  })

  it('autoUpload prop and submit method work well', async () => {
    const uploadRef = ref()

    const autoUpload = ref(false)

    const onChangeFn = vi.fn()

    const wrapper = mount({
      components: { LewUpload },
      template: `
                <lew-upload
                    ref="uploadRef"
                    :autoUpload="autoUpload"
                    @change="onChangeFn"
                >
                </lew-upload>
            `,
      setup() {
        return {
          uploadRef,
          autoUpload,
          onChangeFn
        }
      }
    })

    const input = wrapper.find('.lew-upload__input')
    expect(input.exists()).toBeTruthy()

    await input.trigger('click')
    const uploadFileList = [
      new File(['test text'], 'file1.txt', {
        type: 'text/plain',
        lastModified: Date.now()
      }),
      new File(['test image'], 'image1.png', {
        type: 'image/png',
        lastModified: Date.now()
      })
    ]
    getMockFile(input.element, uploadFileList)
    const evt = new Event('change')
    await input.element.dispatchEvent(evt)
    expect(onChangeFn).toBeCalledTimes(2)

    await nextTick()
    const submitFn = vi.spyOn(uploadRef.value, 'submit')
    uploadRef.value.submit()
    expect(submitFn).toBeCalledTimes(1)
  })

  it('onChange work well', async () => {
    const onChange = vi.fn()

    const wrapper = mount({
      components: { LewUpload },
      template: `
                <lew-upload
                    @change="onChange"
                >
                </lew-upload>`,
      setup() {
        return {
          onChange
        }
      }
    })

    const input = wrapper.find('.lew-upload__input')
    expect(input.exists()).toBeTruthy()

    await input.trigger('click')

    const file = new File(['test'], 'file1.txt', {
      type: 'text/plain',
      lastModified: Date.now()
    })

    const fileList = [file]

    getMockFile(input.element, fileList)

    const evt = new Event('change')

    await input.element.dispatchEvent(evt)

    expect(onChange).toHaveBeenCalledTimes(1)
  })

  it('onPreview work well', () => {
    const fileList = reactive([
      {
        name: 'img_1.png',
        url: 'http://abc.com/statis/img_1.png',
        status: 'ready',
        percent: 0
      },
      {
        name: 'img_2.png',
        url: 'http://abc.com/statis/img_2.png',
        status: 'success',
        percent: 100
      }
    ])

    const onPreviewFn = vi.fn()

    const wrapper = mount({
      components: { LewUpload },
      template: `    
                <lew-upload
                    v-model:fileList="fileList"
                    @preview="onPreviewFn"
                >
                </lew-upload>
            `,
      setup() {
        return {
          fileList,
          onPreviewFn
        }
      }
    })

    const listItemInfoList = wrapper.findAll('.lew-upload-list__item-info')
    listItemInfoList[0].trigger('click')
    expect(onPreviewFn).toBeCalledTimes(0)

    listItemInfoList[1].trigger('click')
    expect(onPreviewFn).toBeCalledTimes(1)
  })

  it('onRemove work well', () => {
    const fileList = reactive([
      {
        name: 'img_1.png',
        url: 'http://abc.com/statis/img_1.png',
        status: 'ready',
        percent: 0
      }
    ])

    const onRemoveFn = vi.fn()

    const wrapper = mount({
      components: { LewUpload },
      template: `    
                <lew-upload
                    v-model:fileList="fileList"
                    @remove="onRemoveFn"
                >
                </lew-upload>
            `,
      setup() {
        return {
          fileList,
          onRemoveFn
        }
      }
    })

    const icons = wrapper.findAll('.lew-icon')
    expect(icons.length).toBe(3)
    const deleteIcon = icons.at(-1)
    deleteIcon?.trigger('click')
    expect(onRemoveFn).toBeCalledTimes(1)
  })

  it('httpRequest work well', async () => {
    const uploadRef = ref()

    const customRequest = vi.fn((options) => options)

    const reqData = reactive({
      username: 'root',
      password: 'root123.'
    })

    const wrapper = mount({
      components: { LewUpload },
      template: `
                <lew-upload
                    ref="uploadRef"
                    :data="reqData"
                    :httpRequest="customRequest"
                >
                </lew-upload>
            `,
      setup() {
        return {
          uploadRef,
          customRequest,
          reqData
        }
      }
    })

    const input = wrapper.find('.lew-upload__input')
    expect(input.exists()).toBeTruthy()

    await input.trigger('click')
    const uploadFileList = [
      new File(['test text'], 'file1.txt', {
        type: 'text/plain',
        lastModified: Date.now()
      })
    ]
    getMockFile(input.element, uploadFileList)
    const evt = new Event('change')
    await input.element.dispatchEvent(evt)

    const customRequestReturn = customRequest.returns[0]
    expect(customRequestReturn.data).toBe(reqData)
    expect(customRequestReturn.data).toEqual(reqData)
  })
})
