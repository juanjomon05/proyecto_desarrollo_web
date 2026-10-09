export async function seedUsers(usersService) {
    const student = await usersService.create({
        name: 'Ana Pérez',
        email: 'ana@studeasy.com',
        password: '1234',
        role: 'student',
    });
    await usersService.create({
        name: 'Admin StudEasy',
        email: 'admin@studeasy.com',
        password: 'admin',
        role: 'admin',
    });
    return student;
}
//# sourceMappingURL=users.seeder.js.map