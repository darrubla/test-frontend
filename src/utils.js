import { toast } from 'react-toastify';

export const notify = (type, text, id) => {
  const toastType = {
    success: 'success',
    error: 'error',
    info: 'info',
  }
  toast[toastType[type]](text, {
    toastId: id
  })
}