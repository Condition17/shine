describe("CustomerSearchController", function(){
	describe("Initialization", function(){
		var scope = null,
				controller = null;

		beforeEach(module("customers"));
		beforeEach(inject(function( $controller, $rootScope){
			scope = $rootScope.$new();
			controller = $controller("CustomerSearchController",{ $scope: scope});
		}));


		it("defaults to an empty customer list",function(){
			expect(scope.customers).toEqual([]);
		});
	});
});

describe("Fetching Search Results", function(){
	var scope = null,
			controller = null,
			httpBackend = null,
			serverResults = [{"id":316683,"first_name":"Bobbie","last_name":"Abbott","email":"maida316682@fisher.org","username":"verna.hane316682","created_at":"2016-08-24T10:47:18.579Z","updated_at":"2016-08-24T10:47:18.579Z"},{"id":237058,"first_name":"Bobbie","last_name":"Abernathy","email":"gerhard.schinner237057@romaguera.name","username":"onie237057","created_at":"2016-08-24T10:42:33.689Z","updated_at":"2016-08-24T10:42:33.689Z"},{"id":49155,"first_name":"Bobby","last_name":"Abshire","email":"felix49154@fisher.biz","username":"michelle.champlin49154","created_at":"2016-08-24T10:31:22.513Z","updated_at":"2016-08-24T10:31:22.513Z"},{"id":61878,"first_name":"Bobby","last_name":"Adams","email":"minerva.shields61877@dubuque.name","username":"tara61877","created_at":"2016-08-24T10:32:07.678Z","updated_at":"2016-08-24T10:32:07.678Z"},{"id":276075,"first_name":"Bobbie","last_name":"Anderson","email":"lisa.klein276074@leuschke.io","username":"jaquelin.dach276074","created_at":"2016-08-24T10:44:53.727Z","updated_at":"2016-08-24T10:44:53.727Z"},{"id":38262,"first_name":"Bobbie","last_name":"Anderson","email":"filomena_ebert38261@brown.info","username":"aryanna38261","created_at":"2016-08-24T10:30:43.568Z","updated_at":"2016-08-24T10:30:43.568Z"},{"id":120173,"first_name":"Bobbie","last_name":"Ankunding","email":"martine_feil120172@carterstamm.com","username":"raoul120172","created_at":"2016-08-24T10:35:34.570Z","updated_at":"2016-08-24T10:35:34.570Z"},{"id":139368,"first_name":"Bobby","last_name":"Auer","email":"lilyan.crist139367@wintheiserkemmer.com","username":"caesar.dach139367","created_at":"2016-08-24T10:36:46.102Z","updated_at":"2016-08-24T10:36:46.102Z"},{"id":310408,"first_name":"Bobbie","last_name":"Auer","email":"jorge_cormier310407@lednerhyatt.io","username":"lelah310407","created_at":"2016-08-24T10:46:56.408Z","updated_at":"2016-08-24T10:46:56.408Z"},{"id":190275,"first_name":"Bobbie","last_name":"Barrows","email":"olen_kuvalis190274@maggio.io","username":"anthony.lesch190274","created_at":"2016-08-24T10:39:48.046Z","updated_at":"2016-08-24T10:39:48.046Z"}];
	beforeEach(module("customers"));

	beforeEach(inject(function($controller, $rootScope, $httpBackend){
		scope = $rootScope.$new();
		$controller = $controller("CustomerSearchController",{$scope: scope});
		httpBackend = $httpBackend;
	}));

	beforeEach(function(){
		httpBackend.when('GET','/customers.json?keywords=bob&page=0').respond(serverResults);
	});

	it("populates the customer list with the results", function(){
		scope.search("bob");
		httpBackend.flush();
		expect(scope.customers).toEqual(serverResults);
	});

});

describe("error Handling", function(){
	
	var scope = null,
	controller = null,
	httpBackend = null,
	serverResults = [{"id":316683,"first_name":"Bobbie","last_name":"Abbott","email":"maida316682@fisher.org","username":"verna.hane316682","created_at":"2016-08-24T10:47:18.579Z","updated_at":"2016-08-24T10:47:18.579Z"},{"id":237058,"first_name":"Bobbie","last_name":"Abernathy","email":"gerhard.schinner237057@romaguera.name","username":"onie237057","created_at":"2016-08-24T10:42:33.689Z","updated_at":"2016-08-24T10:42:33.689Z"},{"id":49155,"first_name":"Bobby","last_name":"Abshire","email":"felix49154@fisher.biz","username":"michelle.champlin49154","created_at":"2016-08-24T10:31:22.513Z","updated_at":"2016-08-24T10:31:22.513Z"},{"id":61878,"first_name":"Bobby","last_name":"Adams","email":"minerva.shields61877@dubuque.name","username":"tara61877","created_at":"2016-08-24T10:32:07.678Z","updated_at":"2016-08-24T10:32:07.678Z"},{"id":276075,"first_name":"Bobbie","last_name":"Anderson","email":"lisa.klein276074@leuschke.io","username":"jaquelin.dach276074","created_at":"2016-08-24T10:44:53.727Z","updated_at":"2016-08-24T10:44:53.727Z"},{"id":38262,"first_name":"Bobbie","last_name":"Anderson","email":"filomena_ebert38261@brown.info","username":"aryanna38261","created_at":"2016-08-24T10:30:43.568Z","updated_at":"2016-08-24T10:30:43.568Z"},{"id":120173,"first_name":"Bobbie","last_name":"Ankunding","email":"martine_feil120172@carterstamm.com","username":"raoul120172","created_at":"2016-08-24T10:35:34.570Z","updated_at":"2016-08-24T10:35:34.570Z"},{"id":139368,"first_name":"Bobby","last_name":"Auer","email":"lilyan.crist139367@wintheiserkemmer.com","username":"caesar.dach139367","created_at":"2016-08-24T10:36:46.102Z","updated_at":"2016-08-24T10:36:46.102Z"},{"id":310408,"first_name":"Bobbie","last_name":"Auer","email":"jorge_cormier310407@lednerhyatt.io","username":"lelah310407","created_at":"2016-08-24T10:46:56.408Z","updated_at":"2016-08-24T10:46:56.408Z"},{"id":190275,"first_name":"Bobbie","last_name":"Barrows","email":"olen_kuvalis190274@maggio.io","username":"anthony.lesch190274","created_at":"2016-08-24T10:39:48.046Z","updated_at":"2016-08-24T10:39:48.046Z"}]	

	beforeEach(module("customers"));

	beforeEach(inject(function($controller, $rootScope, $httpBackend){
		scope = $rootScope.$new();
		$controller = $controller("CustomerSearchController",{$scope: scope});
		httpBackend = $httpBackend;
	}));

	beforeEach(function(){
		httpBackend.when('GET','/customers.json?keywords=bob&page=0').respond(500,"Internal Server Error");
		spyOn(window, "alert");
	});

	it("alerts the user on error", function(){
		scope.search("bob");
		httpBackend.flush();
		expect(scope.customers).toEqual([]);
		expect(window.alert).toHaveBeenCalledWith("There was a problem loading the page 500");
	});
});