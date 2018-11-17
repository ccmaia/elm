export default{
    namespaced:true,
    // 状态源
    state:{
        str:'1111',
        latitude:'',
        longitude:''
    },
    actions:{
        async foodList ({commit},arg){
            // console.log(arg)

            // commit('isLoading')
            // let data = await(
            //     await fetch('/Food/shopping/v3/restaurants?latitude='+ latitude +'&longitude='+ longitude+'&limit=10')
            // ).json()
            // commit('endLoading')
            commit('foodList',arg)
        }
    },
    mutations:{
        foodList(state,arg){
            state.str = arg
        }
    },

    // 第三步 数据过滤（缓存） ==> 相当于computed（计算属性）
    // getters:{
    //     CnodeGood(state){
    //         console.log(state)
    //         if(state.AllTopic.length){
    //             return state.AllTopic[0].data.filter( item => {
    //                 return item.good
    //             })
    //         }else{
    //             return []
    //         }
    //     }
    // }
}