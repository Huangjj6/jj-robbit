import { defineStore } from 'pinia'
import { ref,computed } from 'vue'
import {useUserStore} from './user'
import {insertCartAPI,findNewCartListAPI} from '@/apis/cart'


export const useCartStore = defineStore('cart',()=>{
    const userStore=useUserStore()
    const isLogin=computed(()=>userStore.userInfo.token)
    const cartList=ref([])
    const addCart=async (goods)=>{
      const {skuId,count}=goods
      if(isLogin.value) { 
        await insertCartAPI({skuId,count})
        const res = await findNewCartListAPI()
        cartList.value=res.result
      }else{
        //已添加过count+1
        let item=cartList.value.find((item)=>item.id===goods.id)
        if(item){
          item.count++
        }else{
          //未添加过直接添加
          cartList.value.push(goods)
        }
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
    const isAll=computed(()=>cartList.value.every((item)=>item.selected))
    const selectedCount=computed(()=>cartList.value.filter((item)=>item.selected).reduce((a,c)=>a+c.count,0))
    const selectedPrice=computed(()=>cartList.value.filter((item)=>item.selected).reduce((a,c)=>a+c.price*c.count,0))
    
    const allCheck=(selected)=>{
      cartList.value.forEach(item=>item.selected=selected)
    }
    return{cartList,addCart,delCart,allCount,allPrice,singleCheck,isAll,allCheck,selectedCount,selectedPrice}



},
{
  persist: true,
})
