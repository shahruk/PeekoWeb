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
<link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
</head>

<body>
	<header>
		<div class="wrapper">
			<a id="currentdeals" class="link light" href="/currentdeals">Current Deals</a>
			<div id="logo"><a href="/">Peeko</a></div>
			<img class="phones shifted" src="/img/phone1.png" alt="iPhone showing Peeko" />
			<img class="phones" src="/img/phone2.png" alt="iPhone showing Peeko" />
			<div class="description helvreg">
				<h1 class="helvbold">Deals and Selections Near You</h1>
				<h2 class="helvreg">Save Time Shopping with Peeko</h2>
				<p>
					Find the latest deals and selections at stores near you, all from your smartphone. Peeko automatically refreshes each store with a new deal every 12 hours, so there's always something new to shop.
				</p>
				
				<p>Shopping on the go has never been more fun and convenient.</p>
				<div class="downloadLinks">
					<a class="ios" href="http://bit.ly/JZgZPx"><img src="/img/available-on-the-app-store.png" alt="Download on the iOS App Store" /></a>
					<a class="android" href="http://bit.ly/1cdnQL3"><img src="/img/android_app_on_play_logo_large.png" alt="Download for Android at the Play Store" /></a>
				</div>
			</div>
			
		</div>
	</header>
	<div class="wrapper panel instantshopping">
		<img src="/img/instantshopping.png" alt="iPhone with map of stores" />
		<div class="info helvreg">
			<h2 class="helvbold">Instant Shopping</h2>
			<p>We bring the power of shopping to your smartphone. Never miss out on great deals and products near you ever again. Simply tap on the icon of a store near you to browse.</p>
			<p>No surveys, no logins, just simple shopping.</p>
			<div class="currentContainer clearfix">
				<a id="shopCurrent" href="/currentdeals" class="helvlight">Shop Current Deals</a><span class="glyphicon glyphicon-play"></span>
			</div>
		</div>
	</div>
	
	<div class="panel browsedeals">
		<div class="wrapper">
			<img src="/img/browsedeals.png" alt="Example Deal" />
			<div class="info helvreg">
				<h2 class="helvbold">Shop the Latest Deals and Selections</h2>
				<p>See the deal straight on your phone - no need to visit any links or Google searches. If you'd like to make a purchase, you can go straight to the retailer's website from Peeko.</p>
				<p>That's the power of convenient shopping straight from your fingertips.</p>
				<div class="twelveHours">
					<span class="glyphicon glyphicon-time"></span> <span class="subtext helvlight">12 Hour Updates</span>
					<p>Things change quickly in today's world and Peeko is no different. Peeko automatically shows new deals and selections every 12 hours, 24/7.</p>
				</div>
			</div>
		</div>
	</div>
	<div class="panel wrapper founders">
		<h2 class="helvbold">Meet the Founders</h2>
		<div class="info helvreg">
			<p>
				We're two college students located in NYC. If you'd like to get in touch, feel free to send either of us an email. We welcome all comments and suggestions.
			</p>
			<div class="aboutfounders">
				<section>
					<img style="width: 250px;" src="/img/shahruk.jpg" alt="Shahruk Khan" />
					<h3 class="helvbold">Shahruk Khan</h3>
					<h4 class="helvlight">Business/Developer/Designer</h4>
					<p>
						Shahruk is an undergrad Computer Science junior attending CUNY Hunter College. 
					</p>
					<p>
						Contact me at shahruksemail [at] gmail d0t com
					</p>
				</section>
				<section>
					<img style="height: 158px;" src="/img/minling.jpg" alt="MinLing Zhao" />
					<h3 class="helvbold">MinLing Zhao</h3>
					<h4 class="helvlight">Business/Marketing/Content</h4>
					<p>
						MinLing is an undergrad Biomedical Sciences junior attending NYU Poly. 
					</p>
					<p>
						Contact me at mzhao725 [at] gmail d0t com
					</p>
				</section>
			</div>
		</div>
	</div>
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
