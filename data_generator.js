const genarateRandomString = (len = 5) => {
    const str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    let result = "";
    for(let i = 0; i < len; i++) {
        result += str.charAt(Math.floor(Math.random() * str.length));
    }
    return result;
}

function generateRandomName() {
    const firstNames = ['Alice', 'Bob', 'Charlie', 'David', 'Eva', 'Frank', 'Grace', 'Henry', 'Ivy', 'Jack'];
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Jones', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore', 'Taylor'];

    const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];

    return `${randomFirstName} ${randomLastName}`;
}

const genarteRandomSwitch = () => {
    return Math.floor(Math.random() * 10) / 2 == 0;
}

const genarteRandomNumber = () => {
    return Math.floor(Math.random() * 1000);
}

const genarateRandomDate = () => {
    return new Date(Math.floor(Math.random() * 10));
}

const getGenarator = (_type) => {
    switch(_type) {
        case "string":
            return genarateRandomString;
        case "number":
            return genarteRandomNumber;
        case "boolean":
            return genarteRandomSwitch;
        case "date":
            return genarateRandomDate;
        case "name":
            return generateRandomName;
        default:
            return genarateRandomString;
    }
}

const typeGen = (type) => {
    if(typeof type !== 'object') {
        return getGenarator(type)()
    }
    const result = {};
    const keys = Object.keys(type);
    keys.map((val)=> {
        const d = typeof type[val] === 'object' ? typeGen(type[val]): getGenarator(type[val])();
        result[val] = d
    })
   
    return result;
}

const dataSetGen = ({type, len}) => {
    return Array.from({ length: len }, ()=> {
        return (typeGen(type));
    });
}


const type = {
    id: 'string',
    name: 'name',
    age: 'number',
    address: {
        street: 'string',
        country: 'string',
        state: 'string',
        city: 'string',
        pin: 'number',
        geo: {
            lat: 'number',
            lon: 'number'
        }
    },
    createdAt: 'date',
    updatedAt: 'date'
}


const data = dataSetGen({
    type, len: 12
})

console.log(data)

