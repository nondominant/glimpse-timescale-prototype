Sensor Event Queue

{
    '<mac address>': [
        16093465634,
        16093468600,
        16093475434,
    ],
    '<mac address>': [],
    '<mac address>': [],
    '<mac address>': [],
    '<mac address>': [],
    '<mac address>': [],
    '<mac address>': [],
    '<mac address>': [],
    '<mac address>': [],
    '<mac address>': [],
    '<mac address>': [],
    '<mac address>': [],
    '<mac address>': [],
    '<mac address>': [],
}

// every 5 seconds calculate E1 for every machine
let E1 = (Sensor_Event_Queue[<mac address>].length * multiplier[<mac address>] / (Date().now() - Sensor_Event_Queue[<mac address>][0] ) * 1000 // E1 = pieces per second
let E1_per_min = E1 * 60;
let E1_per_hour = E1 * 3600;

Multiplier

{
    '<mac address>': 1,
    '<mac address>': 1,
    '<mac address>': 1,
    '<mac address>': 1,
    '<mac address>': 1,
    '<mac address>': 1,
    '<mac address>': 1,
    '<mac address>': 1,
    '<mac address>': 1,
    '<mac address>': <load factor>(product type),
    '<mac address>': <load factor>(product type),
    '<mac address>': <load factor>(product type),
    '<mac address>': <load factor>(product type),
    '<mac address>': <load factor>(product type),
}

//**// 
//Receive information on which type of product is currently exiting the CBW
//
//query product map to get item_weight and load size 
//**//
product map {
    <product name>: { 
        item_weight : x,
        load_size : y
    },
    <product name>: { 
        item_weight : x,
        load_size : y
    },
    <product name>: { 
        item_weight : x,
        load_size : y
    },
    <product name>: { 
        item_weight : x,
        load_size : y
    },
    <product name>: { 
        item_weight : x,
        load_size : y
    },
    <product name>: { 
        item_weight : x,
        load_size : y
    },
}

load factor 

{
    <product type>: load_size * item_weight,
    <product type>: load_size * item_weight,
    <product type>: load_size * item_weight,
    <product type>: load_size * item_weight,
    <product type>: load_size * item_weight,
    <product type>: load_size * item_weight,
    <product type>: load_size * item_weight,
    <product type>: load_size * item_weight,
}


Construct Event 

// every 5 seconds calculate E1 for every machine
let E1 = (Sensor_Event_Queue[<mac address>].length * multiplier[<mac address>] / (Date().now() - Sensor_Event_Queue[<mac address>][0] ) * 1000 // E1 = pieces per second
let E2 = (Gas_Event_Queue[<mac address>].length * multiplier[<mac address>] / (Date().now() - Gas_event_Queue[<mac address>][0] ) * 1000 // E2 = m3 per second
let E3 = (Water_Event_Queue[<mac address>].length * multiplier[<mac address>] / (Date().now() - Water_event_Queue[<mac address>][0] ) * 1000 // E2 = m3 per second
                                //^ returns null for Machines without water usage                                           
let employee = Location_Event_Queue[<mac address>][0] // latest employee
let machine_status = Location_Event_Queue[][]
let product = Location_Event_Queue[][]
 
















