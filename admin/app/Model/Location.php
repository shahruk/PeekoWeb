<?php
	class Location extends AppModel{
		
		public function getLocations(){
			ini_set('max_execution_time', 3000); //300 seconds = 5 minutes

			App::uses('Brand', 'Model');
			$brand = new Brand();
			$results = $brand->find('all');
			/*
			for($i = 0; $i < count($results); $i++){
				echo urlencode($results[$i]['Brand']['name']).": ".count($this->find("all", array("conditions" => array("_brand" => $results[$i]['Brand']['id']))));
				$name = $results[$i]['Brand']['name'];
				if($name == "Express")
					$name = "Express Clothing";
				//$this->scrape($name, $results[$i]['Brand']['id']);
				echo "<br />";
				
			}
			die();
			*/
			$locations = $this->find("all");
			for($i = 0; $i < count($locations); $i++){
				$match = false;
				for($k = 0; $k < count($results); $k++){
					if(str_replace("'", "", $locations[$i]['Location']['name']) == str_replace("'", "", $results[$k]['Brand']['name']))
						$match = true;
				}
				
				if(!$match){
					echo $locations[$i]['Location']['name']." <br />";
				}
			}
		}
		
		public function scrape($searchTerm, $id=1, $url=NULL){
			$key = "AIzaSyAHE0HHujtLBkI4senB5h9FIlB3ej-yb9c";
			App::uses('HttpSocket', 'Network/Http');
			if(!$url){
				$url = "https://maps.googleapis.com/maps/api/place/radarsearch/json?location=32.714998,-117.155113&name=".urlencode($searchTerm)."&radius=20000&sensor=true&key=".$key;
			}else{
				debug($url);
			}
			$http = new HttpSocket();
			$results = $http->get($url);
			$results = json_decode($results);
			for($i = 0; $i < count($results->results); $i++){
				$url = "https://maps.googleapis.com/maps/api/place/details/json?reference=".$results->results[$i]->reference."&sensor=true&key=".$key;
				$resultsRef = $http->get($url);
				$resultsRef = json_decode($resultsRef);
				$place = $resultsRef->result;
				//Get first word and compare
				$resultName = explode(' ', trim($place->name));
				$resultName = str_replace("'", "", $resultName);
				$searchName = explode(' ', trim($searchTerm));
				if($resultName[0] == $searchName[0]){
					$this->create();
					$data = array();
					$data['Location']['_brand'] = $id;
					$data['Location']['formatted_address'] = $place->formatted_address;
					$data['Location']['loc'] = array(0 => $place->geometry->location->lng, 1 => $place->geometry->location->lat);
					$data['Location']['name'] = $place->name;
					if($this->save($data)){
					
					}
				}
			}
			sleep(2);
			if(!empty($results->next_page_token)){
				
				$url = "https://maps.googleapis.com/maps/api/place/radarsearch/json?location=32.714998,-117.155113&name=".urlencode($searchTerm)."&radius=20000&sensor=true&key=".$key."&pagetoken=".$results->next_page_token;
				$this->scrape($searchTerm, $id, $url);
			}
		}
	}