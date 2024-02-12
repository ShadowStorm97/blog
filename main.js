!function() {
  let duration=20
  let id
  function writeCode(prefix, code, fn) {
    let container=document.querySelector('#code')
    let styleTag=document.querySelector('#styleTag')
    let n=0
    id= setTimeout(function runAgain(){
      n+=1
      container.innerHTML=Prism.highlight(
        prefix + code.substring(0, n),
        Prism.languages.css,
        'css'
      )
      styleTag.innerHTML=code.substring(0,n)
      container.scrollTop=container.scrollHeight
      if (n<code.length) {
         id=setTimeout(runAgain,duration)
      }else{
        fn&&fn.call()
      }
    }, duration);
  }

	
  $('.actions').on('click', 'button',function(e) {
    let $button=$(e.currentTarget)// button
    let speed=$button.attr('data-speed')
    console.log(speed)
    $button.addClass('active')
      .siblings('.active').removeClass('active')
    switch(speed){
      case 'slow':
        duration=50
        break;
      case 'normal':
        duration=20
        break;
      case 'fast':
        duration=0
        break;
    }
    if (speed==='stop') {
      clearTimeout(id)
    }
  })

var code1=`

/*
* 大家好，我是余晨阳~
* 今天给大家画一个海绵宝宝~
* 首先需要准备一片大海~
*/


.preview{
	height: 100%;
	background-image: 
	linear-gradient(
		-90deg, #29bdd9 0%, 
		#276ace 100%);
  display: flex;
  justify-content: center;
	align-items: center;
}

/*
*然后画海绵宝宝的身体
*/

.body {
	background:#F5EE31;
	width: 300px;
	height:400px;
	border:5px solid #000;
	position: relative;
	margin: 10px auto;
	margin-bottom: 0;
	overflow:hidden;
}
.poro {
	background:#C0A402;
	height:40px;
	width:40px;
	position:absolute;
	border-radius:50%;
	z-index:1;
}


/*
* 接下来，画海绵宝宝的眼睛~
*/

.ojo {
	background:#fff;
	position: relative;
	border:5px solid #000;
	width:100px;
	height:100px;
	margin-right:-17px;
	border-radius:50%;
	display: inline-block;
}

.ojo_externo {
	width: 50px;
	height:50px;
	border-radius:50%;
	position:absolute;
	top:12px;
	left:2px;
	background:#00AEEF;
	border:3px solid #000;
}

.ojo_interno {
	width:30px;
	height:30px;
	background:#000;
	border-radius:50%;
	position:relative;
	top:5px;
	left:1px;
}

/*
* 然后添加上睫毛~
*/

.pestana {
	width:15px;
	height:5px;
	background:#000;
	transform:rotate(90deg);
	margin-right:10px;
	display:inline-block;
}

.pestana.primera {
	position:relative;
	top:10px;
	transform: rotate(45deg);
}

.pestana.tercera {
	position:relative;
	top:10px;
	transform: rotate(-45deg);
}

/*
* 接下来，画海绵宝宝的鼻子~
*/

.nariz {
	width:20px;
	height:40px;
	background:#F5EE31;
	position: absolute;
	top:110px;
	left:130px;
	border:5px solid #000;
	border-bottom:5px solid transparent;
	border-radius:42.5%;
	z-index:10;
}

/*
* 然后，画海绵宝宝的嘴巴~
*/

.boca {
	width:200px;
	height:80px;
	background:transparent;
	position:absolute;
	top:120px;
	left:50px;
	border-radius:50%;
	border-bottom:5px solid #000;
	z-index:10;
}

/*
* 加上两个小牙齿~
*/

.dientes {
	position:relative;
	top:80px;
	left:65px;

}
.diente {
	width:20px;
	height:20px;
	background:#fff;
	border:5px solid #000;
	display: inline-block;
}

/*
* 然后，画海绵宝宝的小红脸颊~
*/

.mejilla {
	width:30px;
	height:20px;
	background:transparent;
	position:absolute;
	top:30px;
	border:3px solid #F1592A;
	border-bottom:5px transparent;
	border-radius:50% 50% 20% 20%;
}

/*
* 穿上大人模样的衬衣~
*/

.camisa {
	width:100%;
	height:50px;
	background:#fff;
	position: absolute;
	bottom:50px;
	border-top:5px solid #000;
	z-index:10;
	overflow:hidden;
}

/*
* 然后画他的小衣领
*/

.cuello {
	width:50px;
	height:30px;
	position: absolute;
	background:#fff;
	top:-25px;
	border:5px solid #000;
	transform: rotate(30deg);
}

.cuello.primero {
	left:60px;
}

.cuello.segundo {
	left:180px;
	transform: rotate(-30deg);
}

/*
* 他的小红领带
*/

.cuello_corbata {
	width:40px;
	height:40px;
	background:#F00200;
	border:5px solid #000;
	position:absolute;
	left:130px;
	bottom:30px;
	z-index:50;
	transform: rotate(45deg);
}

.cola_corbata {
	width:55px;
	height:55px;
	background:#F00200;
	border:5px solid #000;
	position:absolute;
	left:123px;
	bottom:0px;
	z-index:50;
	transform: rotate(45deg);
}

/*
* 穿上西装裤
*/

.pantalones {
	width:100%;
	height:50px;
	background:#6A3D13;
	position: absolute;
	bottom:0%;
	border-top:5px solid #000; 
	z-index:10;
}

/*
* 系上小皮带
*/

.cinturon {
	background:#000;
	width:40px;
	height:15px;
	position:absolute;
	top:20px;
}

/*
* 好啦 这个海绵宝宝送给你噢~
*/
`


writeCode('',code1)


}.call()