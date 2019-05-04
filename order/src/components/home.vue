<template>
  <div class="home">
				<!--搜索-->
				<header>
					<form>
						<input class="input_txt" type="text" />
						<button class="searchBtn">搜索</button>
					</form>
				</header>
				
				<!--主菜单-->
				<div class="main">
					<!--左侧菜品分类-->
					<aside>
						<nav>
							<li v-for="(item,index) in goods_cls" :class=" cur_goods_cls==item.id?'ac':''"@click="change(index)">{{item.name}}</li>
							
						</nav>
					</aside>
					<!--右侧菜品列表-->
					<ul class="goods_cls">
						<li v-for="item in goods_cls">
							<h4>{{item.name}}</h4>
							<dl v-for="id in item.goods">
								<!--goods -->
								<dt>{{goods[id].name}}</dt>
								<dd class="desc">{{goods[id].describe}}</dd>
								<dd>单价：<em>{{goods[id].price}}</em></dd>
								<img :src="goods[id].img" :alt="goods[id].img"/>
								<button class="order-btn " type="button"  @click="order(id,$event)"  :class="goods[id].checked? 'checked':''"  :disabled="goods[id].checked" ><span>点餐</span><b>已点</b></button>
							</dl>
						</li>
					</ul>
				</div>
			
				<div class="footer">
				
					  <div class="shoping_list animated" :class="{'bounceInUp':showShoppingCart,'shoping_list_slide':showShoppingCart}">
		                <div class="empty">
		                    <span  @click="clearShopping"></span>
		                </div>
		                <ul v-if="shopping_cart.length>0">
		                    <li v-for="(itm,index) in shopping_cart">{{itm.name}}
		                        <em>￥{{itm.price}}</em>
		                        <div>
		                            <button class="shoping_sub" type="button" @click="s_sub(itm,index)"></button>
		                            <span>{{itm.num}}</span>
		                            <button class="shoping_add" type="button" @click="s_add(itm)"></button>
		                        </div>
		                    </li>
		                </ul>
		                <ul v-else>
		                    <li style="text-align: center">还没有点菜哟！！</li>
		                </ul>    
		                
		                <!--id给抛物线用-->
		                <button type="button" id="shoppingBtn" class="shoppingBtn" @click="showShoppingCart=!showShoppingCart"></button>
		                <span class="count" :class="{'hide':totalNum==0}">{{totalNum}}</span>
		            </div>
		    
		            <!--底部菜单-->
		            <div class="f_cont">
		                <div class="order_pointer_footer">
		                    <div class="total"><em>￥{{totalPrice}}</em></div>
		                    <a v-if="totalNum>0" href="javascript:;" class="payBtn"  @click="placeOrder">去下单</a>
		                </div>
		            </div>
					
				</div>
				 <div class="modal" :class="{'hide':!showShoppingCart}" @click="showShoppingCart=!showShoppingCart"></div>
			</div>
			
</template>
<script>
	
	import axios from"axios";
	import $ from"jquery";
//	import parabola from '../../static/parabola.min.js';
	
	
	
	
export default {
  name: 'home',
  created(){
			//异步请求数据
			axios.get("/static/data.json").then(
				msg=>{
					this.goods=msg.data.goods;
					this.goods_cls=msg.data.goods_cls;
				},
				()=>{
					alert("数据错误！")
					
				}
			)
		},
		watch: {
			shopping_cart: {
				handler(val, oldval) {
					//清空所有数据
					this.totalNum = this.totalPrice = 0;

					for(var key in this.goods) {
						this.goods[key].checked = false;
					}
					//重新计算
					val.forEach((item) => {
						this.totalNum += item.num;
						this.totalPrice += item.num * item.price;
						//禁用按钮
						this.goods[item.id].checked = true;
					});
				},
				deep: true //对象内部的属性监听，也叫深度监听  
			},
		},
		mounted(){
			
			$(window).on("scroll",this.winScroll)
			
			
		},
	data:()=>({
	
		
		goods:[],//菜品
		goods_cls:[],//菜品分类
		cur_goods_cls:1,
		showShoppingCart: false,
		shopping_cart: [
			
		],
		cur_goods_cls:1,
		//总价格
		totalPrice: 0,
		//总数量
		totalNum: 0,
	}),
	
	methods:{
		
		winScroll(){
			
			let scroll=$(window).scrollTop();
			let that=this;
			$(".goods_cls li").each(function  (i,el) {
				if ($(this).position().top<scroll+300) {
					that.cur_goods_cls=i+1
				}
			})
			
		},
		//点餐
			order(id,ev) {
				var el = this.goods[id];
				this.shopping_cart.push({
					id: el.id,
					name: el.name,
					price: el.price,
					num: 1
				});
				
				
				 let ball=$("<div class='ball'></div>")
		    
		    
			    let origin=ev.target;
	//		    document.body.appendChild(el);
			    $(document.body).append(ball)
			    
			    new parabola({
			        origin: origin,
			        target: '#shoppingBtn',
			        element: ball,
			        a:0.008,
			        time: 800,
			        callback: function(el){
	//		            console.log(el[0])
			            el.remove();
			        }
			    }).move();
				
			},
		
		change(i){
			
			let aLi=$(".goods_cls li");
			$(window).scrollTop(aLi.eq(i).offset().top-60)
			this.cur_goods_cls=this.goods_cls[i].id
		},
		

			//清空购物车
			clearShopping() {
				this.showShoppingCart = !this.showShoppingCart;
				this.shopping_cart = [];
			},

			//购物车add
			s_add(item) {
				item.num++;
			},

			//购物车sub
			s_sub(item,i) {
				item.num--;
				if(item.num == 0) {
					this.shopping_cart.splice(i, 1);
				};
			},
			//去下单
			placeOrder(){
			    this.$router.push({name:"pay",params:{totalPrice:this.totalPrice}})
			}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

</style>
