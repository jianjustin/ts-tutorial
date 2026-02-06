(
    function extending() {
        interface IPerson { name: string; };
        interface ISecurity { password: string; };
        interface IUser extends IPerson, ISecurity { email: string; };
        interface IUserAccount extends IUser { account: string };

        function printPerson(person: IPerson): void {
            console.log(person.name);
        }

        function printUser(user: IUser): void {
            console.log(`${user.name}: ${user.email}`);
        }

        let person: IPerson = { name: "Johana" };
        let user: IUser = { name: "John", email: "john@email.com", password: "secret" };
        let userAccount: IUserAccount = { ...user, account: "1" };

        try {
            // @ts-expect-error
            printUser(person);
        } catch {
            console.log("Property 'email' is missing in type 'IPerson' but required in type 'IUser'");
        }

        // OK
        printPerson(person);

        // OK
        printPerson(user);

        // OK
        printUser(user);
    }
)();