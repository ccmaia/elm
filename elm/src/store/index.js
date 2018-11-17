import Vue from 'vue'
import Vuex from 'vuex'
// import Jq from 'jquery'
// 引入模块开发
// import FoodList from './foodList'
Vue.use(Vuex)

export default new Vuex.Store({
    strict:true,//vuex严格模式
    // modules:{
    //     FoodList
    // }

    // namespaced:true,
    // 状态源
    state:{
        foodList:[],
        shopcar:[]
    },
    actions:{
        async foodList ({commit},arg){
            let latitude = arg.split(',')[0];
            let longitude = arg.split(',')[1];
            let data = await(
                await fetch('/Shopping/shopping/v3')
            ).json()
            // commit('endLoading')
            commit('foodList',data)
        },
        //购物车
        async shopCar ({commit},arg){
            let data = await(
                await fetch('/Shopping/shopping/pizza')
            ).json()
            // commit('endLoading')
            commit('shopCar',data)
        },
        // 排序
        sortList({commit},arg){
            commit('sortList',arg)
        }
    },
    mutations:{
        shopCar(state,arg){
            state.shopcar = arg.menu
            console.log(state.shopcar)
        },
        foodList(state,arg){
            state.foodList = arg.items
        },
        sortList(state,arg){
            // console.log(arg)
            if(arg == 'price'){
                state.foodList = state.foodList.sort( (item1,item2) => {
                    return item1.restaurant.piecewise_agent_fee.rules[0].price - item2.restaurant.piecewise_agent_fee.rules[0].price
                })
            }else if(arg == 'distance'||arg == 'recent_order_num'){
                state.foodList = state.foodList.sort( (item1,item2) => {
                    return item1.restaurant.arg-item2.restaurant.arg
                })
            }else if(arg == 'delivery_mode.text'||arg == 'support_tags[1].text'||arg == 'supports[0].id'){
                // state.foodList = state.foodList.filter( (item) => {
                //     if(item.restaurant.arg){
                //         return item
                //     }
                // })
            }else if(arg == 'supports[0].id'){

            }
            // console.log(state.foodList)
        }
    },
    getters:{
        sortList(state,arg){
            // console.log(arg)
            let wyq = state.foodList.filter( (item) => {
                return item.restaurant.distance < 2000
            })
            return wyq
        }
    }
})


