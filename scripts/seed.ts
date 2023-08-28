import 'dotenv/config';

import pg from 'pg';

import createUsers from './users';
import createAddresses from './addresses';
import createBillingInfos from './billingInfos';
import createOrders from './orders';
import createPlans from './plans';
import createSubscriptions from './subscriptions';
import createMessages from './messages';
import createComments from './comments';
import createTickets from './tickets';
import createCoupons from './coupons';

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});


(async () => {
  console.log('Creating users...');
  const userIds = await createUsers(pool);
  console.log('Creating addresses...');
  await createAddresses(pool, userIds);
  console.log('Creating billing infos...');
  await createBillingInfos(pool, userIds);
  console.log('Creating orders...');
  await createOrders(pool, userIds);
  console.log('Creating plans...');
  const planIds = await createPlans(pool);
  console.log('Creating tickets...');
  const ticketIds = await createTickets(pool, userIds)
  console.log('Creating subscriptions...');
  await createSubscriptions(pool, userIds, planIds);
  console.log('Creating messages...');
  await createMessages(pool, userIds);
  console.log('Creating comments...');
  await createComments(pool, userIds, ticketIds);
  console.log('Creating coupons...');
  await createCoupons(pool, userIds);
  console.log('Tables created!');
  await pool.end();
})();