import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import pay from '@/components/pay'

Vue.use(Router)

export default new Router({
  routes: [
    {
			"path":"/",
			"redirect":"/home"
			
			
		},
		{
			"path":"/home",
			"component":home
			
			
		},
	
		{
			"path":"/pay",
			"name":"pay",
			"component":pay
			
			
		},
  ]
})
