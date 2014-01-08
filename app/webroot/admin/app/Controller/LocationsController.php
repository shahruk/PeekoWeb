<?php
	class LocationsController extends AppController{
		public $helpers = array('Time');
		
		public function delete($id=NULL){
			$this->Location->delete($id);
			$this->redirect($this->referer());
		}
		
		public function index(){	
			//die();
			ini_set('memory_limit', '-1');
			ini_set('max_execution_time', '30000');
			$brands = $this->Brand->find('all');
			//$this->Location->getLocations();
			for($z = 0; $z < count($brands); $z++){
				$search = ($brands[$z]['Brand']['name']);
				echo $search." <br />";
				
				debug($this->Location->find('count', array('conditions' => array('Location._brand' => (string)$brands[$z]['Brand']['id']))));
				$locations = $this->Location->find('all', array('conditions' => array('Location._brand' => $brands[$z]['Brand']['id'])));
				for($i = 0; $i < count($locations); $i++){

					//echo $locations[$i]['Location']['name']. "<br />";
					//echo $locations[$i]['Location']['name']."       <a href='/app/webroot/admin/locations/delete/".$locations[$i]['Location']['id']."'>DELETE</a><br />";
					if((strtoupper($locations[$i]['Location']['name']) !== strtoupper($search))){
						
						if($search == "Best Buy"){
							if((strtoupper($locations[$i]['Location']['name']) !== strtoupper($search. ""))){
								echo $locations[$i]['Location']['name']."       <a href='/app/webroot/admin/locations/delete/".$locations[$i]['Location']['id']."'>DELETE</a><br />";
								$this->Location->delete($locations[$i]['Location']['id']);
							}
						}
						elseif($search == "Starbucks"){
							if((strtoupper($locations[$i]['Location']['name']) !== strtoupper($search. " COFFEE"))){
								//die("A");
								echo $locations[$i]['Location']['name']."       <a href='/app/webroot/admin/locations/delete/".$locations[$i]['Location']['id']."'>DELETE</a><br />";
								//$this->Location->delete($locations[$i]['Location']['id']);
							}
						}
						elseif($search == "Subway Restaurant"){}
						elseif($search == "Macys"){
							if((strtoupper($locations[$i]['Location']['name']) !== strtoupper("Macy's"))){
								echo $locations[$i]['Location']['name']."       <a href='/app/webroot/admin/locations/delete/".$locations[$i]['Location']['id']."'>DELETE</a><br />";
								//$this->Location->delete($locations[$i]['Location']['id']);
							}
						}
						elseif($search == "Hollister Co."){
							if((strtoupper($locations[$i]['Location']['name']) !== strtoupper("Hollister Co")) && (strtoupper($locations[$i]['Location']['name']) !== strtoupper("Hollister"))){
								echo $locations[$i]['Location']['name']."       <a href='/app/webroot/admin/locations/delete/".$locations[$i]['Location']['id']."'>DELETE</a><br />";
								$this->Location->delete($locations[$i]['Location']['id']);
							}
						}
						elseif($search == "McDonald's"){
							if((strtoupper($locations[$i]['Location']['name']) != strtoupper("McDonald's"))){
								echo $locations[$i]['Location']['name']."       <a href='/app/webroot/admin/locations/delete/".$locations[$i]['Location']['id']."'>DELETE</a><br />";
								//$this->Location->delete($locations[$i]['Location']['id']);
							}
						}
						else{
							echo $locations[$i]['Location']['name']."       <a href='/app/webroot/admin/locations/delete/".$locations[$i]['Location']['id']."'>DELETE</a><br />";
						}
						if(substr(strtoupper($locations[$i]['Location']['name']), 0, strlen($search.'')) !== strtoupper($search.'')){
							if(strtoupper($locations[$i]['Location']['name']) !== strtoupper($search)){
							//echo substr(strtoupper($locations[$i]['Location']['name']), 0, strlen($search.' - '));
								
								
								//$this->Location->delete($locations[$i]['Location']['id']);
								/*
								//$name = preg_replace('/[^a-zA-Z0-9_ %\[\]\.\(\)%&-]/s', '', $locations[$i]['Location']['name']);
								for($k = 0; $k < count($locations); $k++){
									if($i != $k){
										if($name == preg_replace('/[^a-zA-Z0-9_ %\[\]\.\(\)%&-]/s', '', $locations[$k]['Location']['name'])){
											if($locations[$i]['Location']['formatted_address'] == $locations[$k]['Location']['formatted_address']){
												$this->Location->delete($locations[$k]['Location']['id']);
											}
										}
									}
								}
								*/
							}
						}

						//
					}
				}
			}
			//$this->set('locations', $this->Location->find('all', array('conditions' => array('Location._brand' => $brands[$z]['Brand']['id']))));
		}
	}