<?php $this->start('css');
echo $this->Html->css('blocks');
$this->end(); ?>
<?php $this->start('scriptBottom');
echo $this->Html->script('share42/share42');
$this->end(); ?>
<?php $this->start('og'); ?>
<meta property="og:title" content="<?php echo $block['Block']['name']; ?>" />
<meta property="og:image" content="<?php echo $block['Block']['images']; ?>" />
<meta property="og:description" content="Find more deals and products like this near you at www.peekoapp.com" />
<meta property="og:url" content="<?php echo $this->Html->url( null, true ); ?>" />
<?php $this->end(); ?>

<?php //debug($block); ?>
<div class="row">
	<div class="col-xs-8 col-md-8">
		<h2 style="text-align: center; padding: 20px; font-size: 24px;"><?php echo $block['Block']['name']; ?></h2>

		<a href="<?php echo $block['Block']['url']; ?>">
			<img class="main-block" src="<?php echo $block['Block']['images']; ?>" />
		</a>
		<div class="helvreg">
			<h3 class="section">Description</h3>
			<?php echo nl2br($block['Block']['description']); ?>
		</div>
	</div>
	<div class="col-xs-4 col-md-4">
		<img src="http://peekoapp.com:8080/brands/<?php echo $block['Block']['icon']; ?>" />
		<div class="section">
			<h3>Date</h3>: <?php $date = date('m-d-Y', strtotime($elysium.' +'.(int)($block['Block']['number']).' days')); 
					if($date >= "12-26-2013"){
						$date = date('m-d-Y', strtotime($elysium2.' +'.(int)(($block['Block']['number']-7)/2).' days')); 
					}
					echo $date; ?>
		</div>
		<div class="section">
			<h3>Price</h3>: <?php echo $block['Block']['price']; ?>
		</div>
		<div class="section">
			<h3>Visit Website / More Info</h3>: <a href="<?php echo $block['Block']['url']; ?>">Click Here</a>
		</div>
		<div class="section">
			<div data-zero-counter="0" data-title="<?php echo $block['Block']['name']; ?>" data-description="Shopping via Peeko iOS" data-image="<?php echo $block['Block']['images']; ?>" class="share42init"></div>
		</div>
	</div>
</div>

<?php //debug($block); ?>