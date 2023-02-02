var parcelsAll = [];

		//object contructor for parcels
		function Parcel(trkNumber, parcelStatus, parcelDest, parcelWeight, isExpress) {
			this.trkNumber = trkNumber;
			this.parcelStatus = parcelStatus;
			this.parcelDest = parcelDest;
			this.parcelWeight = parcelWeight;
			this.isExpress = isExpress;
		}

		// created some parcel objets and added to the array "parcelsAll"
		var parcel1 = new Parcel(generateTrackingNumber(), "In Transit", "Ontario", 5, true);
		var parcel2 = new Parcel(generateTrackingNumber(), "Processing", "Alberta", 12, true);
		var parcel3 = new Parcel(generateTrackingNumber(), "Shipped", "New Brunswick", 8, false);
		var parcel4 = new Parcel(generateTrackingNumber(), "Delivered", "Manitoba", 17, false);
		var parcel5 = new Parcel(generateTrackingNumber(), "Processing", "British Columbia", 13, false);
		var parcel6 = new Parcel(generateTrackingNumber(), "Shipped", "Quebec", 9, false);
		var parcel7 = new Parcel(generateTrackingNumber(), "Delivered", "Ontario", 25, true);

		parcelsAll.push(parcel1, parcel2, parcel3, parcel4, parcel5, parcel6, parcel7);

		// Call DisplayParcels on load
		displayParcels();

		/*
			generateTrackingNumber()
			Purpose: Helper function - generates a random tracking number
			Parameters: none
			Returns: string
		*/
		function generateTrackingNumber() {
			const TN_LENGTH = 10;
			const TN_PREFIX = "IWD";
			var tokens = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
			var trackingNumber = new String(TN_PREFIX);
			for (var x = 0; x < TN_LENGTH; x++) {
				trackingNumber = trackingNumber.concat(tokens[Math.floor(Math.random() * tokens.length)]);
			}
			//console.log("Generated: " + trackingNumber);
			return trackingNumber;
		}

		/*
			createParcel()
			Purpose: creates a new parcel from user input and adds to the global array
			Parameters: none
			Returns: object pushed to the array
		*/
		function createParcel() {
			let destination = (document.getElementById("createParcel_Destination")).value;
			let weight = document.getElementById("createParcel_Weight").value;
			let express = document.getElementById("createParcel_expressShipping").checked;

			let newParcel = new Parcel(generateTrackingNumber(), "Processing", destination, weight, express);
			parcelsAll.push(newParcel);
			displayParcels();
		}

		/*
			displayParcels()
			Purpose: Displays all the parcels on the html output that meet the filter on the dropdown list
			Parameters: none
			Returns: HTML output
		*/
		function displayParcels() {
			document.getElementById("displayParcelOutput").innerHTML = "";
			let status = document.getElementById("displayParcelsFilter").value;
			let statusArray;

			if (status !== "All") {
				statusArray = parcelsAll.filter(function (el) {
					return el.parcelStatus === status;
				});
			}
			else {
				statusArray = parcelsAll.slice();
			};

			let listLength = statusArray.length;
			let tableArea = document.getElementById("displayParcelOutput");
			let table = document.createElement("table");

			let th1 = document.createElement("th");
			let th2 = document.createElement("th");
			let th3 = document.createElement("th");
			let th4 = document.createElement("th");
			let th5 = document.createElement("th");

			th1.appendChild(document.createTextNode("Tracking Number"));
			th2.appendChild(document.createTextNode("Status"));
			th3.appendChild(document.createTextNode("Destination"));
			th4.appendChild(document.createTextNode("Weight"));
			th5.appendChild(document.createTextNode("Express Shipping"));

			table.appendChild(th1);
			table.appendChild(th2);
			table.appendChild(th3);
			table.appendChild(th4);
			table.appendChild(th5);

			for (var i = 0; i < listLength; i++) {
				let tr = document.createElement("tr");

				let tdTrk = document.createElement("td");
				let tdStatus = document.createElement("td");
				let tdDest = document.createElement("td");
				let tdWeig = document.createElement("td");
				let tdEx = document.createElement("td");

				tdTrk.appendChild(document.createTextNode(statusArray[i].trkNumber));
				tdStatus.appendChild(document.createTextNode(statusArray[i].parcelStatus));
				tdDest.appendChild(document.createTextNode(statusArray[i].parcelDest));
				tdWeig.appendChild(document.createTextNode(statusArray[i].parcelWeight + "(g)"));
				tdEx.appendChild(document.createTextNode(statusArray[i].isExpress));

				tr.appendChild(tdTrk);
				tr.appendChild(tdStatus);
				tr.appendChild(tdDest);
				tr.appendChild(tdWeig);
				tr.appendChild(tdEx);

				table.appendChild(tr);
			}
			tableArea.appendChild(table);
			table.setAttribute("border", "1");
		}

		/*
			processParcel()
			Purpose: Change the status of a selected parcel and calculates the total cost of it.
			Parameters: none
			Returns: nothing
		*/
		function processParcel() {
			let trackNum = document.getElementById("tbTrackingNumber").value;
			let status = document.getElementById("processParcel_Status").value;

			const index = parcelsAll.findIndex(object => {
				return object.trkNumber === trackNum;
			});

			if(index < 0){
				alert("Tracking Number not found!")
			}
			else{
				parcelsAll[index].parcelStatus = status;
			}

			let weight = parcelsAll[index].parcelWeight;
			let express = parcelsAll[index].isExpress;
			let costOfShipping;
			const HST = 0.13;
			
			if(express == true){
				costOfShipping = (5 + 10 + (weight*0.05))*HST;
			}
			else {
				costOfShipping = (5 + (weight*0.05))*HST;
			}

			alert("Shipping for parcel: " + parcelsAll[1].trkNumber + "\n" + "$" + costOfShipping.toFixed(2));
			displayParcels();
		}