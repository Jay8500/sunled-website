// Sample data. Loaded into Local Storage only when nothing valid is saved.
// No prices or unverified specs are invented. Specs below are printed on SUNLED packaging.
const DATA_VERSION = 3;
const SEED_CATEGORIES = [
  "LED Street Lights","Rechargeable LED Bulbs","Emergency Lights","LED Panel Lights",
  "LED Tube Lights","Day and Night Sensor Lights","Motion Sensor Lights","LED Components and Spare Parts"
];
const SEED_PRODUCTS = [
  {id:"p1",name:"SUNLED 36W LED Street Light",category:"LED Street Lights",wattage:"36W",price:"",available:true,featured:true,image:"assets/images/street-light-36w.jpg",
   description:"SUNLED 36W LED street light for roads, lanes and open areas, with a 50,000-hour working life and a 2-year warranty.",
   specs:[["Wattage","36W"],["Working life","50,000 hours"],["Warranty","2 years"],["Protection","IP65"],["Energy saving","Up to 85%"],["Made in","India"]]},
  {id:"p2",name:"SUNLED 9W Rechargeable LED Bulb",category:"Rechargeable LED Bulbs",wattage:"9W",price:"",available:true,featured:true,image:"assets/images/rechargeable-bulb-9w.jpg",
   description:"SUNLED 9W rechargeable LED bulb with 3-4 hours of power backup, so you stay lit during power cuts.",
   specs:[["Wattage","9W"],["Power backup","3-4 hours"],["Warranty","1 year"],["Voltage","220-240V AC-DC"],["Energy saving","Up to 85%"],["Made in","India"]]},
  {id:"p3",name:"SUNLED Emergency Light",category:"Emergency Lights",wattage:"",available:true,featured:true,price:"",image:"",
   description:"Emergency lighting for homes and shops. Ask us for available models.",specs:[["Type","Emergency Light"]]},
  {id:"p4",name:"SUNLED LED Panel Light",category:"LED Panel Lights",wattage:"",available:true,featured:false,price:"",image:"",
   description:"Flat LED panel lights for offices and shops. Ask us for available sizes.",specs:[["Type","LED Panel Light"]]},
  {id:"p5",name:"SUNLED LED Tube Light",category:"LED Tube Lights",wattage:"",available:true,featured:false,price:"",image:"",
   description:"Energy-efficient LED tube lights. Ask us for available models.",specs:[["Type","LED Tube Light"]]},
  {id:"p6",name:"SUNLED Day and Night Sensor Light",category:"Day and Night Sensor Lights",wattage:"",available:true,featured:false,price:"",image:"",
   description:"Lights that switch on automatically at dusk and off at dawn. Ask us for available models.",specs:[["Type","Day and Night Sensor Light"]]},
  {id:"p7",name:"SUNLED Motion Sensor Light",category:"Motion Sensor Lights",wattage:"",available:true,featured:false,price:"",image:"",
   description:"Lights that turn on when they detect movement. Ask us for available models.",specs:[["Type","Motion Sensor Light"]]},
  {id:"p8",name:"LED Components and Spare Parts",category:"LED Components and Spare Parts",wattage:"",available:true,featured:false,price:"",image:"",
   description:"LED drivers, boards and other spare parts for repairs. Tell us what you need.",specs:[["Type","Spare Parts"]]}
];
