<?php
	class BlocksController extends AppController{
		public function index($num=NULL, $permalink=NULL){
			$block = $this->Block->find("first", array("conditions" => array("number" => (int)$num, "permalink" => $permalink)));
			if(!$block){
				throw new NotFoundException();
			}else{
				$title_for_layout = $block['Block']['price']." ".$block['Block']['name'];
				$this->set(compact('block', 'title_for_layout'));
			}
		}
	}