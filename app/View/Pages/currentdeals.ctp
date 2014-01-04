<?php $this->start('css');
echo $this->Html->css('currentdeals');
$this->end();
?>
<div class="allblocks">
<?php for($i = 0; $i < count($brands); $i++){ ?>
<a href="/blocks/<?php echo $brands[$i]['Brand']['active_block']['number']; ?>/<?php echo $brands[$i]['Brand']['active_block']['permalink']; ?>" class="block"><div class="brand" style="background-image:url('http://peekoapp.com:8080/brands/<?php echo $brands[$i]['Brand']['active_block']['icon']; ?>');"></div>

</a>

<?php } ?>
</div>
