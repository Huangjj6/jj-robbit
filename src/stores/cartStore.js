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

    return{cartList,addCart}
},
{
  persist: true,
})
