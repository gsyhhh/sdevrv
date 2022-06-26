import request from '@/utils/request'
export const getSmsCode = (mobile) => {
  return request({
    url: '/sms/codes/$(mobile)'
  })
}
/**
 *  @param { mobile, code } param0
 @retyrn promise

 */

export const login = ({ mobile, code }) => {
  return request({
    method: 'POST',
    url: '/authorizations',
    data: {
      mobile,
      code
    }
  })
}
