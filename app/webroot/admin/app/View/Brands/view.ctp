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
	<?php if(isset($brand['Brand']['active_block'])){
			echo $this->Html->image('http://direct.theboxngo.com:8080/brands/'.$brand['Brand']['active_block']['icon']);
		}else{
			echo $this->Html->image('http://direct.theboxngo.com:8080/brands/'.$brand['Brand']['icon']);
		}?>
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
			<td><?php echo $blocks[$i]['Block']['name']; ?></td>
			<td><?php echo $blocks[$i]['Block']['price']; ?></td>
			<td>
				<?php 
					$date = date('m-d-Y', strtotime($elysium.' +'.(int)($blocks[$i]['Block']['number']+1).' days')); 
					if(strtotime($date) >= strtotime("12-26-2013")){
						$date = date('m-d-Y', strtotime($elysium2.' +'.(int)((($blocks[$i]['Block']['number']-7)+1)/2).' days')); 
						if(($blocks[$i]['Block']['number'] % 2) == 0){
							echo "<b style='color: red;'>1 AM</b><br />";
						}
					}
					echo $date;
				?>
			
			</td>
			<td class="actions">
			<?php 
				if($blocks[$i]['Block']['number'] >= $brand['Brand']['counter']){
					echo $this->Html->link('Edit', array('controller' => 'blocks', 'action' => 'edit', $blocks[$i]['Block']['id']));
				}
				echo $this->Html->link('Copy', array('controller' => 'blocks', 'action' => 'copy', $blocks[$i]['Block']['id']));
			?>
			</td>
			<td class="actions"><a href="http://peekoapp.com/blocks/<?php echo $blocks[$i]['Block']['number']."/".$blocks[$i]['Block']['permalink']; ?>">Visit Peeko Page</a></td>
			<td>Block #<?php echo $blocks[$i]['Block']['number']; ?></td>
			<td class="actions">
			<?php 
				if($blocks[$i]['Block']['number'] > $brand['Brand']['counter']){
					echo $this->Html->link('DELETE', array('controller' => 'blocks', 'action' => 'delete', $blocks[$i]['Block']['id']));
				}
			?>
			</td>
		</tr>
	<?php } ?>
</table>