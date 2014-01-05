<?php
	class Location extends AppModel{
		
		public function getLocations(){
			ini_set('max_execution_time', 30000); //300 seconds = 5 minutes

			App::uses('Brand', 'Model');
			$brand = new Brand();
			$results = $brand->find('all');
			
			for($i = 0; $i < count($results); $i++){
				$count = $this->find('count', array('conditions' => array('_brand' => $results[$i]['Brand']['id'])));
				if($count == 0){
					$name = str_replace("'", "", $results[$i]['Brand']['name']);
					die("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA ".$name);
					if($name == "Express")
						$name = "Express Clothing";
					
					//0 = NYC
					//1 = LOS ANGELES
					//2 = CHICAGO
					//3 = HOUSTON
					//4 = PHILADELPHIA, PA
					//5 = PHOENIX ARIZONA
					//6 = SAN ANTONIO, TEXAS
					//7 = SAN DIEGO CALIFORNIA
					//8 = DALLAS TEXAS
					//9 = SAN JOSE CALIFORNIA
					//10 = AUSTIN TEXAS
					//11 = JACKSONVILLE FLORIDA
					//12 = INDIANAPOLIS INDIANA
					//13 = SAN FRANCISCO
					//14 = COLOMBUS OHIO
					//15 = FORT WORTH TEXAS //THIS IS WHERE I STOPPED FOLLOWING WIKI
					//16 = EL PASO TEXAS
					//17 = MEMPHIS TENNESSEE
					//18 = BOSTON MASSACHUSETTS
					//19 = SEATTLE WASHINGTON
					//20 = DENVER COLORADO
					//21 = WASHINGTON DC
					//22 = BALTIMORE
					//23 = LAS VEGAS
					//24 = FRESNO CALIFORNIA
					//25 = SACRAMENTO CALIFORNIA
					//26 = LONG BEACH CALIFORNIA
					//27 = ATLANTA GEORGIA
					//28 = NEW ORLEANS
					//29 = NEWARK NEW JERSEY
					//30 = BUFFALO NY
					
					$coords = array(
						'0' => '40.7142700,-74.0059700', 
						'1' => '34.0522300,-118.243680', 
						'2' => '41.8500300,-87.6500500', 
						'3' => '29.7632800,-95.3632700', 
						'4' => '39.9523400,-75.1637900',
						'5' => '33.4483800,-112.0740400',
						'6' => '29.4241200,-98.4936300',
						'7' => '32.7153300,-117.1572600',
						'8' => '32.7830600,-96.8066700',
						'9' => '37.3393900,-121.8949600',
						'10' => '30.2671500,-97.7430600',
						'11' => '30.332184,-81.655651',
						'12' => '39.768403,-86.158068',
						'13' => '37.774929,-122.419416',
						'14' => '39.961176,-82.998794',
						'15' => '32.755488,-97.330766',
						'16' => '31.769956,-106.496805',
						'17' => '35.149534,-90.048980',
						'18' => '42.358431,-71.059773',
						'19' => '47.606209,-122.332071',
						'20' => '39.737567,-104.984718',
						'21' => '38.907231,-77.036464',
						'22' => '39.290385,-76.612189',
						'23' => '36.114646,-115.172816',
						'24' => '36.746842,-119.767113',
						'25' => '38.581572,-121.494400',
						'26' => '33.768321,-118.195617',
						'27' => '33.748995,-84.387982',
						'28' => '29.951066,-90.071532',
						'29' => '40.735657,-74.172367',
						'30' => '42.886447,-78.878369'
						);
					for($j = 0; $j < count($coords);$j++){
						$this->scrape($name, $results[$i]['Brand']['id'], $coords[$j]);
					}
					//
					echo "<br />";
					
				}
			}
		//	die();
		}
		
		public function scrape($searchTerm, $id=1, $coords, $url=NULL){
			$key = "AIzaSyACCaUid0oTyZbUbeMlrV3GJAw0lnK4mZg";
			App::uses('HttpSocket', 'Network/Http');
			if(!$url){
				$url = "https://maps.googleapis.com/maps/api/place/radarsearch/json?location=".$coords."&name=".urlencode($searchTerm)."&radius=20000&sensor=false&key=".$key;
			}else{
				debug($url);
			}
			$http = new HttpSocket();
			$results = $http->get($url);
			$results = json_decode($results);
			//die(debug($results));
			for($i = 0; $i < count($results->results); $i++){
				$url = "https://maps.googleapis.com/maps/api/place/details/json?reference=".$results->results[$i]->reference."&sensor=false&key=".$key;
				$resultsRef = $http->get($url);
				$resultsRef = json_decode($resultsRef);
				$place = $resultsRef->result;
				$loc = $this->find('first', array('conditions' => array('loc' => array(0 => $place->geometry->location->lng, 1 => $place->geometry->location->lat))));
				
				//If this place is unique
				if(empty($loc)){
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
			}
			sleep(2);
			if(!empty($results->next_page_token)){
				die("A");
				$url = "https://maps.googleapis.com/maps/api/place/radarsearch/json?location=".$coords."&name=".urlencode($searchTerm)."&radius=20000&sensor=false&key=".$key."&pagetoken=".$results->next_page_token;
				$this->scrape($searchTerm, $id, $coords, $url);
			}
		}
	}