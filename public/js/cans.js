/*
	 * 作者：sokie
	 *   qq：2048226123
	 * 描述：第一次上传资源，有点粗糙，以后有时间会优化的
	 *
	 */
	window.addEventListener('load',function(){
		var initX;
		var moveX;
		var X = 0;
		var objX = 0;
		window.addEventListener('touchstart',function(event){
			event.preventDefault();
			var obj = event.target.parentNode;
			if(obj.className == "list-li"){
				initX = event.targetTouches[0].pageX;
				objX =(obj.style.WebkitTransform.replace(/translateX\(/g,"").replace(/px\)/g,""))*1;
			}
			if( objX == 0){
				window.addEventListener('touchmove',function(event) {
					event.preventDefault();
					var obj = event.target.parentNode;
					if (obj.className == "list-li") {
						moveX = event.targetTouches[0].pageX;
						X = moveX - initX;
						if (X > 0) {
							obj.style.WebkitTransform = "translateX(" + 0 + "px)";
						}
						else if (X < 0) {
							var l = Math.abs(X);
							obj.style.WebkitTransform = "translateX(" + -l + "px)";
							if(l>160){
								l=160;
								obj.style.WebkitTransform = "translateX(" + -l + "px)";
							}
						}
					}
				});
			}
			else if(objX<0){
				window.addEventListener('touchmove',function(event) {
					event.preventDefault();
					var obj = event.target.parentNode;
					if (obj.className == "list-li") {
						moveX = event.targetTouches[0].pageX;
						X = moveX - initX;
						if (X > 0) {
							var r = -160 + Math.abs(X);
							obj.style.WebkitTransform = "translateX(" + r + "px)";
							if(r>0){
								r=0;
								obj.style.WebkitTransform = "translateX(" + r + "px)";
							}
						}
						else {     //向左滑动
							obj.style.WebkitTransform = "translateX(" + -160 + "px)";
						}
					}
				});
			}

		})
		window.addEventListener('touchend',function(event){
			event.preventDefault();
			var obj = event.target.parentNode;
			if(obj.className == "list-li"){
				objX =(obj.style.WebkitTransform.replace(/translateX\(/g,"").replace(/px\)/g,""))*1;
				if(objX>-40){
					obj.style.WebkitTransform = "translateX(" + 0 + "px)";
				}else{
					obj.style.WebkitTransform = "translateX(" + -160 + "px)";
				}
			}
		 })

	})
