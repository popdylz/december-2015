$(function() {
	//弹窗
	$(".beginning-wrap").click(function() {
		$(".popup").show();
	});
	$(".popup").click(function() {
		$(".popup").hide();
	});
	//冒烟动画控制
	var fireInterval;
	$(".beginning-wrap").click(function() {
		clearInterval(fireInterval);
		$(".fire").show();
		$(".fire-back").hide();
		setTimeout(function() {
			changeFire();
			changeFireBack();
		}, 0)
		fireInterval = setInterval(function() {
			changeFire();
			changeFireBack();
		}, 2000);
	});
//	尾气控制
	$(".arrow").click(function() {
		clearInterval(fireInterval);
		setTimeout(function() {
			changeFire();
			changeFireBack();
		}, 0)
		fireInterval = setInterval(function() {
			changeFire();
			changeFireBack();
		}, 2000);
	});
	//点击领票
	$(".beginning-wrap").click(function() {
		$(".fire").show();
	});
	//点击站点	
	$(".arrow").click(function() {
		var clickStation = $(this).attr("class").split(" ")[2].substr(1, 1);
		var trainStation = $(".train-head").attr("class").split(" ")[1].substr(1, 2);
		if(!$(".train-head").hasClass("onmove")) {
			if(trainStation != clickStation) {
				$(".train-head").addClass("onmove");
				Loadselect(this, trainStation, clickStation);
			} else {
				if($(".fire").is(":hidden")) {
					$(".fire").hide();
					$(".fire-back").show();
				} else {
					$(".fire").show();
					$(".fire-back").hide();
				}
			}
		}
		if(!$(this).hasClass("dis")) {
			Zhandian(this, "url(img/z" + clickStation + ".png)", hrefarray[clickStation - 1], "url(img/tb" + clickStation + ".png)", 5000);
		} else {
			Zhandian(this, "url(img/zg" + clickStation + ".png)", "javascript:;", "url(img/tbg" + clickStation + ".png)", 5000);
		}
	});
	//判断是否在活动期间
	var nowDate = new Date();
	var nowyear = nowDate.getFullYear();
	var nowmonth = nowDate.getMonth() + 1;
	var nowDay = nowDate.getDate();
	if(nowDay < 10) {
		nowDay = "0" + nowDay;
	}
	var timeArr = [20151129, 20151130, 20151206, 20151209, 20151214, 20151219, 20151226];
	var timeArra = [20151205, 20151209, 20151208, 20151213, 20151218, 20151225, 20160104];
	var nowtime = nowyear + "" + nowmonth + "" + nowDay;
	for(var i = 0; i < timeArr.length; i++) {
		if(!(timeArr[i] < nowtime && nowtime < timeArra[i])) {
			$(".arrow:eq(" + i + ")").addClass("dis")
		}
	}
})
//
var Timearray = [680, 1910, 3602, 720, 3320, 4546, 4546];
var hrefarray = ["http://c.m.suning.com/channel/1212yushou.html", "http://c.m.suning.com/channel/wapqicheyongpin00004.html", "http://c.m.suning.com/channel/wappaihangbang00012.html#nav", "http://c.m.suning.com/channel/1212wap.html", "http://www.baidu.com", "http://www.baidu.com", "http://www.baidu.com"]
//冒烟动画分解
//正向
function changeFire() {
	$(".fire").css("background-image", "url(img/fire1.png)");
	setTimeout(function() {
		$(".fire").css("background-image", "url(img/fire2.png)");
	}, 500);
	setTimeout(function() {
		$(".fire").css("background-image", "url(img/fire3.png)");
	}, 1000);
	setTimeout(function() {
		$(".fire").css("background-image", "url(img/fire0.png)");
	}, 1500);
}
//逆向
function changeFireBack() {
	$(".fire-back").css("background-image", "url(img/fire1.png)");
	$(".fire-back").css("-webkit-transform", "rotate(180deg)");
	setTimeout(function() {
		$(".fire-back").css("background-image", "url(img/fire2.png)");
		$(".fire-back").css("-webkit-transform", "rotate(180deg)");
	}, 500);
	setTimeout(function() {
		$(".fire-back").css("background-image", "url(img/fire3.png)");
		$(".fire-back").css("-webkit-transform", "rotate(180deg)");
	}, 1000);
	setTimeout(function() {
		$(".fire-back").css("background-image", "url(img/fire0.png)");
		$(".fire-back").css("-webkit-transform", "rotate(180deg)");
	}, 1500);
}
//路径选择
function Loadselect(dom, trainStation, clickStation) {
	var WaitTime = 0,
	removeTime = 0;
	if(clickStation > trainStation) {
		$(".fire").show();
		$(".fire-back").hide();
		for(var i = trainStation; i < clickStation; i++) {
			if(i == trainStation) {
				WaitTime = 0;
			} else {
				WaitTime += Timearray[i - 2];
			}
			selectPath(i, WaitTime);
		}
		removeTime = WaitTime + Timearray[i - 2];
		setTimeout(function() {
			$(".train-head").removeClass("onmove");
		}, removeTime)
	} else {
		$(".fire-back").show();
		$(".fire").hide();
		for(var i = trainStation; i > clickStation; i--) {
			if(i == trainStation) {
				WaitTime = 0;
			} else {
				WaitTime += Timearray[i - 1];
			}
			selectPath(-i + 1, WaitTime);
		}
		removeTime = WaitTime + Timearray[clickStation - 1];
		setTimeout(function() {
			$(".train-head").removeClass("onmove");
		}, removeTime)
	}
}
//站点信息
function Zhandian(dom, backimg, href, tubiao, showTime) {
	var $this = $(dom);
	if($this.hasClass("href1")) {
		location.href = href;
	} else {
		$this.css("background-image", backimg).animate({
			width: "3.5rem"
		}, 300, function() {
			$this.addClass("href1");
			setTimeout(function() {
				$this.animate({
					width: "1.125rem"
				}, 300, function() {
					$this.css("background-image", tubiao);
					$this.removeClass("href1");
				})
			}, showTime)
		});
	}
}
//路径正负向选取
function selectPath(n, WaitTime) {
	var num = 0;
	if(n < 0) {
		n = -n;
		num = -1;
	} else {
		num = 1;
	}
	if(n == 1) {
		setTimeout(function() {
			path1(num, ".train-head");
		}, WaitTime);
	} else if(n == 2) {
		setTimeout(function() {
			path2(num, ".train-head");
		}, WaitTime);
	} else if(n == 3) {
		setTimeout(function() {
			path3(num, ".train-head");
		}, WaitTime);
	} else if(n == 4) {
		setTimeout(function() {
			path4(num, ".train-head");
		}, WaitTime);
	} else if(n == 5) {
		setTimeout(function() {
			path5(num, ".train-head");
		}, WaitTime);
	} else if(n == 6) {
		setTimeout(function() {
			path6(num, ".train-head");
		}, WaitTime);
	} else if(n == 7) {
		setTimeout(function() {
			path7(num, ".train-head");
		}, WaitTime);
	}
}
//路径详情
function path1(n, dom) {
	if(n == 1) {
		$(dom).animate({
			left: "3.05rem"
		}, 250, function() {
			$(dom).css("-webkit-transform", "rotate(-90deg)");
			$(dom).animate({
				top: "6.1rem"
			}, 430, function() {})
		});
		$(dom).addClass("z2").removeClass("z1");
	} else if(n == -1) {
		$(dom).animate({
			top: "3.55rem"
		}, 430, function() {
			$(dom).css("-webkit-transform", "rotate(0deg)");
			$(dom).animate({
				left: "4.2rem"
			}, 250, function() {})
		});
		$(dom).addClass("z1").removeClass("z2");
	}
}

function path2(n, dom) {
	if(n == 1) {
		$(dom).animate({
			top: "6.9rem"
		}, 160, function() {
			$(dom).css("-webkit-transform", "rotate(-180deg)");
			$(dom).animate({
				left: "5.6rem"
			}, 510, function() {
				$(dom).css("-webkit-transform", "rotate(-90deg)");
				$(dom).animate({
					top: "10.5rem"
				}, 720, function() {
					$(dom).css("-webkit-transform", "rotate(0deg)");
					$(dom).animate({
						left: "3rem"
					}, 520, function() {})
				})
			});
		});
		$(dom).addClass("z3").removeClass("z2");
	} else {
		$(dom).animate({
			left: "5.6rem"
		}, 520, function() {
			$(dom).css("-webkit-transform", "rotate(-90deg)");
			$(dom).animate({
				top: "6.9rem"
			}, 720, function() {
				$(dom).css("-webkit-transform", "rotate(-180deg)");
				$(dom).animate({
					left: "3.05rem"
				}, 510, function() {
					$(dom).css("-webkit-transform", "rotate(-90deg)");
					$(dom).animate({
						top: "6.1rem"
					}, 160, function() {});
				})
			})
		});
		$(dom).addClass("z2").removeClass("z3");
	}
}

function path3(n, dom) {
	if(n == 1) {
		$(dom).animate({
			left: "2.02rem"
		}, 196, function() {
			$(dom).css("-webkit-transform", "rotate(-90deg)");
			$(dom).animate({
				top: "13.8rem"
			}, 660, function() {
				$(dom).css("-webkit-transform", "rotate(-180deg)");
				$(dom).animate({
					left: "7.6rem"
				}, 1116, function() {
					$(dom).css("-webkit-transform", "rotate(-90deg)");
					$(dom).animate({
						top: "18.55rem"
					}, 950, function() {
						$(dom).css("-webkit-transform", "rotate(0deg)");
						$(dom).animate({
							left: "4.2rem"
						}, 680, function() {})
					})
				})
			})
		});
		$(dom).addClass("z4").removeClass("z3");
	} else {
		$(dom).animate({
			left: "7.6rem"
		}, 680, function() {
			$(dom).css("-webkit-transform", "rotate(-90deg)");
			$(dom).animate({
				top: "13.8rem"
			}, 950, function() {
				$(dom).css("-webkit-transform", "rotate(180deg)");
				$(dom).animate({
					left: "2.02rem"
				}, 1116, function() {
					$(dom).css("-webkit-transform", "rotate(-90deg)");
					$(dom).animate({
						top: "10.5rem"
					}, 660, function() {
						$(dom).css("-webkit-transform", "rotate(0deg)");
						$(dom).animate({
							left: "3rem"
						}, 196, function() {});
					})
				})
			})
		})
		$(dom).addClass("z3").removeClass("z4");
	}
}

function path4(n, dom) {
	if(n == 1) {
		$(dom).animate({
			left: "3.05rem"
		}, 230, function() {
			$(dom).css("-webkit-transform", "rotate(-90deg)");
			$(dom).animate({
				top: "21rem"
			}, 490, function() {})
		});
		$(dom).addClass("z5").removeClass("z4");
	} else {
		$(dom).animate({
			top: "18.55rem"
		}, 490, function() {
			$(dom).css("-webkit-transform", "rotate(0deg)");
			$(dom).animate({
				left: "4.2rem"
			}, 230, function() {});
		})
		$(dom).addClass("z4").removeClass("z5");
	}
}

function path5(n, dom) {
	if(n == 1) {
		$(dom).animate({
			top: "22.25rem"
		}, 250, function() {
			$(dom).css("-webkit-transform", "rotate(-180deg)");
			$(dom).animate({
				left: "7.8rem"
			}, 950, function() {
				$(dom).css("-webkit-transform", "rotate(-90deg)");
				$(dom).animate({
					top: "24.45rem"
				}, 440, function() {
					$(dom).css("-webkit-transform", "rotate(0deg)");
					$(dom).animate({
						left: "1.65rem"
					}, 1230, function() {
						$(dom).css("-webkit-transform", "rotate(-90deg)");
						$(dom).animate({
							top: "26.7rem"
						}, 450, function() {})
					})
				})
			})
		});
		$(dom).addClass("z6").removeClass("z5");
	} else {
		$(dom).animate({
			top: "24.45rem"
		}, 450, function() {
			$(dom).css("-webkit-transform", "rotate(0deg)");
			$(dom).animate({
				left: "7.8rem"
			}, 1230, function() {
				$(dom).css("-webkit-transform", "rotate(-90deg)");
				$(dom).animate({
					top: "22.25rem"
				}, 440, function() {
					$(dom).css("-webkit-transform", "rotate(180deg)");
					$(dom).animate({
						left: "3.05rem"
					}, 950, function() {
						$(dom).css("-webkit-transform", "rotate(-90deg)");
						$(dom).animate({
							top: "21.2rem"
						}, 250, function() {})
					})
				})
			})
		});
		$(dom).addClass("z5").removeClass("z6");
	}
}

function path6(n, dom) {
	if(n == 1) {
		$(dom).animate({
			top: "28.65rem"
		}, 390, function() {
			$(dom).css("-webkit-transform", "rotate(-180deg)");
			$(dom).animate({
				left: "7.8rem"
			}, 1230, function() {
				$(dom).css("-webkit-transform", "rotate(-90deg)");
				$(dom).animate({
					top: "30.2rem"
				}, 310, function() {
					$(dom).css("-webkit-transform", "rotate(0deg)");
					$(dom).animate({
						left: "0.95rem"
					}, 1370, function() {
						$(dom).css("-webkit-transform", "rotate(-90deg)");
						$(dom).animate({
							top: "33.98rem"
						}, 756, function() {
							$(dom).css("-webkit-transform", "rotate(-180deg)");
							$(dom).animate({
								left: "3.4rem"
							}, 490, function() {

							})
						})
					})
				})
			})
		});
		$(dom).addClass("z7").removeClass("z6");
	} else {
		$(dom).animate({
			left: "0.95rem"
		}, 490, function() {
			$(dom).css("-webkit-transform", "rotate(-90deg)");
			$(dom).animate({
				top: "30.2rem"
			}, 756, function() {
				$(dom).css("-webkit-transform", "rotate(0deg)");
				$(dom).animate({
					left: "7.8rem"
				}, 1370, function() {
					$(dom).css("-webkit-transform", "rotate(-90deg)");
					$(dom).animate({
						top: "28.65rem"
					}, 310, function() {
						$(dom).css("-webkit-transform", "rotate(180deg)");
						$(dom).animate({
							left: "1.65rem"
						}, 1230, function() {
							$(dom).css("-webkit-transform", "rotate(-90deg)");
							$(dom).animate({
								top: "26.7rem"
							}, 390, function() {

							})
						})
					})
				})
			})
		});
		$(dom).addClass("z6").removeClass("z7");
	}
}