<?php
	class BlocksController extends AppController{
		public function beforeFilter(){
			parent::beforeFilter();
			$this->response->header('Access-Control-Allow-Origin', '*');
		}
		
		public function index($num=NULL, $permalink=NULL){
			$block = $this->Block->find("first", array("conditions" => array("number" => (int)$num, "permalink" => $permalink)));
			if(!$block){
				throw new NotFoundException();
			}else{
				$this->set('title_for_layout', $block['Block']['price']." ".$block['Block']['name']);
				$this->set(compact('block', 'title_for_layout'));
			}
		}
		
		public function vote($id=NULL){
			if($this->request->is('post')){
				//debug($this->request->data);
				$this->autoRender = false;
				
				$block = $this->Block->findById($this->request->data['id']);
				$brand = $this->Brand->findById($block['Block']['brand_id']);
				$this->Block->id = $this->request->data['id'];
				$this->Block->saveField('score', $this->request->data['count']);
				
				$brand['Brand']['active_block']['score'] = $this->request->data['count'];
				
				$this->Brand->id = $brand['Brand']['id'];
				$this->Brand->saveField('active_block', $brand['Brand']['active_block']);
				
				return true;
				
			}else{
				throw new NotFoundException();
			}
		}
	}