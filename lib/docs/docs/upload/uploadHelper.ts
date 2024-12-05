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
  const formData = new FormData()
  formData.append('file', file as File)
  setFileItem({ id, status: 'uploading' })
  axios
    .post({
      url: '/open/upload',
      data: formData,
      baseURL: '/api_sso',
      onUploadProgress: (e: any) => {
        setFileItem({ id, percent: e.progress * 100 })
      }
    })
    .then((res: any) => {
      if (res.success) {
        const { fileName } = res.data
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
