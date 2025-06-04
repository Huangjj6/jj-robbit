import request from "@/utils/http.js"

export const getTopCategoryAPI = (id) => {
  return request({
    url:'/category',
    params:{
      id
    }
  })
}