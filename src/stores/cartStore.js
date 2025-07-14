import { defineStore } from 'pinia'
import { ref,computed } from 'vue'


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
      const idx=cartList.value.findIndex((item)=>skuId===item.skuId)
        cartList.value.splice(idx,1)
    }
    const singleCheck=(skuId,selected)=>{
      const item=cartList.value.find((item)=>item.skuId===skuId)
      item.selected=selected
    }
    const allCount=computed(()=>cartList.value.reduce((a,c)=>a+c.count,0))
    const allPrice=computed(()=>cartList.value.reduce((a,c)=>a+c.price*c.count,0))
    return{cartList,addCart,delCart,allCount,allPrice,singleCheck}


},
{
  persist: true,
})
