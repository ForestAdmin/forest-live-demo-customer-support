import { faker } from '@faker-js/faker';
import { Knex } from 'knex';

import populate from './utils';

export default async function populateTickets(client: Knex, userIds: number[]): Promise<number[]> {
  const tableName = 'tickets';

  await client.raw(`DROP TABLE IF EXISTS "${tableName}" CASCADE`);
  await client.raw('DROP TYPE IF EXISTS priority_enum');

  await client.raw("CREATE TYPE priority_enum AS ENUM ('low', 'medium', 'high')");
  await client.schema.createTable(tableName, table => {
    table.increments('id').primary();
    table.integer('owner').references('users.id');
    table.integer('opened_by').references('users.id');
    table.date('date');
    table.string('subject');
    table.enum('priority', ['low', 'medium', 'high']);
    table.boolean('is_resolved');
  });

  const ticketSubjects = [
    "Can't Figure It Out 😕",
    "My Account's Playing Hide and Seek 🕵️‍♂️",
    'This Thing Just Broke! 💔',
    'Idea: Add a Super Cool Feature! 🚀',
    'I Want My Money Back, Please! 💸',
    "Where's My Stuff? 📦",
    'Help Me Cancel, SOS! 🆘',
    'Ugh, I Forgot My Password Again 🙄',
    'Send Help: I Messed Up the Return Process 🙃',
    "Everything's Broken, Send a Fix ASAP! 🛠️",
    "Help Installing - I'm Lost! 🛠️",
    'Will This Work with My Antique Computer? 🖥️',
    'Merge My Accounts, Pretty Please 🙏',
    'Subscription Renewal Mystery 🔄',
    'Is It Really You? Account Verification Trouble 🤨',
    'Oops, I Ordered Wrong! 🛒',
    "My Widget's Not Widgeting - Warranty, Maybe? ⚙️",
    "Hey, I've Got Some Ideas! 💡",
    'Is My Data Floating in Space? Privacy Concern 🌌',
    'Buttons All Over - Help Me Navigate! 🧭',
    'My Package Took a Vacation Without Me! 🏖️',
    'Show Me How This Thing Works - Pretty Please? 🎥',
    "What's the Price? Can You Break It Down? 💰",
    "My Gizmo's Gizmo-ing Weirdly - Troubleshoot Time! 🤔",
    "I Think I'm Grounded - Account Suspended? 😢",
    'Why Is This Slower Than My Grandma? ⏳',
    'Tell Me About Those Exclusive Deals! 💎',
    'Card Got Rejected - Payment Woes 🚫💳',
    'Lost in the User Manual Maze 📚',
    'Banned for Being Too Cool? Account Termination 🕶️',
  ];

  return populate(client, tableName, ticketSubjects.length, i => ({
    owner: faker.helpers.arrayElement(userIds),
    opened_by: faker.helpers.arrayElement(userIds),
    date: faker.date.recent(),
    subject: ticketSubjects[i],
    priority: faker.helpers.arrayElement(['low', 'medium', 'high']),
    is_resolved: faker.datatype.boolean(),
  }));
}
