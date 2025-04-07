//This are common Factory use for when Redirct page store the previous nessariy data
//PIVF.factory("PageConfig", function ($http, API) {
    // Commented & modified on 27thJul2021 to allow Tab wise access rights to user in ART Cycle
PIVF.factory("PageConfig", function ($http, API, authService) {

    var Config = {};
    function setObj(ArtTypeID, ArtSubTypeID) {

        debugger;
        // Added on 27thJul2021 to allow Tab wise access rights to user in ART Cycle
        //$scope.ArtCycleTabList = $rootScope.CycleTabList;

        var Response = $http.get(API.APIurl + 'Common/GetcycleType', { params: { ArtTypeID: ArtTypeID, ArtSubTypeID: ArtSubTypeID } });
        Response.then(function (Response) {
            //ID Code	Description	     Status                          
            //1	 01	    OPU	             1
            //2	 02	    OI	             1
            //3	 03	    FET	             1
            //4	 04	    F-ICSI 	         1
            //7	 05	    OR - Linked	     1
            //8	 06	    ER - Linked	       1
            //9	 07	    Oocyte Recipient	1


            //ID	Code	Description	ARTTypeID	PatientCategoryID	Status
            //1	01	TI	2	7	1
            //2	02	IUI	2	7	1
            //3	03	IUI (D)	2	7	1
            //4	04	IVF	1	7	1
            //5	05	ICSI	1	7	1
            //6	06	IVF-ICSI	1	7	1
            //7	07	Embryo Pooling	1	8	0
            //8	08	Oocyte Pooling	1	8	1
            //9	09	Oocyte - Embryo Pooling  	1	8	0
            //10	10	OD - Linked  	1	8	1
            //11	11	ED - Linked  	1	8	1
            //12	12	OD-ED Linked  	1	8	1
            //13	12	F-ICSI   	4	7	1
            //14	13	FET	3	7	1
            //15	14	IVF	7	7	1
            //16	15	ICSI  	7	7	1
            //17	16	IVF-ICSI  	7	7	1
            //18	17	DF-ICSI   	7	7	1
            //19	18	Fresh Transfer  	8	7	1
            //20	19	FET	8	7	1
            //21	20	Oocyte Freezing  	1	7	1
            //22	22	IUI (D)	2	11	1
            //23	23	IVF	1	11	1
            //24	24	ICSI	1	11	1
            //25	25	IVF-ICSI	1	11	1
            //26	26	ICSI	7	11	1
            //27	27	IVF-ICSI  	7	11	1
            //28	28	DF-ICSI   	7	11	1
            //29	29	Fresh Transfer  	8	11	1
            //30	30	FET	8	11	1
            //31	31	Oocyte Freezing  	1	11	1
            //32	32	F-ICSI   	9	7	1
            var cycleSelectedPlan = Response.data;
            cycleSelectedPlan.ArtType = ArtTypeID//cycleSelectedPlan.ArtType.replace(/(\r\n|\n|\r)/gm, "");
            cycleSelectedPlan.SubArtType = ArtSubTypeID//cycleSelectedPlan.SubArtType.replace(/(\r\n|\n|\r)/gm, "");    
            if (cycleSelectedPlan.ArtType == 2 && cycleSelectedPlan.SubArtType == 1) {  //"OI""TI"2 1
                Config.IUI = false;
                Config.Outcome = true;
                Config.SemenDetail = false;
                Config.OPU = false;
                Config.Embryology = false;
                Config.EmbryoTransfer = false;
                Config.OocyteVitrification = false;
                Config.EmbryoVitrification = false;
                Config.OocyteThawing = false;
                Config.EmbryoThawing = false;
                Config.CryoPreservation = false;
                Config.DonarBtn = false;
                Config.DonarEmbBtn = false;
            }
            else if (cycleSelectedPlan.ArtType == 2 && cycleSelectedPlan.SubArtType == 2) {// "OI""IUI"
                Config.IUI = true;
                Config.Outcome = true;
                Config.SemenDetail = false;
                Config.OPU = false;
                Config.Embryology = false;
                Config.EmbryoTransfer = false;
                Config.OocyteVitrification = false;
                Config.EmbryoVitrification = false;
                Config.OocyteThawing = false;
                Config.EmbryoThawing = false;
                Config.CryoPreservation = false;
                Config.DonarBtn = false;
                Config.DonarEmbBtn = false;
            }
            else if (cycleSelectedPlan.ArtType == 2 && (cycleSelectedPlan.SubArtType == 2 || cycleSelectedPlan.SubArtType == 3)) { //(OI ("IUI","IUI (D)"))
                Config.IUI = true;
                Config.Outcome = true;
                Config.SemenDetail = false;
                Config.OPU = false;
                Config.Embryology = false;
                Config.EmbryoTransfer = false;
                Config.OocyteVitrification = false;
                Config.EmbryoVitrification = false;
                Config.OocyteThawing = false;
                Config.EmbryoThawing = false;
                Config.CryoPreservation = false;
                Config.DonarBtn = false;
                Config.DonarEmbBtn = false;
            }
            else if (cycleSelectedPlan.ArtType == 1 && (cycleSelectedPlan.SubArtType == 21 || cycleSelectedPlan.SubArtType == 31)) { //"OPU"-"Oocyte Freezing" angular.equals(cycleSelectedPlan.SubArtType, "Oocyte Freezing") 
                //cycleSelectedPlan.ArtType == 2      changed by Nayan Kamble [OPU ID=1 , OI ID=2]
                Config.IUI = false;
                // Config.Outcome = true;
                Config.Outcome = false;     // added sujsta for oocyte pooling cycle outcome not show 
                Config.SemenDetail = false;
                Config.OPU = true;
                Config.Embryology = true;
                Config.EmbryoTransfer = false;
                Config.OocyteVitrification = true;
                Config.EmbryoVitrification = false;
                Config.OocyteThawing = false;
                Config.EmbryoThawing = false;
                Config.CryoPreservation = true;
                //Art Type Wise Day 0 Plan
                Config.Day0Discard = true;
                Config.Day0Cryo = true;
                Config.Day0IVF = false;
                Config.Day0ICSI = false;
                Config.Day0IMSI = false;
                Config.Day0Donate = false;
                Config.Day0DonateCryo = false;
                //Art Type Wise Day 1 to 6 Plan
                Config.Discard = false;
                Config.Cryo = false;
                Config.Transfer = false;
                Config.Donate = false;
                Config.DonateCryo = false;
                Config.DonarBtn = false;
                Config.DonarEmbBtn = false;
            }
            else if (cycleSelectedPlan.ArtType == 1 && (cycleSelectedPlan.SubArtType == 4 || cycleSelectedPlan.SubArtType == 15 || cycleSelectedPlan.SubArtType==23)) { //4,15,23 OPU IVF
                Config.IUI = false;
                Config.Outcome = true;
                Config.SemenDetail = true;
                Config.OPU = true;
                Config.Embryology = true;
                Config.EmbryoTransfer = true;
                Config.OocyteVitrification = true;
                Config.EmbryoVitrification = true;
                Config.OocyteThawing = true;
                Config.EmbryoThawing = true;
                Config.CryoPreservation = true;
                //Art Type Wise Day 0 Plan
                Config.Day0Discard = true;
                Config.Day0Cryo = true;
                Config.Day0IVF = true;
                Config.Day0ICSI = false;
                Config.Day0IMSI = false;
                Config.Day0Donate = false;
                Config.Day0DonateCryo = false;
                //Art Type Wise Day 1 to 6 Plan
                Config.Discard = true;
                Config.Cryo = true;
                Config.Transfer = true;
                Config.Donate = false;
                Config.DonateCryo = false;
                Config.DonarBtn = false;
                Config.DonarEmbBtn = false;
            }
            else if (cycleSelectedPlan.ArtType == 1 && (cycleSelectedPlan.SubArtType == 5 || cycleSelectedPlan.SubArtType == 24 || cycleSelectedPlan.SubArtType == 26)) { //"OPU"-"ICSI"
                Config.IUI = false;
                Config.Outcome = true;
                Config.SemenDetail = true;
                Config.OPU = true;
                Config.Embryology = true;
                Config.EmbryoTransfer = true;
                Config.OocyteVitrification = true;
                Config.EmbryoVitrification = true;
                Config.OocyteThawing = true;
                Config.EmbryoThawing = true;
                Config.CryoPreservation = true;
                //Art Type Wise Day 0 Plan
                Config.Day0Discard = true;
                Config.Day0Cryo = true;
                Config.Day0IVF = false;
                Config.Day0ICSI = true;
                Config.Day0IMSI = true;
                Config.Day0Donate = false;
                Config.Day0DonateCryo = false;
                //Art Type Wise Day 1 to 6 Plan
                Config.Discard = true;
                Config.Cryo = true;
                Config.Transfer = true;
                Config.Donate = false;
                Config.DonateCryo = false;
                Config.DonarBtn = false;
                Config.DonarEmbBtn = false;
            }
            else if (cycleSelectedPlan.ArtType == 1 && (cycleSelectedPlan.SubArtType == 6 || cycleSelectedPlan.SubArtType==25)) {
                Config.IUI = false;
                Config.Outcome = true;
                Config.SemenDetail = true;
                Config.OPU = true;
                Config.Embryology = true;
                Config.EmbryoTransfer = true;
                Config.OocyteVitrification = true;
                Config.EmbryoVitrification = true;
                Config.OocyteThawing = true;
                Config.EmbryoThawing = true;
                Config.CryoPreservation = true;
                //Art Type Wise Day 0 Plan
                Config.Day0Discard = true;
                Config.Day0Cryo = true;
                Config.Day0IVF = true;
                Config.Day0ICSI = true;
                Config.Day0IMSI = true;
                Config.Day0Donate = false;
                Config.Day0DonateCryo = false;
                //Art Type Wise Day 1 to 6 Plan
                Config.Discard = true;
                Config.Cryo = true;
                Config.Transfer = true;
                Config.Donate = false;
                Config.DonateCryo = false;
                Config.DonarBtn = false;
                Config.DonarEmbBtn = false;
            }
            else if (cycleSelectedPlan.ArtType == 1 && cycleSelectedPlan.SubArtType == 7) { // "OPU"--'Embryo Pooling'
                Config.IUI = false;
                Config.Outcome = false;
                Config.SemenDetail = true;
                Config.OPU = true;
                Config.Embryology = true;
                Config.EmbryoTransfer = false;
                Config.OocyteVitrification = false;
                Config.EmbryoVitrification = true;
                Config.OocyteThawing = false;
                Config.EmbryoThawing = false;
                Config.CryoPreservation = true;
                //Art Type Wise Day 0 Plan
                Config.Day0Discard = true;
                Config.Day0Cryo = true;
                Config.Day0IVF = false;
                Config.Day0ICSI = false;
                Config.Day0IMSI = false;
                Config.Day0Donate = false;
                Config.Day0DonateCryo = false;
                //Art Type Wise Day 1 to 6 Plan
                Config.Discard = true;
                Config.Cryo = true;
                Config.Transfer = false;
                Config.Donate = false;
                Config.DonateCryo = false;
                Config.DonarBtn = false;
                Config.DonarEmbBtn = false;
            }
            else if (cycleSelectedPlan.ArtType == 1 && cycleSelectedPlan.SubArtType==8) {  // "OPU"--"Oocyte Pooling"
                Config.IUI = false;
                Config.Outcome = false;
                Config.SemenDetail = false;
                Config.OPU = true;
                Config.Embryology = true;
                Config.EmbryoTransfer = false;
                Config.OocyteVitrification = true;
                Config.EmbryoVitrification = false;
                Config.OocyteThawing = false;
                Config.EmbryoThawing = false;
                Config.CryoPreservation = true;
                //Art Type Wise Day 0 Plan
                Config.Day0Discard = true;
                Config.Day0Cryo = true;
                Config.Day0IVF = false;
                Config.Day0ICSI = false;
                Config.Day0IMSI = false;
                Config.Day0Donate = false;
                Config.Day0DonateCryo = false;
                //Art Type Wise Day 1 to 6 Plan
                Config.Discard = false;
                Config.Cryo = false;
                Config.Transfer = false;
                Config.Donate = false;
                Config.DonateCryo = false;
                Config.DonarBtn = false;
                Config.DonarEmbBtn = false;
            }
            else if (cycleSelectedPlan.ArtType == 1 && cycleSelectedPlan.SubArtType==9) { //"OPU"-Oocyte - Embryo Pooling
                Config.IUI = false;
                Config.Outcome = false;
                Config.SemenDetail = true;
                Config.OPU = true;
                Config.Embryology = true;
                Config.EmbryoTransfer = false;
                Config.OocyteVitrification = true;
                Config.EmbryoVitrification = true;
                Config.OocyteThawing = false;
                Config.EmbryoThawing = false;
                Config.CryoPreservation = true;
                //Art Type Wise Day 0 Plan
                Config.Day0Discard = true;
                Config.Day0Cryo = true;
                Config.Day0IVF = false;
                Config.Day0ICSI = false;
                Config.Day0IMSI = false;
                Config.Day0Donate = false;
                Config.Day0DonateCryo = false;
                //Art Type Wise Day 1 to 6 Plan
                Config.Discard = true;
                Config.Cryo = true;
                Config.Transfer = false;
                Config.Donate = false;
                Config.DonateCryo = false;
                Config.DonarBtn = false;
                Config.DonarEmbBtn = false;
            }
            else if (cycleSelectedPlan.ArtType == 1 && cycleSelectedPlan.SubArtType == 10) { //"OPU"-"OD - Linked"
                debugger;
                Config.IUI = false;
                Config.Outcome = false;
                Config.SemenDetail = false;
                Config.OPU = true;
                Config.Embryology = true;
                Config.EmbryoTransfer = false;
                Config.OocyteVitrification = true;
                Config.EmbryoVitrification = false;
                Config.OocyteThawing = false;
                Config.EmbryoThawing = false;
                Config.CryoPreservation = true;
                //Art Type Wise Day 0 Plan
                Config.Day0Discard = true; 
                Config.Day0Cryo = true; //chnaged
                Config.Day0IVF = false;
                Config.Day0ICSI = false;
                Config.Day0IMSI = false;
                Config.Day0Donate = true;
                Config.Day0DonateCryo = true;
                //Art Type Wise Day 1 to 6 Plan
                Config.Discard = true;
                Config.Cryo = true;
                Config.Transfer = true;
                Config.Donate = false;
                Config.DonateCryo = true;
                Config.DonarBtn = false;
                Config.DonarEmbBtn = false;
            }
            else if (cycleSelectedPlan.ArtType == 1 && cycleSelectedPlan.SubArtType==11) { //"OPU"-"ED - Linked"
                debugger;
                Config.IUI = false;
                Config.Outcome = false;
                // Config.SemenDetail = true;  // commented by sujata for cross clinic as per nilesh sir discussion
                Config.SemenDetail = false;   // Added by sujata for cross clinic as per nilesh sir discussion
                Config.OPU = true;
                Config.Embryology = true;
                Config.EmbryoTransfer = false;
                Config.OocyteVitrification = false;
                Config.EmbryoVitrification = true;
                Config.OocyteThawing = false;
                Config.EmbryoThawing = false;
                Config.CryoPreservation = true;
                //Art Type Wise Day 0 Plan
                Config.Day0Discard = true;
                Config.Day0Cryo = true; //chnaged
                Config.Day0IVF = true;
                Config.Day0ICSI = true;
                Config.Day0IMSI = true;
                Config.Day0Donate = false;
                Config.Day0DonateCryo = false;
                //Art Type Wise Day 1 to 6 Plan
                Config.Discard = true;
                Config.Cryo = true; //chnaged
                Config.Transfer = false;
                Config.Donate = true;
                Config.DonateCryo = true;
                Config.DonarBtn = false;
                Config.DonarEmbBtn = false;
            }
            else if (cycleSelectedPlan.ArtType == 1 && cycleSelectedPlan.SubArtType==12) { //"OPU" -"OD-ED Linked"
                debugger;
                Config.IUI = false;
                Config.Outcome = false;
                // Config.SemenDetail = true;  // commented by sujata for cross clinic as per nilesh sir discussion
                Config.SemenDetail = false;   // Added by sujata for cross clinic as per nilesh sir discussion
                Config.OPU = true;
                Config.Embryology = true;
                Config.EmbryoTransfer = false;
                Config.OocyteVitrification = true;
                Config.EmbryoVitrification = true;
                Config.OocyteThawing = false;
                Config.EmbryoThawing = false;
                Config.CryoPreservation = true;
                //Art Type Wise Day 0 Plan
                Config.Day0Discard = true;
                Config.Day0Cryo = true; //chnaged
                Config.Day0IVF = true;
                Config.Day0ICSI = true;
                Config.Day0IMSI = true;
                Config.Day0Donate = true;
                Config.Day0DonateCryo = true;
                //Art Type Wise Day 1 to 6 Plan
                Config.Discard = true;
                Config.Cryo = true; //chnaged
                Config.Transfer = false;
                Config.Donate = true;
                Config.DonateCryo = true;
                Config.DonarBtn = false;
                Config.DonarEmbBtn = false;
            }
            else if (cycleSelectedPlan.ArtType == 4 && (cycleSelectedPlan.SubArtType == 13 || cycleSelectedPlan.SubArtType == 32)) { //"F-ICSI "-"F-ICSI "
                debugger;
                Config.IUI = false;
                Config.Outcome = true;
                Config.SemenDetail = true;
                Config.OPU = false;
                Config.Embryology = true;
                Config.EmbryoTransfer = true;
                Config.OocyteVitrification = true;
                Config.EmbryoVitrification = true;
                Config.OocyteThawing = true;
                Config.EmbryoThawing = true;
                Config.CryoPreservation = true;
                //Art Type Wise Day 0 Plan
                Config.Day0Discard = true;
                Config.Day0Cryo = false;
                Config.Day0IVF = false;
                Config.Day0ICSI = true;
                Config.Day0IMSI = true;
                Config.Day0Donate = false;
                Config.Day0DonateCryo = false;
                //Art Type Wise Day 1 to 6 Plan
                Config.Discard = true;
                Config.Cryo = true;
                Config.Transfer = true;
                Config.Donate = false;
                Config.DonateCryo = false;
                Config.DonarBtn = false;
                Config.DonarEmbBtn = false;
            }
            else if (cycleSelectedPlan.ArtType == 3 && (cycleSelectedPlan.SubArtType == 14 || cycleSelectedPlan.SubArtType == 20 || cycleSelectedPlan.SubArtType==30)) {
                Config.IUI = false;
                Config.Outcome = true;
                Config.SemenDetail = false;
                Config.OPU = false;
                Config.Embryology = true;
                Config.EmbryoTransfer = true;
                Config.OocyteVitrification = false;
                Config.EmbryoVitrification = true;
                Config.OocyteThawing = false;
                Config.EmbryoThawing = true;
                Config.CryoPreservation = true;
                //Art Type Wise Day 0 Plan
                Config.Day0Discard = true;
                Config.Day0Cryo = false;
                Config.Day0IVF = false;
                Config.Day0ICSI = false;
                Config.Day0IMSI = false;
                Config.Day0Donate = false;
                Config.Day0DonateCryo = false;
                //Art Type Wise Day 1 to 6 Plan
                Config.Discard = true;
                Config.Cryo = true;
                Config.Transfer = true;
                Config.Donate = false;
                Config.DonateCryo = false;
                Config.DonarBtn = false;
                Config.DonarEmbBtn = false;
            }
            else if (cycleSelectedPlan.ArtType == 7 && (cycleSelectedPlan.SubArtType == 4 || cycleSelectedPlan.SubArtType == 15 || cycleSelectedPlan.SubArtType == 23)) { //OR - Linked-IVF
                Config.IUI = false;
                Config.Outcome = true;
                Config.SemenDetail = true;
                Config.OPU = false;
                Config.Embryology = true;
                Config.EmbryoTransfer = true;
                Config.OocyteVitrification = true;
                Config.EmbryoVitrification = true;
                Config.OocyteThawing = false;
                Config.EmbryoThawing = false;
                Config.CryoPreservation = true;
                //Art Type Wise Day 0 Plan
                Config.Day0Discard = true;
                Config.Day0Cryo = true;
                Config.Day0IVF = true;
                Config.Day0ICSI = false;
                Config.Day0IMSI = false;
                Config.Day0Donate = false;
                Config.Day0DonateCryo = false;
                //Art Type Wise Day 1 to 6 Plan
                Config.Discard = true;
                Config.Cryo = true;
                Config.Transfer = true;
                Config.Donate = false;
                Config.DonateCryo = false;
                Config.DonarBtn = false;
                Config.DonarEmbBtn = false;
            }
            else if (cycleSelectedPlan.ArtType == 7 && (
                //cycleSelectedPlan.SubArtType == 5 ||    //Commented by Nayan Kamble
                cycleSelectedPlan.SubArtType == 16      //changed from 5 to 16  by Nayan Kamble
                || cycleSelectedPlan.SubArtType == 24 || cycleSelectedPlan.SubArtType == 26)) { //"OR - Linked"-"ICSI"
                Config.IUI = false;
                Config.Outcome = true;
                Config.SemenDetail = true;
                Config.OPU = false;
                Config.Embryology = true;
                Config.EmbryoTransfer = true;
                Config.OocyteVitrification = true;
                Config.EmbryoVitrification = true;
               // Config.OocyteThawing = false;    Commented by Nayan Kamble
                //   Config.EmbryoThawing = false;    Commented by Nayan Kamble
                Config.OocyteThawing = true;     //Added by Nayan Kamble    [Require for "OR - Linked"-"ICSI"]
                Config.EmbryoThawing = true;     ////Added by Nayan Kamble    [Require for "OR - Linked"-"ICSI"]
                Config.CryoPreservation = true; 
                //Art Type Wise Day 0 Plan
                Config.Day0Discard = true;
                Config.Day0Cryo = true;
                Config.Day0IVF = false;
                Config.Day0ICSI = true;
                Config.Day0IMSI = true;
                Config.Day0Donate = false;
                Config.Day0DonateCryo = false;
                //Art Type Wise Day 1 to 6 Plan
                Config.Discard = true;
                Config.Cryo = true;
                Config.Transfer = true;
                Config.Donate = false;
                Config.DonateCryo = false;
                Config.DonarBtn = false;
                Config.DonarEmbBtn = false;
            }
            else if (cycleSelectedPlan.ArtType == 7 && (cycleSelectedPlan.SubArtType==17 ||cycleSelectedPlan.SubArtType==25)) { //"OR - Linked"--"IVF-ICSI"
                Config.IUI = false;
                Config.Outcome = true;
                Config.SemenDetail = true;
                Config.OPU = false;
                Config.Embryology = true;
                Config.EmbryoTransfer = true;
                Config.OocyteVitrification = true;
                Config.EmbryoVitrification = true;
                //Config.OocyteThawing = false;     Commented by Nayan Kamble
                Config.OocyteThawing = true;                 //Added by Nayan Kamble    [Require for Cryo Donate plan]
                //Config.EmbryoThawing = false;     Commented by Nayan Kamble 
                Config.EmbryoThawing = true;                //Added by Nayan Kamble     [Require for Cryo Donate plan]
                Config.CryoPreservation = true;
                //Art Type Wise Day 0 Plan
                Config.Day0Discard = true;
                Config.Day0Cryo = true;
                Config.Day0IVF = true;
                Config.Day0ICSI = true;
                Config.Day0IMSI = true;
                Config.Day0Donate = false;
                Config.Day0DonateCryo = false;
                //Art Type Wise Day 1 to 6 Plan
                Config.Discard = true;
                Config.Cryo = true;
                Config.Transfer = true;
                Config.Donate = false;
                Config.DonateCryo = false;
                Config.DonarBtn = false;
                Config.DonarEmbBtn = false;
            }
            else if (cycleSelectedPlan.ArtType == 7 && (cycleSelectedPlan.SubArtType == 18 || cycleSelectedPlan.SubArtType == 28)) { //"OR - Linked"-"DF-ICSI "
                Config.IUI = false;
                Config.Outcome = true;
                Config.SemenDetail = true;
                Config.OPU = false;
                Config.Embryology = true;
                Config.EmbryoTransfer = true;
                Config.OocyteVitrification = true;
                Config.EmbryoVitrification = true;
                Config.OocyteThawing = true;
                Config.EmbryoThawing = true;
                Config.CryoPreservation = true;
                //Art Type Wise Day 0 Plan
                Config.Day0Discard = true;
                Config.Day0Cryo = true;
                Config.Day0IVF = false;
                Config.Day0ICSI = true;
                Config.Day0IMSI = true;
                Config.Day0Donate = false;
                Config.Day0DonateCryo = false;
                //Art Type Wise Day 1 to 6 Plan
                Config.Discard = true;
                Config.Cryo = true;
                Config.Transfer = true;
                Config.Donate = false;
                Config.DonateCryo = false;
                Config.DonarBtn = true;
                Config.DonarEmbBtn = false;
            }
            else if (cycleSelectedPlan.ArtType == 8 && (cycleSelectedPlan.SubArtType==19 || cycleSelectedPlan.SubArtType==29)) { //"ER - Linked"-"Fresh Transfer"
                Config.IUI = false;
                Config.Outcome = true;
                Config.SemenDetail = false;
                Config.OPU = false;
                Config.Embryology = true;
                Config.EmbryoTransfer = true;
                Config.OocyteVitrification = false;
                Config.EmbryoVitrification = true;
                Config.OocyteThawing = false;
                Config.EmbryoThawing = false;
                Config.CryoPreservation = true;
                //Art Type Wise Day 0 Plan
                Config.Day0Discard = true;
                Config.Day0Cryo = false;
                Config.Day0IVF = true;//AS per priya's suggestion
                Config.Day0ICSI = true;//AS per priya's suggestion
                Config.Day0IMSI = true;//AS per priya's suggestion
                Config.Day0Donate = false;
                Config.Day0DonateCryo = false;
                //Art Type Wise Day 1 to 6 Plan
                Config.Discard = true;
                Config.Cryo = true;
                Config.Transfer = true;
                Config.Donate = false;
                Config.DonateCryo = false;
                Config.DonarBtn = false;
                Config.DonarEmbBtn = false;
            }
            else if (cycleSelectedPlan.ArtType == 8 && (cycleSelectedPlan.SubArtType == 14 || cycleSelectedPlan.SubArtType == 20 || cycleSelectedPlan.SubArtType == 30)) { // "ER - Linked"-"FET"
                Config.IUI = false;
                Config.Outcome = true; //as per priya's suggestion
                Config.SemenDetail = false;
                Config.OPU = false;
                Config.Embryology = true;
                Config.EmbryoTransfer = true;
                Config.OocyteVitrification = false;
                Config.EmbryoVitrification = true;
                Config.OocyteThawing = false;
                Config.EmbryoThawing = true;
                Config.CryoPreservation = true;
                //Art Type Wise Day 0 Plan
                Config.Day0Discard = true;
                Config.Day0Cryo = false;
                Config.Day0IVF = false;
                Config.Day0ICSI = false;
                Config.Day0IMSI = false;
                Config.Day0Donate = false;
                Config.Day0DonateCryo = false;
                //Art Type Wise Day 1 to 6 Plan
                Config.Discard = true;
                Config.Cryo = true;
                Config.Transfer = true;
                Config.Donate = false;
                Config.DonateCryo = false;
                Config.DonarEmbBtn = true;  // for getting donor emb on for ER-LinkedFET
            }
            else if (cycleSelectedPlan.ArtType == 9 && (cycleSelectedPlan.SubArtType == 13 || cycleSelectedPlan.SubArtType == 32)) {// "Oocyte Recipient"-"F-ICSI "
                Config.IUI = false;
                Config.Outcome = true;
                Config.SemenDetail = true;
                Config.OPU = false;
                Config.Embryology = true;
                Config.EmbryoTransfer = true;
                Config.OocyteVitrification = true;
                Config.EmbryoVitrification = true;
                Config.OocyteThawing = true;
                Config.EmbryoThawing = true;
                Config.CryoPreservation = true;
                //Art Type Wise Day 0 Plan
                Config.Day0Discard = true;
                Config.Day0Cryo = false;
                Config.Day0IVF = false;
                Config.Day0ICSI = true;
                Config.Day0IMSI = true;
                Config.Day0Donate = false;
                Config.Day0DonateCryo = false;
                //Art Type Wise Day 1 to 6 Plan
                Config.Discard = true;
                Config.Cryo = true;
                Config.Transfer = true;
                Config.Donate = false;
                Config.DonateCryo = false;
                Config.DonarBtn = true;
                Config.DonarEmbBtn = false;
            }

            debugger;
            // Added on 27thJul2021 to allow Tab wise access rights to user in ART Cycle
            BindParentList(2);  // ParentId = 2 i.e. 'Patient ART'

        }, function (error) {
        });
    }
    function getObj() {
        debugger;
        return Config;
    }
    return {
        setObj: setObj,
        getObj: getObj
    }

    // Begin : Added on 27thJul2021 to allow Tab wise access rights to user in ART Cycle
    function BindParentList(Id) {
        debugger;
        var Response = authService.BindParentList(Id);
        Response.then(function (resp) {
            debugger;
            
            //var CycleTabList = {};
            //CycleTabList = resp.data;   //$filter('filter')(resp.data, { ParentId: 2 }, true);

            Config.SemenDetailTab = false;
            Config.IUITab = false;
            Config.OPUTab = false;
            Config.EmbryologyTab = false;
            Config.EmbryoTransferTab = false;
            Config.CryoPreservationTab = false;
            Config.OocyteVitrificationTab = false;
            Config.OocyteThawingTab = false;
            Config.EmbryoVitrificationTab = false;
            Config.EmbryoThawingTab = false;
            Config.OutcomeTab = false;

            angular.forEach(resp.data, function (item) {

                //if (item.Title == 'Overview Tab')
                //{
                //}

                //if (item.Title == 'Stimulation Chart Tab')
                //{
                //}

                if (item.Title == 'Semen Details Tab')
                {
                    Config.SemenDetailTab = true;
                }

                if (item.Title == 'IUI Tab')
                {
                    Config.IUITab = true;
                }

                if (item.Title == 'OPU Tab')
                {
                    Config.OPUTab = true;
                }

                if (item.Title == 'Embrology Tab')
                {
                    Config.EmbryologyTab = true;
                }

                if (item.Title == 'Embryo Transfer Tab')
                {
                    Config.EmbryoTransferTab = true;
                }

                if (item.Title == 'Cryo Preservation Tab')
                {
                    Config.CryoPreservationTab = true;
                }

                if (item.Title == 'Oocyte Vitrification Tab')
                {
                    Config.OocyteVitrificationTab = true;
                }

                if (item.Title == 'Oocyte Thawing Tab')
                {
                    Config.OocyteThawingTab = true;
                }

                if (item.Title == 'Embryo Vitrification Tab')
                {
                    Config.EmbryoVitrificationTab = true;
                }

                if (item.Title == 'Embryo Thawing Tab')
                {
                    Config.EmbryoThawingTab = true;
                }

                if (item.Title == 'Outcome Tab')
                {
                    Config.OutcomeTab = true;
                }

            });

            if (Config.SemenDetail == true && Config.SemenDetailTab == true)
            {
                Config.SemenDetail = true;
            }
            else
            {
                Config.SemenDetail = false;
            }

            //Config.IUITab = true;
            if (Config.IUI == true && Config.IUITab == true)
            {
                Config.IUI = true;
            }
            else
            {
                Config.IUI = false;
            }

            //Config.OPUTab = true;
            if (Config.OPU == true && Config.OPUTab == true)
            {
                Config.OPU = true;
            }
            else
            {
                Config.OPU = false;
            }

            //Config.EmbryologyTab = true;
            if (Config.Embryology == true && Config.EmbryologyTab == true)
            {
                Config.Embryology = true;
            }
            else
            {
                Config.Embryology = false;
            }

            //Config.EmbryoTransferTab = true;
            if (Config.EmbryoTransfer == true && Config.EmbryoTransferTab == true)
            {
                Config.EmbryoTransfer = true;
            }
            else
            {
                Config.EmbryoTransfer = false;
            }

            //Config.CryoPreservationTab = true;
            if (Config.CryoPreservation == true && Config.CryoPreservationTab == true)
            {
                Config.CryoPreservation = true;
            }
            else
            {
                Config.CryoPreservation = false;
            }

            //Config.OocyteVitrificationTab = true;
            if (Config.OocyteVitrification == true && Config.OocyteVitrificationTab == true)
            {
                Config.OocyteVitrification = true;
            }
            else
            {
                Config.OocyteVitrification = false;
            }

            //Config.OocyteThawingTab = true;
            if (Config.OocyteThawing == true && Config.OocyteThawingTab == true)
            {
                Config.OocyteThawing = true;
            }
            else
            {
                Config.OocyteThawing = false;
            }

            //Config.EmbryoVitrificationTab = true;
            if (Config.EmbryoVitrification == true && Config.EmbryoVitrificationTab == true)
            {
                Config.EmbryoVitrification = true;
            }
            else
            {
                Config.EmbryoVitrification = false;
            }

            //Config.EmbryoThawingTab = true;
            if (Config.EmbryoThawing == true && Config.EmbryoThawingTab == true)
            {
                Config.EmbryoThawing = true;
            }
            else
            {
                Config.EmbryoThawing = false;
            }

            //Config.OutcomeTab = true;
            if (Config.Outcome == true && Config.OutcomeTab == true)
            {
                Config.Outcome = true;
            }
            else
            {
                Config.Outcome = false;
            }

        });
    }
    // End : Added on 27thJul2021 to allow Tab wise access rights to user in ART Cycle

})