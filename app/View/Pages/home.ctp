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


<?php echo $this->Html->css(array('/font/stylesheet.css', 'bootstrap.min.css', 'bootstrap-responsive.min.css', 'styles.css', 'media-queries.css', '/fancybox/jquery.fancybox-1.3.4')); ?>


<meta name="viewport" />
 
<link rel="shortcut icon" href="favicon.ico" type="image/x-icon">

<link href='http://fonts.googleapis.com/css?family=Exo:400,800' rel='stylesheet' type='text/css'>
<style>
	@media only screen and (min-width : 1224px) {
	.content{
		padding: 80px 120px;
	}
</style>
</head>

<body id="bg" data-spy="scroll">

<!-- TOP MENU NAVIGATION -->
<div class="navbar navbar-fixed-top">
	<div class="navbar-inner">
		<div class="container">
	
			<a class="brand pull-left" href="#">
			Peeko
			</a>
	
			<a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
			</a>
		
			<div class="nav-collapse collapse">
				<ul id="nav-list" class="nav pull-right">
					<li><a href="#home">Home</a></li>
					<li><a href="#about">About</a></li>
					<li><a href="#updates">Updates</a></li>
					<li><a href="#screenshots">Screenshots</a></li>
				</ul>
			</div>
		
		</div>
	</div>
</div>


<!-- MAIN CONTENT -->
<div class="container content container-fluid" id="home">



	<!-- HOME -->
	<div class="row-fluid">
  
		<!-- PHONES IMAGE FOR DESKTOP MEDIA QUERY -->
		<div class="span5 visible-desktop">
			<img src="img/phones.png">
		</div>
	
		<!-- APP DETAILS -->
		<div class="span7">
	
			<!-- ICON -->
			<div class="visible-desktop" id="icon">
				<img style="width: 76px; height: 76px; border-radius: 5px;" src="img/hires.png" />
			</div>
			
			<!-- APP NAME -->
			<div id="app-name">
				<h1>Peeko</h1>
			</div>
			
			<!-- VERSION -->
			<div id="version">
				<span class="version-top label label-inverse">Version 1.0.1</span>
			</div>
            
			<!-- TAGLINE -->
			<div id="tagline">
				Find Local Deals and Selections
			</div>
		
			<!-- PHONES IMAGE FOR TABLET MEDIA QUERY -->
			<div class="hidden-desktop" id="phones">
				<img src="img/phones.png">
			</div>
            
			<!-- DESCRIPTION -->
			<div id="description">
				Peeko lets you find local deals and selections at stores near you. Use Peeko to find the latest sales, products, trends, and more.
			</div>
            
			<!-- FEATURES -->
			<ul id="features">
				<li>Daily new selections near you</li>
				<li>Over $5,000 in sales, deals, and more per hour!</li>
				<li>Shop over 3,000+ Locations in major cities like New York, Palo Alto, San Francisco, San Diego, and more!</li>
			</ul>
		
			<!-- DOWNLOAD & REQUIREMENT BOX -->
			<div class="download-box">
				<a href="http://bit.ly/JZgZPx"><img src="img/available-on-the-app-store.png"></a>
			</div>

			<div class="download-box">
				<strong>Requirements:</strong><br>
				Compatible with iPhone, iPad, and iPod touch. Requires iOS 6.0 or later. A network connection is required.
			</div>
			<div class="download-box">
				<a href="http://bit.ly/1cdnQL3"><img src="img/android_app_on_play_logo_large.png"></a>
			</div>

			<div class="download-box">
				<strong>Requirements:</strong><br>
				Compatible with most Android devices. Requires Android 2.1 or later. A network connection is required.
			</div>
		</div>
	</div>
	
	
	
	<!-- ABOUT & UPDATES -->
	<div class="row-fluid" id="about">
	
		<div class="span6">
			<h2 class="page-title" id="scroll_up">
				About
				<a href="#home" class="arrow-top">
				<img src="img/arrow-top.png">
				</a>
			</h2>
			
			<p>Peeko lets you find the coolest deals, products, and more at large retailers near you. Get exclusive deals, and find cool new products and clothes sent straight to your phone daily with Peeko. </p>
    
			<p>Heading to work? Use Peeko to decide if you want to try out that new coffee or bagel.</p> 
			
			<p>Meeting a friend? Use Peeko to browse new clothing selections at retailers near you. </p> 
			
			<p>Peeko makes shopping on the go fast and convenient.</p>
			
		</div>
	
		<div class="span6 updates" id="updates">
			<h2 class="page-title" id="scroll_up">
				Updates
				<a href="#home" class="arrow-top">
				<img src="img/arrow-top.png">
				</a>
			</h2>
			
			<!-- UPDATES & RELEASE NOTES -->
			<hr>
		
			<h3 class="version">Version 1.0.1</h3>
			<span class="release-date">Released on December 16th, 2013</span>
			<ul>
				<li><span class="label label-info">NEW</span>Initial Release</li>
			</ul>
			
		</div>
	
	</div>
	
	
	
	<!-- SCREENSHOTS -->
	<div class="row-fluid" id="screenshots">
		
		<h2 class="page-title" id="scroll_up">
				Screenshots
				<a href="#home" class="arrow-top">
				<img src="img/arrow-top.png">
				</a>
			</h2>
		
		<!-- SCREENSHOT IMAGES ROW 1-->
		<ul class="thumbnails">
			<li class="span3">
				<a href="img/screen1.jpg" rel="gallery" class="thumbnail">
				<img src="img/screen1.jpg" alt="">
				</a>
			</li>
		
			<li class="span3">
				<a href="img/screen2.jpg" rel="gallery" class="thumbnail">
				<img src="img/screen2.jpg" alt="">
				</a>
			</li>
			
			<li class="span3">
				<a href="img/screen3.jpg" rel="gallery" class="thumbnail">
				<img src="img/screen3.jpg" alt="">
				</a>
			</li>
 
			<li class="span3">
				<a href="img/screen4.jpg" rel="gallery" class="thumbnail">
				<img src="img/screen4.jpg" alt="">
				</a>
			</li>
		</ul>	
	</div>
	
	
	
	<!-- CONTACT -->
	<div class="row-fluid" id="contact">
		<!--
		<h2 class="page-title" id="scroll_up">
				Contact
				<a href="#home" class="arrow-top">
				<img src="img/arrow-top.png">
				</a>
			</h2>
		
		<div class="span4" id="contact-info">
			<h3>Contact Us</h3>
			<p>Peeko is a free app for iOS developed by 2 people. Unfortunately we cannot provide basic support for it. We simply don't have the time to answer everyone's questions.</p>
			<p>However, you may contact us about general business inquiries or to report bugs in the template!<p>
			<p><a href="mailto:contact@trippoinc.com">contact@trippoinc.com</a></p>
		</div>
		
		<div class="span7" id="contact-form">
			<form class="form-horizontal">
				<fieldset>
					<div class="control-group">
						<label class="control-label" for="name">Name</label>
						<div class="controls">
							<input class="input-xlarge" type="text" id="name" placeholder="John Doe">
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="email">Email</label>
						<div class="controls">
							<input class="input-xlarge" type="text" id="email" placeholder="john@gmail.com">
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="subject">Subject</label>
						<div class="controls">
							<input class="input-xlarge" type="text" id="subject" placeholder="General Inquiry">
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="message">Message</label>
						<div class="controls">
							<textarea class="input-xlarge" rows="3" id="message" placeholder="Your message..."></textarea>
						</div>
					</div>
					<div class="form-actions">
						<button type="submit" class="btn btn-primary">SEND</button>
					</div>
				</fieldset>
			</form>
		</div>
		-->
	</div>
	
</div>
<script src="http://code.jquery.com/jquery-1.7.2.min.js"></script>
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
