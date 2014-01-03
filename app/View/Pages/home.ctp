<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

<title>Peeko - Daily Local Deals and Selections</title>

<!-- media-queries.js -->
<!--[if lt IE 9]>
	<script src="http://css3-mediaqueries-js.googlecode.com/svn/trunk/css3-mediaqueries.js"></script>
<![endif]-->
<!-- html5.js -->
<!--[if lt IE 9]>
	<script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
<![endif]-->


<?php echo $this->Html->css(array('/font/stylesheet.css', 'bootstrap.min.css', 'bootstrap-responsive.min.css', 'styles.css', 'media-queries.css')); ?>


<meta name="viewport" />
<link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
</head>

<body>
	<header>
		<div class="wrapper">
			<div id="logo"><a href="/">Peeko</a></div>
			<img class="phones shifted" src="/img/phone1.png" />
			<img class="phones" src="/img/phone2.png" />
			<div class="description helvreg">
				<h1 class="helvbold">Deals and Selections Near You</h1>
				Find the latest deals and selections hand-picked at stores near you.
			</div>
		</div>
	</header>
<script src="http://code.jquery.com/jquery-1.7.2.min.js"></script>
<?php echo $this->Html->script(array('bootstrap.min', 'init')); ?>
<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-2509553-11', 'peekoapp.com');
  ga('send', 'pageview');

</script>
</body>
</html>
