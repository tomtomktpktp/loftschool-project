import Vue from "vue";

const thumb = {
	props:["works","currentWork"],
	template: "#preview-thumb"
};

const btns = {
	template: "#preview-btns",

};

const display = {
	props:["currentWork", "works", "currentIndex"],
	template: "#preview-display",
	components: { thumb,btns },
	computed:{
		limitedWorks(){
			const works=[...this.works];
			return this.works.slice(0,3);
		}
	}
};

const tags = {
	props :["tags"],
	template: "#preview-tag"
};

const info = {
	props:["currentWork"],
	template: "#preview-info",
	components: { tags },
	computed:{
		tagsArray(){
			return this.currentWork.skills.split(",");
		}
	}
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
			return this.works[0];
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
		const lastItem=this.works[this.workslength-1];
		switch(direction){
			case "next":
				this.works.push(this.works[0]);
				this.works.shift();
				this.currentIndex++;
				break;
			case "prev":
				this.works.unshift();
				this.works.pop();
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

