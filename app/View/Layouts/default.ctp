<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

<title>Peeko - Shopping in NYC Made Fast and Convenient</title>

<!-- media-queries.js -->
<!--[if lt IE 9]>
	<script src="http://css3-mediaqueries-js.googlecode.com/svn/trunk/css3-mediaqueries.js"></script>
<![endif]-->
<!-- html5.js -->
<!--[if lt IE 9]>
	<script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
<![endif]-->


<?php echo $this->Html->css(array('/font/stylesheet.css', 'bootstrap.min.css', 'bootstrap-responsive.min.css', 'styles.css', 'media-queries.css', '/fancybox/jquery.fancybox-1.3.4')); ?>


<meta name="viewport" />
 
<link rel="shortcut icon" href="favicon.ico" type="image/x-icon">

<link href='http://fonts.googleapis.com/css?family=Exo:400,800' rel='stylesheet' type='text/css'>

</head>

<body>
<?php echo $this->fetch('content'); ?>

<?php echo $this->Html->script(array('bootstrap.min', 'bootstrap-collapse', 'bootstrap-scrollspy', '/fancybox/jquery.mousewheel-3.0.4.pack', '/fancybox/jquery.fancybox-1.3.4.pack', 'init')); ?>
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
