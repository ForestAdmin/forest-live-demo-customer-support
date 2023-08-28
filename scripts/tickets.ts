import { faker } from '@faker-js/faker';
import { Pool, QueryResult } from 'pg';

export default async function populateTickets (client: Pool, userIds: number[]): Promise<number[]> {
  const ids: number[] = [];

  await client.query('DROP TABLE IF EXISTS "tickets" CASCADE');

  await client.query(`
      CREATE TABLE tickets (
        id SERIAL PRIMARY KEY,
        owner INT REFERENCES users(id),
        opened_by INT REFERENCES users(id),
        date DATE,
        subject VARCHAR(255),
        priority VARCHAR(50),
        is_resolved BOOLEAN
    );
  `);

  const ticketSubjects = [
    "Can't Figure It Out 😕",
    "My Account's Playing Hide and Seek 🕵️‍♂️",
    "This Thing Just Broke! 💔",
    "Idea: Add a Super Cool Feature! 🚀",
    "I Want My Money Back, Please! 💸",
    "Where's My Stuff? 📦",
    "Help Me Cancel, SOS! 🆘",
    "Ugh, I Forgot My Password Again 🙄",
    "Send Help: I Messed Up the Return Process 🙃",
    "Everything's Broken, Send a Fix ASAP! 🛠️",
    "Help Installing - I'm Lost! 🛠️",
    "Will This Work with My Antique Computer? 🖥️",
    "Merge My Accounts, Pretty Please 🙏",
    "Subscription Renewal Mystery 🔄",
    "Is It Really You? Account Verification Trouble 🤨",
    "Oops, I Ordered Wrong! 🛒",
    "My Widget's Not Widgeting - Warranty, Maybe? ⚙️",
    "Hey, I've Got Some Ideas! 💡",
    "Is My Data Floating in Space? Privacy Concern 🌌",
    "Buttons All Over - Help Me Navigate! 🧭",
    "My Package Took a Vacation Without Me! 🏖️",
    "Show Me How This Thing Works - Pretty Please? 🎥",
    "What's the Price? Can You Break It Down? 💰",
    "My Gizmo's Gizmo-ing Weirdly - Troubleshoot Time! 🤔",
    "I Think I'm Grounded - Account Suspended? 😢",
    "Why Is This Slower Than My Grandma? ⏳",
    "Tell Me About Those Exclusive Deals! 💎",
    "Card Got Rejected - Payment Woes 🚫💳",
    "Lost in the User Manual Maze 📚",
    "Banned for Being Too Cool? Account Termination 🕶️",
  ];

  for (let i = 0; i < ticketSubjects.length; i++) {
      const ticket = {
        owner: faker.helpers.arrayElement(userIds),
        opened_by: faker.helpers.arrayElement(userIds),
        date: faker.date.recent(),
        subject: faker.helpers.arrayElement(ticketSubjects),
        priority: faker.helpers.arrayElement(['low', 'medium', 'high']),
        is_resolved: faker.datatype.boolean(),
      };

      const insertQuery = {
          text: 'INSERT INTO "tickets" (owner, opened_by, date, subject, priority, is_resolved) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
          values: Object.values(ticket),
      };

      const result: QueryResult<any> = await client.query(insertQuery);
      ids.push(result.rows[0].id.toString());
  }

  return ids;
}
