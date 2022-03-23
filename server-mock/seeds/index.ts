const todosSeeder = server => {
  // @ AQUI você controla quantos "todos" vão ser criados quando o server iniciar.
  server.createList('todo', 40)
}

export default function seeds(server) {
  server.loadFixtures()
  todosSeeder(server)
}
