<?php
	class BlocksController extends AppController{
		public function add($id){
			if($this->request->is('post')){
				if($this->Block->save($this->request->data)){
					$this->Session->setFlash('Congratulations. Saved.');
					$this->redirect(array('controller' => 'brands', 'action' => 'view', $id));
				}else{
					$this->Session->setFlash('Error! Fix below.');
				}
			}
			$brand = $this->Brand->findById($id);
			$number = $this->Block->find('first', array('fields' => array('number'), 'conditions' => array('brand_id' => $id), 'order' => array('number' => -1)));
			if(empty($number)){
				$number = 0;
			}
			$number = $number['Block']['number'] +1;
			$this->set('number', $number);
			$this->set('brand', $brand);
		}
		
		public function edit($id){
			$block = $this->Block->findById($id);
			$brand = $this->Brand->findById($block['Block']['brand_id']);
			if($this->request->is('put')){
				$this->Block->id = $id;
				if($this->Block->save($this->request->data)){
					$this->Session->setFlash('Congratulations. Saved.');
					$this->redirect(array('controller' => 'brands', 'action' => 'view', $brand['Brand']['id']));
				}else{
					$this->Session->setFlash('Error! Fix below.');
				}
			}
			
			$this->request->data = $block;
			$this->set('brand', $brand);

		}
	}