import request from '@/utils/request.js'

export function getFonts (fileKey){
    return request({
        url:`/api/oss/signed-url`,
        method:'get',
        params:{fileKey}
    })
}