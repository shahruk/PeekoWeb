<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

<title><?php echo $title_for_layout; ?></title>

<?php echo $this->fetch('og'); ?>

<!-- media-queries.js -->
<!--[if lt IE 9]>
	<script src="http://css3-mediaqueries-js.googlecode.com/svn/trunk/css3-mediaqueries.js"></script>
<![endif]-->
<!-- html5.js -->
<!--[if lt IE 9]>
	<script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
<![endif]-->


<?php echo $this->Html->css(array('/font/stylesheet.css', 'bootstrap.min.css', 'bootstrap-responsive.min.css', 'styles.css', 'media-queries.css')); ?>
<?php echo $this->fetch('css'); ?>
<link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
</head>

<body>
	<div class="wrapper">
		<a id="getapp" class="link" href="/"><b>Get the App</b></a>
		<a id="currentdeals" class="link" href="/currentdeals">Current Deals</a>
		<a id="currentdeals" class="link" href="http://facebook.com/PeekoApp">Our Facebook</a>
		<div class="dark" id="logo"><a href="/">Peeko</a></div>
		<div class="content" id="home">
			<?php echo $this->fetch('content'); ?>
		</div>
	</div>
<script src="http://code.jquery.com/jquery-1.10.1.min.js"></script>
<?php echo $this->Html->script(array('bootstrap.min')); ?>
<?php echo $this->fetch('scriptBottom'); ?>
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
