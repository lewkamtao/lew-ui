import axios from '@/axios/http'
import type { UploadFileItem } from 'lew-ui'

export default ({
  fileItem,
  setFileItem
}: {
  fileItem: UploadFileItem
  setFileItem: Function
}) => {
  const { id, file } = fileItem
  const formdata = new FormData()
  formdata.append('file', file as File)
  setFileItem({ id, status: 'uploading' })
  axios
    .post({
      url: '/open/upload',
      data: formdata,
      baseURL: '/api_sso',
      onUploadProgress: (e: any) => {
        setFileItem({ id, percent: e.progress * 100 })
      }
    })
    .then((res: any) => {
      if (res.success) {
        const { fileName } = res.data
        console.log(
          '上传成功：',
          `https://app.tngeek.com/api_sso/open/file/${fileName}`
        )
        setFileItem({
          id,
          status: 'success',
          url: `https://app.tngeek.com/api_sso/open/file/${fileName}`,
          percent: 100
        })
      } else {
        setFileItem({ id, status: 'fail' })
      }
    })
}
