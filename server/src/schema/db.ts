import * as faker from "faker";


interface Loan {
	id: number;
	name: string;
	amount: number;
}

interface Customer {
	id: number;
	name: string;
	loans?: Loan[];
}

interface ContactPerson {
	id: number
	fullName: string
	mobile: string
}

interface JuridicalCustomer extends Customer {
	registrationNumber: String;
	contactPersons?: ContactPerson[];
}

interface PhysicalCustomer extends Customer {
	firstName: string;
	lastName: string;
	age: number;
}

type customerUnion = JuridicalCustomer | PhysicalCustomer;

const Customers: customerUnion[] = [];

const ContactPersons: ContactPerson[] = [];

ContactPersons.push({
	id: 1,
	fullName: 'Petre Petashvili',
	mobile: '599'
});
ContactPersons.push({
	id: 2,
	fullName: 'Sandro Dolidze',
	mobile: '593'
});


// add seed for consistent random data
faker.seed(9);
for (let i: number = 0; i < 50; i++) {
	const loans: Loan[] = [];

	loans.push({
		id: 1,
		name: faker.random.word(),
		amount: 100
	});

	loans.push({
		id: 2,
		name: faker.random.word(),
		amount: 200
	});


	if (i % 3 === 1) {
		Customers.push({
			id: i,
			name: faker.random.word(),
			loans: loans,
			firstName: faker.random.word(),
			lastName: faker.random.word(),
			age: 22
		});

		continue;
	}


	Customers.push({
		id: i,
		name: faker.random.word(),
		loans: loans,
		registrationNumber: faker.random.alphaNumeric(11),
		contactPersons: ContactPersons
	});
}


export const db = {
	Customers: Customers
};
