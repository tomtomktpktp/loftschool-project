import Vue from "vue";

const thumb = {
	props:["works","currentWork"],
	template: "#preview-thumb"
};

const btns = {
	template: "#preview-btns",

};

const display = {
	props:["currentWork", "works"],
	template: "#preview-display",
	components: { thumb,btns },
	computed:{
		reversedWorks(){
			const works=[...this.works];
			return this.works.reverse();
		}
	}
};

const tags = {
	template: "#preview-tag"
};

const info = {
	props:["currentWork"],
	template: "#preview-info",
	components: { tags },
};

new Vue({
	el: "#preview-component",
	template: "#preview-container",
	components: { display, info },
	data() {
		return{
			works: [],
			currentIndex: 0
		};
	},
	computed: {
		currentWork(){
			return this.works[this.currentIndex];
		}
	},
	watch:{
		currentIndex(value){
			this.makeInfiniteLoopForIndex(value);
		}
	},
	methods: {
		makeInfiniteLoopForIndex(index){
			const worksNumber = this.works.length-1;
			if(index < 0) this.currentIndex=worksNumber;
			if(index > worksNumber) this.currentIndex=0;
		},
		requireImagesToArray(data){
			return data.map(item =>{
				const requiredImage = require(`../images/content/${item.photo}`).default;
				item.photo = requiredImage;
				return item;
			});
		
	},
	slide(direction){
		switch(direction){
			case "next":
				this.currentIndex++;
				break;
			case "prev":
				this.currentIndex--;
				break;
		}
	},
	},
	created() {
		const data  = require("../data/works.json");
		this.works = this.requireImagesToArray(data);
	}
});

