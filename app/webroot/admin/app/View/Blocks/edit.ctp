<div class="info">
	<b><?php echo $brand['Brand']['name']; ?></b><br />
</div>
<div class="icon">
	<?php echo $this->Html->image('http://direct.theboxngo.com:8080/brands/'.$brand['Brand']['active_block']['icon']); ?>
</div>
<style>
	#scrape{
		background: blue;
		float: right;
		color: #FFF;
		padding: 20px;
		border: 4px solid black;
	}
</style>
<div style="float:left;">
	<img style="width: 256px;" src="<?php echo $this->data['Block']['images']; ?>" />
</div>
<a href="#" id="scrape">Scrape</a>
<?php echo $this->Form->create('Block'); ?>
<?php echo $this->Form->input('url'); ?>
<?php echo $this->Form->input('name'); ?>
<?php echo $this->Form->textarea('description'); ?>
<?php echo $this->Form->input('price'); ?>
<?php echo $this->Form->input('images'); ?>

<?php echo $this->Form->hidden('number'); ?>
<?php echo $this->Form->hidden('icon'); ?>
<?php echo $this->Form->hidden('brand_id'); ?>
<?php echo $this->Form->end('Edit Block'); ?>


<?php echo $this->Html->script('ajaxscraper'); ?>