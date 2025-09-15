import {Friend, Colleague, ColleagueHistory, EmailContact} from './myTypes'
import { friends , colleagues } from './01-basics'

function older(f: Friend) : string {
     f.age += 1
     return `${f.name} is now ${f.age}` 
}

console.log(older(friends[0]))


function allOlder(f: Friend[]) : string[] {
	const output : string[]= [];
	for(let i = 0; i < f.length; i++){
		output.push(older(f[i]));	
	}
	return output;
}

console.log(allOlder(friends));

function highestExtension(cs: Colleague[]): Colleague {
  const result = cs.sort(
    (c1, c2) => c1.contact.extension - c2.contact.extension
  );
  return result[cs.length - 1];
}
console.log(highestExtension(colleagues.current));


function addColleague(colleagues : Colleague[], name:string, departament:string, email:string){
	const highestExtensionColleague : Colleague = highestExtension(colleagues);
	const newExtension: number = highestExtensionColleague.contact.extension + 1;
	const newColleague : Colleague = {
		name: name,
		department: departament,
		contact: {
			email: email,
			extension: newExtension
		}
	}
	colleagues.push(newColleague);
}



addColleague(colleagues.current, "Sheild O Connell", "HR", "soc@here.com");
console.log(colleagues.current.filter((c) => c.name === "Sheild O Connell"));

function sortColleagues(
  colleagues: Colleague[],
  sorter: (c1: Colleague, c2: Colleague) => number
): EmailContact[] {
  const sorted = colleagues.sort(sorter); // Colleague[] inferred
  const result: EmailContact[] = sorted.map((ce) => ({ name: ce.name, email: ce.contact.email }));
  return result 
}

console.log(sortColleagues(colleagues.current, (a, b) => a.contact.extension - b.contact.extension));
console.log(sortColleagues(colleagues.current, (a, b) => a.name.length - b.name.length));

function findFriends(
	friends: Friend[],
	filter: (f: Friend) => boolean
): string[] {
	const result: Friend[] = friends.filter(filter);
	return result.map((f) => (f.name));
}


console.log(findFriends(friends, (friend) => friend.name.startsWith('Pa')));
console.log(findFriends(friends, (friend) => friend.age < 35));
