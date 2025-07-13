import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCartStore = defineStore('cart',()=>{
    const cartList=ref([])
    const addCart=(goods)=>{
        //已添加过count+1
        let item=cartList.value.find((item)=>item.id===goods.id)
        if(item){
          item.count++
        }else{
          //未添加过直接添加
          cartList.value.push(goods)
        }
    }
    const delCart=(skuId)=>{
      const idx=cartList.value.findIndex((item)=>item.skuId===skuId)
      if(idx>-1){
        cartList.value.splice(idx,1)
      }
    }
    return{cartList,addCart,delCart}
},
{
  persist: true,
})
