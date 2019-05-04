<template>
	<div class="pay">
		 <h2>订单提交成功</h2>
        <p>订单总额：<em style="color: red; font-size:30px;">{{$route.params.totalPrice}}</em> 元</p>
        <br>
        <h3>您的订单编号是：</h3>
        <p class="orderNum">3323574823</p>
        <p><button class="payBtn">去付款</button></p>
        <p><button class="backBtn" @click="back">返回菜单</button></p>
		
	</div>
	
	
</template>

<script>
	export default {
		
		methods:{
			back(){
				this.$router.push("home")
				
			}
			
		}
		
		
	}
	
	
</script>

<style>
</style>