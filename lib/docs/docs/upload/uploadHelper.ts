import type { UploadFileItem } from 'lew-ui'
import axios from '@/axios/http'

export default ({
  fileItem,
  setFileItem,
}: {
  fileItem: UploadFileItem
  setFileItem: (item: UploadFileItem) => void
}) => {
  const { key, file } = fileItem
  const formData = new FormData()
  formData.append('file', file as File)
  setFileItem({ key, status: 'uploading' })
  axios
    .post({
      url: '/open/upload',
      data: formData,
      baseURL: '/api_sso',
      onUploadProgress: (e: any) => {
        setFileItem({ key, percent: e.progress * 100 })
      },
    })
    .then((res: any) => {
      if (res.success) {
        const { fileName } = res.data
        setFileItem({
          key,
          status: 'success',
          url: `https://app.tngeek.com/api_sso/open/file/${fileName}`,
          percent: 100,
        })
      }
      else {
        setFileItem({ key, status: 'fail' })
      }
    })
}
