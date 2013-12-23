<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

<title><?php echo $title_for_layout; ?> - Peeko</title>

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

<meta name="viewport" />
 
<link rel="shortcut icon" href="favicon.ico" type="image/x-icon">

<link href='http://fonts.googleapis.com/css?family=Exo:400,800' rel='stylesheet' type='text/css'>

</head>

<body>

<!-- TOP MENU NAVIGATION -->
<div class="navbar">
	<div class="navbar-inner">
		<div class="container">
			<a class="brand pull-left" href="/">
			Peeko
			</a>
		<?php /*
			<a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
			</a>
		
			<div class="nav-collapse collapse">
				<ul id="nav-list" class="nav pull-right">
					<li><a href="/">Get the App</a></li>
					<li><a href="#about">About</a></li>
					<li><a href="#updates">Updates</a></li>
					<li><a href="#screenshots">Screenshots</a></li>
				</ul>
			</div>
		<?php */ ?>
		</div>
	</div>
</div>
<div class="container content container-fluid" id="home">
<?php echo $this->fetch('content'); ?>
</div><script src="http://code.jquery.com/jquery-1.10.1.min.js"></script>
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
