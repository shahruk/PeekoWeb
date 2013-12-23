<?php
	class BlocksController extends AppController{
		public function index($num=NULL, $permalink=NULL){
			$block = $this->Block->find("first", array("conditions" => array("number" => $num, "permalink" => $permalink)));
			if(!$block){
				throw new NotFoundException();
			}else{
				$this->set(compact('block'));
			}
		}
	}