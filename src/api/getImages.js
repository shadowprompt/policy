import request from '@/utils/request.js'

export function getDatasetsByPredictionId(data) {
    return request({
      url: `/api/getImages`,
      method: 'post',
      data
    })
  }