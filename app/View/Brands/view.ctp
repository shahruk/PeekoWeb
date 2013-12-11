<style>
td > a > img{
	width: 128px;
}

.icon{
	float: left;
}

.info{
	padding: 30px;
	margin-left: 200px;
	border-bottom: 2px solid blue;
}

a.addNew{
	float: right;
}

</style>

<div class="icon">
	<?php echo $this->Html->image('http://direct.theboxngo.com:8080/brands/'.$brand['Brand']['active_block']['icon']); ?>
</div>
<div class="info">
	<?php echo $this->Html->link('Add New Block', array('controller' => 'blocks', 'action' => 'add', $brand['Brand']['id']), array('class' => 'addNew')); ?>
	<b><?php echo $brand['Brand']['name']; ?></b><br />
	<b>Current Active Counter:</b> <?php echo $brand['Brand']['counter']; ?>
</div>

<table>
	<?php for($i = 0; $i < count($blocks); $i++){ ?>
		<tr>
			<td><?php echo $this->Html->image($blocks[$i]['Block']['images'], array('url' => $blocks[$i]['Block']['url'])); ?></td>
			<td><?php echo $this->Html->link($blocks[$i]['Block']['name'],  array('controller' => 'blocks', 'action' => 'edit', $blocks[$i]['Block']['id'])); ?></td>
			<td>$<?php echo $blocks[$i]['Block']['price']; ?></td>
			<td class="actions"><?php echo $this->Html->link('Edit', array('controller' => 'blocks', 'action' => 'edit', $blocks[$i]['Block']['id'])); ?></td>
			<td>Block #<?php echo $blocks[$i]['Block']['number']; ?></td>
		</tr>
	<?php } ?>
</table>